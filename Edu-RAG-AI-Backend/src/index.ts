import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import uploadRoutes from './routes/upload.routes';
import chatRoutes from './routes/chat.routes';
import { logger } from './utils/logger';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/upload', uploadRoutes);
app.use('/api/chat', chatRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`🚀 Backend running on http://localhost:${PORT}`);
});