'use client';

import { useMemo, useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ToolExample, ToolFaq } from '@/components/tools/ToolSeoBlocks';

export default function CssShadowGeneratorPage() {
  const [x, setX] = useState('0');
  const [y, setY] = useState('4');
  const [blur, setBlur] = useState('12');
  const [spread, setSpread] = useState('0');
  const [color, setColor] = useState('#00000020');

  const css = useMemo(
    () => `box-shadow: ${x}px ${y}px ${blur}px ${spread}px ${color};`,
    [x, y, blur, spread, color]
  );

  const style = useMemo(
    () => ({ boxShadow: `${x}px ${y}px ${blur}px ${spread}px ${color}` }),
    [x, y, blur, spread, color]
  );

  return (
    <ToolLayout
      title="CSS Shadow Generator"
      description="Generate CSS box-shadow values with a live preview."
      slug="css-shadow-generator"
      whatIs={
        <>
          <p>Adjust offset, blur, spread, and color to build a box-shadow and copy the CSS.</p>
          <ToolFaq />
        </>
      }
      howToUse={
        <ol className="list-decimal pl-5 space-y-1">
          <li>Set offset X, Y, blur, spread, and color</li>
          <li>Preview updates live</li>
          <li>Copy the CSS</li>
        </ol>
      }
      exampleUsage={<ToolExample input="0 4px 12px 0 #00000020" output="box-shadow: 0 4px 12px 0 #00000020;" />}
    >
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Offset X (px)</label>
            <input type="number" value={x} onChange={(e) => setX(e.target.value)} className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Offset Y (px)</label>
            <input type="number" value={y} onChange={(e) => setY(e.target.value)} className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Blur (px)</label>
            <input type="number" value={blur} onChange={(e) => setBlur(e.target.value)} className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Spread (px)</label>
            <input type="number" value={spread} onChange={(e) => setSpread(e.target.value)} className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Color</label>
            <input type="text" value={color} onChange={(e) => setColor(e.target.value)} placeholder="#00000020" className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono" />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="h-24 w-48 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-white/10" style={style} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">CSS</label>
          <pre className="w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm font-mono text-gray-800 dark:text-gray-200 break-all">
            {css}
          </pre>
        </div>
      </div>
    </ToolLayout>
  );
}
