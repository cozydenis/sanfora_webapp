import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: Props) {
  return {
    title: {
      template: '%s | Sanfora Time Pieces',
      default: 'Sanfora Time Pieces - Luxury Watches & Perfumes',
    },
    description:
      locale === 'de'
        ? 'Entdecken Sie exklusive Luxusuhren und erlesene Parfüms bei Sanfora Time Pieces. Zeitlose Eleganz trifft auf handwerkliche Perfektion.'
        : 'Discover exclusive luxury watches and exquisite perfumes at Sanfora Time Pieces. Timeless elegance meets artisanal perfection.',
    keywords:
      locale === 'de'
        ? 'Luxusuhren, Rolex, Patek Philippe, Audemars Piguet, Luxusparfüms, Creed, Tom Ford, Schweiz'
        : 'luxury watches, Rolex, Patek Philippe, Audemars Piguet, luxury perfumes, Creed, Tom Ford, Switzerland',
    authors: [{ name: 'Sanfora Time Pieces' }],
    openGraph: {
      type: 'website',
      locale: locale === 'de' ? 'de_DE' : 'en_US',
      siteName: 'Sanfora Time Pieces',
    },
    twitter: {
      card: 'summary_large_image',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: Props) {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#0A0A0A" />
      </head>
      <body className="font-sans antialiased bg-luxury-white text-luxury-black flex flex-col min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
