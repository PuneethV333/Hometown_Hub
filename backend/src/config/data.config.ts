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
});

const envValidation = envSchema.safeParse(process.env);

if (!envValidation.success) {
  console.error("\n❌ Environment Validation Failed:\n");

  // Print each error clearly
  envValidation.error.issues.forEach((error) => {
    const field = error.path.join(".");
    const value = process.env[field];
    console.error(`  Field: ${field}`);
    console.error(`  Error: ${error.message}`);
    console.error(`  Current value: ${value ? "✅ Set" : "❌ Missing"}`);
    console.error("");
  });

  // Print all env vars for debugging
  console.error("📋 All loaded env vars:");
  Object.entries(process.env).forEach(([key, value]) => {
    if (
      ["PORT", "FRONTEND_URL", "JWT_SECRET", "REDIS_URL", "MONGO_URL"].includes(
        key,
      )
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
} as const;

console.log("✅ Configuration loaded successfully");
