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

export default function HashComparePage() {
  const [text, setText] = useState('');
  const [hash, setHash] = useState('');
  const [algorithm, setAlgorithm] = useState<'sha256' | 'md5'>('sha256');
  const [result, setResult] = useState<'pending' | 'match' | 'no-match' | null>(null);
  const [loading, setLoading] = useState(false);

  const compare = async () => {
    const h = hash.trim().toLowerCase().replace(/\s/g, '');
    if (!text || !h) {
      setResult(null);
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const computed = algorithm === 'md5' ? md5(text) : await sha256Hex(text);
      setResult(computed === h ? 'match' : 'no-match');
    } catch {
      setResult('no-match');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="Hash Compare"
      description="Compare text to a hash using SHA-256 or MD5."
      slug="hash-compare"
      whatIs={
        <>
          <p>Enter plain text and a hash; we compute the hash of the text and compare. Supports SHA-256 and MD5 (hex).</p>
          <ToolFaq />
        </>
      }
      howToUse={
        <ol className="list-decimal pl-5 space-y-1">
          <li>Enter the text and the hash to compare against</li>
          <li>Select algorithm (SHA-256 or MD5)</li>
          <li>Click Compare</li>
        </ol>
      }
      exampleUsage={<ToolExample input="hello, 5d41402abc4b2a76b9719d911017c592" output="Match (MD5)" />}
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Text</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90" placeholder="Plain text" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Algorithm</label>
          <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value as 'sha256' | 'md5')} className="rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90">
            <option value="sha256">SHA-256</option>
            <option value="md5">MD5</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Hash to compare</label>
          <input type="text" value={hash} onChange={(e) => setHash(e.target.value)} className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono" placeholder="Paste hash (hex)" />
        </div>
        <button type="button" onClick={compare} disabled={loading} className="rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 text-sm font-medium hover:opacity-90 disabled:opacity-50">
          {loading ? 'Comparing…' : 'Compare'}
        </button>
        {result === 'match' && <p className="text-green-600 dark:text-green-400 font-medium">Match — the text hashes to the given hash.</p>}
        {result === 'no-match' && <p className="text-red-600 dark:text-red-400 font-medium">No match — the text does not produce this hash.</p>}
      </div>
    </ToolLayout>
  );
}
