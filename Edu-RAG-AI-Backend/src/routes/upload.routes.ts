import express from 'express';
import multer from 'multer';
import { uploadPdf } from '../controllers/upload.controller';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), uploadPdf);

export default router;