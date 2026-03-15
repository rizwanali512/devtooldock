'use client';

import { useMemo, useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';

function parseUrl(input: string) {
  const raw = input.trim();
  if (!raw) return null;
  const withProto = /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(raw) ? raw : `https://${raw}`;
  const u = new URL(withProto);
  const params: Record<string, string | string[]> = {};
  u.searchParams.forEach((v, k) => {
    const existing = params[k];
    if (existing === undefined) params[k] = v;
    else if (Array.isArray(existing)) existing.push(v);
    else params[k] = [existing, v];
  });
  return {
    href: u.href,
    protocol: u.protocol,
    username: u.username,
    password: u.password ? '***' : '',
    host: u.host,
    hostname: u.hostname,
    port: u.port,
    pathname: u.pathname,
    search: u.search,
    hash: u.hash,
    origin: u.origin,
    query: params,
  };
}

export default function UrlParserPage() {
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const parsed = useMemo(() => {
    if (!input.trim()) {
      setError(null);
      return null;
    }
    try {
      const v = parseUrl(input);
      setError(null);
      return v;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid URL');
      return null;
    }
  }, [input]);

  return (
    <ToolLayout
      title="URL Parser"
      description="Parse URLs into components and query params."
      slug="url-parser"
      whatIs={<p>Breaks a URL into its parts (protocol, host, path, query parameters). Helpful when debugging redirects, OAuth callbacks, and query strings.</p>}
      exampleUsage={
        <pre className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm overflow-x-auto">{`Input: https://example.com/a/b?x=1&x=2#top\nOutput: protocol/host/path/query/hash`}</pre>
      }
      howToUse={
        <>
          <p className="mb-2">1. Paste a URL (with or without https://).</p>
          <p>2. Parsed output updates as you type.</p>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            URL
          </label>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="https://example.com/path?x=1"
            className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Parsed output (JSON)
          </label>
          <div
            className={`min-h-[160px] w-full rounded-2xl border px-4 py-4 text-sm font-mono whitespace-pre-wrap ${
              error
                ? 'border-error-500 bg-error-50 dark:bg-error-500/10 text-error-600'
                : 'border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-800 dark:text-gray-200'
            }`}
          >
            {error ||
              (parsed ? JSON.stringify(parsed, null, 2) : 'Parsed URL will appear here.')}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}

