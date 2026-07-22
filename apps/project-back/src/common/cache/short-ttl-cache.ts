interface Entry {
  expiresAt: number;
  value: unknown;
}
const cache = new Map<string, Entry>();

export async function shortTtlCacheGet<T>(key: string): Promise<T | null> {
  const entry = cache.get(key);
  if (!entry || entry.expiresAt <= Date.now()) {
    cache.delete(key);
    return null;
  }
  return entry.value as T;
}
export async function shortTtlCacheSet(
  key: string,
  value: unknown,
  ttlMs: number
): Promise<void> {
  cache.set(key, { value, expiresAt: Date.now() + ttlMs });
}
export async function shortTtlCacheDelete(key: string): Promise<void> {
  cache.delete(key);
}
