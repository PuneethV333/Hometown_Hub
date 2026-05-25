import mongoose, { Document } from "mongoose";
import { z } from "zod";

export interface userSchemaType extends Document {
  name: string;
  firebaseUid: string;
  gender: "Male" | "Female";
  city: string;
  village: string;
  town: string;
  photoUrl: string;
  dob: Date;
  role: "Admin" | "Moderator" | "User";
  phoneNumber: string;
  email: string;
  state: string;
  isProfileComplete: boolean;
  authProvider: "google" | "email" | "";
  myCommunities: mongoose.Types.ObjectId[];
}

export const addPostReqBody = z.object({
  content: z.string().default(""),
  image: z.url().optional(),
  communityId: z.string(),
});
