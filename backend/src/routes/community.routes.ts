import { Router } from "express";

import { authMiddleWare } from "../middleware/auth.middleware";

import {
  createCommunity,
  getCommunityData,
  getSuggestedCommunities,
  joinOrLeaveCommunity,
} from "../controllers/community.controller";

export const communityRouter = Router();

communityRouter.get("/suggested", authMiddleWare, getSuggestedCommunities);

communityRouter.post("/create", authMiddleWare, createCommunity);

communityRouter.post("/join/leave/:id", authMiddleWare, joinOrLeaveCommunity);

communityRouter.get("/:id", authMiddleWare, getCommunityData);
