'use client';

import GeneratorInput from '@/components/generator/generator-input';
import { GradientBlob } from '@/components/gradient-blob';
import { getAITool } from '@/lib/ai-tools';
import { useEffect, useMemo, useRef, useState } from 'react';
import { CopyToClipboard } from '@/components/copy-to-clipboard';

type AIToolLayoutProps = {
  toolSlug: string;
};

export default function AIToolLayout({ toolSlug }: AIToolLayoutProps) {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  type ChatMessage = { role: 'user' | 'assistant'; content: string };

  const initialMessages = useMemo<ChatMessage[]>(
    () => [
      {
        role: 'assistant',
        content: 'Hello! How can I help you?',
      },
    ],
    []
  );

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const showComingSoon = false;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const tool = getAITool(toolSlug);
  if (!tool) return null;

  const run = async () => {
    const prompt = inputValue.trim();
    if (!prompt) {
      setError('Please enter a prompt.');
      return;
    }
    setLoading(true);
    setError(null);
    setInputValue('');

    // Add user message + placeholder assistant message for streaming
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: prompt },
      { role: 'assistant', content: '' },
    ]);

    const updateLastMessage = (text: string) => {
      setMessages((prev) => {
        if (prev.length === 0) return prev;
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (!last || last.role !== 'assistant') return prev;
        updated[updated.length - 1] = { ...last, content: text };
        return updated;
      });
    };

    try {
      // Send full conversation (excluding any typing indicator UI).
      const conversation = [
        ...messages,
        { role: 'user' as const, content: prompt },
      ];
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: toolSlug, messages: conversation }),
      });
      if (!res.ok) {
        const errText = (await res.text()).trim() || 'Request failed';
        throw new Error(errText);
      }

      if (!res.body) {
        throw new Error('Streaming not supported by the response.');
      }

      const reader = res.body.getReader();
      try {
        const decoder = new TextDecoder();
        let result = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          result += decoder.decode(value, { stream: true });
          updateLastMessage(result);
        }
        result += decoder.decode();
        result = result.trim();
        updateLastMessage(
          result || 'Sorry — I did not receive any content. Please try again.'
        );
      } finally {
        reader.releaseLock();
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
      updateLastMessage(
        'I ran into an error generating a response. Please try again in a moment.'
      );
    } finally {
      setLoading(false);
    }
  };

  const newChat = () => {
    setError(null);
    setLoading(false);
    setInputValue('');
    setMessages(initialMessages);
  };

  return (
    <div className="contents">
      <div className="flex-[1_1_0] overflow-y-auto custom-scrollbar px-5 pt-12 pb-6 md:px-12">
        <div className="text-gray-800 dark:text-white/90 space-y-6 max-w-none prose dark:prose-invert">
          {showComingSoon ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 dark:border-amber-500/60 bg-amber-50 dark:bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-800 dark:text-amber-200 mb-6">
                <span aria-hidden>🚀</span>
                Coming soon
              </div>
              <h2 className="mb-4 font-bold text-gray-800 dark:text-white/90 text-3xl md:text-4xl">
                {tool.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg text-lg">
                This AI tool will {tool.description.toLowerCase()}.
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-md">
                We&apos;re building this feature. Check back later or try another tool from the sidebar.
              </p>
            </div>
          ) : (
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="text-center">
                <h2 className="mb-2 font-bold text-gray-800 dark:text-white/90 text-3xl md:text-4xl">
                  {tool.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                  {tool.description}
                </p>
              </div>

              <div className="rounded-[20px] border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="m-0 text-lg font-bold text-gray-800 dark:text-white/90">
                    Chat
                  </h3>
                  <button
                    type="button"
                    onClick={newChat}
                    className="inline-flex items-center justify-center h-8 px-3 rounded-full font-medium text-xs border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition"
                    disabled={loading}
                  >
                    New chat
                  </button>
                </div>

                {error ? (
                  <div className="mt-3 rounded-2xl border border-error-500 bg-error-50 dark:bg-error-500/10 px-4 py-3 text-sm text-error-600">
                    {error}
                  </div>
                ) : null}

                <div className="mt-4 space-y-3">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className="max-w-[70%] space-y-2">
                        <div
                          className={`p-3 rounded-xl text-sm whitespace-pre-wrap border ${
                            msg.role === 'user'
                              ? 'bg-primary-500 text-white border-primary-500'
                              : 'bg-gray-50 dark:bg-white/5 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-white/10'
                          }`}
                        >
                          {msg.content}
                          {loading && msg.role === 'assistant' && index === messages.length - 1 ? (
                            <span className="animate-pulse"> |</span>
                          ) : null}
                        </div>
                        {msg.role === 'assistant' && msg.content.trim() ? (
                          <div className="flex justify-start">
                            <CopyToClipboard
                              text={msg.content}
                              toastMessage="Copied to clipboard"
                            />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))}

                  <div ref={bottomRef} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-5 md:px-12">
        <form onSubmit={(e) => e.preventDefault()}>
          <GeneratorInput
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={showComingSoon}
            loading={loading}
            onSubmit={run}
          />
        </form>

        <GradientBlob />
      </div>
    </div>
  );
}
