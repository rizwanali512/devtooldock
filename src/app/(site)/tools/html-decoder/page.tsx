'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Textarea } from '@/components/ui/inputs/textarea';

export default function HtmlDecoderPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const decode = () => {
    if (!input.trim()) {
      setOutput('');
      return;
    }
    const textarea = document.createElement('textarea');
    textarea.innerHTML = input;
    setOutput(textarea.value);
  };

  return (
    <ToolLayout
      title="HTML Decoder"
      description="Decode HTML entities to plain text."
      slug="html-decoder"
      whatIs={<p>HTML decoding converts entities like &amp;lt; &amp;gt; &amp;amp; back to their character form.</p>}
      howToUse={
        <>
          <p className="mb-2">1. Paste HTML-encoded text in the input.</p>
          <p>2. Click Decode to get plain text.</p>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Encoded input</label>
          <Textarea value={input} onChange={(e) => setInput(e.target.value)} onBlur={decode} placeholder="&lt;div&gt;" rows={4} className="font-mono text-sm" />
        </div>
        <button type="button" onClick={decode} className="px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition">
          Decode
        </button>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Decoded output</label>
          <div className="min-h-[100px] w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm font-mono text-gray-800 dark:text-gray-200">
            {output || 'Decoded text will appear here.'}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
