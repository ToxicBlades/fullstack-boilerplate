import { db } from "@/db/knex";
import { auth, authPool } from "@/auth/auth";
import { env } from "@/config/env";

try {
  if (process.argv.includes("--reset")) {
    await db("items").del();
  }
  await db("items")
    .insert({ name: "Example item" })
    .onConflict("name")
    .ignore();

  const existingUser = await db("users")
    .select("id")
    .where({ email: env.DEFAULT_USER_EMAIL })
    .first();

  if (!existingUser) {
    await auth.api.signUpEmail({
      body: {
        email: env.DEFAULT_USER_EMAIL,
        name: env.DEFAULT_USER_NAME,
        password: env.DEFAULT_USER_PASSWORD,
      },
    });
    await db("users")
      .where({ email: env.DEFAULT_USER_EMAIL })
      .update({ email_verified: true });
  }
} finally {
  await db.destroy();
  await authPool.end();
}
