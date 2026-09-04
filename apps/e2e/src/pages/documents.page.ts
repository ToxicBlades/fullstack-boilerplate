import type { Locator, Page } from "@playwright/test";

export class DocumentsPage {
  readonly panel: Locator;

  constructor(page: Page) {
    this.panel = page
      .locator('[data-slot="card"]')
      .filter({ has: page.getByLabel("Document title") });
  }

  titleInput() {
    return this.panel.getByLabel("Document title");
  }

  fileInput() {
    return this.panel.getByLabel("Document file");
  }

  document(title: string) {
    return this.panel.getByText(title, { exact: true });
  }

  row(title: string) {
    return this.document(title).locator("../..");
  }
}
