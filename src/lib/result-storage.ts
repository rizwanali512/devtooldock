/**
 * In-memory storage for shareable tool results.
 * Replace with a database or persistent store in production.
 */

export type StoredResult = {
  id: string;
  toolSlug: string;
  input: string;
  output: string;
  createdAt: number;
};

const store = new Map<string, StoredResult>();

export function addResult(toolSlug: string, input: string, output: string): string {
  const id = crypto.randomUUID().replace(/-/g, '').slice(0, 12);
  store.set(id, {
    id,
    toolSlug,
    input,
    output,
    createdAt: Date.now(),
  });
  return id;
}

export function getResult(id: string): StoredResult | null {
  return store.get(id) ?? null;
}
