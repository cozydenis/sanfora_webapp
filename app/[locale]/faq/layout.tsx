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
    title: localeTyped === 'de' ? 'Häufig gestellte Fragen' : 'FAQ',
    description:
      localeTyped === 'de'
        ? 'Häufig gestellte Fragen zu Luxusuhren und Parfüms bei Sanfora Time Pieces. Antworten zu Garantie, Lieferung, Rückgabe und Beratung.'
        : 'Frequently asked questions about luxury watches and perfumes at Sanfora Time Pieces. Answers about warranty, delivery, returns and consultation.',
    path: `/${locale}/faq`,
    locale: localeTyped,
  });
}

export default function FAQLayout({ children, params: { locale } }: Props) {
  setRequestLocale(locale);
  return <>{children}</>;
}
