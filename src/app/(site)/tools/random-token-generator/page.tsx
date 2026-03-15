'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ToolExample, ToolFaq } from '@/components/tools/ToolSeoBlocks';

function randomHex(bytes: number): string {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return Array.from(arr)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function randomBase64(bytes: number): string {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return btoa(String.fromCharCode(...arr)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export default function RandomTokenGeneratorPage() {
  const [format, setFormat] = useState<'hex' | 'base64url'>('hex');
  const [length, setLength] = useState(32);
  const [tokens, setTokens] = useState<string[]>([]);

  const generate = () => {
    const bytes = Math.min(256, Math.max(8, Math.floor(length / 2)));
    const list: string[] = [];
    for (let i = 0; i < 5; i++) {
      list.push(format === 'hex' ? randomHex(bytes) : randomBase64(bytes));
    }
    setTokens(list);
  };

  return (
    <ToolLayout
      title="Random Token Generator"
      description="Generate secure random tokens for testing."
      slug="random-token-generator"
      whatIs={
        <>
          <p>Generate cryptographically random tokens in hex or base64url. Uses the browser&apos;s Web Crypto API.</p>
          <ToolFaq />
        </>
      }
      howToUse={
        <ol className="list-decimal pl-5 space-y-1">
          <li>Choose format (hex or base64url) and length</li>
          <li>Click Generate to get 5 tokens</li>
        </ol>
      }
      exampleUsage={<ToolExample input="hex 32 bytes" output="a1b2c3..." />}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Format</label>
            <select value={format} onChange={(e) => setFormat(e.target.value as 'hex' | 'base64url')} className="rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90">
              <option value="hex">Hex</option>
              <option value="base64url">Base64 URL-safe</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Length (hex chars / approx bytes)</label>
            <input type="number" min={16} max={512} value={length} onChange={(e) => setLength(Number(e.target.value) || 32)} className="w-28 rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90" />
          </div>
        </div>
        <button type="button" onClick={generate} className="rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 text-sm font-medium hover:opacity-90">
          Generate 5 tokens
        </button>
        {tokens.length > 0 && (
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Tokens</label>
            <div className="space-y-2">
              {tokens.map((t, i) => (
                <pre key={i} className="w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-3 text-sm font-mono text-gray-800 dark:text-gray-200 break-all">
                  {t}
                </pre>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
