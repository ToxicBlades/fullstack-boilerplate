import { test as base } from "@playwright/test";

import { captureFailureScreenshot } from "../helpers/failure-screenshot.js";

export const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    await use(page);
    await captureFailureScreenshot(page, testInfo);
  },
});

/** biome-ignore lint/performance/noBarrelFile: shared Playwright fixture entrypoint */
export { expect } from "@playwright/test";
