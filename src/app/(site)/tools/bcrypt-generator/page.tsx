'use client';

import { useState } from 'react';
import bcrypt from 'bcryptjs';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ToolExample, ToolFaq } from '@/components/tools/ToolSeoBlocks';

export default function BcryptGeneratorPage() {
  const [password, setPassword] = useState('mySecretPassword');
  const [rounds, setRounds] = useState(10);
  const [hash, setHash] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!password.trim()) {
      setHash('');
      return;
    }
    setLoading(true);
    try {
      const salt = await bcrypt.genSalt(Math.min(12, Math.max(4, rounds)));
      const h = await bcrypt.hash(password, salt);
      setHash(h);
    } catch {
      setHash('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="bcrypt Generator"
      description="Generate bcrypt hashes in the browser for testing."
      slug="bcrypt-generator"
      whatIs={
        <>
          <p>Hash a password with bcrypt. Use for testing only; in production hash on the server. Higher rounds are slower and more secure.</p>
          <ToolFaq />
        </>
      }
      howToUse={
        <ol className="list-decimal pl-5 space-y-1">
          <li>Enter a password and rounds (4–12)</li>
          <li>Click Generate to get the bcrypt hash</li>
        </ol>
      }
      exampleUsage={<ToolExample input="password, 10 rounds" output="$2a$10$..." />}
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90"
            placeholder="Enter password"
            autoComplete="off"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Rounds (4–12)</label>
          <input
            type="number"
            min={4}
            max={12}
            value={rounds}
            onChange={(e) => setRounds(Number(e.target.value) || 10)}
            className="w-24 rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90"
          />
        </div>
        <button
          type="button"
          onClick={generate}
          disabled={loading}
          className="rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 text-sm font-medium hover:opacity-90 disabled:opacity-50"
        >
          {loading ? 'Generating…' : 'Generate'}
        </button>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">bcrypt hash</label>
          <pre className="w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm font-mono text-gray-800 dark:text-gray-200 break-all">
            {hash || '—'}
          </pre>
        </div>
      </div>
    </ToolLayout>
  );
}
