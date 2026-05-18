import { Request, Response } from "express";
import { getError } from "../utils/error.utils";
import { getSuggestedCommunitiesService } from "../services/community.services";

export const getSuggestedCommunities = async (req: Request, res: Response) => {
  try {
    const firebaseUid = req.user?.firebaseUid;

    if (!firebaseUid) {
      return res.status(401).json({
        message: "unauthorized",
      });
    }

    const result = await getSuggestedCommunitiesService(firebaseUid);

    return res.status(200).json({
      data: result.data,
      source: result.source,
    });
  } catch (err) {
    res.status(500).json(getError(err));
  }
};
