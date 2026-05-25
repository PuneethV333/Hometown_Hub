import { Request, Response } from "express";
import { getError } from "../utils/error.utils";
import {
  createCommunityServices,
  getCommunityDataService,
  getSuggestedCommunitiesService,
  joinOrLeaveCommunityServices,
} from "../services/community.services";
import { createCommunityReqBodySchema } from "../types/community.types";

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

export const getCommunityData = async (req: Request, res: Response) => {
  try {
    const firebaseUid = req.user?.firebaseUid;

    if (!firebaseUid) {
      return res.status(401).json({
        message: "unauthorized",
      });
    }

    const communityId = req.params?.id;

    if (!communityId) {
      return res.status(402).json({
        message: "community id not provide",
      });
    }

    const result = await getCommunityDataService(
      firebaseUid,
      Array.isArray(communityId) ? communityId[0] : communityId,
    );

    if (!result) {
      return res.status(400).json({
        message: "something went wrong",
      });
    }

    return res.status(200).json({
      data: result.data,
      source: result.source,
    });
  } catch (err) {
    res.status(500).json(getError(err));
  }
};

export const joinOrLeaveCommunity = async (req: Request, res: Response) => {
  try {
    const firebaseUid = req.user?.firebaseUid;
    const provider = req.user?.provider;

    if (!firebaseUid) {
      return res.status(401).json({ message: "unauthorized" });
    }

    if (!provider) {
      return res.status(402).json({ message: "provider not given" });
    }

    const communityId = req.params?.id;

    if (!communityId) {
      return res.status(402).json({
        message: "community id not provide",
      });
    }

    const result = await joinOrLeaveCommunityServices(
      firebaseUid,
      provider,
      Array.isArray(communityId) ? communityId[0] : communityId,
    );

    if (!result) {
      return res.status(400).json({
        message: "something went wrong",
      });
    }

    return res.status(200).json({
      data: result.data,
      joined: result.joined,
    });
  } catch (err) {
    res.status(500).json(getError(err));
  }
};

export const createCommunity = async (req: Request, res: Response) => {
  try {
    const firebaseUid = req.user?.firebaseUid;
    const provider = req.user?.provider;

    if (!firebaseUid || !provider) {
      return res.status(401).json({
        message: "unauthorized",
      });
    }

    const parsed = createCommunityReqBodySchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Schema missMatch",
        error: parsed.error,
      });
    }

    const result = await createCommunityServices(
      firebaseUid,
      provider,
      parsed.data,
    );

    return res.status(200).json({
      data: result.data,
      success: true,
    });
  } catch (err) {
    res.status(500).json(getError(err));
  }
};
