import { z } from "zod";

export const onBoardingSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  phoneNumber: z.string(),
  gender: z.enum(["Male", "Female", ""]),
  city: z.string(),
  state: z.string(),
  town: z.string(),
  dob: z.coerce.date(),
});

export type onBoardingReqBodyType = z.infer<typeof onBoardingSchema>;
