'use client';

import { cn } from '@/lib/utils';
import { forwardRef, useEffect, useRef, useState } from 'react';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'w-full rounded-3xl border border-gray-300 px-5 py-3 text-left text-sm text-gray-800 shadow-theme-xs resize-none',
          'placeholder:text-sm placeholder:text-gray-400',
          'focus-visible:border-primary-300 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-dark-primary',
          'dark:border-gray-700 dark:text-white/90 dark:placeholder:text-white/30 dark:focus-visible:border-primary-500',
          error &&
            'border-red-500 focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/30',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };

type PropsType = Omit<TextareaProps, 'error' | 'value' | 'onChange'> & {
  onChange?: (value: string) => void;
  defaultValue?: string;
  value?: string;
} & (
    | { withDefaultStyles?: boolean }
    | {
        withDefaultStyles: true;
        error?: boolean;
      }
  );

export function AutoGrowingTextArea({
  onChange,
  withDefaultStyles,
  className,
  value: inputValue,
  ...props
}: PropsType) {
  const [value, setValue] = useState(inputValue || '');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '0';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      onChange?.(value);
    }
  }, [onChange, value]);

  if (withDefaultStyles) {
    return (
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={'min-h-14 max-h-40 ' + className}
        {...props}
      />
    );
  }

  return (
    <textarea
      ref={textareaRef}
      onChange={(e) => setValue(e.target.value)}
      value={value}
      className={cn(
        'w-full bg-transparent outline-none resize-none min-h-14 max-h-40',
        className
      )}
      {...props}
    />
  );
}
