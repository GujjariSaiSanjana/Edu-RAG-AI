// src/middleware/rateLimit.ts
import rateLimit from "express-rate-limit";
import { redis } from "../config/redis.js";

/* ---------- Upload endpoint: 10 req / 60 s ---------- */
export const uploadLimiter = rateLimit({
  store: redis as any, // official Redis store adapter coming soon
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

/* ---------- Chat endpoint: 60 req / 60 s ---------- */
export const chatLimiter = rateLimit({
  store: redis as any,
  windowMs: 60 * 1000,
  max: 60,
});