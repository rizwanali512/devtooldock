'use client';

import { useMemo, useState } from 'react';
import TurndownService from 'turndown';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ToolExample, ToolFaq } from '@/components/tools/ToolSeoBlocks';

const turndown = new TurndownService();

export default function HtmlToMarkdownPage() {
  const [input, setInput] = useState('<h2>Hello</h2><p>This is <strong>bold</strong> and <em>italic</em>.</p>');

  const markdown = useMemo(() => {
    const raw = input.trim();
    if (!raw) return '';
    try {
      return turndown.turndown(raw);
    } catch {
      return '';
    }
  }, [input]);

  return (
    <ToolLayout
      title="HTML to Markdown"
      description="Convert HTML to Markdown."
      slug="html-to-markdown"
      whatIs={
        <>
          <p>Paste HTML and get Markdown. Handles headings, paragraphs, bold, italic, links, and lists.</p>
          <ToolFaq />
        </>
      }
      howToUse={
        <ol className="list-decimal pl-5 space-y-1">
          <li>Paste HTML in the input</li>
          <li>Markdown output updates below</li>
          <li>Copy the Markdown</li>
        </ol>
      }
      exampleUsage={<ToolExample input="<strong>bold</strong>" output="**bold**" />}
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">HTML</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={8}
            className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono"
            placeholder="<p>Hello <strong>world</strong></p>"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Markdown</label>
          <pre className="w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-all">
            {markdown || '—'}
          </pre>
        </div>
      </div>
    </ToolLayout>
  );
}
