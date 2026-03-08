import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { ProductCard } from '@/components/products/ProductCard';
import { getPerfumes } from '@/lib/products';
import { generateMetadata as genMeta } from '@/lib/metadata';
import type { Metadata } from 'next';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const localeTyped = locale as 'de' | 'en';
  return genMeta({
    title: localeTyped === 'de' ? 'Luxusparfüms' : 'Luxury Perfumes',
    description:
      localeTyped === 'de'
        ? 'Entdecken Sie unsere erlesene Auswahl an Luxusparfüms. Creed, Tom Ford und exklusive Nischendüfte. Einzigartige Dufterlebnisse für besondere Menschen.'
        : 'Discover our exquisite selection of luxury perfumes. Creed, Tom Ford and exclusive niche fragrances. Unique scent experiences for discerning individuals.',
    path: `/${locale}/perfumes`,
    locale: localeTyped,
  });
}

export default function PerfumesPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = useTranslations('perfumes');
  const perfumes = getPerfumes();

  return (
    <>
      <PageHeader title={t('title')} subtitle={t('subtitle')} />

      <Container className="py-16 md:py-24">
        {perfumes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 md:gap-y-20">
            {perfumes.map((perfume) => (
              <ProductCard key={perfume.id} product={perfume} locale={locale} />
            ))}
          </div>
        ) : (
          <p className="text-center text-luxury-gray-500 py-20 font-light">{t('noProducts')}</p>
        )}
      </Container>
    </>
  );
}
