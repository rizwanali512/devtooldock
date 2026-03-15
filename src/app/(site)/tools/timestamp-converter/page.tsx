'use client';

import { useMemo, useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';

function safeDateFromInput(value: string): Date | null {
  const v = value.trim();
  if (!v) return null;
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return null;
  return d;
}

function safeDateFromTimestamp(value: string): Date | null {
  const v = value.trim();
  if (!v) return null;
  const n = Number(v);
  if (!Number.isFinite(n)) return null;
  const ms = n < 1e12 ? n * 1000 : n; // seconds vs ms
  const d = new Date(ms);
  if (Number.isNaN(d.getTime())) return null;
  return d;
}

export default function TimestampConverterPage() {
  const [iso, setIso] = useState('');
  const [ts, setTs] = useState('');

  const fromIso = useMemo(() => safeDateFromInput(iso), [iso]);
  const fromTs = useMemo(() => safeDateFromTimestamp(ts), [ts]);

  const computed = useMemo(() => {
    const base = fromIso ?? fromTs;
    if (!base) return null;
    return {
      iso: base.toISOString(),
      local: base.toLocaleString(),
      seconds: Math.floor(base.getTime() / 1000),
      ms: base.getTime(),
    };
  }, [fromIso, fromTs]);

  return (
    <ToolLayout
      title="Timestamp Converter"
      description="Convert ISO date/time ↔ Unix timestamps. Supports seconds and milliseconds."
      slug="timestamp-converter"
      whatIs={<p>Converts between human-readable date/time (ISO 8601) and Unix timestamps. If a timestamp is less than 1e12 it’s treated as seconds; otherwise milliseconds.</p>}
      exampleUsage={
        <pre className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm overflow-x-auto">{`ISO: 2026-03-11T00:00:00.000Z\nSeconds: 1773187200\nMilliseconds: 1773187200000`}</pre>
      }
      howToUse={
        <>
          <p className="mb-2">1. Enter either an ISO date/time or a timestamp.</p>
          <p className="mb-2">2. The other formats are calculated automatically.</p>
          <p>3. For timestamps, you can paste seconds or milliseconds.</p>
        </>
      }
    >
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              ISO / date input
            </label>
            <input
              type="text"
              value={iso}
              onChange={(e) => setIso(e.target.value)}
              placeholder="2026-03-11T00:00:00Z"
              className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono"
            />
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Tip: ISO 8601, or any Date() parseable string.
            </p>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Timestamp (seconds or ms)
            </label>
            <input
              type="text"
              value={ts}
              onChange={(e) => setTs(e.target.value)}
              placeholder="1773187200"
              className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono"
            />
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Seconds if &lt; 1e12; otherwise milliseconds.
            </p>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Output
          </label>
          <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm">
            {computed ? (
              <div className="space-y-2 font-mono text-gray-800 dark:text-gray-200">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">ISO:</span> {computed.iso}
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Local:</span> {computed.local}
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Seconds:</span> {computed.seconds}
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Milliseconds:</span> {computed.ms}
                </div>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                Enter a valid ISO date/time or timestamp to see conversions.
              </p>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}

