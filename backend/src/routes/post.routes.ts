import { Router } from "express";
import { authMiddleWare } from "../middleware/auth.middleware";
import { addPost, getPosts, likePost } from "../controllers/post.controller";

export const postRouter = Router()

postRouter.get('/',authMiddleWare,getPosts)
postRouter.post('/add',authMiddleWare,addPost)
postRouter.post("/:id/like", authMiddleWare, likePost);