'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { CopyToClipboard } from '@/components/copy-to-clipboard';

const PRESETS: { name: string; pattern: string; description: string }[] = [
  { name: 'Email', pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$', description: 'Common email format' },
  { name: 'URL', pattern: 'https?://[^\\s/$.?#].[^\\s]*', description: 'HTTP/HTTPS URLs' },
  { name: 'Integer', pattern: '^-?\\d+$', description: 'Whole numbers' },
  { name: 'Decimal', pattern: '^-?\\d+\\.?\\d*$', description: 'Numbers with optional decimal' },
  { name: 'Hex color', pattern: '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$', description: 'CSS hex colors' },
  { name: 'Alphanumeric', pattern: '^[a-zA-Z0-9]+$', description: 'Letters and numbers only' },
  { name: 'UUID', pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$', description: 'UUID v4-style' },
  { name: 'Phone (US)', pattern: '^\\+?1?[-. ]?\\(?[0-9]{3}\\)?[-. ]?[0-9]{3}[-. ]?[0-9]{4}$', description: 'US phone format' },
  { name: 'Date (YYYY-MM-DD)', pattern: '^\\d{4}-\\d{2}-\\d{2}$', description: 'ISO date' },
  { name: 'Whitespace', pattern: '\\s+', description: 'One or more spaces/tabs/newlines' },
];

export default function RegexGeneratorPage() {
  const [output, setOutput] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  const applyPreset = (preset: (typeof PRESETS)[0]) => {
    setOutput(preset.pattern);
    setSelectedPreset(preset.name);
  };

  return (
    <ToolLayout
      title="Regex Generator"
      description="Generate regular expressions from common patterns."
      slug="regex-generator"
      shareData={{ input: selectedPreset ?? '', output }}
      whatIs={
        <p>
          Quick presets for common regex patterns (email, URL, numbers, dates,
          etc.). Copy the pattern and use it in your code or the Regex Tester.
        </p>
      }
      howToUse={
        <>
          <p className="mb-2">1. Click a preset to generate its regex.</p>
          <p>2. Copy the pattern and paste into your app or Regex Tester.</p>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Presets
          </label>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => applyPreset(preset)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedPreset === preset.name
                    ? 'bg-primary-500 text-white'
                    : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Generated regex
            </label>
            {output ? (
              <CopyToClipboard text={output} toastMessage="Copied to clipboard" />
            ) : null}
          </div>
          <pre className="min-h-[80px] w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-all">
            {output || 'Click a preset to generate a regex.'}
          </pre>
          {selectedPreset && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {PRESETS.find((p) => p.name === selectedPreset)?.description}
            </p>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
