'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Textarea } from '@/components/ui/inputs/textarea';

function convertDelimited(input: string, from: ',' | '\t', to: ',' | '\t'): string {
  const lines = input.replace(/\r\n/g, '\n').split('\n');
  return lines
    .map((line) => {
      if (!line) return '';
      const parts = line.split(from).map((p) => p.trim().replace(/^"|"$/g, ''));
      return parts.join(to);
    })
    .join('\n');
}

export default function CsvToTsvPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const convert = () => setOutput(input ? convertDelimited(input, ',', '\t') : '');

  return (
    <ToolLayout
      title="CSV to TSV"
      description="Convert comma-separated values (CSV) to tab-separated values (TSV)."
      slug="csv-to-tsv"
      whatIs={<p>TSV uses tabs instead of commas. This can be easier to paste into spreadsheets or tools that treat commas as data.</p>}
      exampleUsage={
        <pre className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm overflow-x-auto">{`Input: name,age\nAda,37\n\nOutput: name\\tage\nAda\\t37`}</pre>
      }
      howToUse={
        <>
          <p className="mb-2">1. Paste CSV text into the input.</p>
          <p>2. Click Convert to get TSV output.</p>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            CSV input
          </label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onBlur={convert}
            placeholder={'name,age\nAda,37'}
            rows={7}
            className="font-mono text-sm"
          />
        </div>
        <button
          type="button"
          onClick={convert}
          className="px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition"
        >
          Convert to TSV
        </button>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            TSV output
          </label>
          <pre className="min-h-[120px] w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
            {output || 'TSV will appear here.'}
          </pre>
        </div>
      </div>
    </ToolLayout>
  );
}

