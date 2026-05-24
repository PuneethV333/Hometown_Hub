import { Router } from "express";
import { authMiddleWare } from "../middleware/auth.middleware";
import {
  addPost,
  getCommunityPosts,
  getPosts,
  getUsersPost,
  likePost,
} from "../controllers/post.controller";

export const postRouter = Router();

postRouter.get("/", authMiddleWare, getPosts);
postRouter.post("/add", authMiddleWare, addPost);
postRouter.post("/:id/like", authMiddleWare, likePost);
postRouter.get("/community/:id", authMiddleWare, getCommunityPosts);
postRouter.get("/user", authMiddleWare, getUsersPost);
