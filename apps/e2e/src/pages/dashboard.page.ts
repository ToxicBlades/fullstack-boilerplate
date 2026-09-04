import type { Page } from "@playwright/test";

import { DASHBOARD_HEADING } from "../constants.js";

export class DashboardPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/");
  }

  heading() {
    return this.page.getByRole("heading", { name: DASHBOARD_HEADING });
  }

  navigation(name: "Items" | "Documents") {
    return this.page.getByRole("button", { name: new RegExp(`^${name}`) });
  }

  signOutButton() {
    return this.page.getByRole("button", { name: "Sign out" });
  }
}
