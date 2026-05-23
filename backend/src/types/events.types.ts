import mongoose from "mongoose";
import {z} from "zod"

export interface IEvent {
  title: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  location: string;
  community: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  attendees: mongoose.Types.ObjectId[];
  maxAttendees?: number;
  status: "upcoming" | "ongoing" | "past";
  createdAt?: Date;
  updatedAt?: Date;
}


export const addEventsReqBodySchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  startDate: z.coerce.date(),          
  endDate: z.coerce.date().optional(),
  location: z.string(),
  community: z.string(),
})



export type addEventsReqBodyType = z.infer<typeof addEventsReqBodySchema>