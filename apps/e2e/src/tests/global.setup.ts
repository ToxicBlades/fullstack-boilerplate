import { mkdir } from "node:fs/promises";
import { expect, test as setup } from "@playwright/test";

import { DASHBOARD_HEADING, E2E_USER } from "../constants.js";
import { captureFailureScreenshot } from "../helpers/failure-screenshot.js";
import { AuthPage } from "../pages/auth.page.js";

const AUTH_FILE = "src/.auth/user.json";
const HOME_URL = /\/$/;

setup("authenticate as the E2E user", async ({ page }, testInfo) => {
  try {
    const auth = new AuthPage(page);
    await auth.goto();
    await auth.signIn(E2E_USER.email, E2E_USER.password);

    await expect(page).toHaveURL(HOME_URL);
    await expect(
      page.getByRole("heading", { name: DASHBOARD_HEADING })
    ).toBeVisible();
    await mkdir("src/.auth", { recursive: true });
    await page.context().storageState({ path: AUTH_FILE });
  } finally {
    await captureFailureScreenshot(page, testInfo);
  }
});
