import { AttachmentIcon, LongArrowUpIcon } from '@/icons/icons';
import { useEffect, useRef } from 'react';

type PropsType = {
  onSubmit?: () => void;
  onChange?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  value?: string;
  disabled?: boolean;
  loading?: boolean;
};

export default function GeneratorInput({
  onSubmit,
  onChange,
  value,
  disabled,
  loading,
}: PropsType) {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '0';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className="sticky bottom-0 inset-x-0 z-30 mt-auto">
      <div className="h-4" />

      <div
        className="bg-white/15 dark:bg-white/5 border border-[#E4E7EC] dark:border-white/10 rounded-3xl backdrop-blur-[10px] shadow-theme-md overflow-hidden aria-disabled:opacity-70 aria-disabled:pointer-events-none"
        aria-disabled={disabled}
      >
        <div className="p-5 pb-0 pr-[calc((var(--spacing)*5)-10px)]">
          <textarea
            ref={textareaRef}
            placeholder="Type your message"
            value={value}
            onChange={onChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                submitButtonRef.current?.click();
              }
            }}
            className="dark:text-white/90 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-dark-primary placeholder:text-sm dark:placeholder:text-white/50 resize-none max-h-44 leading-5 w-full custom-scrollbar pb-8"
            required
            rows={1}
          />
        </div>
        <div className="flex justify-between items-center gap-2 p-3 pt-0">
          <label htmlFor="attach-file" className="flex items-center gap-1.5">
            <input
              type="file"
              accept=".pdf, .doc, .docx, .txt"
              name="attachFile"
              id="attach-file"
              className="sr-only"
            />
            <AttachmentIcon />

            <span className="text-[#98A2B3] text-sm">Attach file</span>
          </label>

          <button
            type="submit"
            ref={submitButtonRef}
            className="size-10 flex bg-[#1D2939] dark:bg-primary-500 dark:disabled:bg-white/20 transition items-center justify-center rounded-full text-white"
            disabled={!value?.trim() || disabled || loading}
            onClick={(e) => {
              e.preventDefault();
              if (disabled || loading) return;
              onSubmit?.();
            }}
          >
            <span className="sr-only">Submit</span>
            {loading ? (
              <svg
                className="h-5 w-5 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  opacity="0.25"
                />
                <path
                  d="M21 12a9 9 0 0 0-9-9"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.9"
                />
              </svg>
            ) : (
              <LongArrowUpIcon />
            )}
          </button>
        </div>
      </div>

      <div className="h-5" />
    </div>
  );
}
