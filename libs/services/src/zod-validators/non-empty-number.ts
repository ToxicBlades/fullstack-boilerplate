import { makeValidator } from "envalid";

const isCI = process.env.NODE_ENV === "production";

export const NotEmptyNumberValidator = makeValidator((x: string) => {
  const num = Number(x);

  if (!Number.isNaN(num) && x.trim() !== "") {
    return num;
  }

  if (isCI) {
    return num;
  }

  throw new Error("Expected a valid number");
});
