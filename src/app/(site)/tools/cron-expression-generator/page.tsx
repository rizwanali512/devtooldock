'use client';

import { useMemo, useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';

type Preset = 'every-minute' | 'hourly' | 'daily' | 'weekly' | 'monthly';

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

export default function CronExpressionGeneratorPage() {
  const [preset, setPreset] = useState<Preset>('daily');
  const [minute, setMinute] = useState('0');
  const [hour, setHour] = useState('9');
  const [dayOfMonth, setDayOfMonth] = useState('1');
  const [dayOfWeek, setDayOfWeek] = useState('1'); // 0=Sun

  const cron = useMemo(() => {
    if (preset === 'every-minute') return '* * * * *';
    if (preset === 'hourly') return `${minute} * * * *`;
    if (preset === 'daily') return `${minute} ${hour} * * *`;
    if (preset === 'weekly') return `${minute} ${hour} * * ${dayOfWeek}`;
    return `${minute} ${hour} ${dayOfMonth} * *`;
  }, [preset, minute, hour, dayOfMonth, dayOfWeek]);

  const human = useMemo(() => {
    const m = Number(minute);
    const h = Number(hour);
    const time = Number.isFinite(m) && Number.isFinite(h) ? `${pad2(h)}:${pad2(m)}` : '';
    switch (preset) {
      case 'every-minute':
        return 'Runs every minute.';
      case 'hourly':
        return `Runs hourly at minute ${minute}.`;
      case 'daily':
        return `Runs daily at ${time || 'the specified time'}.`;
      case 'weekly':
        return `Runs weekly at ${time || 'the specified time'} on day-of-week ${dayOfWeek} (0=Sun).`;
      case 'monthly':
        return `Runs monthly at ${time || 'the specified time'} on day ${dayOfMonth}.`;
    }
  }, [preset, minute, hour, dayOfMonth, dayOfWeek]);

  return (
    <ToolLayout
      title="Cron Expression Generator"
      description="Generate a 5-field cron expression (minute hour day month weekday)."
      slug="cron-expression-generator"
      whatIs={<p>Cron expressions are used by schedulers (Linux cron, many job runners) to run tasks on a repeating schedule.</p>}
      exampleUsage={
        <pre className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm overflow-x-auto">{`Daily at 09:00 → 0 9 * * *\nWeekly at 09:00 Mon → 0 9 * * 1`}</pre>
      }
      howToUse={
        <>
          <p className="mb-2">1. Pick a preset (daily/weekly/monthly).</p>
          <p className="mb-2">2. Set time fields (minute/hour).</p>
          <p>3. Copy the generated cron expression.</p>
        </>
      }
    >
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Preset
            </label>
            <select
              value={preset}
              onChange={(e) => setPreset(e.target.value as Preset)}
              className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90"
            >
              <option value="every-minute">Every minute</option>
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Minute
              </label>
              <input
                value={minute}
                onChange={(e) => setMinute(e.target.value)}
                className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono"
                placeholder="0"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Hour
              </label>
              <input
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono"
                placeholder="9"
              />
            </div>
          </div>
        </div>

        {(preset === 'weekly' || preset === 'monthly') && (
          <div className="grid gap-4 sm:grid-cols-2">
            {preset === 'weekly' ? (
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Day of week (0=Sun)
                </label>
                <input
                  value={dayOfWeek}
                  onChange={(e) => setDayOfWeek(e.target.value)}
                  className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono"
                  placeholder="1"
                />
              </div>
            ) : (
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Day of month (1–31)
                </label>
                <input
                  value={dayOfMonth}
                  onChange={(e) => setDayOfMonth(e.target.value)}
                  className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono"
                  placeholder="1"
                />
              </div>
            )}
          </div>
        )}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Cron expression
          </label>
          <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm font-mono text-gray-800 dark:text-gray-200 break-all">
            {cron}
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{human}</p>
        </div>
      </div>
    </ToolLayout>
  );
}

