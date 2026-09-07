import { randomUUID } from "node:crypto";
import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { env } from "@/config/env";

export const authPool = new Pool({ connectionString: env.DATABASE_URL });
export const auth = betterAuth({
  advanced: {
    database: { generateId: () => randomUUID() },
    disableCSRFCheck: true,
    disableOriginCheck: true,
  },
  baseURL: env.BETTER_AUTH_URL,
  database: authPool,
  emailAndPassword: { enabled: true, requireEmailVerification: true },
  emailVerification: {
    autoSignInAfterVerification: false,
    sendOnSignUp: false,
  },
  secret: env.BETTER_AUTH_SECRET,
  session: {
    cookieCache: {
      enabled: true,
      maxAge: env.AUTH_SESSION_COOKIE_CACHE_MAX_AGE_SEC,
    },
  },
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
