'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { useState } from 'react';

interface FAQItem {
  question: { de: string; en: string };
  answer: { de: string; en: string };
}

const faqData: FAQItem[] = [
  {
    question: {
      de: 'Bieten Sie eine Garantie auf Ihre Uhren an?',
      en: 'Do you offer a warranty on your watches?'
    },
    answer: {
      de: 'Ja, alle unsere Uhren sind mit einer 2-jährigen Herstellergarantie ausgestattet.',
      en: 'Yes, all our watches come with a 2-year manufacturer warranty.'
    }
  },
  {
    question: {
      de: 'Woher stammen Ihre Parfüms?',
      en: 'Where do your perfumes come from?'
    },
    answer: {
      de: 'Unsere Parfüms werden von renommierten Parfümeuren kreiert und in Frankreich hergestellt.',
      en: 'Our perfumes are created by renowned perfumers and manufactured in France.'
    }
  },
  {
    question: {
      de: 'Kann ich Produkte zurückgeben?',
      en: 'Can I return products?'
    },
    answer: {
      de: 'Ja, Sie haben ein 14-tägiges Rückgaberecht auf alle Produkte in originalverpacktem Zustand.',
      en: 'Yes, you have a 14-day return policy on all products in original packaging.'
    }
  },
  {
    question: {
      de: 'Bieten Sie eine persönliche Beratung an?',
      en: 'Do you offer personal consultation?'
    },
    answer: {
      de: 'Selbstverständlich. Kontaktieren Sie uns, um einen Termin für eine individuelle Beratung zu vereinbaren.',
      en: 'Of course. Contact us to schedule an appointment for individual consultation.'
    }
  },
  {
    question: {
      de: 'Wie pflege ich meine Uhr richtig?',
      en: 'How do I properly care for my watch?'
    },
    answer: {
      de: 'Wir empfehlen eine jährliche Wartung und professionelle Reinigung. Vermeiden Sie extreme Temperaturen und Stöße.',
      en: 'We recommend annual maintenance and professional cleaning. Avoid extreme temperatures and impacts.'
    }
  }
];

export default function FAQPage() {
  const t = useTranslations('faq');
  const locale = useLocale() as 'de' | 'en';
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <PageHeader title={t('title')} subtitle={t('subtitle')} />

      <Container className="py-16">
        <div className="max-w-3xl mx-auto space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="border border-luxury-gray-200">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-luxury-gray-50 transition-colors"
              >
                <span className="font-normal text-luxury-black pr-8">
                  {item.question[locale]}
                </span>
                <svg
                  className={`w-5 h-5 text-luxury-gray-500 transition-transform flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 font-light text-luxury-gray-700">
                  {item.answer[locale]}
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
