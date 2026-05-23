import { Router } from "express";
import { authMiddleWare } from "../middleware/auth.middleware";
import { addEvents, getEvents } from "../controllers/events.controller";

export const eventRouter = Router()

eventRouter.get("/get",authMiddleWare,getEvents)
eventRouter.post("/add",authMiddleWare,addEvents)