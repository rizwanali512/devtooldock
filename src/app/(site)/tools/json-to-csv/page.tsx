'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Textarea } from '@/components/ui/inputs/textarea';
import { CopyToClipboard } from '@/components/copy-to-clipboard';

function jsonToCsv(jsonStr: string): string {
  const arr = JSON.parse(jsonStr);
  if (!Array.isArray(arr) || arr.length === 0) return '';
  const keys = Object.keys(arr[0] as object);
  const header = keys.join(',');
  const rows = arr.map((row: Record<string, unknown>) => keys.map((k) => JSON.stringify(String((row as Record<string, unknown>)[k] ?? ''))).join(','));
  return [header, ...rows].join('\n');
}

export default function JsonToCsvPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const convert = () => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }
    try {
      setOutput(jsonToCsv(input));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON array');
      setOutput('');
    }
  };

  return (
    <ToolLayout
      title="JSON to CSV"
      description="Convert a JSON array to CSV format."
      slug="json-to-csv"
      whatIs={<p>Converts an array of JSON objects into CSV text. The first object&apos;s keys become the header row.</p>}
      howToUse={
        <>
          <p className="mb-2">1. Paste a JSON array (e.g. [{"{ \"a\": 1 }"}, ...]) in the input.</p>
          <p>2. Click Convert. The CSV output uses the first object&apos;s keys as columns.</p>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">JSON array</label>
          <Textarea value={input} onChange={(e) => setInput(e.target.value)} onBlur={convert} placeholder='[{"name":"A","value":1},{"name":"B","value":2}]' rows={6} className="font-mono text-sm" />
        </div>
        <button type="button" onClick={convert} className="px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition">
          Convert to CSV
        </button>
        <div>
          <div className="mb-2 flex items-center justify-between gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">CSV output</label>
            {output ? (
              <CopyToClipboard text={output} toastMessage="Copied to clipboard" />
            ) : null}
          </div>
          <div className={`min-h-[120px] w-full rounded-2xl border px-4 py-4 text-sm font-mono whitespace-pre-wrap ${error ? 'border-error-500 bg-error-50 dark:bg-error-500/10 text-error-600' : 'border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-800 dark:text-gray-200'}`}>
            {error || output || 'CSV will appear here.'}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
