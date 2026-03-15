'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Textarea } from '@/components/ui/inputs/textarea';

function explainRegex(pattern: string, flags: string): string {
  if (!pattern.trim()) return 'Enter a regex pattern to see an explanation.';
  try {
    new RegExp(pattern, flags);
  } catch (e) {
    return `Invalid regex: ${e instanceof Error ? e.message : 'Unknown error'}`;
  }
  const parts: string[] = [];
  parts.push(`Pattern: /${pattern.replace(/\//g, '\\/')}/${flags || '(no flags)'}`);
  if (flags) {
    const flagDesc: string[] = [];
    if (flags.includes('g')) flagDesc.push('global (all matches)');
    if (flags.includes('i')) flagDesc.push('case-insensitive');
    if (flags.includes('m')) flagDesc.push('multiline (^ and $ per line)');
    if (flags.includes('s')) flagDesc.push('dotAll (. matches newline)');
    if (flags.includes('u')) flagDesc.push('unicode');
    if (flagDesc.length) parts.push('Flags: ' + flagDesc.join(', '));
  }
  const p = pattern;
  const tokens: string[] = [];
  if (p.includes('^')) tokens.push('^ = start of string (or line with m)');
  if (p.includes('$')) tokens.push('$ = end of string (or line with m)');
  if (p.includes('\\d')) tokens.push('\\d = digit [0-9]');
  if (p.includes('\\D')) tokens.push('\\D = non-digit');
  if (p.includes('\\w')) tokens.push('\\w = word char [a-zA-Z0-9_]');
  if (p.includes('\\W')) tokens.push('\\W = non-word char');
  if (p.includes('\\s')) tokens.push('\\s = whitespace');
  if (p.includes('\\S')) tokens.push('\\S = non-whitespace');
  if (p.includes('.')) tokens.push('. = any char (except newline by default)');
  if (p.includes('[') && p.includes(']')) tokens.push('[] = character class (one of)');
  if (p.includes('+')) tokens.push('+ = one or more');
  if (p.includes('*')) tokens.push('* = zero or more');
  if (p.includes('?')) tokens.push('? = zero or one (or non-greedy)');
  if (p.includes('{')) tokens.push('{} = exact/range repetition');
  if (p.includes('(') && p.includes(')')) tokens.push('() = capturing group');
  if (p.includes('|')) tokens.push('| = alternation (or)');
  if (tokens.length) parts.push('Common parts: ' + tokens.join('; '));
  return parts.join('\n');
}

export default function RegexExplainerPage() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [explanation, setExplanation] = useState('');

  const handlePatternChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value;
    setPattern(v);
    setExplanation(explainRegex(v, flags));
  };
  const handleFlagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setFlags(v);
    setExplanation(explainRegex(pattern, v));
  };
  const handleBlur = () => setExplanation(explainRegex(pattern, flags));

  return (
    <ToolLayout
      title="Regex Explainer"
      description="Explain regular expressions in plain language."
      slug="regex-explainer"
      whatIs={
        <p>
          Paste a regex pattern and see a short explanation of its structure and
          common tokens (anchors, character classes, quantifiers, etc.).
        </p>
      }
      howToUse={
        <>
          <p className="mb-2">1. Enter a regex pattern (without slashes).</p>
          <p className="mb-2">2. Optionally set flags (e.g. g, i, m).</p>
          <p>3. Read the explanation below.</p>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Regex pattern
          </label>
          <Textarea
            value={pattern}
            onChange={handlePatternChange}
            onBlur={handleBlur}
            placeholder="e.g. ^[a-z]+@[a-z]+\.com$"
            rows={3}
            className="font-mono text-sm"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Flags (e.g. g, i, m)
          </label>
          <input
            type="text"
            value={flags}
            onChange={handleFlagsChange}
            onBlur={handleBlur}
            placeholder="g"
            className="w-24 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 font-mono text-sm"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Explanation
          </label>
          <pre className="min-h-[120px] w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
            {explanation}
          </pre>
        </div>
      </div>
    </ToolLayout>
  );
}
