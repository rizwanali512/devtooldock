'use client';

import { useMemo, useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Textarea } from '@/components/ui/inputs/textarea';

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function SlugGeneratorPage() {
  const [input, setInput] = useState('');

  const out = useMemo(() => (input.trim() ? slugify(input) : ''), [input]);

  return (
    <ToolLayout
      title="Slug Generator"
      description="Convert text into a clean URL slug."
      slug="slug-generator"
      whatIs={<p>A slug is the URL-friendly part of a page path. Slugs typically use lowercase letters, numbers, and hyphens.</p>}
      exampleUsage={
        <pre className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm overflow-x-auto">{`Input: Hello, World! 2026\nOutput: hello-world-2026`}</pre>
      }
      howToUse={
        <>
          <p className="mb-2">1. Paste a title or phrase into the input.</p>
          <p>2. Copy the generated slug.</p>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Text
          </label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Hello, World! 2026"
            rows={4}
            className="font-mono text-sm"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Slug
          </label>
          <div className="min-h-[60px] w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm font-mono text-gray-800 dark:text-gray-200 break-all">
            {out || 'Slug will appear here.'}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}

