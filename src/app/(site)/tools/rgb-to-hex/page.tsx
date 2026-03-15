'use client';

import { useMemo, useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ToolExample, ToolFaq } from '@/components/tools/ToolSeoBlocks';

function rgbToHex(r: number, g: number, b: number) {
  const clamp = (n: number) => Math.min(255, Math.max(0, Math.round(n)));
  return '#' + [r, g, b].map((n) => clamp(n).toString(16).padStart(2, '0')).join('');
}

export default function RgbToHexPage() {
  const [r, setR] = useState('59');
  const [g, setG] = useState('130');
  const [b, setB] = useState('246');

  const hex = useMemo(() => {
    const rn = Number(r);
    const gn = Number(g);
    const bn = Number(b);
    if (!Number.isFinite(rn) || !Number.isFinite(gn) || !Number.isFinite(bn)) return null;
    return rgbToHex(rn, gn, bn);
  }, [r, g, b]);

  return (
    <ToolLayout
      title="RGB to HEX"
      description="Convert RGB color values to HEX codes."
      slug="rgb-to-hex"
      whatIs={
        <>
          <p>Convert RGB (0–255) values into a single HEX color code for CSS and design tools.</p>
          <ToolFaq />
        </>
      }
      howToUse={
        <ol className="list-decimal pl-5 space-y-1">
          <li>Enter R, G, and B values (0–255)</li>
          <li>View the HEX code and preview</li>
          <li>Copy the result</li>
        </ol>
      }
      exampleUsage={<ToolExample input="59, 130, 246" output="#3b82f6" />}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">R</label>
            <input
              type="number"
              min={0}
              max={255}
              value={r}
              onChange={(e) => setR(e.target.value)}
              className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">G</label>
            <input
              type="number"
              min={0}
              max={255}
              value={g}
              onChange={(e) => setG(e.target.value)}
              className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">B</label>
            <input
              type="number"
              min={0}
              max={255}
              value={b}
              onChange={(e) => setB(e.target.value)}
              className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono"
            />
          </div>
        </div>
        <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 flex items-center gap-4">
          {hex && (
            <>
              <div className="h-16 w-24 rounded-xl border border-gray-200 dark:border-white/10" style={{ backgroundColor: hex }} />
              <div className="font-mono text-sm text-gray-800 dark:text-gray-200">{hex}</div>
            </>
          )}
          {!hex && <p className="text-sm text-gray-500 dark:text-gray-400">Enter valid R, G, B (0–255).</p>}
        </div>
      </div>
    </ToolLayout>
  );
}
