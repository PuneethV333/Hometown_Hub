import { Request, Response } from "express";
import { getError } from "../utils/error.utils";
import {
  addPostServices,
  getCommunityPostsServices,
  getPostServices,
  getUsersPostServices,
  likePostServices,
} from "../services/post.services";
import { addPostReqBody } from "../types/user.types";

export const getPosts = async (req: Request, res: Response) => {
  try {
    const firebaseUid = req.user?.firebaseUid;
    if (!firebaseUid) return res.status(401).json({ message: "Unauthorized" });

    const result = await getPostServices(firebaseUid);

    return res.status(200).json({ data: result, source: result.source });
  } catch (err: any) {
    return res.status(err.status || 500).json(getError(err));
  }
};

export const addPost = async (req: Request, res: Response) => {
  try {
    const firebaseUid = req.user?.firebaseUid;
    if (!firebaseUid) {
      return res.status(401).json({
        message: "unauthorized",
      });
    }

    const parsed = addPostReqBody.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "req not matching the required type",
      });
    }

    const data = parsed.data;

    const result = await addPostServices(
      firebaseUid,
      data.content,
      data.image,
      data.communityId,
    );

    return res.status(200).json({
      message: "new post created",
      data: result,
    });
  } catch (err) {
    res.status(500).json(getError(err));
  }
};

export const likePost = async (req: Request, res: Response) => {
  try {
    const firebaseUid = req.user?.firebaseUid;

    if (!firebaseUid) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id: postId } = req.params;

    if (!postId) {
      return res.status(400).json({ message: "Post ID not provided" });
    }

    const result = await likePostServices(
      Array.isArray(postId) ? postId[0] : postId,
      firebaseUid,
    );

    return res.status(200).json({
      success: true,
      message: result.liked ? "Post liked" : "Post unliked",
      data: result.post,
    });
  } catch (err: any) {
    return res.status(err.status || 500).json(getError(err));
  }
};

export const getCommunityPosts = async (req: Request, res: Response) => {
  try {
    const firebaseUid = req.user?.firebaseUid;

    if (!firebaseUid) {
      return res.status(401).json({
        message: "unauthorized",
      });
    }

    const communityId = req.params?.id;

    const result = await getCommunityPostsServices(
      firebaseUid,
      Array.isArray(communityId) ? communityId[0] : communityId,
    );

    return res.status(200).json({
      posts: result.posts,
      source: result.source,
    });
  } catch (err) {
    res.status(500).json(getError(err));
  }
};

export const getUsersPost = async (req: Request, res: Response) => {
  try {
    const firebaseUid = req.user?.firebaseUid;

    if (!firebaseUid) {
      return res.status(401).json({
        message: "unauthorized",
      });
    }

    const result = await getUsersPostServices(firebaseUid);

    return res.status(200).json({
      data: result.data,
      source: result.source,
    });
  } catch (err) {
    res.status(500).json(getError(err));
  }
};
