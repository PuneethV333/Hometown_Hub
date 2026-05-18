import { Request, Response } from "express";
import { getError } from "../utils/error.utils";
import { addPostServices, getPostServices } from "../services/post.services";
import { addPostReqBody } from "../types/user.types";

export const getPosts = async (req: Request, res: Response) => {
  try {
    const firebaseUid = req.user?.firebaseUid;

    if (!firebaseUid) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const { posts, source } = await getPostServices(firebaseUid, {
      page,
      limit,
    });

    return res.status(200).json({ data: posts, source: source });
  } catch (err: any) {
    res.status(err.status || 500).json(getError(err));
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
        message:"new post created",
        data:result
    })
  } catch (err) {
    res.status(500).json(getError(err));
  }
};

