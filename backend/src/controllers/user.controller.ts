import { Request, Response } from "express";
import { getError } from "../utils/error.utils";
import { getCurrentUser } from "../services/user.services";

export const getMe = async (req: Request, res: Response) => {
  try {
    const firebaseUid = req.user?.firebaseUid;
    const provider = req.user?.provider;

    if (!firebaseUid || !provider) {
      return res.status(401).json({
        message: "Unauthorized",
        firebaseUid: firebaseUid,
      });
    }

    const result = await getCurrentUser(firebaseUid, provider);

    if (!result) {
      return res.status(404).json({
        message: "User not found",
        firebaseUid: firebaseUid,
      });
    }

    return res.status(200).json({
      data: result.user,

      source: result.source,
    });
  } catch (err) {
    return res.status(500).json(getError(err));
  }
};
