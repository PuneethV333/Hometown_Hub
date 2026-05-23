import mongoose, { Schema, Model } from "mongoose";
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
  },
);

const Comment: Model<commentsType> =
  mongoose.models.Comment ||
  mongoose.model<commentsType>("Comment", commentSchema, "comment");

export default Comment;
