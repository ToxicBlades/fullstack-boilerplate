"use client";

import { useRouter } from "next/navigation";
import { Login } from "../../modules/auth/component/login";

export default function AuthPage() {
  const router = useRouter();
  return <Login onLogin={() => router.replace("/")} />;
}
