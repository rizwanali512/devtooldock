import { generateSEOContent, type SeoContentInput } from '@/lib/generateSEOContent';

type Section = 'intro' | 'howToUse' | 'useCases' | 'faq';

export function AutoSEOContent({
  section,
  input,
}: {
  section: Section;
  input: SeoContentInput;
}): JSX.Element {
  const out = generateSEOContent(input);

  if (section === 'intro') {
    return <p className="text-gray-500 dark:text-gray-400 leading-7">{out.intro}</p>;
  }
  if (section === 'howToUse') {
    return (
      <ul className="list-disc pl-5 space-y-2 text-gray-500 dark:text-gray-400 leading-7">
        {out.howToUse.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    );
  }
  if (section === 'useCases') {
    return (
      <ul className="list-disc pl-5 space-y-2 text-gray-500 dark:text-gray-400 leading-7">
        {out.useCases.map((u) => (
          <li key={u}>{u}</li>
        ))}
      </ul>
    );
  }
  return (
    <div className="space-y-4 text-gray-500 dark:text-gray-400 leading-7">
      {out.faq.slice(0, 5).map((item) => (
        <div key={item.question}>
          <h3 className="font-semibold text-gray-800 dark:text-white/90">{item.question}</h3>
          <p>{item.answer}</p>
        </div>
      ))}
    </div>
  );
}

