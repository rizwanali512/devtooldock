'use client';

import { useMemo, useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ToolExample, ToolFaq } from '@/components/tools/ToolSeoBlocks';

function formatDate(d: Date, format: string) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const h = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  const s = String(d.getSeconds()).padStart(2, '0');
  if (format === 'iso') return d.toISOString();
  if (format === 'yyyy-mm-dd') return `${y}-${m}-${day}`;
  if (format === 'mm/dd/yyyy') return `${m}/${day}/${y}`;
  if (format === 'dd.mm.yyyy') return `${day}.${m}.${y}`;
  if (format === 'full') return d.toLocaleString();
  return d.toISOString();
}

export default function DateFormatConverterPage() {
  const [input, setInput] = useState('2026-03-11');

  const out = useMemo(() => {
    const d = new Date(input.trim());
    if (Number.isNaN(d.getTime())) return null;
    return {
      iso: formatDate(d, 'iso'),
      ymd: formatDate(d, 'yyyy-mm-dd'),
      us: formatDate(d, 'mm/dd/yyyy'),
      eu: formatDate(d, 'dd.mm.yyyy'),
      full: formatDate(d, 'full'),
    };
  }, [input]);

  return (
    <ToolLayout
      title="Date Format Converter"
      description="Convert dates between common formats (ISO, US, EU, etc.)."
      slug="date-format-converter"
      whatIs={
        <>
          <p>Convert a single date or datetime into ISO, yyyy-mm-dd, mm/dd/yyyy, and other common formats.</p>
          <ToolFaq />
        </>
      }
      howToUse={
        <ol className="list-decimal pl-5 space-y-1">
          <li>Enter a date or datetime string</li>
          <li>View the same moment in multiple formats</li>
          <li>Copy the format you need</li>
        </ol>
      }
      exampleUsage={<ToolExample input="2026-03-11" output="ISO: 2026-03-11T00:00:00.000Z" />}
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Date input</label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="2026-03-11 or 2026-03-11T12:00:00Z"
            className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono"
          />
        </div>
        <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm space-y-2">
          {out ? (
            <>
              <div><span className="text-gray-500 dark:text-gray-400">ISO:</span> {out.iso}</div>
              <div><span className="text-gray-500 dark:text-gray-400">yyyy-mm-dd:</span> {out.ymd}</div>
              <div><span className="text-gray-500 dark:text-gray-400">mm/dd/yyyy:</span> {out.us}</div>
              <div><span className="text-gray-500 dark:text-gray-400">dd.mm.yyyy:</span> {out.eu}</div>
              <div><span className="text-gray-500 dark:text-gray-400">Full:</span> {out.full}</div>
            </>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">Enter a valid date to see formats.</p>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
