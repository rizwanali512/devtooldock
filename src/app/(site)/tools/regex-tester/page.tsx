'use client';

import { useState, useCallback, useEffect } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Textarea } from '@/components/ui/inputs/textarea';
import { CopyToClipboard } from '@/components/copy-to-clipboard';

function HighlightMatches({ text, regex }: { text: string; regex: RegExp | null }) {
  if (!regex) return <>{text}</>;
  const parts: { str: string; match: boolean }[] = [];
  let lastIndex = 0;
  const re = new RegExp(regex.source, regex.flags + 'g');
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    parts.push({ str: text.slice(lastIndex, m.index), match: false });
    parts.push({ str: m[0], match: true });
    lastIndex = m.index + m[0].length;
  }
  parts.push({ str: text.slice(lastIndex), match: false });
  return (
    <>
      {parts.map((p, i) =>
        p.match ? (
          <mark key={i} className="bg-primary-200 dark:bg-primary-500/40 rounded px-0.5">
            {p.str}
          </mark>
        ) : (
          <span key={i}>{p.str}</span>
        )
      )}
    </>
  );
}

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [text, setText] = useState('');
  const [regex, setRegex] = useState<RegExp | null>(null);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(() => {
    if (!pattern.trim()) {
      setRegex(null);
      setError(null);
      return;
    }
    try {
      setRegex(new RegExp(pattern, flags));
      setError(null);
    } catch (e) {
      setRegex(null);
      setError(e instanceof Error ? e.message : 'Invalid regex');
    }
  }, [pattern, flags]);

  useEffect(() => {
    update();
  }, [update]);

  return (
    <ToolLayout
      title="Regex Tester"
      description="Test regular expressions and highlight matches in text."
      slug="regex-tester"
      whatIs={<p>Test JavaScript regular expressions against sample text. Matches are highlighted. Use for debugging patterns.</p>}
      howToUse={
        <>
          <p className="mb-2">1. Enter a regex pattern and optional flags (g, i, m).</p>
          <p>2. Enter or paste test text. Matches will be highlighted below.</p>
        </>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Pattern</label>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              onBlur={update}
              placeholder="e.g. \\d+ or [a-z]+"
              className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white font-mono"
            />
          </div>
          <div className="w-24">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Flags</label>
            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              onBlur={update}
              placeholder="gim"
              className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white font-mono"
            />
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Test string</label>
          <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Text to test" rows={5} className="font-mono text-sm" />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Result</label>
            {text ? (
              <CopyToClipboard text={text} toastMessage="Copied to clipboard" />
            ) : null}
          </div>
          <div className={`min-h-[80px] w-full rounded-2xl border px-4 py-4 text-sm ${error ? 'border-error-500 bg-error-50 dark:bg-error-500/10 text-error-600' : 'border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-800 dark:text-gray-200'}`}>
            {error ? error : text ? <HighlightMatches text={text} regex={regex} /> : 'Matches will be highlighted here.'}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
