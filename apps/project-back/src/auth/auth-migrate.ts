import { randomUUID } from "node:crypto";
import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { env } from "@/config/env";

export const authPool = new Pool({ connectionString: env.DATABASE_URL });
export const auth = betterAuth({
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  database: authPool,
  user: {
    modelName: "users",
    fields: {
      name: "full_name",
      emailVerified: "email_verified",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
  emailAndPassword: { enabled: true, requireEmailVerification: true },
  advanced: {
    database: { generateId: () => randomUUID() },
  },
});
