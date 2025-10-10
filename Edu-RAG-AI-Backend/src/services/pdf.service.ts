import fs from "fs";
import path from "path";
import { prisma } from "../config/prisma";
import { logger } from "../utils/logger";

export async function savePdf(file: Express.Multer.File) {
  const dest = path.join(process.env.UPLOAD_DIR!, `${file.filename}.pdf`);
  fs.renameSync(file.path, dest);
  const doc = await prisma.document.create({
    data: { filename: file.originalname, filePath: dest },
  });
  logger.info(`PDF saved ${doc.id}`);
  return doc;
}