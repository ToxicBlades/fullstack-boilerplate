import { randomUUID } from "node:crypto";
import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { env } from "@/config/env";

export const authPool = new Pool({ connectionString: env.DATABASE_URL });
export const auth = betterAuth({
  advanced: {
    database: { generateId: () => randomUUID() },
  },
  baseURL: env.BETTER_AUTH_URL,
  database: authPool,
  emailAndPassword: { enabled: true, requireEmailVerification: true },
  secret: env.BETTER_AUTH_SECRET,
  user: {
    fields: {
      createdAt: "created_at",
      emailVerified: "email_verified",
      name: "full_name",
      updatedAt: "updated_at",
    },
    modelName: "users",
  },
});
