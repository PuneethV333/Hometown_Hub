import mongoose, { Document } from "mongoose";

export interface community{
    communityId:mongoose.Types.ObjectId
}

export interface userSchemaType extends Document {
  name: string;
  firebaseUid: string;
  gender: "Male" | "Female";
  city: string;
  village: string;
  town:string;
  photoUrl: string;
  dob: Date;
  role: "Admin" | "Moderator" | "User";
  phoneNumber: string;
  email: string;
  state:string;
  isProfileComplete:boolean;
  authProvider:"google"|"email"|"",
  myCommunities:community[]
}
