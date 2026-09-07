interface Entry {
  expiresAt: number;
  value: unknown;
}
const cache = new Map<string, Entry>();

export function shortTtlCacheGet<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry || entry.expiresAt <= Date.now()) {
    cache.delete(key);
    return null;
  }
  return entry.value as T;
}
export function shortTtlCacheSet(
  key: string,
  value: unknown,
  ttlMs: number
): Promise<void> {
  cache.set(key, { expiresAt: Date.now() + ttlMs, value });
  return Promise.resolve();
}
export function shortTtlCacheDelete(key: string): void {
  cache.delete(key);
}
