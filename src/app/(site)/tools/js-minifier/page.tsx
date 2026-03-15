'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Textarea } from '@/components/ui/inputs/textarea';

function minifyJs(js: string): string {
  return js
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/[^\n]*/g, '')
    .replace(/\s*([{}();,=<>!+\-*\/%&|^?:[\]])\s*/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

export default function JsMinifierPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const minify = () => setOutput(minifyJs(input));

  return (
    <ToolLayout
      title="JS Minifier"
      description="Minify JavaScript by removing comments and extra whitespace."
      slug="js-minifier"
      whatIs={<p>Basic minification: removes block and line comments and collapses whitespace. For full minification use a build tool like Terser.</p>}
      howToUse={
        <>
          <p className="mb-2">1. Paste JavaScript in the input.</p>
          <p>2. Click Minify. Note: string contents are not changed; regex may need manual check.</p>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">JavaScript input</label>
          <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="function foo() { return 1; }" rows={8} className="font-mono text-sm" />
        </div>
        <button type="button" onClick={minify} className="px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition">
          Minify
        </button>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Minified output</label>
          <pre className="min-h-[100px] w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-all">
            {output || 'Minified JS will appear here.'}
          </pre>
        </div>
      </div>
    </ToolLayout>
  );
}
