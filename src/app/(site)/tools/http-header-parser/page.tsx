'use client';

import { useMemo, useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Textarea } from '@/components/ui/inputs/textarea';

function parseHeaders(raw: string) {
  const lines = raw.replace(/\r\n/g, '\n').split('\n');
  const out: Record<string, string | string[]> = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const idx = trimmed.indexOf(':');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    const existing = out[key];
    if (existing === undefined) out[key] = value;
    else if (Array.isArray(existing)) existing.push(value);
    else out[key] = [existing, value];
  }
  return out;
}

export default function HttpHeaderParserPage() {
  const [input, setInput] = useState('');
  const parsed = useMemo(() => (input.trim() ? parseHeaders(input) : null), [input]);

  return (
    <ToolLayout
      title="HTTP Header Parser"
      description="Parse raw HTTP headers into key/value pairs."
      slug="http-header-parser"
      whatIs={<p>Turns pasted HTTP headers into a structured object. Duplicate headers are stored as arrays.</p>}
      exampleUsage={
        <pre className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm overflow-x-auto">{`Content-Type: application/json\nSet-Cookie: a=1\nSet-Cookie: b=2`}</pre>
      }
      howToUse={
        <>
          <p className="mb-2">1. Paste raw headers (one per line).</p>
          <p>2. Parsed output updates automatically.</p>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Raw headers
          </label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={'Content-Type: application/json\nAuthorization: Bearer ...'}
            rows={8}
            className="font-mono text-sm"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Parsed output (JSON)
          </label>
          <pre className="min-h-[160px] w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
            {parsed ? JSON.stringify(parsed, null, 2) : 'Parsed headers will appear here.'}
          </pre>
        </div>
      </div>
    </ToolLayout>
  );
}

