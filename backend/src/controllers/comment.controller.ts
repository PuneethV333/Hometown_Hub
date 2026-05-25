import { Request, Response } from "express";
import { getError } from "../utils/error.utils";
import { addCommentPayloadSchema } from "../types/comments.types";
import { addCommentServices } from "../services/comment.services";

export const addComment = async (req: Request, res: Response) => {
  try {
    const firebaseUid = req.user?.firebaseUid;

    if (!firebaseUid) {
      return res.status(401).json({
        message: "unauthorized",
      });
    }

    const parsed = addCommentPayloadSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "schema not matched",
        error: parsed.error,
      });
    }

    const result = await addCommentServices(firebaseUid, parsed.data);

    return res.status(200).json({
      data: result,
    });
  } catch (err) {
    res.status(500).json(getError(err));
  }
};
