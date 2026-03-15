'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Textarea } from '@/components/ui/inputs/textarea';
import { ToolExample, ToolFaq } from '@/components/tools/ToolSeoBlocks';
import { CopyToClipboard } from '@/components/copy-to-clipboard';

export default function JsonFormatterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const format = () => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setOutput('');
    }
  };

  return (
    <ToolLayout
      title="JSON Formatter"
      description="Format and beautify JSON with indentation. Invalid JSON will show a clear error."
      slug="json-formatter"
      shareData={{ input, output: error ? '' : output }}
      whatIs={
        <>
          <p>
            This JSON Formatter helps developers format and validate JSON
            instantly. It cleans up messy JSON data, makes it easier to read and
            debug, and surfaces syntax errors before you ship.
          </p>
          <ToolFaq />
        </>
      }
      exampleUsage={
        <ToolExample
          input={'{"name":"John","age":30}'}
          output={'{\n  "name": "John",\n  "age": 30\n}'}
        />
      }
      howToUse={
        <>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Paste your JSON into the input field</li>
            <li>Click the format button</li>
            <li>View the formatted output (or any validation error)</li>
            <li>Copy the result</li>
          </ol>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Input</label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onBlur={format}
            placeholder='{"key": "value"}'
            rows={8}
            className="font-mono text-sm"
          />
        </div>
        <div>
          <button
            type="button"
            onClick={format}
            className="px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition"
          >
            Format JSON
          </button>
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Output</label>
            {output ? (
              <CopyToClipboard text={output} toastMessage="Copied to clipboard" />
            ) : null}
          </div>
          <div
            className={`min-h-[120px] w-full rounded-2xl border px-4 py-4 text-sm font-mono ${
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
