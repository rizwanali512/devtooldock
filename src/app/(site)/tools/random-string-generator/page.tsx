'use client';

import { useMemo, useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';

function randomString(length: number, charset: string) {
  const chars = charset.split('');
  if (!chars.length || length <= 0) return '';
  const bytes = new Uint32Array(length);
  crypto.getRandomValues(bytes);
  let out = '';
  for (let i = 0; i < length; i++) out += chars[bytes[i] % chars.length];
  return out;
}

export default function RandomStringGeneratorPage() {
  const [length, setLength] = useState(24);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [value, setValue] = useState('');

  const charset = useMemo(() => {
    let s = '';
    if (includeLower) s += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUpper) s += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) s += '0123456789';
    if (includeSymbols) s += '-_~!@#$%^&*()+={}[]:;,.?';
    return s;
  }, [includeLower, includeUpper, includeNumbers, includeSymbols]);

  const generate = () => setValue(randomString(length, charset));

  return (
    <ToolLayout
      title="Random String Generator"
      description="Generate random strings in the browser using secure randomness."
      slug="random-string-generator"
      whatIs={<p>Generates random strings (tokens) using the browser’s <code>crypto.getRandomValues</code>. Useful for API keys, test data, and identifiers.</p>}
      exampleUsage={
        <pre className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm overflow-x-auto">{`Length: 16\nCharset: A–Z, a–z, 0–9\nOutput: k9Qm2aZ1pL0xT8nB`}</pre>
      }
      howToUse={
        <>
          <p className="mb-2">1. Choose length and character sets.</p>
          <p>2. Click Generate to create a random string.</p>
        </>
      }
    >
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Length
            </label>
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              min={1}
              max={256}
              className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Character sets
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input type="checkbox" checked={includeLower} onChange={(e) => setIncludeLower(e.target.checked)} />
              a–z
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input type="checkbox" checked={includeUpper} onChange={(e) => setIncludeUpper(e.target.checked)} />
              A–Z
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} />
              0–9
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} />
              Symbols
            </label>
          </div>
        </div>

        <button
          type="button"
          onClick={generate}
          className="px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition"
        >
          Generate
        </button>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Output
          </label>
          <div className="min-h-[60px] w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm font-mono text-gray-800 dark:text-gray-200 break-all">
            {value || 'Random string will appear here.'}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}

