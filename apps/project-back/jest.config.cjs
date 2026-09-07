"use strict";
/** @type {import('jest').Config} */
module.exports = {
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  preset: "ts-jest/presets/default-esm",
  roots: ["<rootDir>/src"],
  setupFiles: ["<rootDir>/src/__tests__/jest-setup.ts"],
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.ts"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      { tsconfig: "<rootDir>/tsconfig.jest.json", useESM: true },
    ],
  },
};
