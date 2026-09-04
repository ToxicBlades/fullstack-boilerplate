"use server";

import { authService } from "@project/services/server";
import { cookies } from "next/headers";
import { sessionOptions } from "../lib/session-options";

const apiBase = process.env.BACK_API_BASE_URL ?? "http://localhost:3001/api";

function applyCookies(
  headers: string[],
  store: Awaited<ReturnType<typeof cookies>>
) {
  for (const header of headers) {
    const [cookie] = header.split(";");
    const separator = cookie.indexOf("=");
    if (separator < 1) {
      continue;
    }
    const name = cookie.slice(0, separator).trim();
    const value = cookie.slice(separator + 1).trim();
    if (value) {
      store.set(name, value);
    } else {
      store.delete(name);
    }
  }
}

export async function signIn(email: string, password: string) {
  const response = await fetch(`${apiBase}/auth/sign-in/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const result = await response.json().catch(() => null);
  if (!response.ok) {
    return {
      data: null,
      success: false,
      status: response.status,
      errorMessage: result?.message ?? "Unable to sign in.",
    };
  }
  const setCookies = response.headers.getSetCookie?.() ?? [];
  applyCookies(setCookies, await cookies());
  return authService.me({
    init: {
      headers: {
        cookie: setCookies.map((value) => value.split(";")[0]).join("; "),
      },
    },
  });
}

export async function signOut() {
  const response = await fetch(`${apiBase}/auth/sign-out`, {
    method: "POST",
    headers: (await sessionOptions()).init.headers,
  });
  applyCookies(response.headers.getSetCookie?.() ?? [], await cookies());
}
