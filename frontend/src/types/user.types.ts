import { z } from "zod";

export const userSchema = z.object({
  name: z.string().optional(),

  firebaseUid: z.string(),

  gender: z.enum(["Male", "Female"]).optional(),

  city: z.string().optional(),

  village: z.string().optional(),

  photoUrl: z.string().optional(),

  dob: z.date().optional(),

  role: z.enum(["Admin", "Moderator", "User"]),

  phoneNo: z.string().optional(),

  email: z.string().email().optional(),

  isProfileComplete: z.boolean(),

  authProvider: z.enum(["google", "email"]),
});

export type userType = z.infer<typeof userSchema>;


export const onBoardingSchema = z.object({
    email:z.string().email(),
    name:z.string(),
    phoneNumber:z.string(),
    gender:z.enum(["Male","Female",""]),
    city:z.string(),
    state:z.string(),
    town:z.string(),
    dob:z.coerce.date()
})

export type onBoardingReqBodyType = z.infer<typeof onBoardingSchema>