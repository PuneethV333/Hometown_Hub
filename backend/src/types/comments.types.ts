import mongoose from "mongoose";

export interface commentsType {
  content: string;
  by: mongoose.Types.ObjectId;
  likes: number;
  likedBy: mongoose.Types.ObjectId[];
}