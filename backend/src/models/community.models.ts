import mongoose, { Model, Schema } from "mongoose";
import { community } from "../types/community.types";

const communitySchema = new Schema<community>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["town", "city", "state"],
      required: true,
    },
    location: {
      town: {
        type: String,
        default: "",
        trim: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
      },
      state: {
        type: String,
        required: true,
        trim: true,
      },
    },
    memberCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    icon:{
        type:String,
        default:"https://res.cloudinary.com/deymewscv/image/upload/v1760774522/hqoltmqamhhjfz7divf1.jpg"
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Community: Model<community> =
  mongoose.models.Community ||
  mongoose.model<community>("Community", communitySchema, "community");

export default Community;
