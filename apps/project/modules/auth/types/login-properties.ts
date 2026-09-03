import type { AuthUser } from "./auth-user";
export interface LoginProperties {
  onLogin: (user: AuthUser) => void;
}
