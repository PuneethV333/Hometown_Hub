import { Request, Response } from "express";
import { getError } from "../utils/error.utils";
import { getPostServices } from "../services/post.services";

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
