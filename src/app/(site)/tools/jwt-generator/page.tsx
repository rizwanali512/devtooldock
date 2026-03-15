'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ToolExample, ToolFaq } from '@/components/tools/ToolSeoBlocks';

function base64UrlEncode(data: ArrayBuffer | string): string {
  const str = typeof data === 'string' ? data : String.fromCharCode(...new Uint8Array(data));
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function signHS256(message: string, secret: string): Promise<ArrayBuffer> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  return crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));
}

export default function JwtGeneratorPage() {
  const [headerJson, setHeaderJson] = useState('{"alg":"HS256","typ":"JWT"}');
  const [payloadJson, setPayloadJson] = useState('{"sub":"user123","iat":1516239022}');
  const [secret, setSecret] = useState('your-256-bit-secret');
  const [jwt, setJwt] = useState('');
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    setError(null);
    try {
      const header = JSON.parse(headerJson);
      const payload = JSON.parse(payloadJson);
      const headerB64 = base64UrlEncode(JSON.stringify(header));
      const payloadB64 = base64UrlEncode(JSON.stringify(payload));
      const message = `${headerB64}.${payloadB64}`;
      const sig = await signHS256(message, secret);
      const sigB64 = base64UrlEncode(sig);
      setJwt(`${message}.${sigB64}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid input');
      setJwt('');
    }
  };

  return (
    <ToolLayout
      title="JWT Generator"
      description="Create a signed JWT (HS256) from header and payload."
      slug="jwt-generator"
      whatIs={
        <>
          <p>Build a JWT with custom header and payload, signed with HS256. For testing only; keep the secret secure in production.</p>
          <ToolFaq />
        </>
      }
      howToUse={
        <ol className="list-decimal pl-5 space-y-1">
          <li>Edit header and payload JSON</li>
          <li>Enter the HMAC secret</li>
          <li>Click Generate to get the signed JWT</li>
        </ol>
      }
      exampleUsage={<ToolExample input="HS256, payload" output="eyJhbGciOiJIUzI1NiJ9..." />}
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Header (JSON)</label>
          <textarea value={headerJson} onChange={(e) => setHeaderJson(e.target.value)} rows={3} className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Payload (JSON)</label>
          <textarea value={payloadJson} onChange={(e) => setPayloadJson(e.target.value)} rows={4} className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Secret</label>
          <input type="password" value={secret} onChange={(e) => setSecret(e.target.value)} className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90" placeholder="HS256 secret" autoComplete="off" />
        </div>
        <button type="button" onClick={generate} className="rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 text-sm font-medium hover:opacity-90">
          Generate JWT
        </button>
        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">JWT</label>
          <pre className="w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm font-mono text-gray-800 dark:text-gray-200 break-all">
            {jwt || '—'}
          </pre>
        </div>
      </div>
    </ToolLayout>
  );
}
