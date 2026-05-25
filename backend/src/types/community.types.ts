import mongoose from "mongoose";
import { Document } from "mongoose";
import { z } from "zod";

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

export const createCommunityReqBodySchema = z.object({
  name: z.string(),
  type: z.enum(["town", "city", "state"]),
  icon: z.string().optional(),
  town: z.string().optional(),
  city: z.string(),
  state: z.string(),
});

export type createCommunityReqBodyType = z.infer<
  typeof createCommunityReqBodySchema
>;
