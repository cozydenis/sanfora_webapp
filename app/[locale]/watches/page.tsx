import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { ProductCard } from '@/components/products/ProductCard';
import { getWatches } from '@/lib/products';
import { generateMetadata as genMeta } from '@/lib/metadata';
import type { Metadata } from 'next';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const localeTyped = locale as 'de' | 'en';
  return genMeta({
    title: localeTyped === 'de' ? 'Luxusuhren' : 'Luxury Watches',
    description:
      localeTyped === 'de'
        ? 'Entdecken Sie unsere exklusive Kollektion von Luxusuhren. Rolex, Patek Philippe, Audemars Piguet und mehr. Zeitlose Eleganz für den anspruchsvollen Kenner.'
        : 'Discover our exclusive collection of luxury watches. Rolex, Patek Philippe, Audemars Piguet and more. Timeless elegance for the discerning connoisseur.',
    path: `/${locale}/watches`,
    locale: localeTyped,
  });
}

export default function WatchesPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = useTranslations('watches');
  const watches = getWatches();

  return (
    <>
      <PageHeader title={t('title')} subtitle={t('subtitle')} />

      <Container className="py-16 md:py-24">
        {watches.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 md:gap-y-20">
            {watches.map((watch) => (
              <ProductCard key={watch.id} product={watch} locale={locale} />
            ))}
          </div>
        ) : (
          <p className="text-center text-luxury-gray-500 py-20 font-light">{t('noProducts')}</p>
        )}
      </Container>
    </>
  );
}
