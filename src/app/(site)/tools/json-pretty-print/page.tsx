'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Textarea } from '@/components/ui/inputs/textarea';
import { CopyToClipboard } from '@/components/copy-to-clipboard';

export default function JsonPrettyPrintPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [indent, setIndent] = useState(2);

  const prettyPrint = () => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }
    try {
      const parsed = JSON.parse(input);
      const space = typeof indent === 'number' && indent >= 0 && indent <= 8 ? indent : 2;
      setOutput(JSON.stringify(parsed, null, space));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setOutput('');
    }
  };

  return (
    <ToolLayout
      title="JSON Pretty Print"
      description="Format JSON with indentation for readability."
      slug="json-pretty-print"
      shareData={{ input, output: error ? '' : output }}
      whatIs={
        <p>
          Pretty-print JSON with consistent indentation so it is easier to read
          and edit. Choose 2 or 4 spaces (or tabs) for nesting.
        </p>
      }
      howToUse={
        <>
          <p className="mb-2">1. Paste your JSON in the input box.</p>
          <p className="mb-2">2. Choose indent size (spaces).</p>
          <p>3. Click Pretty Print and copy the result if needed.</p>
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
            onBlur={prettyPrint}
            placeholder='{"key": "value"}'
            rows={8}
            className="font-mono text-sm"
          />
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Indent:
            <select
              value={indent}
              onChange={(e) => setIndent(Number(e.target.value))}
              className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
            >
              {[0, 2, 4].map((n) => (
                <option key={n} value={n}>
                  {n === 0 ? 'None' : `${n} spaces`}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={prettyPrint}
            className="px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition"
          >
            Pretty Print
          </button>
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Formatted output
            </label>
            {output ? (
              <CopyToClipboard text={output} toastMessage="Copied to clipboard" />
            ) : null}
          </div>
          <div
            className={`min-h-[120px] w-full rounded-2xl border px-4 py-4 text-sm font-mono whitespace-pre-wrap break-words ${
              error
                ? 'border-error-500 bg-error-50 dark:bg-error-500/10 text-error-600'
                : 'border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-800 dark:text-gray-200'
            }`}
          >
            {error || output || 'Formatted JSON will appear here.'}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
