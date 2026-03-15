'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Textarea } from '@/components/ui/inputs/textarea';
import { ToolExample, ToolFaq } from '@/components/tools/ToolSeoBlocks';

export default function UrlDecoderPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const decode = () => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }
    try {
      setOutput(decodeURIComponent(input.replace(/\+/g, ' ')));
      setError(null);
    } catch {
      setError('Invalid URL-encoded string');
      setOutput('');
    }
  };

  return (
    <ToolLayout
      title="URL Decoder"
      description="Decode URL-encoded (percent-encoded) text."
      slug="url-decoder"
      whatIs={
        <>
          <p>
            This URL Decoder helps developers turn percent-encoded text back into
            readable characters. It’s commonly used when debugging query
            parameters, redirects, and encoded API payloads.
          </p>
          <ToolFaq />
        </>
      }
      exampleUsage={
        <ToolExample input={'hello%20world%20%26%20page%3D1'} output={'hello world & page=1'} />
      }
      howToUse={
        <>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Paste URL-encoded text into the input field</li>
            <li>Click Decode</li>
            <li>View the decoded output</li>
            <li>Copy the result</li>
          </ol>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Encoded input</label>
          <Textarea value={input} onChange={(e) => setInput(e.target.value)} onBlur={decode} placeholder="Hello%20World" rows={4} className="font-mono text-sm" />
        </div>
        <button type="button" onClick={decode} className="px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition">
          Decode
        </button>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Decoded output</label>
          <div className={`min-h-[100px] w-full rounded-2xl border px-4 py-4 text-sm font-mono ${error ? 'border-error-500 bg-error-50 dark:bg-error-500/10 text-error-600' : 'border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-800 dark:text-gray-200'}`}>
            {error || output || 'Decoded text will appear here.'}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
