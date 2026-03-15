'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Textarea } from '@/components/ui/inputs/textarea';
import { md5 } from '@/lib/md5';

export default function Md5GeneratorPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const hash = () => {
    setOutput(input ? md5(input) : '');
  };

  return (
    <ToolLayout
      title="MD5 Generator"
      description="Compute MD5 hash of text. Not for security—use SHA-256 for that."
      slug="md5-generator"
      whatIs={<p>MD5 produces a 128-bit (32 hex character) hash. It is not secure for passwords or security-sensitive use; prefer SHA-256. MD5 is still used for checksums and non-security purposes.</p>}
      howToUse={
        <>
          <p className="mb-2">1. Type or paste text in the input.</p>
          <p>2. Click Hash to get the MD5 hash (hex).</p>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Input</label>
          <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Text to hash" rows={4} className="font-mono text-sm" />
        </div>
        <button type="button" onClick={hash} className="px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition">
          Hash
        </button>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">MD5 (hex)</label>
          <div className="min-h-[60px] w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm font-mono text-gray-800 dark:text-gray-200 break-all">
            {output || 'Hash will appear here.'}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
