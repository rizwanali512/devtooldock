'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Textarea } from '@/components/ui/inputs/textarea';

export default function JsonValidatorPage() {
  const [input, setInput] = useState('');
  const [valid, setValid] = useState<boolean | null>(null);
  const [message, setMessage] = useState('');

  const validate = () => {
    if (!input.trim()) {
      setValid(null);
      setMessage('');
      return;
    }
    try {
      JSON.parse(input);
      setValid(true);
      setMessage('Valid JSON.');
    } catch (e) {
      setValid(false);
      setMessage(e instanceof Error ? e.message : 'Invalid JSON');
    }
  };

  return (
    <ToolLayout
      title="JSON Validator"
      description="Validate JSON syntax and get clear error messages."
      slug="json-validator"
      whatIs={<p>A JSON validator checks whether a string is valid JSON and reports the position and reason of any syntax error.</p>}
      howToUse={
        <>
          <p className="mb-2">1. Paste your JSON in the input box.</p>
          <p>2. Click Validate. You will see either &quot;Valid JSON&quot; or an error message with details.</p>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">JSON</label>
          <Textarea value={input} onChange={(e) => setInput(e.target.value)} onBlur={validate} placeholder='{"key": "value"}' rows={8} className="font-mono text-sm" />
        </div>
        <button type="button" onClick={validate} className="px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition">
          Validate
        </button>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Result</label>
          <div
            className={`min-h-[60px] w-full rounded-2xl border px-4 py-4 text-sm ${
              valid === true ? 'border-green-500 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400' : valid === false ? 'border-error-500 bg-error-50 dark:bg-error-500/10 text-error-600' : 'border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-800 dark:text-gray-200'
            }`}
          >
            {valid === null ? 'Result will appear here.' : message}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
