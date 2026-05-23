import mongoose from "mongoose";
import Community from "../models/community.models";
import Post from "../models/post.models";
import User from "../models/user.models";
import { clearCache, getVal, setValKey } from "../utils/redis.utils";

export const getPostServices = async (firebaseUid: string) => {
  const cacheKey = `post:${firebaseUid}`;

  const cached = await getVal(cacheKey);

  if (cached) {
    return {
      ...JSON.parse(cached),
      source: "redis",
    };
  }

  const user = await User.findOne({ firebaseUid })
    .select("myCommunities state")
    .lean();

  if (!user) {
    const err: any = new Error("User not found");
    err.status = 404;
    throw err;
  }

  let communityIds: mongoose.Types.ObjectId[];

  if (!user.myCommunities || user.myCommunities.length === 0) {
    const communities = await Community.find({
      "location.state": user.state,
    })
      .select("_id")
      .lean();

    communityIds = communities.map((c: any) => c._id);
  } else {
    communityIds = user.myCommunities;
  }

  if (communityIds.length === 0) {
    return {
      posts: [],
      total: 0,
      source: "db",
    };
  }

  const [posts, total] = await Promise.all([
    Post.find({
      communityId: {
        $in: communityIds,
      },
    })
      .sort({ createdAt: -1 })
      .populate("userId", "name photoUrl")
      .populate("communityId", "name type icon")
      .populate("comments", "content by")
      .populate("likedBy", "name")
      .lean(),

    Post.countDocuments({
      communityId: {
        $in: communityIds,
      },
    }),
  ]);

  const result = {
    posts,
    total,
  };

  await setValKey(cacheKey, JSON.stringify(result), 60);

  return {
    ...result,
    source: "db",
  };
};

export const addPostServices = async (
  firebaseUid: string,
  content = "",
  image = "",
  communityId: string,
) => {
  const user = await User.findOne({ firebaseUid });

  if (!user) {
    const err: any = new Error("User not found");
    err.status = 404;
    throw err;
  }

  const isFound = user.myCommunities.some(
    (x: any) => x.toString() === communityId,
  );

  if (!isFound) {
    const err: any = new Error("User can't post in this community");

    err.status = 403;

    throw err;
  }

  const newPost = await Post.create({
    userId: user._id,
    communityId,
    content,
    image,
  });

  await clearCache(`post:${firebaseUid}`);
  await clearCache(`posts:user:${firebaseUid}`);

  return newPost;
};

export const likePostServices = async (postId: string, firebaseUid: string) => {
  const user = await User.findOne({ firebaseUid }).select("_id").lean();

  if (!user) {
    const err: any = new Error("User not found");
    err.status = 404;
    throw err;
  }

  const post = await Post.findById(postId).select("likedBy").lean();

  if (!post) {
    const err: any = new Error("Post not found");
    err.status = 404;
    throw err;
  }

  const alreadyLiked = post.likedBy.some(
    (id: any) => id.toString() === user._id.toString(),
  );

  const updated = await Post.findByIdAndUpdate(
    postId,
    alreadyLiked
      ? {
          $inc: {
            likes: -1,
          },

          $pull: {
            likedBy: user._id,
          },
        }
      : {
          $inc: {
            likes: 1,
          },

          $addToSet: {
            likedBy: user._id,
          },
        },

    {
      returnDocument: "after",
    },
  ).lean();

  if (!updated) {
    const err: any = new Error("Failed to update post");

    err.status = 500;

    throw err;
  }

  await clearCache(`post:${firebaseUid}`);

  return {
    post: updated,
    liked: !alreadyLiked,
  };
};

export const getCommunityPostsServices = async (
  firebaseUid: string,
  communityId: string,
) => {
  try {
    const cacheKey = `post:community:${communityId}:${firebaseUid}`;

    const cached = await getVal(cacheKey);

    if (cached) {
      return { posts: JSON.parse(cached), source: "redis" };
    }

    const user = await User.findOne({ firebaseUid: firebaseUid });

    if (!user) {
      throw new Error("unauthorized");
    }

    const posts = await Post.find({
      communityId: communityId,
    })
      .populate("userId", "name photoUrl")
      .populate("communityId", "name type icon")
      .lean();

    await setValKey(cacheKey, JSON.stringify(posts));

    return {
      posts: posts,
      source: "db",
    };
  } catch (err) {
    throw err;
  }
};

export const getUsersPostServices = async (firebaseUid: string) => {
  const cacheKey = `posts:user:${firebaseUid}`;
  const cached = await getVal(cacheKey);

  if (cached) {
    return { data: JSON.parse(cached), source: "redis" };
  }

  const user = await User.findOne({ firebaseUid: firebaseUid });

  if (!user) {
    throw new Error("unauthorized");
  }

  const posts = await Post.find({ userId: user._id })
    .populate("communityId", "name icon")
    .lean();

  await setValKey(cacheKey, JSON.stringify(posts));

  return { data: posts, source: "db" };
};
