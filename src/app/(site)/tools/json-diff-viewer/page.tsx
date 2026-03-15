'use client';

import { useMemo, useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Textarea } from '@/components/ui/inputs/textarea';

type DiffItem = { path: string; type: 'added' | 'removed' | 'changed'; a?: unknown; b?: unknown };

function diffJson(a: unknown, b: unknown, path: string[] = []): DiffItem[] {
  if (Object.is(a, b)) return [];

  const isObj = (v: unknown) => v !== null && typeof v === 'object';
  if (!isObj(a) || !isObj(b)) {
    return [{ path: path.join('.'), type: 'changed', a, b }];
  }

  const aIsArr = Array.isArray(a);
  const bIsArr = Array.isArray(b);
  if (aIsArr !== bIsArr) {
    return [{ path: path.join('.'), type: 'changed', a, b }];
  }

  const out: DiffItem[] = [];
  const keys = new Set<string>();
  for (const k of Object.keys(a as Record<string, unknown>)) keys.add(k);
  for (const k of Object.keys(b as Record<string, unknown>)) keys.add(k);

  for (const k of Array.from(keys).sort()) {
    const av = (a as Record<string, unknown>)[k];
    const bv = (b as Record<string, unknown>)[k];
    if (av === undefined && bv !== undefined) out.push({ path: [...path, k].join('.'), type: 'added', b: bv });
    else if (av !== undefined && bv === undefined) out.push({ path: [...path, k].join('.'), type: 'removed', a: av });
    else out.push(...diffJson(av, bv, [...path, k]));
  }
  return out;
}

export default function JsonDiffViewerPage() {
  const [left, setLeft] = useState('');
  const [right, setRight] = useState('');
  const [error, setError] = useState<string | null>(null);

  const diffs = useMemo(() => {
    if (!left.trim() && !right.trim()) {
      setError(null);
      return [];
    }
    try {
      const a = left.trim() ? JSON.parse(left) : null;
      const b = right.trim() ? JSON.parse(right) : null;
      setError(null);
      return diffJson(a, b);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      return [];
    }
  }, [left, right]);

  return (
    <ToolLayout
      title="JSON Diff Viewer"
      description="Compare two JSON documents and list added/removed/changed paths."
      slug="json-diff-viewer"
      whatIs={<p>Shows a simple structural diff between two JSON objects. Differences are reported by path and type (added/removed/changed).</p>}
      exampleUsage={<p>Paste two JSON objects to see what keys changed between versions.</p>}
      howToUse={
        <>
          <p className="mb-2">1. Paste JSON A and JSON B.</p>
          <p>2. The diff list updates automatically.</p>
        </>
      }
    >
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              JSON A
            </label>
            <Textarea value={left} onChange={(e) => setLeft(e.target.value)} rows={8} className="font-mono text-sm" placeholder='{"a":1,"b":2}' />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              JSON B
            </label>
            <Textarea value={right} onChange={(e) => setRight(e.target.value)} rows={8} className="font-mono text-sm" placeholder='{"a":1,"b":3,"c":4}' />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Differences
          </label>
          <div
            className={`min-h-[160px] w-full rounded-2xl border px-4 py-4 text-sm ${
              error
                ? 'border-error-500 bg-error-50 dark:bg-error-500/10 text-error-600'
                : 'border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-800 dark:text-gray-200'
            }`}
          >
            {error ? (
              error
            ) : diffs.length ? (
              <ul className="space-y-2">
                {diffs.map((d, i) => (
                  <li key={i} className="font-mono text-sm">
                    <span className="text-gray-500 dark:text-gray-400">{d.type.toUpperCase()}</span>{' '}
                    <span>{d.path || '(root)'}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No differences detected.</p>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}

