'use client';

import { useMemo, useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ToolExample, ToolFaq } from '@/components/tools/ToolSeoBlocks';

function parseHex(hex: string) {
  const h = hex.trim().replace(/^#/, '');
  if (!/^[0-9a-f]{3}$|^[0-9a-f]{6}$/i.test(h)) return null;
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return { r, g, b, hex: `#${full.toLowerCase()}` };
}

export default function HexToRgbPage() {
  const [input, setInput] = useState('#3b82f6');

  const parsed = useMemo(() => parseHex(input), [input]);

  return (
    <ToolLayout
      title="HEX to RGB"
      description="Convert HEX color codes into RGB values."
      slug="hex-to-rgb"
      whatIs={
        <>
          <p>
            This HEX to RGB converter helps developers translate hex color codes
            (like <code>#ff0000</code>) into their RGB components for CSS,
            canvas, and design tools.
          </p>
          <ToolFaq />
        </>
      }
      howToUse={
        <ol className="list-decimal pl-5 space-y-1">
          <li>Paste a HEX color (3 or 6 digits)</li>
          <li>View the computed RGB values</li>
          <li>Copy the result</li>
        </ol>
      }
      exampleUsage={
        <ToolExample input={'#3b82f6'} output={'rgb(59, 130, 246)'} />
      }
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            HEX
          </label>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="#ff0000"
            className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono"
          />
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4">
          {parsed ? (
            <div className="grid gap-4 sm:grid-cols-[1fr_120px] items-start">
              <div className="space-y-2 font-mono text-sm text-gray-800 dark:text-gray-200">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">HEX:</span>{' '}
                  {parsed.hex}
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">RGB:</span>{' '}
                  {parsed.r}, {parsed.g}, {parsed.b}
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">CSS:</span>{' '}
                  rgb({parsed.r}, {parsed.g}, {parsed.b})
                </div>
              </div>
              <div
                className="h-24 w-full rounded-xl border border-gray-200 dark:border-white/10"
                style={{ backgroundColor: parsed.hex }}
              />
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter a valid hex color like <code>#ff0000</code> or{' '}
              <code>#f00</code>.
            </p>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}

