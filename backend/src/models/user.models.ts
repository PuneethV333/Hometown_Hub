import mongoose, { Model, Schema } from "mongoose";
import { userSchemaType } from "../types/user.types";

const userSchema = new Schema<userSchemaType>(
  {
    name: {
      type: String,
      trim: true,
    },
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", ""],
    },
    town: {
      type: String,
    },
    city: {
      type: String,
    },
    village: {
      type: String,
    },
    state: {
      type: String,
    },
    photoUrl: {
      type: String,
      default:
        "https://res.cloudinary.com/deymewscv/image/upload/v1760774522/hqoltmqamhhjfz7divf1.jpg",
    },
    dob: {
      type: Date,
    },
    role: {
      type: String,

      enum: ["Admin", "Moderator", "User"],

      default: "User",
    },
    phoneNumber: {
      type: String,

      match: [/^(\+91)?[6-9]\d{9}$/, "invalid number"],
    },
    email: {
      type: String,

      lowercase: true,

      trim: true,

      unique: true,

      sparse: true,

      validate: {
        validator: function (value: string) {
          if (!value) return true;

          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },

        message: "Invalid email format",
      },
    },
    isProfileComplete: {
      type: Boolean,

      default: false,
    },
    authProvider: {
      type: String,
      enum: ["google", "email"],
      required: true,
    },
    myCommunities: [
      {
        communityId: {
          type: Schema.Types.ObjectId,
          ref: "Community",
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

const User: Model<userSchemaType> =
  mongoose.models.User ||
  mongoose.model<userSchemaType>("User", userSchema, "user");
export default User;
