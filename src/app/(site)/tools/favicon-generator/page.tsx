'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ToolExample, ToolFaq } from '@/components/tools/ToolSeoBlocks';

const SIZE = 32;

function generateFaviconDataUrl(text: string, bg: string, fg: string): string {
  const canvas = typeof document === 'undefined' ? null : document.createElement('canvas');
  if (!canvas) return '';
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, SIZE, SIZE);
  ctx.fillStyle = fg;
  ctx.font = 'bold 18px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const char = (text || '?').charAt(0).toUpperCase();
  ctx.fillText(char, SIZE / 2, SIZE / 2);
  return canvas.toDataURL('image/png');
}

export default function FaviconGeneratorPage() {
  const [text, setText] = useState('A');
  const [bg, setBg] = useState('#3b82f6');
  const [fg, setFg] = useState('#ffffff');

  const dataUrl = useMemo(() => {
    if (typeof document === 'undefined') return '';
    return generateFaviconDataUrl(text, bg, fg);
  }, [text, bg, fg]);

  return (
    <ToolLayout
      title="Favicon Generator"
      description="Generate a simple favicon from a letter or emoji."
      slug="favicon-generator"
      whatIs={
        <>
          <p>Create a small favicon (32×32) with one character and custom background/foreground colors. Output is a data URL you can use in &lt;link rel=&quot;icon&quot;&gt;.</p>
          <ToolFaq />
        </>
      }
      howToUse={
        <ol className="list-decimal pl-5 space-y-1">
          <li>Enter a letter or emoji</li>
          <li>Pick background and text colors</li>
          <li>Copy the data URL or use the preview</li>
        </ol>
      }
      exampleUsage={<ToolExample input="A, blue bg" output="data:image/png;base64,..." />}
    >
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Character</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={2}
              className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 text-center text-xl"
              placeholder="A"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Background</label>
            <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-10 w-full rounded-xl border cursor-pointer" />
            <input type="text" value={bg} onChange={(e) => setBg(e.target.value)} className="mt-1 w-full rounded-2xl border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm font-mono dark:bg-white/5 dark:text-white/90" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Text color</label>
            <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="h-10 w-full rounded-xl border cursor-pointer" />
            <input type="text" value={fg} onChange={(e) => setFg(e.target.value)} className="mt-1 w-full rounded-2xl border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm font-mono dark:bg-white/5 dark:text-white/90" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="rounded-xl border-2 border-gray-200 dark:border-white/10 overflow-hidden bg-white dark:bg-gray-900" style={{ width: SIZE * 2, height: SIZE * 2 }}>
            {dataUrl && <Image src={dataUrl} alt="Favicon preview" width={SIZE * 2} height={SIZE * 2} className="w-full h-full object-contain" unoptimized />}
          </div>
          <div className="flex-1 min-w-0">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Data URL</label>
            <pre className="w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-3 text-xs font-mono text-gray-800 dark:text-gray-200 break-all max-h-24 overflow-auto">
              {dataUrl || '—'}
            </pre>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
