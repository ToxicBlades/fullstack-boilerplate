import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import type { Page, TestInfo } from "@playwright/test";

const FAILURE_DIR = path.join(process.cwd(), "screenshots", "failures");

function safeFileName(testInfo: TestInfo): string {
  return [testInfo.project.name, ...testInfo.titlePath.slice(1)]
    .join(" -- ")
    .replace(/[^\w.-]+/g, "_")
    .replace(/_+/g, "_")
    .slice(0, 180);
}

/** Saves a full-page failure screenshot both on disk and in the HTML report. */
export async function captureFailureScreenshot(
  page: Page,
  testInfo: TestInfo
): Promise<void> {
  if (testInfo.status === testInfo.expectedStatus) {
    return;
  }

  let screenshot: Buffer;
  try {
    screenshot = await page.screenshot({ fullPage: true, timeout: 10_000 });
  } catch {
    return;
  }

  await testInfo.attach("failure-screenshot", {
    body: screenshot,
    contentType: "image/png",
  });

  const directory = path.join(FAILURE_DIR, testInfo.project.name);
  await mkdir(directory, { recursive: true });
  await writeFile(
    path.join(directory, `${safeFileName(testInfo)}.png`),
    screenshot
  );
}
