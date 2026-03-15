'use client';

import { useState, useCallback, useEffect } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Textarea } from '@/components/ui/inputs/textarea';
import { ToolExample, ToolFaq } from '@/components/tools/ToolSeoBlocks';

export default function UrlEncoderPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const encode = useCallback(() => {
    if (!input) {
      setOutput('');
      return;
    }
    setOutput(encodeURIComponent(input));
  }, [input]);

  useEffect(() => {
    encode();
  }, [encode]);

  return (
    <ToolLayout
      title="URL Encoder"
      description="Encode text for use in URLs (percent-encoding)."
      slug="url-encoder"
      whatIs={
        <>
          <p>
            This URL Encoder helps developers safely include text in URLs and
            query strings. It converts special characters (like spaces, &amp;,
            and =) into percent-encoded values so links don’t break.
          </p>
          <ToolFaq />
        </>
      }
      exampleUsage={
        <ToolExample
          input={'hello world & page=1'}
          output={'hello%20world%20%26%20page%3D1'}
        />
      }
      howToUse={
        <>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Paste text into the input field</li>
            <li>Blur the field or keep typing (output updates automatically)</li>
            <li>Copy the encoded result</li>
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
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Encoded output</label>
          <div className="min-h-[100px] w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm font-mono text-gray-800 dark:text-gray-200 break-all">
            {output || 'Output will appear here.'}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
