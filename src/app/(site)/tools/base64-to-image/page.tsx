'use client';

import { useMemo, useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Textarea } from '@/components/ui/inputs/textarea';

function toDataUrl(input: string, mime: string) {
  const trimmed = input.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('data:image/')) return trimmed;
  return `data:${mime};base64,${trimmed}`;
}

export default function Base64ToImagePage() {
  const [input, setInput] = useState('');
  const [mime, setMime] = useState('image/png');

  const src = useMemo(() => toDataUrl(input, mime), [input, mime]);

  return (
    <ToolLayout
      title="Base64 to Image"
      description="Preview a Base64 string as an image (supports data URLs too)."
      slug="base64-to-image"
      whatIs={<p>Converts Base64-encoded image data into a browser-previewable image. If you paste a full <code>data:image/*;base64,...</code> URL it will be used directly.</p>}
      exampleUsage={
        <pre className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm overflow-x-auto">{`Paste either:\n- a data URL (data:image/png;base64,...) OR\n- raw base64 data + choose a MIME type`}</pre>
      }
      howToUse={
        <>
          <p className="mb-2">1. Paste your Base64 string (or data URL).</p>
          <p className="mb-2">2. If it’s raw Base64, choose the correct image type.</p>
          <p>3. The preview updates automatically.</p>
        </>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-3 items-end">
          <div className="w-full sm:w-auto">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Image type (for raw Base64)
            </label>
            <select
              value={mime}
              onChange={(e) => setMime(e.target.value)}
              className="w-full sm:w-56 rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90"
            >
              <option value="image/png">PNG</option>
              <option value="image/jpeg">JPEG</option>
              <option value="image/webp">WEBP</option>
              <option value="image/gif">GIF</option>
              <option value="image/svg+xml">SVG</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Base64 / data URL
          </label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste base64 here..."
            rows={7}
            className="font-mono text-sm"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Preview
          </label>
          <div className="min-h-[140px] w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4">
            {src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt="Base64 preview"
                className="max-w-full h-auto rounded-xl"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Paste Base64 to preview the image.
              </p>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}

