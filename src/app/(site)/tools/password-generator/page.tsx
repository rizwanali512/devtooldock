'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { CopyToClipboard } from '@/components/copy-to-clipboard';

const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGITS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

function randomChoice(str: string): string {
  return str[Math.floor(Math.random() * str.length)];
}

function generatePassword(len: number, useUpper: boolean, useDigits: boolean, useSymbols: boolean): string {
  let pool = LOWER;
  if (useUpper) pool += UPPER;
  if (useDigits) pool += DIGITS;
  if (useSymbols) pool += SYMBOLS;
  const arr: string[] = [];
  arr.push(randomChoice(LOWER));
  if (useUpper) arr.push(randomChoice(UPPER));
  if (useDigits) arr.push(randomChoice(DIGITS));
  if (useSymbols) arr.push(randomChoice(SYMBOLS));
  while (arr.length < len) arr.push(pool[Math.floor(Math.random() * pool.length)]);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
}

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useDigits, setUseDigits] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState('');

  const generate = () => setPassword(generatePassword(length, useUpper, useDigits, useSymbols));

  return (
    <ToolLayout
      title="Password Generator"
      description="Generate secure random passwords with customizable length and character sets."
      slug="password-generator"
      whatIs={<p>Creates random passwords using the browser&apos;s secure random source. You can choose length and whether to include uppercase, digits, and symbols.</p>}
      howToUse={
        <>
          <p className="mb-2">1. Set length and options (uppercase, digits, symbols).</p>
          <p>2. Click Generate. Copy the password to use it.</p>
        </>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">Length</span>
            <input
              type="number"
              min={8}
              max={64}
              value={length}
              onChange={(e) => setLength(Number(e.target.value) || 16)}
              className="w-20 rounded-xl border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm dark:bg-white/5 dark:text-white"
            />
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <input type="checkbox" checked={useUpper} onChange={(e) => setUseUpper(e.target.checked)} />
            Uppercase
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <input type="checkbox" checked={useDigits} onChange={(e) => setUseDigits(e.target.checked)} />
            Digits
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <input type="checkbox" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} />
            Symbols
          </label>
        </div>
        <button type="button" onClick={generate} className="px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition">
          Generate Password
        </button>
        {password && (
          <div className="flex items-center justify-between gap-2 flex-wrap rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4">
            <code className="text-sm break-all font-mono">{password}</code>
            <CopyToClipboard text={password} />
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
