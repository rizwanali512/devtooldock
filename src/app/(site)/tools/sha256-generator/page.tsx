'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Textarea } from '@/components/ui/inputs/textarea';

async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export default function Sha256GeneratorPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const hash = async () => {
    if (!input) {
      setOutput('');
      return;
    }
    setLoading(true);
    try {
      setOutput(await sha256(input));
    } catch {
      setOutput('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="SHA256 Generator"
      description="Compute SHA-256 hash of text. Uses Web Crypto API in the browser."
      slug="sha256-generator"
      whatIs={<p>SHA-256 is a cryptographic hash function that produces a 256-bit (64 hex character) hash. It is one-way: you cannot recover the input from the hash.</p>}
      howToUse={
        <>
          <p className="mb-2">1. Type or paste text in the input.</p>
          <p>2. Click Hash to compute the SHA-256 hash (hex).</p>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Input</label>
          <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Text to hash" rows={4} className="font-mono text-sm" />
        </div>
        <button type="button" onClick={hash} disabled={loading} className="px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition disabled:opacity-50">
          {loading ? 'Hashing…' : 'Hash'}
        </button>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">SHA-256 (hex)</label>
          <div className="min-h-[60px] w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm font-mono text-gray-800 dark:text-gray-200 break-all">
            {output || 'Hash will appear here.'}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
