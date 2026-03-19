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
            <p className="text-lg font-light text-luxury-gray-700 leading-relaxed mb-8">
              {t('intro')}
            </p>

            <div className="mt-12 space-y-10">
              <div>
                <h2 className="font-serif text-2xl text-luxury-black mb-4">
                  {t('passion.title')}
                </h2>
                <p className="font-light text-luxury-gray-700 leading-relaxed">
                  {t('passion.text')}
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-luxury-black mb-4">
                  {t('philosophy.title')}
                </h2>
                <p className="font-light text-luxury-gray-700 leading-relaxed">
                  {t('philosophy.text')}
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-luxury-black mb-4">
                  {t('service.title')}
                </h2>
                <p className="font-light text-luxury-gray-700 leading-relaxed">
                  {t('service.text')}
                </p>
              </div>

              <div className="border-t border-luxury-gray-200 pt-10 mt-12">
                <p className="font-light text-luxury-gray-600 leading-relaxed text-center italic">
                  {t('closing')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
