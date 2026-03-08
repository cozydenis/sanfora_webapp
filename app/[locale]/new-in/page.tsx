import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { ProductCard } from '@/components/products/ProductCard';
import { getNewProducts } from '@/lib/products';
import { generateMetadata as genMeta } from '@/lib/metadata';
import type { Metadata } from 'next';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const localeTyped = locale as 'de' | 'en';
  return genMeta({
    title: localeTyped === 'de' ? 'Neuheiten' : 'New In',
    description:
      localeTyped === 'de'
        ? 'Die neuesten Ergänzungen unserer Kollektion. Entdecken Sie frisch eingetroffene Luxusuhren und exklusive Parfüms bei Sanfora Time Pieces.'
        : 'The latest additions to our collection. Discover newly arrived luxury watches and exclusive perfumes at Sanfora Time Pieces.',
    path: `/${locale}/new-in`,
    locale: localeTyped,
  });
}

export default function NewInPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = useTranslations('newIn');
  const newProducts = getNewProducts();

  return (
    <>
      <PageHeader title={t('title')} subtitle={t('subtitle')} />

      <Container className="py-16 md:py-24">
        {newProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 md:gap-y-20">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} locale={locale} />
            ))}
          </div>
        ) : (
          <p className="text-center text-luxury-gray-500 py-20 font-light">{t('noProducts')}</p>
        )}
      </Container>
    </>
  );
}
