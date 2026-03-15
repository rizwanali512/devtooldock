'use client';

import { useMemo, useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ToolExample, ToolFaq } from '@/components/tools/ToolSeoBlocks';

const STATUS_CODES: Record<number, string> = {
  100: 'Continue',
  101: 'Switching Protocols',
  102: 'Processing',
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  207: 'Multi-Status',
  300: 'Multiple Choices',
  301: 'Moved Permanently',
  302: 'Found',
  303: 'See Other',
  304: 'Not Modified',
  305: 'Use Proxy',
  307: 'Temporary Redirect',
  308: 'Permanent Redirect',
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  422: 'Unprocessable Entity',
  429: 'Too Many Requests',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
};

export default function HttpStatusCodeLookupPage() {
  const [input, setInput] = useState('404');

  const code = useMemo(() => {
    const n = parseInt(input.trim(), 10);
    return Number.isNaN(n) ? null : n;
  }, [input]);

  const info = code !== null ? STATUS_CODES[code] : null;

  return (
    <ToolLayout
      title="HTTP Status Code Lookup"
      description="Look up HTTP status codes and their meanings."
      slug="http-status-code-lookup"
      whatIs={
        <>
          <p>Enter a status code (e.g. 200, 404, 500) to see its standard meaning.</p>
          <ToolFaq />
        </>
      }
      howToUse={
        <ol className="list-decimal pl-5 space-y-1">
          <li>Enter a numeric HTTP status code</li>
          <li>See the official reason phrase</li>
        </ol>
      }
      exampleUsage={<ToolExample input="404" output="Not Found" />}
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Status code</label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full max-w-xs rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono"
            placeholder="e.g. 200, 404, 500"
          />
        </div>
        <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm">
          {code === null ? (
            <span className="text-gray-500 dark:text-gray-400">Enter a valid number (e.g. 200, 404).</span>
          ) : info ? (
            <>
              <span className="font-mono font-medium">{code}</span>
              <span className="text-gray-600 dark:text-gray-300"> — {info}</span>
            </>
          ) : (
            <span className="text-gray-500 dark:text-gray-400">Unknown status code. Try 200, 301, 404, 500.</span>
          )}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Common codes</label>
          <div className="flex flex-wrap gap-2 text-sm">
            {[200, 201, 301, 302, 400, 401, 403, 404, 500, 502, 503].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setInput(String(c))}
                className="rounded-xl border border-gray-300 dark:border-gray-700 px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-white/10"
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
