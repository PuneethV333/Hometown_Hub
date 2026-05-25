import { Request, Response } from "express";
import { getError } from "../utils/error.utils";
import { getCurrentUser, onBoardingHelper } from "../services/user.services";
import { onBoardingSchema } from "../types/onBoardingReqBody.types";

export const getMe = async (req: Request, res: Response) => {
  try {
    const firebaseUid = req.user?.firebaseUid;
    const provider = req.user?.provider;

    if (!firebaseUid || !provider) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const result = await getCurrentUser(firebaseUid, provider);

    if (!result) {
      return res.status(404).json({
        message: "User not found",
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

export const onBoarding = async (req: Request, res: Response) => {
  try {
    const firebaseUid = req.user?.firebaseUid;
    const provider = req.user?.provider;

    if (!firebaseUid || !provider) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const parsed = onBoardingSchema.safeParse(req.body);

    if (!parsed.success) {
      throw new Error("inputs not provided");
    }

    const result = await onBoardingHelper(parsed.data, firebaseUid, provider);

    if (!result) {
      return res.status(400).json({
        message: "something went wrong",
      });
    }

    return res.status(200).json({
      data: result,
      message: "Profile completed",
    });
  } catch (err) {
    res.status(500).json(getError(err));
  }
};

export const adminData = async (req:Request,res:Response) => {
    try {
        const firebaseUid = req.user?.firebaseUid;
        if(!firebaseUid){
            return res.status(401).json({
                message:"unauthorized"
            })
        }

        
        
    } catch (err) {
        res.status(500).json(getError(err))
    }
}