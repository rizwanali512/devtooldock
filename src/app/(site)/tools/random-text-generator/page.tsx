'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ToolExample, ToolFaq } from '@/components/tools/ToolSeoBlocks';

const WORDS = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'.split(' ');

function randomWords(count: number): string {
  const out: string[] = [];
  for (let i = 0; i < count; i++) out.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
  return out.join(' ');
}

function randomParagraphs(numParagraphs: number, wordsPerParagraph: number): string {
  return Array.from({ length: numParagraphs }, () => randomWords(wordsPerParagraph)).join('\n\n');
}

export default function RandomTextGeneratorPage() {
  const [mode, setMode] = useState<'words' | 'paragraphs'>('paragraphs');
  const [count, setCount] = useState(3);
  const [wordsPerBlock, setWordsPerBlock] = useState(40);
  const [output, setOutput] = useState('');

  const generate = () => {
    if (mode === 'words') {
      setOutput(randomWords(count));
    } else {
      setOutput(randomParagraphs(count, wordsPerBlock));
    }
  };

  return (
    <ToolLayout
      title="Random Text Generator"
      description="Generate random words or paragraphs for placeholders."
      slug="random-text-generator"
      whatIs={
        <>
          <p>Generate lorem-style random text by word count or as multiple paragraphs.</p>
          <ToolFaq />
        </>
      }
      howToUse={
        <ol className="list-decimal pl-5 space-y-1">
          <li>Choose words or paragraphs</li>
          <li>Set count and (for paragraphs) words per paragraph</li>
          <li>Click Generate and copy</li>
        </ol>
      }
      exampleUsage={<ToolExample input="3 paragraphs" output="Lorem ipsum dolor..." />}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Mode</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as 'words' | 'paragraphs')}
              className="rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90"
            >
              <option value="words">Words</option>
              <option value="paragraphs">Paragraphs</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {mode === 'words' ? 'Word count' : 'Paragraph count'}
            </label>
            <input
              type="number"
              min={1}
              max={mode === 'words' ? 500 : 20}
              value={count}
              onChange={(e) => setCount(Number(e.target.value) || 1)}
              className="w-28 rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90"
            />
          </div>
          {mode === 'paragraphs' && (
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Words per paragraph</label>
              <input
                type="number"
                min={5}
                max={200}
                value={wordsPerBlock}
                onChange={(e) => setWordsPerBlock(Number(e.target.value) || 40)}
                className="w-28 rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90"
              />
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={generate}
          className="rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 text-sm font-medium hover:opacity-90"
        >
          Generate
        </button>
        {output && (
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Output</label>
            <textarea
              readOnly
              value={output}
              rows={8}
              className="w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-3 text-sm text-gray-800 dark:text-gray-200"
            />
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
