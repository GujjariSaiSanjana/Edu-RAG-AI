import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
dotenv.config();

import { errorHandler } from "./middleware/errorHandler";
import { ensureCollection } from "./config/qdrant";
import { logger } from "./utils/logger";
import uploadRoutes from "./routes/upload.routes";
import chatRoutes from "./routes/chat.routes";

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/upload", uploadRoutes);
app.use("/api/chat",  chatRoutes);
app.use(errorHandler);

(async () => {
  await ensureCollection();
  app.listen(PORT, () => logger.info(`🚀 API on http://localhost:${PORT}`));
})();