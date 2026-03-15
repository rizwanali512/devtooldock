'use client';

import { useMemo, useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';

export default function UnixTimestampConverterPage() {
  const [seconds, setSeconds] = useState('');
  const [iso, setIso] = useState('');

  const dateFromSeconds = useMemo(() => {
    const n = Number(seconds.trim());
    if (!seconds.trim() || !Number.isFinite(n)) return null;
    const d = new Date(n * 1000);
    return Number.isNaN(d.getTime()) ? null : d;
  }, [seconds]);

  const dateFromIso = useMemo(() => {
    const v = iso.trim();
    if (!v) return null;
    const d = new Date(v);
    return Number.isNaN(d.getTime()) ? null : d;
  }, [iso]);

  const computed = useMemo(() => {
    const base = dateFromSeconds ?? dateFromIso;
    if (!base) return null;
    return {
      seconds: Math.floor(base.getTime() / 1000),
      iso: base.toISOString(),
      local: base.toLocaleString(),
    };
  }, [dateFromIso, dateFromSeconds]);

  return (
    <ToolLayout
      title="Unix Timestamp Converter"
      description="Convert Unix timestamps (seconds) to date/time and back."
      slug="unix-timestamp-converter"
      whatIs={<p>A Unix timestamp is the number of seconds since 1970-01-01 00:00:00 UTC. This tool converts seconds ↔ ISO/local date/time.</p>}
      exampleUsage={
        <pre className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm overflow-x-auto">{`Seconds: 1700000000\nISO: 2023-11-14T22:13:20.000Z`}</pre>
      }
      howToUse={
        <>
          <p className="mb-2">1. Enter seconds (Unix timestamp) or a date/time string.</p>
          <p>2. Output updates automatically.</p>
        </>
      }
    >
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Unix seconds
            </label>
            <input
              type="text"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
              placeholder="1700000000"
              className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Date/time input
            </label>
            <input
              type="text"
              value={iso}
              onChange={(e) => setIso(e.target.value)}
              placeholder="2026-03-11T00:00:00Z"
              className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm">
          {computed ? (
            <div className="space-y-2 font-mono text-gray-800 dark:text-gray-200">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Seconds:</span> {computed.seconds}
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">ISO:</span> {computed.iso}
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Local:</span> {computed.local}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              Enter a valid timestamp or date/time to see conversions.
            </p>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}

