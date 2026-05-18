import { Router } from "express";
import { authMiddleWare } from "../middleware/auth.middleware";
import { getEvents } from "../controllers/events.controller";

export const eventRouter = Router()

eventRouter.get("/get",authMiddleWare,getEvents)
