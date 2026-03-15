'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Textarea } from '@/components/ui/inputs/textarea';
import { CopyToClipboard } from '@/components/copy-to-clipboard';

function csvToJson(csv: string): string {
  const lines = csv.trim().split('\n');
  if (lines.length === 0) return '[]';
  const headers = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, ''));
  const arr = lines.slice(1).map((line) => {
    const values = line.split(',').map((v) => v.trim().replace(/^"|"$/g, ''));
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => {
      obj[h] = values[i] ?? '';
    });
    return obj;
  });
  return JSON.stringify(arr, null, 2);
}

export default function CsvToJsonPage() {
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
      setOutput(csvToJson(input));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid CSV');
      setOutput('');
    }
  };

  return (
    <ToolLayout
      title="CSV to JSON"
      description="Convert CSV text to a JSON array."
      slug="csv-to-json"
      whatIs={<p>Parses CSV with a header row and converts each row into an object. Output is a JSON array of objects.</p>}
      howToUse={
        <>
          <p className="mb-2">1. Paste CSV with a header row in the first line.</p>
          <p>2. Click Convert. Each row becomes a JSON object with keys from the header.</p>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">CSV</label>
          <Textarea value={input} onChange={(e) => setInput(e.target.value)} onBlur={convert} placeholder="name,age\nJohn,30" rows={6} className="font-mono text-sm" />
        </div>
        <button type="button" onClick={convert} className="px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition">
          Convert to JSON
        </button>
        <div>
          <div className="mb-2 flex items-center justify-between gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">JSON output</label>
            {output ? (
              <CopyToClipboard text={output} toastMessage="Copied to clipboard" />
            ) : null}
          </div>
          <div className={`min-h-[120px] w-full rounded-2xl border px-4 py-4 text-sm font-mono whitespace-pre-wrap ${error ? 'border-error-500 bg-error-50 dark:bg-error-500/10 text-error-600' : 'border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-800 dark:text-gray-200'}`}>
            {error || output || 'JSON will appear here.'}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
