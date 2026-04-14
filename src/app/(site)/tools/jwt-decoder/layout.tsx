import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JWT Decoder | Fast and free Online Tool',
  description:
    'Decode JWT tokens accurately with our free online tool. View header, payload, and signature, check claims and expiration, and debug authentication with fast, secure, browser-based processing.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
