// src/index.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { errorHandler } from './middleware/errorHandler';
import uploadRoutes from './routes/upload.routes';
import chatRoutes from './routes/chat.routes';
import { logger } from './utils/logger';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

/* ===== Swagger UI ===== */
const swaggerDoc = YAML.load('./openapi.yaml');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

/* ===== global middleware ===== */
app.use(helmet());
app.use(cors());
app.use(express.json());

/* ===== API routes ===== */
app.use('/api/upload', uploadRoutes);
app.use('/api/chat', chatRoutes);

/* ===== error handler (must be last) ===== */
app.use(errorHandler);

/* ===== start server ===== */
app.listen(PORT, () => {
  logger.info(`🚀 Backend running on http://localhost:${PORT} – docs at /docs`);
});