import { z } from "zod";
export const UploadPdfSchema = z.object({
// multer will add file
});
export const ChatBodySchema = z.object({
message: z.string().min(1).max(4000),
documentId: z.string().cuid(),
});