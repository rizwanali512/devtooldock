import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free UUID Validator online | Check UUID Validity free in Seconds',
  description:
    'Is your UUID valid? Verify UUID format, detect errors, and check version instantly. Perfect for debugging APIs, validating database IDs, and ensuring clean data',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

