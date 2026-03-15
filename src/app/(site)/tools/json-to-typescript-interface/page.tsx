'use client';

import { useMemo, useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ToolExample, ToolFaq } from '@/components/tools/ToolSeoBlocks';

function jsonToTypeScript(value: unknown, interfaceName: string): string {
  if (value === null) return 'null';
  if (typeof value === 'boolean') return 'boolean';
  if (typeof value === 'number') return 'number';
  if (typeof value === 'string') return 'string';
  if (Array.isArray(value)) {
    const first = value[0];
    const itemType = first !== undefined ? jsonToTypeScript(first, 'Item') : 'unknown';
    return `Array<${itemType}>`;
  }
  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>);
    const lines = entries.map(([k, v]) => {
      const optional = v === null || v === undefined ? '?' : '';
      const prop = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : `'${k}'`;
      return `  ${prop}${optional}: ${jsonToTypeScript(v, 'Nested')};`;
    });
    return `{\n${lines.join('\n')}\n}`;
  }
  return 'unknown';
}

function generateInterface(obj: Record<string, unknown>, name: string): string {
  const body = jsonToTypeScript(obj, name);
  if (body.startsWith('{')) return `interface ${name} ${body}`;
  return `interface ${name} {\n  value: ${body};\n}`;
}

export default function JsonToTypescriptInterfacePage() {
  const [input, setInput] = useState('{"name": "John", "age": 30, "active": true}');
  const [interfaceName, setInterfaceName] = useState('MyInterface');

  const { output, error } = useMemo(() => {
    const raw = input.trim();
    if (!raw) return { output: '', error: null };
    try {
      const parsed = JSON.parse(raw);
      if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
        return { output: '', error: 'Root must be a JSON object.' };
      }
      const out = generateInterface(parsed as Record<string, unknown>, interfaceName.trim() || 'Root');
      return { output: out, error: null };
    } catch (e) {
      return { output: '', error: e instanceof Error ? e.message : 'Invalid JSON' };
    }
  }, [input, interfaceName]);

  return (
    <ToolLayout
      title="JSON to TypeScript Interface"
      description="Generate TypeScript interfaces from JSON."
      slug="json-to-typescript-interface"
      whatIs={
        <>
          <p>Paste a JSON object to generate a TypeScript interface. Nested objects are inlined; arrays use the type of the first element.</p>
          <ToolFaq />
        </>
      }
      howToUse={
        <ol className="list-decimal pl-5 space-y-1">
          <li>Paste a JSON object</li>
          <li>Optionally set the interface name</li>
          <li>Copy the generated TypeScript</li>
        </ol>
      }
      exampleUsage={<ToolExample input='{"name": "x"}' output="interface T { name: string; }" />}
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Interface name</label>
          <input
            type="text"
            value={interfaceName}
            onChange={(e) => setInterfaceName(e.target.value)}
            className="w-full max-w-xs rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono"
            placeholder="MyInterface"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">JSON</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={8}
            className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono"
            placeholder='{"key": "value"}'
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">TypeScript</label>
          <pre className={`w-full rounded-2xl border px-4 py-4 text-sm font-mono whitespace-pre-wrap break-all ${error ? 'border-red-300 dark:border-red-500/50 bg-red-50/50 dark:bg-red-500/10 text-red-700 dark:text-red-300' : 'border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-800 dark:text-gray-200'}`}>
            {error || output || '—'}
          </pre>
        </div>
      </div>
    </ToolLayout>
  );
}
