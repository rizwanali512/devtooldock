'use client';

import { useMemo, useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ToolExample, ToolFaq } from '@/components/tools/ToolSeoBlocks';

export default function TextReverserPage() {
  const [input, setInput] = useState('Hello world');

  const reversed = useMemo(() => input.split('').reverse().join(''), [input]);

  return (
    <ToolLayout
      title="Text Reverser"
      description="Reverse text character by character."
      slug="text-reverser"
      whatIs={
        <>
          <p>Paste or type text and get the same text with characters in reverse order.</p>
          <ToolFaq />
        </>
      }
      howToUse={
        <ol className="list-decimal pl-5 space-y-1">
          <li>Enter or paste text</li>
          <li>Reversed output updates instantly</li>
        </ol>
      }
      exampleUsage={<ToolExample input="Hello" output="olleH" />}
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={3}
            className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90"
            placeholder="Enter text"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Reversed</label>
          <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-all">
            {reversed || '—'}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
