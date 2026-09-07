import { defineConfig, devices } from "@playwright/test";

const WEB_URL = process.env.E2E_WEB_URL ?? "http://localhost:3000";
const BACK_HEALTH_URL =
  process.env.E2E_BACK_HEALTH_URL ?? "http://localhost:3010/api/hello";
const AUTH_FILE = "src/.auth/user.json";

export default defineConfig({
  expect: { timeout: 10_000 },
  forbidOnly: Boolean(process.env.CI),
  fullyParallel: true,
  outputDir: "test-results",
  projects: [
    {
      name: "setup",
      testMatch: /global\.setup\.ts/,
    },
    {
      dependencies: ["setup"],
      name: "chromium",
      testIgnore: [/global\.setup\.ts/, /auth\.spec\.ts/, /sign-out\.spec\.ts/],
      use: {
        ...devices["Desktop Chrome"],
        storageState: AUTH_FILE,
      },
    },
    {
      dependencies: ["chromium"],
      name: "chromium-sign-out",
      testMatch: [/sign-out\.spec\.ts/],
      use: {
        ...devices["Desktop Chrome"],
        storageState: AUTH_FILE,
      },
    },
    {
      name: "chromium-unauthenticated",
      testMatch: [/auth\.spec\.ts/],
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  reporter: [["list"], ["html", { open: "never" }]],
  retries: process.env.CI ? 2 : 0,
  testDir: "./src/tests",
  timeout: 60_000,
  use: {
    actionTimeout: 15_000,
    baseURL: WEB_URL,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    video: "retain-on-failure",
  },
  webServer: process.env.E2E_SKIP_WEBSERVER
    ? undefined
    : [
        {
          command: "pnpm --filter @project/back dev",
          reuseExistingServer: !process.env.CI,
          timeout: 120_000,
          url: BACK_HEALTH_URL,
        },
        {
          command: "pnpm --filter @project dev",
          reuseExistingServer: !process.env.CI,
          timeout: 120_000,
          url: WEB_URL,
        },
      ],
  workers: process.env.CI ? 1 : undefined,
});
