import type { Page } from "@playwright/test";

export class AuthPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/auth");
  }

  async signIn(email: string, password: string) {
    await this.page.getByLabel("Email").fill(email);
    await this.page.getByLabel("Password").fill(password);
    await this.page.getByRole("button", { name: "Sign in" }).click();
  }

  title() {
    return this.page.getByText("Welcome back", { exact: true });
  }
}
