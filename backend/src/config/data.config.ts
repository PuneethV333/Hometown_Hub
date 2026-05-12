import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
    PORT: z.string().default("5000"),

    FRONTEND_URL: z.string(),

    JWT_SECRET: z.string(),

    REDIS_URL: z.string(),

    MONGO_URL: z.string(),

});

const env = envSchema.parse(process.env);

export const config = {
    port: env.PORT,

    frontendUrl: env.FRONTEND_URL,

    mongoUrl: env.MONGO_URL,

    jwtSecret: env.JWT_SECRET,

    redisUrl: env.REDIS_URL
};