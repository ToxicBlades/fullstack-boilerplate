import { E2E_USER } from "../constants.js";
import { expect, test } from "../fixtures/index.js";
import { AuthPage } from "../pages/auth.page.js";
import { DashboardPage } from "../pages/dashboard.page.js";

const AUTH_URL = /\/auth$/;
const HOME_URL = /\/$/;

test("an unauthenticated visitor is redirected to sign in", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page).toHaveURL(AUTH_URL);
  await expect(new AuthPage(page).title()).toBeVisible();
});

test("a user can sign in", async ({ page }) => {
  const auth = new AuthPage(page);
  await auth.goto();
  await auth.signIn(E2E_USER.email, E2E_USER.password);

  await expect(page).toHaveURL(HOME_URL);
  await expect(new DashboardPage(page).heading()).toBeVisible();
});
