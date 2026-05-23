import mongoose, { Model, Schema } from "mongoose";
import { postType } from "../types/post.types";

const postSchema = new Schema<postType>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    communityId: {
      type: Schema.Types.ObjectId,
      ref: "Community",
      required: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },

    image: {
      type: String,
      default: "",
    },

    commentNumber: {
      type: Number,
      default: 0,
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

    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post: Model<postType> =
  mongoose.models.Post || mongoose.model<postType>("Post", postSchema, "post");

export default Post;