const STORAGE_KEY = 'devtooldock-recent-tools';
const MAX_RECENT = 5;

export function getRecentToolSlugs(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.slice(0, MAX_RECENT) : [];
  } catch {
    return [];
  }
}

export function addRecentTool(slug: string): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getRecentToolSlugs();
    const next = [slug, ...current.filter((s) => s !== slug)].slice(0, MAX_RECENT);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
}
