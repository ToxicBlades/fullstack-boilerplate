"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { Login } from "../../modules/auth/component/login";

export default function AuthPage() {
  const router = useRouter();
  const handleLogin = useCallback(() => router.replace("/"), [router]);

  return <Login onLogin={handleLogin} />;
}
