import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { ImageGallery } from '@/components/products/ImageGallery';
import { WhatsAppButton } from '@/components/products/WhatsAppButton';
import { getProductBySlug, formatPrice, getPerfumes } from '@/lib/products';
import { isPerfumeProduct } from '@/lib/types';
import { generateMetadata as genMeta } from '@/lib/metadata';
import type { Metadata } from 'next';

type Props = {
  params: { locale: string; slug: string };
};

export async function generateStaticParams() {
  const perfumes = await getPerfumes();
  return perfumes.map((perfume) => ({
    slug: perfume.slug,
  }));
}

export async function generateMetadata({ params: { locale, slug } }: Props): Promise<Metadata> {
  const product = await getProductBySlug(slug);

  if (!product || !isPerfumeProduct(product)) {
    return {};
  }

  const localeTyped = locale as 'de' | 'en';
  const priceText = formatPrice(product.price, product.currency, localeTyped);

  return genMeta({
    title: product.title,
    description: product.description[localeTyped],
    path: `/${locale}/perfumes/${slug}`,
    locale: localeTyped,
    images: product.images,
  });
}

export default async function PerfumeDetailPage({ params: { locale, slug } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('product');
  const product = await getProductBySlug(slug);

  if (!product || !isPerfumeProduct(product)) {
    notFound();
  }

  const localeTyped = locale as 'de' | 'en';
  const productUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://sanfora-timepieces.com'}/${locale}/perfumes/${slug}`;

  return (
    <div className="bg-luxury-white">
      {/* Breadcrumb */}
      <Container className="py-6 md:py-8">
        <nav className="text-sm font-light">
          <Link href={`/${locale}`} className="text-luxury-gray-500 hover:text-luxury-black transition-colors">
            {t('breadcrumb.home')}
          </Link>
          <span className="mx-3 text-luxury-gray-400">/</span>
          <Link
            href={`/${locale}/perfumes`}
            className="text-luxury-gray-500 hover:text-luxury-black transition-colors"
          >
            {t('categories.perfumes')}
          </Link>
          <span className="mx-3 text-luxury-gray-400">/</span>
          <span className="text-luxury-black">{product.title}</span>
        </nav>
      </Container>

      {/* Product Details */}
      <section className="pb-16 md:pb-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: Image Gallery */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <ImageGallery images={product.images} productTitle={product.title} />
            </div>

            {/* Right: Product Information */}
            <div>
              {/* Product Header */}
              <div className="mb-8 pb-8 border-b border-luxury-gray-200">
                {product.collection.includes('new-in') && (
                  <div className="inline-block bg-luxury-black text-luxury-white px-4 py-2 text-xs tracking-widest uppercase font-light mb-6">
                    New
                  </div>
                )}
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-luxury-black mb-6 leading-tight">
                  {product.title}
                </h1>
                <p className="text-2xl md:text-3xl font-light text-luxury-black">
                  {formatPrice(product.price, product.currency, localeTyped)}
                </p>
              </div>

              {/* Description */}
              <div className="mb-10 pb-10 border-b border-luxury-gray-200">
                <p className="text-base md:text-lg font-light text-luxury-gray-700 leading-relaxed">
                  {product.description[localeTyped]}
                </p>
              </div>

              {/* Specifications */}
              <div className="mb-10">
                <h2 className="text-lg md:text-xl font-normal text-luxury-black tracking-wide uppercase mb-6">
                  {t('specifications')}
                </h2>

                <div className="space-y-1">
                  <div className="grid grid-cols-2 gap-4 py-4 border-b border-luxury-gray-200">
                    <span className="text-sm font-light text-luxury-gray-600 uppercase tracking-wider">
                      {t('specs.size')}
                    </span>
                    <span className="text-sm font-light text-luxury-black text-right">
                      {product.specifications.size}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 py-4 border-b border-luxury-gray-200">
                    <span className="text-sm font-light text-luxury-gray-600 uppercase tracking-wider">
                      {t('specs.concentration')}
                    </span>
                    <span className="text-sm font-light text-luxury-black text-right">
                      {product.specifications.concentration}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 py-4 border-b border-luxury-gray-200">
                    <span className="text-sm font-light text-luxury-gray-600 uppercase tracking-wider">
                      {t('specs.gender')}
                    </span>
                    <span className="text-sm font-light text-luxury-black text-right">
                      {product.specifications.gender}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 py-4 border-b border-luxury-gray-200">
                    <span className="text-sm font-light text-luxury-gray-600 uppercase tracking-wider">
                      {t('specs.topNotes')}
                    </span>
                    <span className="text-sm font-light text-luxury-black text-right">
                      {product.specifications.topNotes}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 py-4 border-b border-luxury-gray-200">
                    <span className="text-sm font-light text-luxury-gray-600 uppercase tracking-wider">
                      {t('specs.heartNotes')}
                    </span>
                    <span className="text-sm font-light text-luxury-black text-right">
                      {product.specifications.heartNotes}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 py-4 border-b border-luxury-gray-200">
                    <span className="text-sm font-light text-luxury-gray-600 uppercase tracking-wider">
                      {t('specs.baseNotes')}
                    </span>
                    <span className="text-sm font-light text-luxury-black text-right">
                      {product.specifications.baseNotes}
                    </span>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="space-y-4">
                <WhatsAppButton
                  productTitle={product.title}
                  productUrl={productUrl}
                  label={t('whatsapp.inquire')}
                />
                <p className="text-xs text-center text-luxury-gray-500 font-light">
                  {t('whatsapp.responseTime')}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
