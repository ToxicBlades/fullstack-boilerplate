import dotenv from "dotenv";
import { cleanEnv, str } from "envalid";

try {
  dotenv.config();
} catch {
  // Loading dotenv is optional for browser and mobile bundles.
}

export const envShared = cleanEnv(
  { BACK_API_BASE_URL: process.env.BACK_API_BASE_URL },
  {
    BACK_API_BASE_URL: str({
      devDefault: "http://localhost:3010/api",
    }),
  }
);
