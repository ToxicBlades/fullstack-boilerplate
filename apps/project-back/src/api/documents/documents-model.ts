import { z } from "zod";

export const PresignDocumentSchema = z.object({
  filename: z.string().trim().min(1).max(255),
  mimeType: z.string().trim().min(1).max(255),
  sizeBytes: z
    .number()
    .int()
    .positive()
    .max(25 * 1024 * 1024),
  title: z.string().trim().min(1).max(255),
});

export const DocumentIdSchema = z.object({ id: z.string().uuid() });
export const PatchDocumentSchema = z.object({
  title: z.string().trim().min(1).max(255),
});
