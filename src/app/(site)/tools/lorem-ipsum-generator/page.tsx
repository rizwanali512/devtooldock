'use client';

import { useMemo, useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';

const WORDS = (
  'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'
).split(' ');

function buildLorem(paragraphs: number, wordsPer: number) {
  const out: string[] = [];
  let i = 0;
  for (let p = 0; p < paragraphs; p++) {
    const w: string[] = [];
    for (let j = 0; j < wordsPer; j++) {
      w.push(WORDS[i % WORDS.length]);
      i++;
    }
    const sentence = w.join(' ');
    out.push(sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.');
  }
  return out.join('\n\n');
}

export default function LoremIpsumGeneratorPage() {
  const [paragraphs, setParagraphs] = useState(3);
  const [wordsPer, setWordsPer] = useState(40);

  const text = useMemo(() => buildLorem(paragraphs, wordsPer), [paragraphs, wordsPer]);

  return (
    <ToolLayout
      title="Lorem Ipsum Generator"
      description="Generate placeholder text for designs, mockups, and layouts."
      slug="lorem-ipsum-generator"
      whatIs={<p>Lorem ipsum is standard placeholder text used to demonstrate layout and typography without real content.</p>}
      exampleUsage={<p>Generate a few paragraphs to fill cards, tables, or landing page sections while designing.</p>}
      howToUse={
        <>
          <p className="mb-2">1. Choose number of paragraphs and words per paragraph.</p>
          <p>2. Copy the generated lorem ipsum text.</p>
        </>
      }
    >
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Paragraphs
            </label>
            <input
              type="number"
              value={paragraphs}
              onChange={(e) => setParagraphs(Number(e.target.value))}
              min={1}
              max={20}
              className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Words per paragraph
            </label>
            <input
              type="number"
              value={wordsPer}
              onChange={(e) => setWordsPer(Number(e.target.value))}
              min={10}
              max={200}
              className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Output
          </label>
          <pre className="min-h-[160px] w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
            {text}
          </pre>
        </div>
      </div>
    </ToolLayout>
  );
}

