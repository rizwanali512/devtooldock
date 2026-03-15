'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Textarea } from '@/components/ui/inputs/textarea';
import { ToolExample, ToolFaq } from '@/components/tools/ToolSeoBlocks';
import { CopyToClipboard } from '@/components/copy-to-clipboard';

export default function Base64DecoderPage() {
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
      setOutput(decodeURIComponent(escape(atob(input.trim().replace(/\s/g, '')))));
      setError(null);
    } catch {
      setError('Invalid Base64');
      setOutput('');
    }
  };

  return (
    <ToolLayout
      title="Base64 Decoder"
      description="Decode Base64 to text. Runs in your browser."
      slug="base64-decoder"
      shareData={{ input, output: error ? '' : output }}
      whatIs={
        <>
          <p>
            This Base64 Decoder helps developers convert Base64 strings back into
            readable text. It’s useful when inspecting encoded API responses,
            tokens, or data copied from logs.
          </p>
          <ToolFaq />
        </>
      }
      exampleUsage={<ToolExample input={'SGVsbG8gd29ybGQ='} output={'Hello world'} />}
      howToUse={
        <>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Paste a Base64 string into the input field</li>
            <li>Click Decode</li>
            <li>View the decoded output (or an error if invalid)</li>
            <li>Copy the result</li>
          </ol>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Base64 input</label>
          <Textarea value={input} onChange={(e) => setInput(e.target.value)} onBlur={decode} placeholder="SGVsbG8=" rows={4} className="font-mono text-sm" />
        </div>
        <button type="button" onClick={decode} className="px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition">
          Decode
        </button>
        <div>
          <div className="mb-2 flex items-center justify-between gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Decoded output</label>
            {output ? (
              <CopyToClipboard text={output} toastMessage="Copied to clipboard" />
            ) : null}
          </div>
          <div className={`min-h-[100px] w-full rounded-2xl border px-4 py-4 text-sm font-mono ${error ? 'border-error-500 bg-error-50 dark:bg-error-500/10 text-error-600' : 'border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-800 dark:text-gray-200'}`}>
            {error || output || 'Decoded text will appear here.'}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
