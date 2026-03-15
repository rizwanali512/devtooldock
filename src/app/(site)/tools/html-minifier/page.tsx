'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Textarea } from '@/components/ui/inputs/textarea';
import { CopyToClipboard } from '@/components/copy-to-clipboard';

function minifyHtml(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*>\s*/g, '>')
    .replace(/\s*<\s*/g, '<')
    .trim();
}

export default function HtmlMinifierPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const minify = () => setOutput(minifyHtml(input));

  return (
    <ToolLayout
      title="HTML Minifier"
      description="Minify HTML by removing comments and extra whitespace."
      slug="html-minifier"
      shareData={{ input, output }}
      whatIs={
        <p>
          Reduces HTML size by stripping comments and collapsing whitespace.
          Useful for production markup. For full minification (attributes, optional
          tags), use a build tool.
        </p>
      }
      howToUse={
        <>
          <p className="mb-2">1. Paste HTML in the input box.</p>
          <p>2. Click Minify and copy the result if needed.</p>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            HTML input
          </label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="<div>  <p>Hello</p>  <!-- comment --></div>"
            rows={8}
            className="font-mono text-sm"
          />
        </div>
        <button
          type="button"
          onClick={minify}
          className="px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition"
        >
          Minify
        </button>
        <div>
          <div className="mb-2 flex items-center justify-between gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Minified output
            </label>
            {output ? (
              <CopyToClipboard text={output} toastMessage="Copied to clipboard" />
            ) : null}
          </div>
          <pre className="min-h-[120px] w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-all">
            {output || 'Minified HTML will appear here.'}
          </pre>
        </div>
      </div>
    </ToolLayout>
  );
}
