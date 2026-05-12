import mongoose, { Model, Schema } from "mongoose";
import { userSchemaType } from "../types/user.types";



const userSchema = new Schema<userSchemaType>({
    name: {
        type: String,
        required: true,
        trim: true,
    },firebaseId:{
        type:String,
        required:true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female']
    },
    city: {
        type: String,
        required: true,
    },
    village: {
        type: String,
        required: true
    },
    photoUrl: {
        type: String,
        default: "https://res.cloudinary.com/deymewscv/image/upload/v1760774522/hqoltmqamhhjfz7divf1.jpg"
    },
    dob: {
        type: Date,
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'Moderator', 'User'],

        default: 'User'
    },
    phoneNo: {
        type: String,
        required: true,
        match: [
            /^(\+91)?[6-9]\d{9}$/,
            "invalid number"
        ]
        //9876543210 
        // +919876543210
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
},{
    timestamps:true
})

const User : Model<userSchemaType> = mongoose.models.User||mongoose.model("User", userSchema,"user")
export default User