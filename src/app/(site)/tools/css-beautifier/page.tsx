'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Textarea } from '@/components/ui/inputs/textarea';

function beautifyCss(css: string): string {
  let out = '';
  let indent = 0;
  const min = css
    .replace(/\/\*[\s\S]*?\*\//g, (m) => '\n' + m + '\n')
    .replace(/\s*([{}:;,])\s*/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
  for (let i = 0; i < min.length; i++) {
    const c = min[i];
    if (c === '{') {
      out += ' {\n';
      indent++;
      out += '  '.repeat(indent);
    } else if (c === '}') {
      indent--;
      out += '\n' + '  '.repeat(indent) + '}';
      if (min[i + 1] && min[i + 1] !== '}' && min[i + 1] !== ',') out += '\n' + '  '.repeat(indent);
    } else if (c === ';') {
      out += ';\n' + '  '.repeat(indent);
    } else if (c === ',') out += ', ';
    else out += c;
  }
  return out.trim();
}

export default function CssBeautifierPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const beautify = () => setOutput(beautifyCss(input));

  return (
    <ToolLayout
      title="CSS Beautifier"
      description="Format and indent CSS for readability."
      slug="css-beautifier"
      whatIs={<p>Formats minified or messy CSS with consistent indentation and line breaks.</p>}
      howToUse={
        <>
          <p className="mb-2">1. Paste CSS in the input.</p>
          <p>2. Click Beautify to get formatted CSS.</p>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">CSS input</label>
          <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder=".foo{color:red;}" rows={8} className="font-mono text-sm" />
        </div>
        <button type="button" onClick={beautify} className="px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition">
          Beautify
        </button>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Formatted output</label>
          <pre className="min-h-[120px] w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
            {output || 'Formatted CSS will appear here.'}
          </pre>
        </div>
      </div>
    </ToolLayout>
  );
}
