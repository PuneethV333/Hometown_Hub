import { Request, Response } from "express";
import { getError } from "../utils/error.utils";
import { authResType } from "../types/auth.types";
import { handleAuth } from "../services/auth.services";

export const auth = async (req: Request, res: Response) => {
  try {
    const firebaseUid = req.user?.firebaseUid;
    const provider = req.user?.provider;
    if (!firebaseUid || !provider) {
      return res.status(401).json({
        message: "firebaseUid not found",
      });
    }

    const { user, isNewUser } = await handleAuth(firebaseUid, provider);

    const data: authResType = {
      firebaseUid: user.firebaseUid,
      _id: user._id.toString(),
      isProfileComplete: user.isProfileComplete,
    };

    return res.status(isNewUser ? 201 : 200).json({
      data: data,
      message: isNewUser ? "User created" : "User exists",
    });
  } catch (err) {
    res.status(400).json(getError(err));
  }
};
