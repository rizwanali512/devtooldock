"use client";

import { MinusIcon, PlusIcon } from "@/icons/icons";
import { useState } from "react";

// Define the FAQ item type
interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export default function FaqAccordion() {
  const [activeItem, setActiveItem] = useState<number | null>(1);

  // FAQ data
  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "Are these developer tools free to use?",
      answer:
        "Yes. All developer tools on this platform are free to use. There are no usage limits for tools like JSON formatter, JWT decoder, Base64 encoder, regex tester, UUID generator, and the rest of the collection.",
    },
    {
      id: 2,
      question: "Do the tools run in the browser?",
      answer:
        "Yes. Most tools run entirely in your browser. Your data is not sent to our servers when you use the JSON formatter, JWT decoder, Base64 encoder, regex tester, or UUID generator. AI tools may process input to generate results.",
    },
    {
      id: 3,
      question: "Is my data sent to a server?",
      answer:
        "For most developer tools (JSON, JWT, Base64, regex, UUID, etc.), processing happens in your browser and your data is not sent to our servers. AI-powered tools may send input to generate responses.",
    },
    {
      id: 4,
      question: "What AI tools are available on this platform?",
      answer:
        "We offer AI-powered tools including Text Generator, Code Generator, Image Generator, Email Generator, SQL Generator, Regex Generator, Commit Message Generator, API Documentation Generator, Error Explainer, and Code Refactor Tool. Access them from the AI Tools page.",
    },
    {
      id: 5,
      question: "Can I use these tools without creating an account?",
      answer:
        "Yes. You can use all developer tools without signing up or logging in. No account is required for JSON formatting, JWT decoding, Base64 encoding, regex testing, UUID generation, or any other utility on the platform.",
    },
  ];

  const toggleItem = (itemId: number) => {
    setActiveItem(activeItem === itemId ? null : itemId);
  };

  return (
    <section id="faq" className="py-14 md:py-28 dark:bg-[#171f2e]">
      <div className="wrapper">
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <h2 className="mb-3 font-bold text-center text-gray-800 text-3xl dark:text-white/90 md:text-title-lg">
            Frequently Asked Questions
          </h2>
          <p className="max-w-md mx-auto leading-6 text-gray-500 dark:text-gray-400">
            Common questions about our developer tools and AI utilities. Still confused? Feel free to contact us.
          </p>
        </div>
        <div className="max-w-[600px] mx-auto">
          <div className="space-y-4">
            {faqItems.map((item) => (
              <FAQItem
                key={item.id}
                item={item}
                isActive={activeItem === item.id}
                onToggle={() => toggleItem(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// FAQ Item Component
function FAQItem({
  item,
  isActive,
  onToggle,
}: {
  item: FAQItem;
  isActive: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="pb-5 border-b border-gray-200 dark:border-gray-800">
      <button
        type="button"
        className="flex items-center justify-between w-full text-left"
        onClick={onToggle}
        aria-expanded={isActive}
      >
        <span className="text-lg font-medium text-gray-800 dark:text-white/90">
          {item.question}
        </span>
        <span className="flex-shrink-0 ml-6">
          {isActive ? <MinusIcon /> : <PlusIcon />}
        </span>
      </button>
      {isActive && (
        <div className="mt-5">
          <p className="text-base leading-7 text-gray-500 dark:text-gray-400">
            {item.answer}
          </p>
        </div>
      )}
    </div>
  );
}
