'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Textarea } from '@/components/ui/inputs/textarea';

function elementToObject(el: Element): unknown {
  const obj: Record<string, unknown> = {};

  if (el.attributes.length) {
    obj['@attributes'] = Object.fromEntries(
      Array.from(el.attributes).map((a) => [a.name, a.value])
    );
  }

  const children = Array.from(el.children);
  const text = el.textContent?.trim() ?? '';

  if (children.length === 0) {
    if (Object.keys(obj).length === 0) return text;
    if (text) obj['#text'] = text;
    return obj;
  }

  for (const child of children) {
    const key = child.tagName;
    const value = elementToObject(child);
    const existing = obj[key];
    if (existing === undefined) obj[key] = value;
    else if (Array.isArray(existing)) existing.push(value);
    else obj[key] = [existing, value];
  }

  if (text) obj['#text'] = text;
  return obj;
}

function xmlToJson(xml: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'application/xml');
  const parseError = doc.getElementsByTagName('parsererror')[0];
  if (parseError) throw new Error('Invalid XML');

  const root = doc.documentElement;
  const result = { [root.tagName]: elementToObject(root) };
  return JSON.stringify(result, null, 2);
}

export default function XmlToJsonPage() {
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
      setOutput(xmlToJson(input));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid XML');
      setOutput('');
    }
  };

  return (
    <ToolLayout
      title="XML to JSON"
      description="Convert XML into JSON format in the browser."
      slug="xml-to-json"
      whatIs={
        <p>
          Converts an XML document into a JSON structure. Element names become
          keys, repeated elements become arrays, and attributes are stored under{' '}
          <code>@attributes</code>.
        </p>
      }
      exampleUsage={
        <pre className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm overflow-x-auto">{`Input: <user id=\"1\"><name>Ada</name></user>
Output: { \"user\": { \"@attributes\": { \"id\": \"1\" }, \"name\": \"Ada\" } }`}</pre>
      }
      howToUse={
        <>
          <p className="mb-2">1. Paste XML into the input.</p>
          <p className="mb-2">
            2. Click Convert (or blur the input) to generate JSON.
          </p>
          <p>
            3. If you see “Invalid XML”, check for unclosed tags or invalid
            characters.
          </p>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            XML input
          </label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onBlur={convert}
            placeholder="<root><item>1</item></root>"
            rows={8}
            className="font-mono text-sm"
          />
        </div>
        <button
          type="button"
          onClick={convert}
          className="px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition"
        >
          Convert to JSON
        </button>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            JSON output
          </label>
          <div
            className={`min-h-[140px] w-full rounded-2xl border px-4 py-4 text-sm font-mono whitespace-pre-wrap ${
              error
                ? 'border-error-500 bg-error-50 dark:bg-error-500/10 text-error-600'
                : 'border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-800 dark:text-gray-200'
            }`}
          >
            {error || output || 'Converted JSON will appear here.'}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}

