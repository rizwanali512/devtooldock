'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ToolExample, ToolFaq } from '@/components/tools/ToolSeoBlocks';
import { md5 } from '@/lib/md5';

async function sha256Hex(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export default function ChecksumGeneratorPage() {
  const [input, setInput] = useState('');
  const [sha256Hash, setSha256Hash] = useState('');
  const [md5Hash, setMd5Hash] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!input) {
      setSha256Hash('');
      setMd5Hash('');
      return;
    }
    setLoading(true);
    try {
      setSha256Hash(await sha256Hex(input));
      setMd5Hash(md5(input));
    } catch {
      setSha256Hash('');
      setMd5Hash('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="Checksum Generator"
      description="Generate SHA-256 and MD5 checksums for text."
      slug="checksum-generator"
      whatIs={
        <>
          <p>Compute SHA-256 and MD5 hashes of the input text. Useful for checksums and non-secret verification.</p>
          <ToolFaq />
        </>
      }
      howToUse={
        <ol className="list-decimal pl-5 space-y-1">
          <li>Enter or paste text</li>
          <li>Click Generate to get both hashes</li>
        </ol>
      }
      exampleUsage={<ToolExample input="hello" output="SHA-256 + MD5 hex" />}
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Input</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={4} className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90" placeholder="Text to hash" />
        </div>
        <button type="button" onClick={generate} disabled={loading} className="rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 text-sm font-medium hover:opacity-90 disabled:opacity-50">
          {loading ? 'Generating…' : 'Generate'}
        </button>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">SHA-256</label>
            <pre className="w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm font-mono text-gray-800 dark:text-gray-200 break-all">
              {sha256Hash || '—'}
            </pre>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">MD5</label>
            <pre className="w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm font-mono text-gray-800 dark:text-gray-200 break-all">
              {md5Hash || '—'}
            </pre>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
