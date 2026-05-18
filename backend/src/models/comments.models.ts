import { Schema, model } from "mongoose";
import { commentsType } from "../types/comments.types";

const commentSchema = new Schema<commentsType>(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },

    by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    likes: {
      type: Number,
      default: 0,
    },

    likedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Comment = model<commentsType>("Comment", commentSchema,"comment");