'use client';

import { useMemo, useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Textarea } from '@/components/ui/inputs/textarea';

function wordsFrom(input: string) {
  const s = input
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_\-]+/g, ' ')
    .replace(/[^a-zA-Z0-9 ]+/g, ' ')
    .trim();
  return s ? s.split(/\s+/).filter(Boolean) : [];
}

function toCamel(words: string[]) {
  return words
    .map((w, i) =>
      i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    )
    .join('');
}
function toPascal(words: string[]) {
  return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
}
function toSnake(words: string[]) {
  return words.map((w) => w.toLowerCase()).join('_');
}
function toKebab(words: string[]) {
  return words.map((w) => w.toLowerCase()).join('-');
}
function toTitle(words: string[]) {
  return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
}

export default function CaseConverterPage() {
  const [input, setInput] = useState('');

  const out = useMemo(() => {
    const w = wordsFrom(input);
    return {
      camel: w.length ? toCamel(w) : '',
      pascal: w.length ? toPascal(w) : '',
      snake: w.length ? toSnake(w) : '',
      kebab: w.length ? toKebab(w) : '',
      title: w.length ? toTitle(w) : '',
    };
  }, [input]);

  return (
    <ToolLayout
      title="Case Converter"
      description="Convert text into camelCase, snake_case, kebab-case, PascalCase, and Title Case."
      slug="case-converter"
      whatIs={<p>Case conversion is useful when moving between variable naming conventions across languages and systems.</p>}
      exampleUsage={
        <pre className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm overflow-x-auto">{`Input: hello world_example\ncamelCase: helloWorldExample\nsnake_case: hello_world_example\nkebab-case: hello-world-example`}</pre>
      }
      howToUse={
        <>
          <p className="mb-2">1. Paste text into the input.</p>
          <p>2. The tool outputs multiple naming styles automatically.</p>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Input
          </label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="hello world_example"
            rows={5}
            className="font-mono text-sm"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {(
            [
              ['camelCase', out.camel],
              ['PascalCase', out.pascal],
              ['snake_case', out.snake],
              ['kebab-case', out.kebab],
              ['Title Case', out.title],
            ] as const
          ).map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{label}</div>
              <div className="text-sm font-mono text-gray-800 dark:text-gray-200 break-all">
                {value || '—'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}

