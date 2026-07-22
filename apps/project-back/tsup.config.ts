import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/index.ts"],
    format: ["esm"],
    platform: "node",
    target: "node20",
    external: ["better-auth", "knex", "pg"],
    splitting: false,
    sourcemap: true,
    clean: true,
  },
  {
    entry: { "auth/auth-migrate": "src/auth/auth-migrate.ts" },
    format: ["esm"],
    platform: "node",
    target: "node20",
    external: ["better-auth", "pg", "dotenv", "envalid"],
    splitting: false,
    sourcemap: false,
    clean: false,
  },
  {
    entry: ["migrations/*.ts"],
    format: ["cjs"],
    outDir: "dist/migrations",
    outExtension() {
      return { js: ".cjs" };
    },
    platform: "node",
    target: "node20",
    external: ["knex"],
    splitting: false,
    sourcemap: false,
    clean: false,
  },
]);
