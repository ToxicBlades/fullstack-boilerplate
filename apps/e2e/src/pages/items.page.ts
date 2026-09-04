import type { Locator, Page } from "@playwright/test";

export class ItemsPage {
  readonly panel: Locator;

  constructor(page: Page) {
    this.panel = page
      .locator('[data-slot="card"]')
      .filter({ has: page.getByLabel("Item name") });
  }

  nameInput() {
    return this.panel.getByLabel("Item name");
  }

  item(name: string) {
    return this.panel.getByText(name, { exact: true });
  }

  row(name: string) {
    return this.item(name).locator("..");
  }
}
