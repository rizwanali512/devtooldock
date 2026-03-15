'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ToolExample, ToolFaq } from '@/components/tools/ToolSeoBlocks';

function hexToRgb(hex: string) {
  const h = hex.replace(/^#/, '');
  if (h.length !== 6) return null;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return { r, g, b };
}

export default function ColorPickerPage() {
  const [hex, setHex] = useState('#3b82f6');

  const rgb = hexToRgb(hex);

  return (
    <ToolLayout
      title="Color Picker"
      description="Pick a color and copy values in HEX, RGB, and CSS."
      slug="color-picker"
      whatIs={
        <>
          <p>Use the native color picker to choose a color and see HEX, RGB, and CSS values you can copy.</p>
          <ToolFaq />
        </>
      }
      howToUse={
        <ol className="list-decimal pl-5 space-y-1">
          <li>Use the color input to pick a color (or type a HEX code)</li>
          <li>View HEX, RGB, and css() values</li>
          <li>Copy the format you need</li>
        </ol>
      }
      exampleUsage={<ToolExample input="#3b82f6" output="rgb(59, 130, 246)" />}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Pick color</label>
            <input
              type="color"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              className="h-12 w-20 cursor-pointer rounded-xl border border-gray-300 dark:border-gray-700"
            />
          </div>
          <div className="flex-1 min-w-[140px]">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">HEX</label>
            <input
              type="text"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono"
            />
          </div>
        </div>
        <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm space-y-2">
          <div><span className="text-gray-500 dark:text-gray-400">HEX:</span> {hex}</div>
          {rgb && (
            <>
              <div><span className="text-gray-500 dark:text-gray-400">RGB:</span> {rgb.r}, {rgb.g}, {rgb.b}</div>
              <div><span className="text-gray-500 dark:text-gray-400">CSS:</span> rgb({rgb.r}, {rgb.g}, {rgb.b})</div>
            </>
          )}
        </div>
        <div className="h-24 w-full rounded-2xl border border-gray-200 dark:border-white/10" style={{ backgroundColor: hex }} />
      </div>
    </ToolLayout>
  );
}
