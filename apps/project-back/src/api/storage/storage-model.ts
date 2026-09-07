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
  contentType: z.string().trim().min(1).optional(),
  key: ObjectKeySchema,
});

export const ObjectKeyQuerySchema = z.object({ key: ObjectKeySchema });
