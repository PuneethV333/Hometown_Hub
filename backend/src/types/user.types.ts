import { Document } from "mongoose"

export interface userSchemaType extends Document{
    name:string,
    gender:'Male'|'Female'
    city:string,
    village:string,
    photoUrl:string,
    dob:Date,
    role:'Admin'|'Moderator'|'User',
    phoneNo:string,
    email:string
}