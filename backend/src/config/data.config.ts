import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
    PORT: z.string().default("5000"),

    FRONTEND_URL: z.string(),

    JWT_SECRET: z.string(),

    REDIS_URL: z.string(),

    MONGO_URL: z.string(),

    FIREBASE_API_KEY: z.string(),

    FIREBASE_AUTH_DOMAIN: z.string(),

    FIREBASE_PROJECT_ID: z.string(),

    FIREBASE_STORAGE_BUCKET: z.string(),

    FIREBASE_MESSAGING_SENDER_ID: z.string(),

    FIREBASE_APP_ID: z.string(),

    FIREBASE_MEASUREMENT_ID: z.string(),
});

const env = envSchema.parse(process.env);

export const config = {
    port: env.PORT,

    frontendUrl: env.FRONTEND_URL,

    mongoUrl: env.MONGO_URL,

    jwtSecret: env.JWT_SECRET,

    redisUrl: env.REDIS_URL,

    firebase: {
        apiKey: env.FIREBASE_API_KEY,

        authDomain:
            env.FIREBASE_AUTH_DOMAIN,

        projectId:
            env.FIREBASE_PROJECT_ID,

        storageBucket:
            env.FIREBASE_STORAGE_BUCKET,

        messagingSenderId:
            env.FIREBASE_MESSAGING_SENDER_ID,

        appId: env.FIREBASE_APP_ID,

        measurementId:
            env.FIREBASE_MEASUREMENT_ID,
    },
};