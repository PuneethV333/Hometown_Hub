import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { authMiddleWare } from "../middleware/auth.middleware";

export const authRouter = Router();

authRouter.post("/google", authMiddleWare, authController.authViaGoogle);
