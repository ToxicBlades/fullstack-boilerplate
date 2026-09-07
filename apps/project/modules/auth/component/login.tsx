"use client";

import { Button } from "@project/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@project/design-system/components/ui/card";
import { Input } from "@project/design-system/components/ui/input";
import { Label } from "@project/design-system/components/ui/label";
import { useCallback, useState } from "react";
import { signIn } from "../actions/auth";
import type { LoginProperties } from "../types/login-properties";

export function Login({ onLogin }: LoginProperties) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const submit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setBusy(true);
      setError(null);
      try {
        const result = await signIn(email, password);
        if (!(result.success && result.data)) {
          throw new Error(
            result.errorMessage ?? "Session could not be loaded."
          );
        }
        onLogin(result.data);
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : "Unable to sign in.");
      } finally {
        setBusy(false);
      }
    },
    [email, onLogin, password]
  );
  const handleEmailChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setEmail(event.target.value),
    []
  );
  const handlePasswordChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setPassword(event.target.value),
    []
  );
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f7fb] px-6 py-12">
      <Card className="w-full max-w-md border-slate-200 shadow-slate-200/60 shadow-xl">
        <CardHeader className="gap-3 pb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 font-semibold text-lg text-white">
            A
          </div>
          <div>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>
              Sign in to manage your items and documents.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" onSubmit={submit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                onChange={handleEmailChange}
                placeholder="you@example.com"
                required
                type="email"
                value={email}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                onChange={handlePasswordChange}
                placeholder="Your password"
                required
                type="password"
                value={password}
              />
            </div>
            {error && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-red-700 text-sm">
                {error}
              </p>
            )}
            <Button className="h-11 w-full" disabled={busy}>
              {busy ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
