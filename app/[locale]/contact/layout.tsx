import { ReactNode } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { generateMetadata as genMeta } from '@/lib/metadata';
import type { Metadata } from 'next';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const localeTyped = locale as 'de' | 'en';
  return genMeta({
    title: localeTyped === 'de' ? 'Kontakt' : 'Contact',
    description:
      localeTyped === 'de'
        ? 'Kontaktieren Sie Sanfora Time Pieces. Wir freuen uns auf Ihre Anfrage zu Luxusuhren und exklusiven Parfüms. Persönliche Beratung und erstklassiger Service.'
        : 'Contact Sanfora Time Pieces. We look forward to your inquiry about luxury watches and exclusive perfumes. Personal consultation and first-class service.',
    path: `/${locale}/contact`,
    locale: localeTyped,
  });
}

export default function ContactLayout({ children, params: { locale } }: Props) {
  setRequestLocale(locale);
  return <>{children}</>;
}
