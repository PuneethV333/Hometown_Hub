import { Router } from "express";
import { authMiddleWare } from "../middleware/auth.middleware";
import { addPost, getPosts } from "../controllers/post.controller";

export const postRouter = Router()


// frontend calls: GET /api/posts?page=1&limit=10

postRouter.get('/',authMiddleWare,getPosts)
postRouter.post('/add',authMiddleWare,addPost)
