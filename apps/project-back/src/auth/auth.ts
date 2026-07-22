import { randomUUID } from "node:crypto";
import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { env } from "@/config/env.js";

export const authPool = new Pool({ connectionString: env.DATABASE_URL });
export const auth = betterAuth({
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  database: authPool,
  session: {
    cookieCache: {
      enabled: true,
      maxAge: env.AUTH_SESSION_COOKIE_CACHE_MAX_AGE_SEC,
    },
  },
  emailAndPassword: { enabled: true, requireEmailVerification: true },
  emailVerification: {
    sendOnSignUp: false,
    autoSignInAfterVerification: false,
  },
  user: {
    modelName: "users",
    fields: {
      name: "full_name",
      emailVerified: "email_verified",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
  advanced: {
    database: { generateId: () => randomUUID() },
    disableOriginCheck: true,
    disableCSRFCheck: true,
  },
});
