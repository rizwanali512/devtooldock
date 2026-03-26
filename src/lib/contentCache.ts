// Simple in-memory cache.
//
// Important: This module is imported by some Client Components, so it must remain
// browser-safe (no `node:*` imports or `fs/path` requires).
const contentCache = new Map<string, unknown>();

export function getCachedContent<T>(key: string): T | undefined {
  return contentCache.get(key) as T | undefined;
}

export function setCachedContent<T>(key: string, value: T): void {
  contentCache.set(key, value);
}

