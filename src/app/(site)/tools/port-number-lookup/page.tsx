'use client';

import { useMemo, useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ToolExample, ToolFaq } from '@/components/tools/ToolSeoBlocks';

const PORTS: { port: number; name: string; protocol?: string }[] = [
  { port: 20, name: 'FTP Data' },
  { port: 21, name: 'FTP' },
  { port: 22, name: 'SSH' },
  { port: 23, name: 'Telnet' },
  { port: 25, name: 'SMTP' },
  { port: 53, name: 'DNS' },
  { port: 80, name: 'HTTP' },
  { port: 110, name: 'POP3' },
  { port: 143, name: 'IMAP' },
  { port: 443, name: 'HTTPS' },
  { port: 3306, name: 'MySQL' },
  { port: 5432, name: 'PostgreSQL' },
  { port: 6379, name: 'Redis' },
  { port: 27017, name: 'MongoDB' },
  { port: 3000, name: 'Dev (common)' },
  { port: 8080, name: 'HTTP Alt' },
  { port: 8443, name: 'HTTPS Alt' },
];

export default function PortNumberLookupPage() {
  const [input, setInput] = useState('443');

  const portNum = useMemo(() => {
    const n = parseInt(input.trim(), 10);
    return Number.isNaN(n) || n < 1 || n > 65535 ? null : n;
  }, [input]);

  const match = useMemo(
    () => (portNum !== null ? PORTS.find((p) => p.port === portNum) : null),
    [portNum]
  );

  return (
    <ToolLayout
      title="Port Number Lookup"
      description="Look up common TCP/UDP port numbers."
      slug="port-number-lookup"
      whatIs={
        <>
          <p>Enter a port number to see if it matches a common service, or browse the list below.</p>
          <ToolFaq />
        </>
      }
      howToUse={
        <ol className="list-decimal pl-5 space-y-1">
          <li>Enter a port number (1–65535)</li>
          <li>See the service name if it is a common one</li>
        </ol>
      }
      exampleUsage={<ToolExample input="443" output="HTTPS" />}
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Port number</label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full max-w-xs rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90 font-mono"
            placeholder="e.g. 443, 8080"
          />
        </div>
        <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-4 text-sm">
          {portNum === null ? (
            <span className="text-gray-500 dark:text-gray-400">Enter a valid port (1–65535).</span>
          ) : match ? (
            <>
              <span className="font-mono font-medium">{match.port}</span>
              <span className="text-gray-600 dark:text-gray-300"> — {match.name}</span>
            </>
          ) : (
            <span className="text-gray-500 dark:text-gray-400">Port {portNum} is not in our common list. It may be custom or less common.</span>
          )}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Common ports</label>
          <div className="rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-white/5">
                  <th className="px-4 py-2 text-left font-medium">Port</th>
                  <th className="px-4 py-2 text-left font-medium">Service</th>
                </tr>
              </thead>
              <tbody className="text-gray-800 dark:text-gray-200">
                {PORTS.map((p) => (
                  <tr
                    key={p.port}
                    className="border-t border-gray-200 dark:border-white/10 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5"
                    onClick={() => setInput(String(p.port))}
                  >
                    <td className="px-4 py-2 font-mono">{p.port}</td>
                    <td className="px-4 py-2">{p.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
