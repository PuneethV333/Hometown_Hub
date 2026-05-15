import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        firebaseUid: string;
        provider: "google" | "email";
      };
    }
  }
}