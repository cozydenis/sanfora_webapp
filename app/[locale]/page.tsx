import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { ProductCard } from '@/components/products/ProductCard';
import { getNewProducts } from '@/lib/products';
import { generateMetadata as genMeta } from '@/lib/metadata';
import type { Metadata } from 'next';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return genMeta({
    path: `/${locale}`,
    locale: locale as 'de' | 'en',
  });
}

export default function HomePage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = useTranslations('home');
  const newProducts = getNewProducts().slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center bg-luxury-black">
        {/* Background Image Overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/40 via-luxury-black/30 to-luxury-black/60 z-10" />
          {/* Placeholder for hero image - replace with actual image */}
          <div className="w-full h-full bg-luxury-gray-900" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto animate-fadeIn">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-luxury-white mb-8 tracking-tight leading-tight">
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-luxury-gray-200 font-light mb-12 tracking-wide">
            {t('hero.subtitle')}
          </p>
          <Link
            href={`/${locale}/new-in`}
            className="inline-block border-2 border-luxury-white text-luxury-white px-10 py-4 text-sm tracking-widest uppercase font-light hover:bg-luxury-white hover:text-luxury-black transition-all duration-300"
          >
            {t('hero.cta')}
          </Link>
        </div>
      </section>

      {/* New In Section */}
      <section className="py-24 md:py-32 lg:py-40 bg-luxury-white">
        <Container>
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-20 lg:mb-24 animate-fadeIn">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-luxury-black mb-6 tracking-tight">
              {t('featured.title')}
            </h2>
            <div className="w-20 h-px bg-luxury-black mx-auto" />
          </div>

          {/* Product Grid */}
          {newProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 md:gap-y-20">
              {newProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fadeIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProductCard product={product} locale={locale} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-luxury-gray-500 py-20 font-light">
              {t('featured.noProducts')}
            </p>
          )}

          {/* View All Link */}
          {newProducts.length > 0 && (
            <div className="text-center mt-20 md:mt-24">
              <Link
                href={`/${locale}/new-in`}
                className="inline-block text-luxury-black border-b-2 border-luxury-black pb-1 text-sm tracking-widest uppercase font-light hover:text-luxury-gray-600 hover:border-luxury-gray-600 transition-all duration-300"
              >
                {t('featured.viewAll')}
              </Link>
            </div>
          )}
        </Container>
      </section>

      {/* Brand Statement Section */}
      <section className="py-24 md:py-32 bg-luxury-gray-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center animate-fadeIn">
            <p className="text-xl md:text-2xl lg:text-3xl font-serif text-luxury-black leading-relaxed">
              {locale === 'de'
                ? 'Zeitlose Eleganz trifft auf handwerkliche Perfektion. Entdecken Sie exklusive Zeitmesser und erlesene Düfte für den anspruchsvollen Kenner.'
                : 'Timeless elegance meets artisanal perfection. Discover exclusive timepieces and exquisite fragrances for the discerning connoisseur.'}
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
