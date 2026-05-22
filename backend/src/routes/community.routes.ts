import { Router } from "express";
import { authMiddleWare } from "../middleware/auth.middleware";
import { getCommunityData, getSuggestedCommunities, joinOrLeaveCommunity } from "../controllers/community.controller";

export const communityRouter = Router();

communityRouter.get("/suggested", authMiddleWare, getSuggestedCommunities);
communityRouter.get("/:id", authMiddleWare, getCommunityData);
communityRouter.post("/join/leave/:id",authMiddleWare,joinOrLeaveCommunity)