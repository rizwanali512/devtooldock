'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Textarea } from '@/components/ui/inputs/textarea';

function minifyCss(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s*([{}:;,>+~])\s*/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

export default function CssMinifierPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const minify = () => setOutput(minifyCss(input));

  return (
    <ToolLayout
      title="CSS Minifier"
      description="Minify CSS by removing comments and extra whitespace."
      slug="css-minifier"
      whatIs={<p>Reduces CSS file size by stripping comments and unnecessary spaces. Use for production builds.</p>}
      howToUse={
        <>
          <p className="mb-2">1. Paste your CSS in the input.</p>
          <p>2. Click Minify to get a single-line minified version.</p>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">CSS input</label>
          <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder=".foo { color: red; }" rows={8} className="font-mono text-sm" />
        </div>
        <button type="button" onClick={minify} className="px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition">
          Minify
        </button>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Minified output</label>
          <pre className="min-h-[100px] w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-all">
            {output || 'Minified CSS will appear here.'}
          </pre>
        </div>
      </div>
    </ToolLayout>
  );
}
