import dotenv from "dotenv";
import { z } from "zod";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const envSchema = z.object({
  PORT: z.string().default("5000"),
  FRONTEND_URL: z.string(),
  JWT_SECRET: z.string(),
  REDIS_URL: z.string(),
  MONGO_URL: z.string(),
  FIREBASE_PROJECT_ID: z.string(),
  FIREBASE_CLIENT_EMAIL: z.string(),
  FIREBASE_PRIVATE_KEY: z.string(),
});

const envValidation = envSchema.safeParse(process.env);

if (!envValidation.success) {
  console.error("\n❌ Environment Validation Failed:\n");

  envValidation.error.issues.forEach((error) => {
    const field = error.path.join(".");
    const value = process.env[field];
    console.error(`  Field: ${field}`);
    console.error(`  Error: ${error.message}`);
    console.error(`  Current value: ${value ? "✅ Set" : "❌ Missing"}`);
    console.error("");
  });

  console.error("📋 All loaded env vars:");
  Object.entries(process.env).forEach(([key, value]) => {
    if (
      [
        "PORT", "FRONTEND_URL", "JWT_SECRET",
        "REDIS_URL", "MONGO_URL",
        "FIREBASE_PROJECT_ID", "FIREBASE_CLIENT_EMAIL", "FIREBASE_PRIVATE_KEY",
      ].includes(key)
    ) {
      console.error(`  ${key}: ${value ? "✅" : "❌"}`);
    }
  });

  console.error("\n💡 Make sure all required variables are in .env file\n");
  process.exit(1);
}

export const config = {
  port: envValidation.data.PORT,
  frontendUrl: envValidation.data.FRONTEND_URL,
  mongoUrl: envValidation.data.MONGO_URL,
  jwtSecret: envValidation.data.JWT_SECRET,
  redisUrl: envValidation.data.REDIS_URL,
  firebaseProjectId: envValidation.data.FIREBASE_PROJECT_ID,
  firebaseClientEmail: envValidation.data.FIREBASE_CLIENT_EMAIL,
  firebasePrivateKey: envValidation.data.FIREBASE_PRIVATE_KEY,
} as const;

console.log("✅ Configuration loaded successfully");