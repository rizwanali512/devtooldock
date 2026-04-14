import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free TSV to CSV Converter | Fast and Accurate Data Conversion',
  description:
    'TSV file not working in Excel? Convert TSV to CSV in seconds. Improve compatibility, handle special characters, and prepare data for spreadsheets, databases, and analytics tools.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

