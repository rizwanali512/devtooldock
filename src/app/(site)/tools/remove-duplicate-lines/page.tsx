'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Textarea } from '@/components/ui/inputs/textarea';

export default function RemoveDuplicateLinesPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const remove = () => {
    const lines = input.split('\n');
    const seen = new Set<string>();
    const result: string[] = [];
    for (const line of lines) {
      if (!seen.has(line)) {
        seen.add(line);
        result.push(line);
      }
    }
    setOutput(result.join('\n'));
  };

  return (
    <ToolLayout
      title="Remove Duplicate Lines"
      description="Remove duplicate lines from text. Keeps first occurrence."
      slug="remove-duplicate-lines"
      whatIs={<p>Takes text with one line per row and removes duplicate lines, keeping the first occurrence of each.</p>}
      howToUse={
        <>
          <p className="mb-2">1. Paste text (one item per line) in the input.</p>
          <p>2. Click Remove duplicates. Result shows unique lines in order.</p>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Input</label>
          <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Line 1\nLine 2\nLine 1" rows={8} className="font-mono text-sm" />
        </div>
        <button type="button" onClick={remove} className="px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition">
          Remove duplicates
        </button>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Output</label>
          <pre className="min-h-[120px] w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
            {output || 'Result will appear here.'}
          </pre>
        </div>
      </div>
    </ToolLayout>
  );
}
