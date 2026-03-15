'use client';

import { useMemo, useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ToolExample, ToolFaq } from '@/components/tools/ToolSeoBlocks';

export default function GradientGeneratorPage() {
  const [angle, setAngle] = useState('90');
  const [color1, setColor1] = useState('#3b82f6');
  const [color2, setColor2] = useState('#8b5cf6');

  const css = useMemo(
    () => `linear-gradient(${angle}deg, ${color1}, ${color2})`,
    [angle, color1, color2]
  );

  return (
    <ToolLayout
      title="Gradient Generator"
      description="Generate CSS linear gradients and preview them."
      slug="gradient-generator"
      whatIs={
        <>
          <p>Build a simple two-color linear gradient and get the CSS. Adjust angle and colors, then copy the rule.</p>
          <ToolFaq />
        </>
      }
      howToUse={
        <ol className="list-decimal pl-5 space-y-1">
          <li>Set gradient angle (degrees)</li>
          <li>Pick or enter two colors</li>
          <li>Copy the generated CSS</li>
        </ol>
      }
      exampleUsage={<ToolExample input="90deg, #3b82f6, #8b5cf6" output="linear-gradient(90deg, #3b82f6, #8b5cf6)" />}
    >
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Angle (deg)</label>
            <input
              type="number"
              value={angle}
              onChange={(e) => setAngle(e.target.value)}
              className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Color 1</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                className="h-10 w-14 cursor-pointer rounded-lg border"
              />
              <input
                type="text"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                className="flex-1 rounded-3xl border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm dark:bg-white/5 dark:text-white/90 font-mono"
              />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Color 2</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                className="h-10 w-14 cursor-pointer rounded-lg border"
              />
              <input
                type="text"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                className="flex-1 rounded-3xl border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm dark:bg-white/5 dark:text-white/90 font-mono"
              />
            </div>
          </div>
        </div>
        <div className="h-32 w-full rounded-2xl border border-gray-200 dark:border-white/10" style={{ background: css }} />
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">CSS</label>
          <pre className="w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm font-mono text-gray-800 dark:text-gray-200 break-all">
            background: {css};
          </pre>
        </div>
      </div>
    </ToolLayout>
  );
}
