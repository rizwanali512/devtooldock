import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free SHA256 Generator | Create Secure Hash Online',
  description:
    'Need a secure hash? Generate SHA256 hashes in seconds. Protect passwords, verify file integrity, and secure sensitive data with fast, reliable hashing.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
