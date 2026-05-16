import mongoose from "mongoose";

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