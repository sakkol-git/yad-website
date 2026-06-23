import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Secure Checkout | YAD',
  description: 'Make a secure donation to Youth Advancement for Development (YAD) Cambodia.',
};

export default function DonateFlowLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
