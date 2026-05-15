import mongoose from "mongoose";

export interface commentType {
  content: string;
  by: mongoose.Types.ObjectId;
  likes: number;
  likedBy: mongoose.Types.ObjectId[];
  createdAt?: Date;
}

export interface postType {
  userId: mongoose.Types.ObjectId;
  communityId: mongoose.Types.ObjectId;
  content: string;
  image?: string;

  likes: number;
  likedBy: mongoose.Types.ObjectId[];

  commentNumber: number;

  comments: commentType[];

  createdAt?: Date;
  updatedAt?: Date;
}