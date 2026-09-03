import { z } from "zod";

export const ObjectKeySchema = z
  .string()
  .trim()
  .min(1)
  .refine(
    (key) => !(key.startsWith("/") || key.includes("..")),
    "Object key must be a relative path"
  );

export const PresignUploadBodySchema = z.object({
  key: ObjectKeySchema,
  contentType: z.string().trim().min(1).optional(),
});

export const ObjectKeyQuerySchema = z.object({ key: ObjectKeySchema });
