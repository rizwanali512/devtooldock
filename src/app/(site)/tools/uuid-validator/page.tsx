'use client';

import { useMemo, useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Textarea } from '@/components/ui/inputs/textarea';

function validateUuid(value: string) {
  const v = value.trim().toLowerCase();
  if (!v) return { ok: false, version: null as number | null, message: 'Enter a UUID to validate.' };
  const re =
    /^[0-9a-f]{8}-[0-9a-f]{4}-([1-5])[0-9a-f]{3}-([89ab])[0-9a-f]{3}-[0-9a-f]{12}$/i;
  const m = v.match(re);
  if (!m) return { ok: false, version: null as number | null, message: 'Invalid UUID format (expected v1–v5).' };
  return { ok: true, version: Number(m[1]), message: `Valid UUID (v${m[1]}).` };
}

export default function UuidValidatorPage() {
  const [input, setInput] = useState('');

  const result = useMemo(() => validateUuid(input), [input]);

  return (
    <ToolLayout
      title="UUID Validator"
      description="Validate UUID strings (v1–v5) and detect the version."
      slug="uuid-validator"
      whatIs={<p>A UUID is a 128-bit identifier commonly used as unique IDs. This tool validates the canonical UUID format and checks the version nibble (v1–v5).</p>}
      exampleUsage={
        <pre className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm overflow-x-auto">{`Valid example:\n550e8400-e29b-41d4-a716-446655440000\n\nInvalid example:\nnot-a-uuid`}</pre>
      }
      howToUse={
        <>
          <p className="mb-2">1. Paste a UUID into the input.</p>
          <p>2. The validator updates instantly and shows the UUID version if valid.</p>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            UUID
          </label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="550e8400-e29b-41d4-a716-446655440000"
            rows={3}
            className="font-mono text-sm"
          />
        </div>
        <div
          className={`w-full rounded-2xl border px-4 py-4 text-sm ${
            result.ok
              ? 'border-success-500/50 bg-success-50 dark:bg-success-500/10 text-success-700 dark:text-success-200'
              : 'border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-200'
          }`}
        >
          <div className="font-medium">{result.message}</div>
          {result.ok && (
            <div className="mt-1 text-sm opacity-80">Detected version: v{result.version}</div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}

