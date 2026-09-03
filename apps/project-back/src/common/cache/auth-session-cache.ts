import { createHash } from "node:crypto";
import type { Request } from "express";
import {
  shortTtlCacheDelete,
  shortTtlCacheGet,
  shortTtlCacheSet,
} from "@/common/cache/short-ttl-cache";
import { env } from "@/config/env";

export interface CachedAuthUser {
  email: string;
  fullName: string;
  id: string;
}
function key(req: Request): string | null {
  const token = req.header("authorization") ?? req.header("cookie");
  return token
    ? `auth:${createHash("sha256").update(token).digest("hex")}`
    : null;
}
export function getCachedAuthUser(req: Request) {
  const k = key(req);
  return k ? shortTtlCacheGet<CachedAuthUser>(k) : null;
}
export async function setCachedAuthUser(req: Request, user: CachedAuthUser) {
  const k = key(req);
  if (k) {
    await shortTtlCacheSet(k, user, env.AUTH_SESSION_CACHE_TTL_MS);
  }
}
export async function invalidateCachedAuthUser(req: Request) {
  const k = key(req);
  if (k) {
    await shortTtlCacheDelete(k);
  }
}
