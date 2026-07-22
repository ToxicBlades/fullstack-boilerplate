import { makeValidator } from "envalid";

// allow empty string during ci for ignoring build errors
const isCI = process.env.NODE_ENV === "production";

const URL_REGEX = /^https?:\/\//;

export const URLValidator = makeValidator((x: string) => {
  if (isCI) {
    return x;
  }
  if (!x) {
    throw new Error("Expected not empty string");
  }
  if (URL_REGEX.test(x)) {
    return x;
  }
  throw new Error("Expected URL to start with http or https");
});
