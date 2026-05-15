import mongoose from "mongoose";
import { Document } from "mongoose";

export interface community extends Document {
  name: string;
  type: "town" | "city" | "state";
  location: {
    town: string;
    city: string;
    state: string;
  };
  icon: string;
  memberCount: number;
  createdBy: mongoose.Types.ObjectId;
  createdAt?: Date;
}
