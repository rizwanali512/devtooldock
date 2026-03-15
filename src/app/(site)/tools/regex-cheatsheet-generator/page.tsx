'use client';

import { ToolLayout } from '@/components/tools/ToolLayout';
import { ToolFaq } from '@/components/tools/ToolSeoBlocks';

const CHEATSHEET = [
  { title: 'Anchors', items: [['^', 'Start of string'], ['$', 'End of string'], ['\\b', 'Word boundary']] },
  { title: 'Quantifiers', items: [['*', '0 or more'], ['+', '1 or more'], ['?', '0 or 1'], ['{n}', 'Exactly n'], ['{n,}', 'n or more'], ['{n,m}', 'Between n and m']] },
  { title: 'Character classes', items: [['.', 'Any char (except newline)'], ['\\d', 'Digit [0-9]'], ['\\D', 'Non-digit'], ['\\w', 'Word [a-zA-Z0-9_]'], ['\\s', 'Whitespace'], ['[abc]', 'Any of a,b,c'], ['[^abc]', 'Not a,b,c'], ['[a-z]', 'Range a to z']] },
  { title: 'Groups', items: [['(x)', 'Capturing group'], ['(?:x)', 'Non-capturing'], ['(?<name>x)', 'Named group'], ['|', 'Alternation (or)']] },
  { title: 'Escapes', items: [['\\n', 'Newline'], ['\\t', 'Tab'], ['\\\\', 'Backslash'], ['\\.', 'Literal .']] },
  { title: 'Flags', items: [['g', 'Global'], ['i', 'Case insensitive'], ['m', 'Multiline'], ['s', 'Dotall']] },
];

export default function RegexCheatsheetGeneratorPage() {
  return (
    <ToolLayout
      title="Regex Cheatsheet"
      description="Quick regex syntax cheatsheet for developers."
      slug="regex-cheatsheet-generator"
      whatIs={
        <>
          <p>Reference for common regex syntax: anchors, quantifiers, character classes, groups, and flags.</p>
          <ToolFaq />
        </>
      }
      howToUse={
        <ol className="list-decimal pl-5 space-y-1">
          <li>Use the table as a quick reference while writing regex</li>
        </ol>
      }
      exampleUsage={null}
    >
      <div className="space-y-6">
        {CHEATSHEET.map((section) => (
          <div key={section.title}>
            <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">{section.title}</h3>
            <div className="rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 dark:bg-white/5">
                    <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Pattern</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Meaning</th>
                  </tr>
                </thead>
                <tbody className="text-gray-800 dark:text-gray-200">
                  {section.items.map(([pat, meaning]) => (
                    <tr key={pat} className="border-t border-gray-200 dark:border-white/10">
                      <td className="px-4 py-2 font-mono">{pat}</td>
                      <td className="px-4 py-2">{meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </ToolLayout>
  );
}
