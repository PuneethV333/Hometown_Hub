import { NextFunction, Request, Response } from "express";
import admin from "../config/firebase.config";
import { getError } from "../utils/error.utils";


type AuthProvider = "google" | "email";


declare global {
  namespace Express {
    interface Request {
      user?: {
        firebaseUid: string;
        provider: AuthProvider;
      };
    }
  }
}

export const authMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Unauthorized: No token provided",
    });
  }

  const token = authHeader.slice(7); 

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const firebaseProvider = decodedToken.firebase?.sign_in_provider;

    
    const providerMap: Record<string, AuthProvider | undefined> = {
      "google.com": "google",
      password: "email",
    };

    const provider = providerMap[firebaseProvider || ""];

    if (!provider) {
      return res.status(400).json({
        message: `Unsupported auth provider: ${firebaseProvider}`,
      });
    }

    req.user = {
      firebaseUid: decodedToken.uid,
      provider,
    };

    next();
  } catch (err) {
    console.error("Firebase Token Verification Error:", err);
    return res.status(401).json(getError(err));
  }
};