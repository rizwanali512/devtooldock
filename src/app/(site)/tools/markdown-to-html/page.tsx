'use client';

import { useMemo, useState } from 'react';
import { marked } from 'marked';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ToolExample, ToolFaq } from '@/components/tools/ToolSeoBlocks';

export default function MarkdownToHtmlPage() {
  const [input, setInput] = useState('## Hello\n\nThis is **bold** and *italic*.');

  const html = useMemo(() => {
    const raw = input.trim();
    if (!raw) return '';
    try {
      return marked.parse(raw, { async: false }) as string;
    } catch {
      return '';
    }
  }, [input]);

  return (
    <ToolLayout
      title="Markdown to HTML"
      description="Convert Markdown to HTML."
      slug="markdown-to-html"
      whatIs={
        <>
          <p>Paste Markdown and get equivalent HTML. Supports headings, bold, italic, lists, links, and code.</p>
          <ToolFaq />
        </>
      }
      howToUse={
        <ol className="list-decimal pl-5 space-y-1">
          <li>Paste or type Markdown in the input</li>
          <li>HTML output updates below</li>
          <li>Copy the HTML</li>
        </ol>
      }
      exampleUsage={<ToolExample input="**bold**" output="<strong>bold</strong>" />}
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Markdown</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={8}
            className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono"
            placeholder="## Heading\n**bold** *italic*"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">HTML</label>
          <pre className="w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-all">
            {html || '—'}
          </pre>
        </div>
      </div>
    </ToolLayout>
  );
}
