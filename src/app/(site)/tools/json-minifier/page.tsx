'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Textarea } from '@/components/ui/inputs/textarea';
import { CopyToClipboard } from '@/components/copy-to-clipboard';

export default function JsonMinifierPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const minify = () => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setOutput('');
    }
  };

  return (
    <ToolLayout
      title="JSON Minifier"
      description="Minify JSON by removing whitespace and newlines."
      slug="json-minifier"
      shareData={{ input, output: error ? '' : output }}
      whatIs={
        <p>
          A JSON minifier reduces file size by removing unnecessary whitespace,
          newlines, and indentation. Useful for APIs and configs where size
          matters.
        </p>
      }
      howToUse={
        <>
          <p className="mb-2">1. Paste your JSON in the input box.</p>
          <p>2. Click Minify. Copy the single-line output if needed.</p>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            JSON input
          </label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onBlur={minify}
            placeholder='{"key": "value"}'
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
          <div
            className={`min-h-[120px] w-full rounded-2xl border px-4 py-4 text-sm font-mono whitespace-pre-wrap break-all ${
              error
                ? 'border-error-500 bg-error-50 dark:bg-error-500/10 text-error-600'
                : 'border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-800 dark:text-gray-200'
            }`}
          >
            {error || output || 'Minified JSON will appear here.'}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
