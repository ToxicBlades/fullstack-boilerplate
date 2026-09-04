import { expect, test } from "../fixtures/index.js";
import { DashboardPage } from "../pages/dashboard.page.js";
import { ItemsPage } from "../pages/items.page.js";

test("a user can create, edit, and delete an item", async ({ page }) => {
  const itemName = `E2E item ${Date.now()}`;
  const updatedName = `${itemName} updated`;
  const dashboard = new DashboardPage(page);
  const items = new ItemsPage(page);

  await dashboard.goto();
  await items.nameInput().fill(itemName);
  await items.panel.getByRole("button", { name: "Add" }).click();
  await expect(items.item(itemName)).toBeVisible();

  await items.row(itemName).getByRole("button", { name: "Edit" }).click();
  await items.nameInput().fill(updatedName);
  await items.panel.getByRole("button", { name: "Save" }).click();
  await expect(items.item(updatedName)).toBeVisible();

  await items.row(updatedName).getByRole("button", { name: "Delete" }).click();
  await expect(items.item(updatedName)).toBeHidden();
});
