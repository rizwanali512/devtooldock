'use client';

import { useMemo, useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ToolExample, ToolFaq } from '@/components/tools/ToolSeoBlocks';

function parseQueryString(q: string): Record<string, string | string[]> {
  const params: Record<string, string | string[]> = {};
  const raw = q.replace(/^\?/, '').trim();
  if (!raw) return params;
  for (const part of raw.split('&')) {
    const [k, ...vParts] = part.split('=');
    const key = decodeURIComponent(k || '');
    const val = decodeURIComponent(vParts.join('=').replace(/\+/g, ' '));
    if (!key) continue;
    const existing = params[key];
    if (existing === undefined) params[key] = val;
    else if (Array.isArray(existing)) existing.push(val);
    else params[key] = [existing, val];
  }
  return params;
}

export default function QueryStringParserPage() {
  const [input, setInput] = useState('?foo=bar&baz=qux&foo=dup');

  const parsed = useMemo(() => parseQueryString(input), [input]);

  return (
    <ToolLayout
      title="Query String Parser"
      description="Parse URL query strings into key-value pairs."
      slug="query-string-parser"
      whatIs={
        <>
          <p>Paste a query string (with or without leading ?) to see parsed key-value pairs. Duplicate keys are shown as arrays.</p>
          <ToolFaq />
        </>
      }
      howToUse={
        <ol className="list-decimal pl-5 space-y-1">
          <li>Paste a query string (e.g. from a URL)</li>
          <li>View decoded keys and values</li>
        </ol>
      }
      exampleUsage={<ToolExample input="?foo=bar&baz=qux" output="foo: bar, baz: qux" />}
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Query string</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={3}
            className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono"
            placeholder="?key=value&other=thing"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Parsed</label>
          <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm space-y-2">
            {Object.keys(parsed).length === 0 ? (
              <span className="text-gray-500 dark:text-gray-400">Enter a query string above.</span>
            ) : (
              Object.entries(parsed).map(([k, v]) => (
                <div key={k} className="font-mono">
                  <span className="text-gray-500 dark:text-gray-400">{k}:</span>{' '}
                  {Array.isArray(v) ? v.join(', ') : v}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
