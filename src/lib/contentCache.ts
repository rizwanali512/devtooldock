import 'server-only';

// Simple in-memory cache (per server instance).
const contentCache = new Map<string, unknown>();

// Optional persistent cache (best-effort; may not work on serverless).
let fileCacheLoaded = false;
let persistTimer: NodeJS.Timeout | null = null;
const FILE_PATH = `${process.cwd()}/cache/content.json`;

function loadFileCacheOnceSync() {
  if (fileCacheLoaded) return;
  fileCacheLoaded = true;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require('node:fs') as typeof import('node:fs');
    if (!fs.existsSync(FILE_PATH)) return;
    const raw = fs.readFileSync(FILE_PATH, 'utf8');
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    for (const [k, v] of Object.entries(parsed)) {
      if (!contentCache.has(k)) contentCache.set(k, v);
    }
  } catch {
    // ignore
  }
}

function schedulePersistSync() {
  if (persistTimer) return;
  persistTimer = setTimeout(() => {
    persistTimer = null;
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const fs = require('node:fs') as typeof import('node:fs');
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const path = require('node:path') as typeof import('node:path');
      fs.mkdirSync(path.dirname(FILE_PATH), { recursive: true });
      const obj: Record<string, unknown> = {};
      for (const [k, v] of contentCache.entries()) obj[k] = v;
      fs.writeFileSync(FILE_PATH, JSON.stringify(obj, null, 2), 'utf8');
    } catch {
      // ignore
    }
  }, 250);
}

export function getCachedContent<T>(key: string): T | undefined {
  loadFileCacheOnceSync();
  return contentCache.get(key) as T | undefined;
}

export function setCachedContent<T>(key: string, value: T): void {
  loadFileCacheOnceSync();
  contentCache.set(key, value);
  schedulePersistSync();
}

