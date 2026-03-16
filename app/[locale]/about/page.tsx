import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { generateMetadata as genMeta } from '@/lib/metadata';
import type { Metadata } from 'next';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const localeTyped = locale as 'de' | 'en';
  return genMeta({
    title: localeTyped === 'de' ? 'Über uns' : 'About Us',
    description:
      localeTyped === 'de'
        ? 'Erfahren Sie mehr über Sanfora Time Pieces. Unsere Geschichte, unsere Leidenschaft für Luxusuhren und exklusive Parfüms, und unser Engagement für höchste Qualität.'
        : 'Learn more about Sanfora Time Pieces. Our story, our passion for luxury watches and exclusive perfumes, and our commitment to the highest quality.',
    path: `/${locale}/about`,
    locale: localeTyped,
  });
}

export default async function AboutPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('about');

  return (
    <>
      <PageHeader title={t('title')} subtitle={t('subtitle')} />

      <Container className="py-16">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg">
            <p className="text-lg font-light text-luxury-gray-700 leading-relaxed mb-6">
              {t('description')}
            </p>

            <div className="mt-12 space-y-8">
              <div>
                <h2 className="font-serif text-2xl text-luxury-black mb-4">
                  {t.rich('about.quality.title', { defaultMessage: 'Qualität & Exzellenz' })}
                </h2>
                <p className="font-light text-luxury-gray-700 leading-relaxed">
                  {t.rich('about.quality.text', {
                    defaultMessage: 'Jedes Produkt in unserer Kollektion wird sorgfältig ausgewählt und repräsentiert höchste Handwerkskunst und zeitloses Design.'
                  })}
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-luxury-black mb-4">
                  {t.rich('about.passion.title', { defaultMessage: 'Unsere Leidenschaft' })}
                </h2>
                <p className="font-light text-luxury-gray-700 leading-relaxed">
                  {t.rich('about.passion.text', {
                    defaultMessage: 'Wir sind leidenschaftlich daran interessiert, unseren Kunden einzigartige Luxuserlebnisse zu bieten, die sowohl die Zeit als auch die Sinne feiern.'
                  })}
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-luxury-black mb-4">
                  {t.rich('about.service.title', { defaultMessage: 'Persönlicher Service' })}
                </h2>
                <p className="font-light text-luxury-gray-700 leading-relaxed">
                  {t.rich('about.service.text', {
                    defaultMessage: 'Unser engagiertes Team steht Ihnen jederzeit zur Verfügung, um Sie bei der Auswahl des perfekten Zeitmessers oder Duftes zu unterstützen.'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
