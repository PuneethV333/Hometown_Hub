import { Router } from "express";
import { authMiddleWare } from "../middleware/auth.middleware";
import { addComment } from "../controllers/comment.controller";

export const commentsRouter = Router()

commentsRouter.post("/add",authMiddleWare,addComment)