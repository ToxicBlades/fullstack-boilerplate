import { defineConfig, devices } from "@playwright/test";

const WEB_URL = process.env.E2E_WEB_URL ?? "http://localhost:3000";
const BACK_HEALTH_URL =
  process.env.E2E_BACK_HEALTH_URL ?? "http://localhost:3010/api/hello";
const AUTH_FILE = "src/.auth/user.json";

export default defineConfig({
  testDir: "./src/tests",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["list"], ["html", { open: "never" }]],
  outputDir: "test-results",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL: WEB_URL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 15_000,
  },
  projects: [
    {
      name: "setup",
      testMatch: /global\.setup\.ts/,
    },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: AUTH_FILE,
      },
      dependencies: ["setup"],
      testIgnore: [/global\.setup\.ts/, /auth\.spec\.ts/, /sign-out\.spec\.ts/],
    },
    {
      name: "chromium-sign-out",
      use: {
        ...devices["Desktop Chrome"],
        storageState: AUTH_FILE,
      },
      dependencies: ["chromium"],
      testMatch: [/sign-out\.spec\.ts/],
    },
    {
      name: "chromium-unauthenticated",
      use: { ...devices["Desktop Chrome"] },
      testMatch: [/auth\.spec\.ts/],
    },
  ],
  webServer: process.env.E2E_SKIP_WEBSERVER
    ? undefined
    : [
        {
          command: "pnpm --filter @project/back dev",
          url: BACK_HEALTH_URL,
          reuseExistingServer: !process.env.CI,
          timeout: 120_000,
        },
        {
          command: "pnpm --filter @project dev",
          url: WEB_URL,
          reuseExistingServer: !process.env.CI,
          timeout: 120_000,
        },
      ],
});
