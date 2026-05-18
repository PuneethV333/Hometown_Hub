import { Router } from "express";
import { authMiddleWare } from "../middleware/auth.middleware";
import { getSuggestedCommunities } from "../controllers/community.controller";

export const communityRouter = Router();

communityRouter.get("/suggested", authMiddleWare, getSuggestedCommunities);
