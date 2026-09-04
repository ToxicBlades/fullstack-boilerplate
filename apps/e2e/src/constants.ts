export const E2E_USER = {
  email: process.env.E2E_USER_EMAIL ?? "demo@example.com",
  password: process.env.E2E_USER_PASSWORD ?? "demo@example.com",
} as const;

export const DASHBOARD_HEADING = /Good to see you/i;
