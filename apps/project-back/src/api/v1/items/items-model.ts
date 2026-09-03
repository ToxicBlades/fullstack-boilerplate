import { z } from "zod";

export const ItemIdParamsSchema = z.object({ id: z.string().uuid() });

export const CreateItemBodySchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim().min(1).max(255),
});

export const PatchItemBodySchema = z.object({
  name: z.string().trim().min(1).max(255),
});

export const ItemSelectColumns = [
  "id",
  "name",
  "created_at",
  "updated_at",
] as const;
