import mongoose from "mongoose";
import Community from "../models/community.models";
import Post from "../models/post.models";
import User from "../models/user.models";
import { clearCache, getVal, setValKey } from "../utils/redis.utils";

interface GetPostsOptions {
  page?: number;
  limit?: number;
}

export const getPostServices = async (
  firebaseUid: string,
  { page = 1, limit = 10 }: GetPostsOptions = {},
) => {
  const cacheKey = `post:${firebaseUid}:${page}:${limit}`;

  const cached = await getVal(cacheKey);

  if (cached) {
    return { posts: JSON.parse(cached), source: "redis" };
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
    communityIds = user.myCommunities.map((c: any) => c._id ?? c);
  }

  if (communityIds.length === 0) {
    return { posts: [], total: 0, page, totalPages: 0 };
  }

  const skip = (page - 1) * limit;

  const [posts, _] = await Promise.all([
    Post.find({ communityId: { $in: communityIds } })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("userId")
      .populate("communityId", "name type icon")
      .lean(),

    Post.countDocuments({ communityId: { $in: communityIds } }),
  ]);

  await setValKey(cacheKey, JSON.stringify(posts));

  return {
    posts,
    source: "db",
  };
};

export const addPostServices = async (
  firebaseUid: string,
  content = "",
  image = "",
  communityId: string,
) => {
  try {
    const user = await User.findOne({ firebaseUid });

    if (!user) {
      throw new Error("User not found");
    }

    const isFound = user.myCommunities.some(
      (x: mongoose.Types.ObjectId) => x.toString() === communityId,
    );

    if (!isFound) {
      throw new Error("User can't post in this community");
    }

    const newPost = await Post.create({
      userId: user._id,
      communityId,
      content,
      image,
    });

    if (!newPost) {
      throw new Error("new post failed to create");
    }

    await clearCache(`post:${firebaseUid}:*`);

    return newPost;
  } catch (err) {
    throw err;
  }
};
