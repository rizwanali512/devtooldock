import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Password Generator | Generate Strong and Secure Passwords',
  description:
    'Generate strong, secure passwords with this free password generator tool online. Create random passwords with customizable length, symbols, and numbers to protect your accounts and data.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
