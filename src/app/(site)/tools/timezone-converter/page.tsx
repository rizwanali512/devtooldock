'use client';

import { useMemo, useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ToolExample, ToolFaq } from '@/components/tools/ToolSeoBlocks';

const TZ_OPTIONS = ['UTC', 'America/New_York', 'America/Los_Angeles', 'Europe/London', 'Europe/Paris', 'Asia/Tokyo', 'Asia/Kolkata'];

export default function TimezoneConverterPage() {
  const [dateStr, setDateStr] = useState('2026-03-11T12:00:00');
  const [fromTz, setFromTz] = useState('UTC');
  const [toTz, setToTz] = useState('America/New_York');

  const result = useMemo(() => {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return null;
    try {
      const from = new Date(d.toLocaleString('en-US', { timeZone: fromTz }));
      const toStr = d.toLocaleString('en-US', { timeZone: toTz, dateStyle: 'full', timeStyle: 'long' });
      return { toStr, from };
    } catch {
      return null;
    }
  }, [dateStr, fromTz, toTz]);

  return (
    <ToolLayout
      title="Timezone Converter"
      description="Convert a date/time between common timezones."
      slug="timezone-converter"
      whatIs={
        <>
          <p>Convert a date and time from one timezone to another. Useful for scheduling and debugging across regions.</p>
          <ToolFaq />
        </>
      }
      howToUse={
        <ol className="list-decimal pl-5 space-y-1">
          <li>Enter or pick a date/time</li>
          <li>Select source and target timezone</li>
          <li>View the converted time</li>
        </ol>
      }
      exampleUsage={<ToolExample input="2026-03-11 12:00 UTC" output="2026-03-11 08:00 America/New_York" />}
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Date / time</label>
          <input
            type="datetime-local"
            value={dateStr}
            onChange={(e) => setDateStr(e.target.value)}
            className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">From timezone</label>
            <select
              value={fromTz}
              onChange={(e) => setFromTz(e.target.value)}
              className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90"
            >
              {TZ_OPTIONS.map((tz) => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">To timezone</label>
            <select
              value={toTz}
              onChange={(e) => setToTz(e.target.value)}
              className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90"
            >
              {TZ_OPTIONS.map((tz) => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm text-gray-800 dark:text-gray-200">
          {result ? result.toStr : 'Enter a valid date/time to see the conversion.'}
        </div>
      </div>
    </ToolLayout>
  );
}
