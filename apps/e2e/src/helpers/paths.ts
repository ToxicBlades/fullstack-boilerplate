import path from "node:path";
import { fileURLToPath } from "node:url";

const E2E_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../.."
);

export const SAMPLE_DOCUMENT = path.join(
  E2E_ROOT,
  "fixtures",
  "sample-avatar.png"
);
