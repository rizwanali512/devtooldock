'use client';

import { useState, useCallback, useEffect } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Textarea } from '@/components/ui/inputs/textarea';

export default function WordCounterPage() {
  const [input, setInput] = useState('');
  const [stats, setStats] = useState({ words: 0, chars: 0, lines: 0 });

  const update = useCallback(() => {
    const trimmed = input.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    setStats({
      words,
      chars: input.length,
      lines: input ? input.split('\n').length : 0,
    });
  }, [input]);

  useEffect(() => {
    update();
  }, [update]);

  return (
    <ToolLayout
      title="Word Counter"
      description="Count words, characters, and lines in text."
      slug="word-counter"
      whatIs={<p>Counts the number of words (space-separated), characters, and lines in the given text. Updates as you type.</p>}
      howToUse={
        <>
          <p className="mb-2">1. Type or paste text in the box.</p>
          <p>2. Word count, character count, and line count update automatically.</p>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Text</label>
          <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter or paste text..." rows={8} className="font-mono text-sm" />
        </div>
        <div className="grid grid-cols-3 gap-4 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4">
          <div>
            <div className="text-2xl font-bold text-primary-500">{stats.words}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Words</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-500">{stats.chars}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Characters</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-500">{stats.lines}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Lines</div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
