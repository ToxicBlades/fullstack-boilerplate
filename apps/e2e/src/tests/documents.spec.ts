import { expect, test } from "../fixtures/index.js";
import { SAMPLE_DOCUMENT } from "../helpers/paths.js";
import { DashboardPage } from "../pages/dashboard.page.js";
import { DocumentsPage } from "../pages/documents.page.js";

test("a user can upload, rename, and delete a document", async ({ page }) => {
  const title = `E2E document ${Date.now()}`;
  const updatedTitle = `${title} renamed`;
  const dashboard = new DashboardPage(page);

  await dashboard.goto();
  await dashboard.navigation("Documents").click();
  const documents = new DocumentsPage(page);

  await documents.titleInput().fill(title);
  await documents.fileInput().setInputFiles(SAMPLE_DOCUMENT);
  await documents.panel.getByRole("button", { name: "Upload" }).click();
  await expect(documents.document(title)).toBeVisible({ timeout: 30_000 });

  await documents.row(title).getByRole("button", { name: "Edit" }).click();
  await documents.titleInput().fill(updatedTitle);
  await documents.panel.getByRole("button", { name: "Save" }).click();
  await expect(documents.document(updatedTitle)).toBeVisible();

  await documents
    .row(updatedTitle)
    .getByRole("button", { name: "Delete" })
    .click();
  await expect(documents.document(updatedTitle)).toBeHidden();
});
