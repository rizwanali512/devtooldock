'use client';

import { useState, useCallback, useEffect } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Textarea } from '@/components/ui/inputs/textarea';
import { ToolExample, ToolFaq } from '@/components/tools/ToolSeoBlocks';
import { CopyToClipboard } from '@/components/copy-to-clipboard';

export default function Base64EncoderPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const encode = useCallback(() => {
    if (!input) {
      setOutput('');
      return;
    }
    try {
      setOutput(btoa(unescape(encodeURIComponent(input))));
    } catch {
      setOutput('');
    }
  }, [input]);

  useEffect(() => {
    encode();
  }, [encode]);

  return (
    <ToolLayout
      title="Base64 Encoder"
      description="Encode text to Base64. Runs in your browser."
      slug="base64-encoder"
      shareData={{ input, output }}
      whatIs={
        <>
          <p>
            This Base64 Encoder helps developers encode text into Base64 for
            transport and embedding. Base64 is commonly used for data URLs,
            headers, and API payloads where only ASCII text is safe.
          </p>
          <ToolFaq />
        </>
      }
      exampleUsage={<ToolExample input={'Hello world'} output={'SGVsbG8gd29ybGQ='} />}
      howToUse={
        <>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Paste text into the input field</li>
            <li>Blur the field or keep typing (output updates automatically)</li>
            <li>Copy the Base64 output</li>
          </ol>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Input</label>
          <Textarea value={input} onChange={(e) => setInput(e.target.value)} onBlur={encode} placeholder="Text to encode" rows={4} className="font-mono text-sm" />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Base64 output</label>
            {output ? (
              <CopyToClipboard text={output} toastMessage="Copied to clipboard" />
            ) : null}
          </div>
          <div className="min-h-[100px] w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm font-mono text-gray-800 dark:text-gray-200 break-all">
            {output || 'Output will appear here.'}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
