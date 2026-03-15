'use client';

import { useMemo, useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ToolExample, ToolFaq } from '@/components/tools/ToolSeoBlocks';

function scorePassword(p: string): { score: number; feedback: string[] } {
  let score = 0;
  const feedback: string[] = [];
  if (p.length >= 8) score += 1;
  else feedback.push('Use at least 8 characters');
  if (p.length >= 12) score += 1;
  if (/[a-z]/.test(p) && /[A-Z]/.test(p)) score += 1;
  else feedback.push('Mix upper and lower case');
  if (/\d/.test(p)) score += 1;
  else feedback.push('Add numbers');
  if (/[^a-zA-Z0-9]/.test(p)) score += 1;
  else feedback.push('Add symbols (!@#$%^&*)');
  if (feedback.length === 0) feedback.push('Strong password');
  return { score, feedback };
}

function label(score: number): string {
  if (score <= 1) return 'Very weak';
  if (score <= 2) return 'Weak';
  if (score <= 3) return 'Fair';
  if (score <= 4) return 'Good';
  return 'Strong';
}

export default function PasswordStrengthCheckerPage() {
  const [password, setPassword] = useState('');

  const { score, feedback } = useMemo(() => scorePassword(password), [password]);
  const strengthLabel = label(score);
  const width = password.length === 0 ? 0 : Math.max(20, (score / 5) * 100);

  return (
    <ToolLayout
      title="Password Strength Checker"
      description="Check password strength and get feedback."
      slug="password-strength-checker"
      whatIs={
        <>
          <p>Type a password to see a strength score and tips to improve it. Nothing is sent to any server.</p>
          <ToolFaq />
        </>
      }
      howToUse={
        <ol className="list-decimal pl-5 space-y-1">
          <li>Enter a password (e.g. for testing)</li>
          <li>See strength and suggestions</li>
        </ol>
      }
      exampleUsage={<ToolExample input="MyP@ssw0rd" output="Good — add length/symbols" />}
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm dark:bg-white/5 dark:text-white/90"
            placeholder="Enter password to check"
            autoComplete="off"
          />
        </div>
        {password.length > 0 && (
          <>
            <div>
              <div className="mb-1 flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Strength</span>
                <span className="font-medium">{strengthLabel}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${width}%`,
                    backgroundColor:
                      score <= 1 ? '#ef4444' : score <= 2 ? '#f97316' : score <= 3 ? '#eab308' : score <= 4 ? '#22c55e' : '#16a34a',
                  }}
                />
              </div>
            </div>
            <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-1">
              {feedback.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </ToolLayout>
  );
}
