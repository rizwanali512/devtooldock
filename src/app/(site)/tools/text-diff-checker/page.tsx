'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Textarea } from '@/components/ui/inputs/textarea';

export default function TextDiffCheckerPage() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [output, setOutput] = useState('');

  const diff = () => {
    const linesA = a.split('\n');
    const linesB = b.split('\n');
    const out: string[] = [];
    const max = Math.max(linesA.length, linesB.length);
    for (let i = 0; i < max; i++) {
      const la = linesA[i] ?? '';
      const lb = linesB[i] ?? '';
      if (la === lb) out.push(`  ${la || ' '}`);
      else {
        if (la) out.push(`- ${la}`);
        if (lb) out.push(`+ ${lb}`);
      }
    }
    setOutput(out.join('\n'));
  };

  return (
    <ToolLayout
      title="Text Diff Checker"
      description="Compare two texts line by line and see differences."
      slug="text-diff-checker"
      whatIs={<p>Shows a simple line-by-line diff: lines only in the first text are prefixed with -, lines only in the second with +, same lines with a space.</p>}
      howToUse={
        <>
          <p className="mb-2">1. Paste the first text in the left box and the second in the right.</p>
          <p>2. Click Compare to see the diff below.</p>
        </>
      }
    >
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Text 1</label>
            <Textarea value={a} onChange={(e) => setA(e.target.value)} placeholder="First text" rows={6} className="font-mono text-sm" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Text 2</label>
            <Textarea value={b} onChange={(e) => setB(e.target.value)} placeholder="Second text" rows={6} className="font-mono text-sm" />
          </div>
        </div>
        <button type="button" onClick={diff} className="px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition">
          Compare
        </button>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Diff (- line 1 only, + line 2 only)</label>
          <pre className="min-h-[120px] w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
            {output || 'Diff will appear here.'}
          </pre>
        </div>
      </div>
    </ToolLayout>
  );
}
