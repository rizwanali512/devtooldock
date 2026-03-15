'use client';

import { useMemo, useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function parseHex(hex: string) {
  const h = hex.trim().replace(/^#/, '');
  if (!/^[0-9a-f]{3}$|^[0-9a-f]{6}$/i.test(h)) return null;
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return { r, g, b };
}

function rgbToHex(r: number, g: number, b: number) {
  return (
    '#' +
    [r, g, b]
      .map((v) => clamp(Math.round(v), 0, 255).toString(16).padStart(2, '0'))
      .join('')
  );
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  const d = max - min;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r:
        h = ((g - b) / d) % 6;
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb(h: number, s: number, l: number) {
  h = ((h % 360) + 360) % 360;
  s = clamp(s, 0, 100) / 100;
  l = clamp(l, 0, 100) / 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let rp = 0,
    gp = 0,
    bp = 0;
  if (h < 60) [rp, gp, bp] = [c, x, 0];
  else if (h < 120) [rp, gp, bp] = [x, c, 0];
  else if (h < 180) [rp, gp, bp] = [0, c, x];
  else if (h < 240) [rp, gp, bp] = [0, x, c];
  else if (h < 300) [rp, gp, bp] = [x, 0, c];
  else [rp, gp, bp] = [c, 0, x];
  return {
    r: Math.round((rp + m) * 255),
    g: Math.round((gp + m) * 255),
    b: Math.round((bp + m) * 255),
  };
}

export default function ColorConverterPage() {
  const [hex, setHex] = useState('#3b82f6');
  const [rgb, setRgb] = useState('59, 130, 246');
  const [hsl, setHsl] = useState('217, 91%, 60%');

  const computed = useMemo(() => {
    const hexRgb = parseHex(hex);
    if (hexRgb) {
      const hslObj = rgbToHsl(hexRgb.r, hexRgb.g, hexRgb.b);
      return {
        ...hexRgb,
        hex: rgbToHex(hexRgb.r, hexRgb.g, hexRgb.b),
        hsl: hslObj,
        source: 'hex' as const,
      };
    }

    const rgbParts = rgb
      .split(/[,\s]+/)
      .filter(Boolean)
      .slice(0, 3)
      .map((p) => Number(p));
    if (rgbParts.length === 3 && rgbParts.every((n) => Number.isFinite(n))) {
      const [r, g, b] = rgbParts;
      const hslObj = rgbToHsl(r, g, b);
      return { r, g, b, hex: rgbToHex(r, g, b), hsl: hslObj, source: 'rgb' as const };
    }

    const hslNums = hsl
      .replace(/%/g, '')
      .split(/[,\s]+/)
      .filter(Boolean)
      .slice(0, 3)
      .map((p) => Number(p));
    if (hslNums.length === 3 && hslNums.every((n) => Number.isFinite(n))) {
      const [hh, ss, ll] = hslNums;
      const rgbObj = hslToRgb(hh, ss, ll);
      const hslObj = { h: Math.round(hh), s: Math.round(ss), l: Math.round(ll) };
      return { ...rgbObj, hex: rgbToHex(rgbObj.r, rgbObj.g, rgbObj.b), hsl: hslObj, source: 'hsl' as const };
    }

    return null;
  }, [hex, rgb, hsl]);

  return (
    <ToolLayout
      title="Color Converter"
      description="Convert between HEX, RGB, and HSL color formats."
      slug="color-converter"
      whatIs={<p>Color values can be represented in multiple formats. This tool lets you paste HEX, RGB, or HSL and see the equivalent values instantly.</p>}
      exampleUsage={
        <pre className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm overflow-x-auto">{`HEX: #3b82f6\nRGB: 59, 130, 246\nHSL: 217, 91%, 60%`}</pre>
      }
      howToUse={
        <>
          <p className="mb-2">1. Enter a value in any field (HEX, RGB, or HSL).</p>
          <p className="mb-2">2. The converter derives the other formats.</p>
          <p>3. Use the preview swatch to confirm the color visually.</p>
        </>
      }
    >
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              HEX
            </label>
            <input
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              placeholder="#ff0000"
              className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              RGB
            </label>
            <input
              value={rgb}
              onChange={(e) => setRgb(e.target.value)}
              placeholder="255, 0, 0"
              className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              HSL
            </label>
            <input
              value={hsl}
              onChange={(e) => setHsl(e.target.value)}
              placeholder="0, 100%, 50%"
              className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4">
          {computed ? (
            <div className="grid gap-4 sm:grid-cols-[1fr_120px] items-start">
              <div className="space-y-2 font-mono text-sm text-gray-800 dark:text-gray-200">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">HEX:</span> {computed.hex}
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">RGB:</span>{' '}
                  {computed.r}, {computed.g}, {computed.b}
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">HSL:</span>{' '}
                  {computed.hsl.h}, {computed.hsl.s}%, {computed.hsl.l}%
                </div>
              </div>
              <div
                className="h-24 w-full rounded-xl border border-gray-200 dark:border-white/10"
                style={{ backgroundColor: computed.hex }}
              />
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter a valid HEX/RGB/HSL value to see conversions.
            </p>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}

