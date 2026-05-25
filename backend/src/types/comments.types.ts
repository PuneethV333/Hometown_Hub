import mongoose from "mongoose";
import { z } from "zod";

export interface commentsType {
  content: string;
  by: mongoose.Types.ObjectId;
}

export const addCommentPayloadSchema = z.object({
  content: z.string(),
  postId: z.string(),
});

export type addCommentPayloadType = z.infer<typeof addCommentPayloadSchema>;
