'use client';

import { MinusIcon, PlusIcon } from '@/icons/icons';
import { useState } from 'react';

export type BlogFaqItem = {
  question: string;
  answer: string;
};

export default function BlogFaqAccordion({
  items,
}: {
  items: BlogFaqItem[];
}) {
  const [activeItem, setActiveItem] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setActiveItem((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="mt-14 md:mt-18" aria-label="FAQs">
      <div className="max-w-3xl mx-auto">
        <h2 className="mb-6 font-bold text-gray-800 dark:text-white/90 text-2xl md:text-3xl">
          FAQs
        </h2>
        <div className="space-y-4">
          {items.map((item, idx) => (
            <div
              key={`${idx}-${item.question}`}
              className="pb-5 border-b border-gray-200 dark:border-gray-800"
            >
              <button
                type="button"
                className="flex items-center justify-between w-full text-left"
                onClick={() => toggleItem(idx)}
                aria-expanded={activeItem === idx}
              >
                <span className="text-lg font-medium text-gray-800 dark:text-white/90">
                  {item.question}
                </span>
                <span className="flex-shrink-0 ml-6">
                  {activeItem === idx ? <MinusIcon /> : <PlusIcon />}
                </span>
              </button>
              {activeItem === idx ? (
                <div className="mt-5">
                  <p className="text-base leading-7 text-gray-500 dark:text-gray-400">
                    {item.answer}
                  </p>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

