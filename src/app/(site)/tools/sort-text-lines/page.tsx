'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Textarea } from '@/components/ui/inputs/textarea';

export default function SortTextLinesPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [desc, setDesc] = useState(false);

  const sort = () => {
    const lines = input.split('\n');
    lines.sort((a, b) => (desc ? b.localeCompare(a) : a.localeCompare(b)));
    setOutput(lines.join('\n'));
  };

  return (
    <ToolLayout
      title="Sort Text Lines"
      description="Sort lines of text alphabetically (A–Z or Z–A)."
      slug="sort-text-lines"
      whatIs={<p>Sorts lines in alphabetical order. Choose ascending (A–Z) or descending (Z–A).</p>}
      howToUse={
        <>
          <p className="mb-2">1. Paste text with one line per row.</p>
          <p>2. Choose sort order and click Sort.</p>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Input</label>
          <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Banana\nApple\nCherry" rows={8} className="font-mono text-sm" />
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <input type="checkbox" checked={desc} onChange={(e) => setDesc(e.target.checked)} />
            Z–A (descending)
          </label>
          <button type="button" onClick={sort} className="px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition">
            Sort
          </button>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Output</label>
          <pre className="min-h-[120px] w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
            {output || 'Sorted lines will appear here.'}
          </pre>
        </div>
      </div>
    </ToolLayout>
  );
}
