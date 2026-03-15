'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Textarea } from '@/components/ui/inputs/textarea';

function convertDelimited(input: string, from: ',' | '\t', to: ',' | '\t'): string {
  const lines = input.replace(/\r\n/g, '\n').split('\n');
  return lines
    .map((line) => {
      if (!line) return '';
      const parts = line.split(from).map((p) => p.trim());
      // basic CSV quoting
      return parts
        .map((v) => (to === ',' && /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v))
        .join(to);
    })
    .join('\n');
}

export default function TsvToCsvPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const convert = () => setOutput(input ? convertDelimited(input, '\t', ',') : '');

  return (
    <ToolLayout
      title="TSV to CSV"
      description="Convert tab-separated values (TSV) to comma-separated values (CSV)."
      slug="tsv-to-csv"
      whatIs={<p>CSV uses commas instead of tabs. This can be required for uploads or tools that expect CSV specifically.</p>}
      exampleUsage={
        <pre className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm overflow-x-auto">{`Input: name\\tage\nAda\\t37\n\nOutput: name,age\nAda,37`}</pre>
      }
      howToUse={
        <>
          <p className="mb-2">1. Paste TSV text into the input.</p>
          <p>2. Click Convert to get CSV output.</p>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            TSV input
          </label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onBlur={convert}
            placeholder={'name\tage\nAda\t37'}
            rows={7}
            className="font-mono text-sm"
          />
        </div>
        <button
          type="button"
          onClick={convert}
          className="px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition"
        >
          Convert to CSV
        </button>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            CSV output
          </label>
          <pre className="min-h-[120px] w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
            {output || 'CSV will appear here.'}
          </pre>
        </div>
      </div>
    </ToolLayout>
  );
}

