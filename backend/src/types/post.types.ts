import mongoose from "mongoose";

export interface postType {
  userId: mongoose.Types.ObjectId;
  communityId: mongoose.Types.ObjectId;
  content: string;
  image?: string;
  likes: number;
  likedBy: mongoose.Types.ObjectId[];
  commentNumber: number;
  comments: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}
