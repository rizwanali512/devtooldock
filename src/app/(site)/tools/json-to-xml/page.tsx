'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Textarea } from '@/components/ui/inputs/textarea';

function jsonToXml(obj: unknown, rootName = 'root'): string {
  if (obj === null || obj === undefined) return '';
  if (typeof obj !== 'object') return `<${rootName}>${String(obj)}</${rootName}>`;
  if (Array.isArray(obj)) {
    return obj.map((item, i) => jsonToXml(item, `item`)).join('');
  }
  const entries = Object.entries(obj as Record<string, unknown>);
  const inner = entries.map(([k, v]) => jsonToXml(v, k.replace(/[^a-zA-Z0-9_-]/g, '_'))).join('');
  return `<${rootName}>${inner}</${rootName}>`;
}

export default function JsonToXmlPage() {
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
      setOutput('<?xml version="1.0"?>\n' + jsonToXml(parsed, 'root'));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setOutput('');
    }
  };

  return (
    <ToolLayout
      title="JSON to XML"
      description="Convert JSON to XML format."
      slug="json-to-xml"
      whatIs={<p>Converts a JSON object or array into XML. Keys become element names; values become text or nested elements.</p>}
      howToUse={
        <>
          <p className="mb-2">1. Paste valid JSON in the input.</p>
          <p>2. Click Convert. The root element is named &quot;root&quot; unless you customize the logic.</p>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">JSON</label>
          <Textarea value={input} onChange={(e) => setInput(e.target.value)} onBlur={convert} placeholder='{"name":"A","value":1}' rows={6} className="font-mono text-sm" />
        </div>
        <button type="button" onClick={convert} className="px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition">
          Convert to XML
        </button>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">XML output</label>
          <div className={`min-h-[120px] w-full rounded-2xl border px-4 py-4 text-sm font-mono whitespace-pre-wrap ${error ? 'border-error-500 bg-error-50 dark:bg-error-500/10 text-error-600' : 'border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-800 dark:text-gray-200'}`}>
            {error || output || 'XML will appear here.'}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
