import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { redisClient } from "../config/redis";
import { config } from "../config/data.config";
import { AuthToken } from "../types/authMiddleWare.type";




const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const decoded = jwt.verify(
            token,
            config.jwtSecret as string
        ) as AuthToken;

        const session = await redisClient.get(
            `session:${decoded.id}`
        );

        if (!session) {
            return res.status(401).json({
                message: "Session expired",
            });
        }

        req.user = {
            id: decoded.id,
        };

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token",
        });
    }
};

export default authMiddleware;