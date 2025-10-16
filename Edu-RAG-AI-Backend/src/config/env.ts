// src/env.ts
import { config } from "dotenv";
import { z } from "zod";

config(); // load .env into process.env

const schema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string(),
  REDIS_URL: z.string(),
  OLLAMA_BASE_URL: z.string().url(),
  EMBEDDER_URL: z.string().url(),
  UPLOAD_DIR: z.string().default("uploads"),
  LOG_LEVEL: z.enum(["error", "warn", "info", "debug"]).default("info"),
});

export const ENV = schema.parse(process.env);