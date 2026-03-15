'use client';

import { useState, useCallback, useEffect } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Textarea } from '@/components/ui/inputs/textarea';

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export default function HtmlEncoderPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const encode = useCallback(() => {
    setOutput(input ? escapeHtml(input) : '');
  }, [input]);

  useEffect(() => {
    encode();
  }, [encode]);

  return (
    <ToolLayout
      title="HTML Encoder"
      description="Encode text to HTML entities (e.g. &amp; &lt; &gt;)."
      slug="html-encoder"
      whatIs={<p>HTML encoding converts characters like &lt; &gt; &amp; into entities so they display as text instead of being interpreted as HTML.</p>}
      howToUse={
        <>
          <p className="mb-2">1. Type or paste text in the input.</p>
          <p>2. Encoded output updates automatically.</p>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Input</label>
          <Textarea value={input} onChange={(e) => setInput(e.target.value)} onBlur={encode} placeholder="<script>" rows={4} className="font-mono text-sm" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Encoded output</label>
          <div className="min-h-[100px] w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm font-mono text-gray-800 dark:text-gray-200 break-all">
            {output || 'Output will appear here.'}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
