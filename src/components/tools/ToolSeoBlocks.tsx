import type { ReactNode } from 'react';

export function ToolFaq({
  items,
}: {
  items?: { q: string; a: ReactNode }[];
}) {
  const faq =
    items ??
    [
      {
        q: 'Is this tool free to use?',
        a: 'Yes. This tool is available to use for free.',
      },
      {
        q: 'Does the tool run in the browser?',
        a: 'Yes. The logic runs client-side in your browser.',
      },
      {
        q: 'Is my data uploaded to a server?',
        a: 'No. Your input stays in your browser and is not uploaded by this tool.',
      },
      {
        q: 'Can I use this tool for large files?',
        a: 'It depends on your device and browser. Very large inputs may be slow; for huge files, use a local CLI tool.',
      },
    ];

  return (
    <div>
      <h3>FAQ</h3>
      <div>
        {faq.map((item) => (
          <div key={item.q} className="mb-4">
            <p className="font-medium">{item.q}</p>
            <div>{item.a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ToolExample({
  input,
  output,
}: {
  input: string;
  output: string;
}) {
  return (
    <div>
      <p className="mb-2 font-medium">Input</p>
      <pre className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm overflow-x-auto">
        {input}
      </pre>
      <p className="mt-4 mb-2 font-medium">Output</p>
      <pre className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm overflow-x-auto">
        {output}
      </pre>
    </div>
  );
}

