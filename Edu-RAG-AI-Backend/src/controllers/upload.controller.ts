import { Request, Response } from 'express';
import { savePdf } from '../services/pdf.service';
import { z } from 'zod';

const UploadSchema = z.object({
  file: z.any().refine((f) => f?.mimetype === 'application/pdf', {
    message: 'Only PDF files are allowed',
  }),
});

export async function uploadPdf(req: Request, res: Response) {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    const saved = await savePdf(file);
    res.json({ message: 'PDF uploaded', documentId: saved.id });
  } catch (err) {
    res.status(500).json({ error: 'Upload failed' });
  }
}