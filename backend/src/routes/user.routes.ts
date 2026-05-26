import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { authMiddleWare } from "../middleware/auth.middleware";

export const userRouter = Router()

userRouter.get('/getMe',authMiddleWare,userController.getMe)
userRouter.post('/on-boarding',authMiddleWare,userController.onBoarding)
userRouter.get("/admin/stats", authMiddleWare, userController.adminData);