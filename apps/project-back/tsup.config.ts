import { defineConfig } from "tsup";

export default defineConfig([
  {
    clean: true,
    entry: ["src/index.ts"],
    external: [
      "@prometheus-io/client",
      "better-auth",
      "envalid",
      "knex",
      "pg",
      "pino",
      "pino-pretty",
    ],
    format: ["esm"],
    noExternal: ["@project/analytics", "@project/logger"],
    platform: "node",
    sourcemap: true,
    splitting: false,
    target: "node20",
  },
  {
    clean: false,
    entry: { "auth/auth-migrate": "src/auth/auth-migrate.ts" },
    external: ["better-auth", "pg", "dotenv", "envalid"],
    format: ["esm"],
    platform: "node",
    sourcemap: false,
    splitting: false,
    target: "node20",
  },
  {
    clean: false,
    entry: ["migrations/*.ts"],
    external: ["knex"],
    format: ["cjs"],
    outDir: "dist/migrations",
    outExtension() {
      return { js: ".cjs" };
    },
    platform: "node",
    sourcemap: false,
    splitting: false,
    target: "node20",
  },
]);
