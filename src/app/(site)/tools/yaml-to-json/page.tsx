'use client';

import { useState } from 'react';
import YAML from 'yaml';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Textarea } from '@/components/ui/inputs/textarea';

export default function YamlToJsonPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const convert = () => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }
    try {
      const parsed = YAML.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid YAML');
      setOutput('');
    }
  };

  return (
    <ToolLayout
      title="YAML to JSON"
      description="Convert YAML into JSON using client-side parsing."
      slug="yaml-to-json"
      whatIs={
        <p>
          Converts YAML documents into JSON. Great for transforming configuration
          files into JSON for APIs or tooling.
        </p>
      }
      exampleUsage={
        <pre className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm overflow-x-auto">{`Input YAML:
name: Ada
roles:
  - admin
  - dev

Output JSON:
{
  \"name\": \"Ada\",
  \"roles\": [\"admin\", \"dev\"]
}`}</pre>
      }
      howToUse={
        <>
          <p className="mb-2">1. Paste YAML in the input.</p>
          <p className="mb-2">2. Click Convert to generate JSON output.</p>
          <p>3. Fix YAML syntax errors (indentation matters) if needed.</p>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            YAML input
          </label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onBlur={convert}
            placeholder={'name: Ada\nroles:\n  - admin\n  - dev'}
            rows={8}
            className="font-mono text-sm"
          />
        </div>
        <button
          type="button"
          onClick={convert}
          className="px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition"
        >
          Convert to JSON
        </button>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            JSON output
          </label>
          <div
            className={`min-h-[140px] w-full rounded-2xl border px-4 py-4 text-sm font-mono whitespace-pre-wrap ${
              error
                ? 'border-error-500 bg-error-50 dark:bg-error-500/10 text-error-600'
                : 'border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-800 dark:text-gray-200'
            }`}
          >
            {error || output || 'JSON will appear here.'}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}

