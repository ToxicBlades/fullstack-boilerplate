import { expect, test } from "../fixtures/index.js";
import { AuthPage } from "../pages/auth.page.js";
import { DashboardPage } from "../pages/dashboard.page.js";

const AUTH_URL = /\/auth$/;

test("a user can sign out", async ({ page }) => {
  const dashboard = new DashboardPage(page);
  await dashboard.goto();
  await dashboard.signOutButton().click();

  await expect(page).toHaveURL(AUTH_URL);
  await expect(new AuthPage(page).title()).toBeVisible();
});
