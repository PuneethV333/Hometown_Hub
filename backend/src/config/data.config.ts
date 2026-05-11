import dotenv from "dotenv"
import { z } from "zod"
dotenv.config();


const envSchema = z.object({
    PORT: z.string().default("5000"),
    MONGO_URL: z.string(),
    JWT_SECRET: z.string(),
    REDIS_URL: z.string(),
})

const env = envSchema.parse(process.env)

export const config = {
    port: process.env.PORT,

    frontendUrl: process.env.VITE_FRONTEND_URL,

    mongoUrl: process.env.MONGO_URL,

    jwtSecret: process.env.JWT_SECRET,

    redisUrl: process.env.REDIS_URL,
}