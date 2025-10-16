import { createClient } from "@redis/client";
import { ENV } from "./env.js";
export const redis = createClient({ url: ENV.REDIS_URL });
await redis.connect();