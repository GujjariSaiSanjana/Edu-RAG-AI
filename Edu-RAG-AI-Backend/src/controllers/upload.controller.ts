import { Request, Response } from "express";
import { savePdf } from "../services/pdf.service";

export async function uploadPdf(req: Request, res: Response) {
  try {
    if (!req.file) return res.status(400).json({ error: "No file" });
    const doc = await savePdf(req.file);
    res.json({ message: "PDF uploaded", documentId: doc.id });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
}