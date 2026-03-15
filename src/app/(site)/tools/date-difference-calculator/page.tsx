'use client';

import { useMemo, useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ToolExample, ToolFaq } from '@/components/tools/ToolSeoBlocks';

function diffMs(a: Date, b: Date) {
  const ms = Math.abs(b.getTime() - a.getTime());
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  return { ms, seconds, minutes, hours, days };
}

export default function DateDifferenceCalculatorPage() {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const result = useMemo(() => {
    const a = start.trim() ? new Date(start) : null;
    const b = end.trim() ? new Date(end) : null;
    if (!a || !b) return null;
    if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return null;
    return diffMs(a, b);
  }, [start, end]);

  return (
    <ToolLayout
      title="Date Difference Calculator"
      description="Calculate the difference between two dates (days, hours, minutes, seconds)."
      slug="date-difference-calculator"
      whatIs={
        <>
          <p>
            This Date Difference Calculator helps developers quickly measure the
            time between two dates—for debugging, reporting, or validating time
            windows.
          </p>
          <ToolFaq />
        </>
      }
      howToUse={
        <ol className="list-decimal pl-5 space-y-1">
          <li>Enter a start date/time</li>
          <li>Enter an end date/time</li>
          <li>View the calculated difference</li>
          <li>Copy the values you need</li>
        </ol>
      }
      exampleUsage={
        <ToolExample
          input={'Start: 2026-03-10T00:00:00Z\nEnd: 2026-03-11T12:00:00Z'}
          output={'Difference: 1 day 12 hours'}
        />
      }
    >
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Start
            </label>
            <input
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              End
            </label>
            <input
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm">
          {result ? (
            <div className="space-y-2 font-mono text-gray-800 dark:text-gray-200">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Days:</span>{' '}
                {result.days}
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Hours:</span>{' '}
                {result.hours}
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">
                  Minutes:
                </span>{' '}
                {result.minutes}
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">
                  Seconds:
                </span>{' '}
                {result.seconds}
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">ms:</span>{' '}
                {result.ms}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              Enter valid start and end dates to see the difference.
            </p>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}

