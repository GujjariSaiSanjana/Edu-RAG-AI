import winston from "winston";
import { ENV } from "../config/env.js";
export const logger = winston.createLogger({
level: ENV.LOG_LEVEL,
format: winston.format.combine(
winston.format.timestamp(),
winston.format.errors({ stack: true }),
winston.format.json()
),
transports: [new winston.transports.Console()],
});