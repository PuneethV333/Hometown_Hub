import { NextFunction, Request, Response } from "express";

import admin from "../config/firebase.config";
import { getError } from "../utils/error.utils";

export const authMiddleWare = async (
  req: Request,

  res: Response,

  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized: No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decodedToken = await admin.auth().verifyIdToken(token);

    const providerMap = {
      "google.com": "google",
      password: "email",
    } as const;

    const firebaseProvider = decodedToken.firebase.sign_in_provider;

    const provider = providerMap[firebaseProvider as keyof typeof providerMap];

    req.user = {
      firebaseUid: decodedToken.uid.toString(),
      provider:provider,
    };

    next();
  } catch (err) {
    console.error("Firebase Token Verification Error:", err);

    return res.status(401).json(getError(err));
  }
};
