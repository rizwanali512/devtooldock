'use client';

import { useState } from 'react';
import YAML from 'yaml';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Textarea } from '@/components/ui/inputs/textarea';

export default function JsonToYamlPage() {
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
      const parsed = JSON.parse(input);
      setOutput(YAML.stringify(parsed));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setOutput('');
    }
  };

  return (
    <ToolLayout
      title="JSON to YAML"
      description="Convert JSON into YAML using client-side parsing."
      slug="json-to-yaml"
      whatIs={
        <p>
          Converts JSON into YAML (a human-friendly data format). Useful for
          configs like CI pipelines, Kubernetes manifests, and app settings.
        </p>
      }
      exampleUsage={
        <pre className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm overflow-x-auto">{`Input JSON:
{\"name\":\"Ada\",\"roles\":[\"admin\",\"dev\"]}

Output YAML:
name: Ada
roles:
  - admin
  - dev`}</pre>
      }
      howToUse={
        <>
          <p className="mb-2">1. Paste valid JSON in the input.</p>
          <p className="mb-2">2. Click Convert to generate YAML output.</p>
          <p>3. Fix any JSON parse errors and try again.</p>
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
            onBlur={convert}
            placeholder='{"name":"Ada","roles":["admin","dev"]}'
            rows={8}
            className="font-mono text-sm"
          />
        </div>
        <button
          type="button"
          onClick={convert}
          className="px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition"
        >
          Convert to YAML
        </button>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            YAML output
          </label>
          <div
            className={`min-h-[140px] w-full rounded-2xl border px-4 py-4 text-sm font-mono whitespace-pre-wrap ${
              error
                ? 'border-error-500 bg-error-50 dark:bg-error-500/10 text-error-600'
                : 'border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-800 dark:text-gray-200'
            }`}
          >
            {error || output || 'YAML will appear here.'}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}

