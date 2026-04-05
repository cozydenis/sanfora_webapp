import { Metadata } from 'next';
import { siteConfig } from './config';

export const siteMetadata = {
  siteName: 'Sanfora Timepiece',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://sanfora.ch',
  description: {
    de: 'Entdecken Sie exklusive Luxusuhren und erlesene Parfüms bei Sanfora Timepiece. Zeitlose Eleganz trifft auf handwerkliche Perfektion.',
    en: 'Discover exclusive luxury watches and exquisite perfumes at Sanfora Timepiece. Timeless elegance meets artisanal perfection.',
  },
  keywords: {
    de: 'Luxusuhren, Rolex, Patek Philippe, Audemars Piguet, Luxusparfüms, Creed, Tom Ford, Schweiz, Uhren kaufen, Parfüm kaufen',
    en: 'luxury watches, Rolex, Patek Philippe, Audemars Piguet, luxury perfumes, Creed, Tom Ford, Switzerland, buy watches, buy perfume',
  },
  ogImage: '/og-image.jpg',
  twitterHandle: '@sanfora_time',
};

export function generateMetadata({
  title,
  description,
  keywords,
  path,
  locale = 'de',
  images,
}: {
  title?: string;
  description?: string;
  keywords?: string;
  path?: string;
  locale?: 'de' | 'en';
  images?: string[];
}): Metadata {
  const siteName = siteMetadata.siteName;
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const finalDescription = description || siteMetadata.description[locale];
  const finalKeywords = keywords || siteMetadata.keywords[locale];
  const url = path ? `${siteMetadata.siteUrl}${path}` : siteMetadata.siteUrl;
  const ogImages = images || [siteMetadata.ogImage];

  return {
    title: fullTitle,
    description: finalDescription,
    keywords: finalKeywords,
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    metadataBase: new URL(siteMetadata.siteUrl),
    alternates: {
      canonical: url,
      languages: {
        de: `/${locale === 'de' ? path || '' : 'de' + (path || '')}`,
        en: `/${locale === 'en' ? path || '' : 'en' + (path || '')}`,
      },
    },
    openGraph: {
      title: fullTitle,
      description: finalDescription,
      url,
      siteName,
      images: ogImages.map((img) => ({
        url: img.startsWith('http') ? img : `${siteMetadata.siteUrl}${img}`,
        width: 1200,
        height: 630,
        alt: fullTitle,
      })),
      locale: locale === 'de' ? 'de_DE' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: finalDescription,
      images: ogImages,
      creator: siteMetadata.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      // Add your verification IDs when available
      // google: 'YOUR_GOOGLE_VERIFICATION_ID',
      // yandex: 'YOUR_YANDEX_VERIFICATION_ID',
      // bing: 'YOUR_BING_VERIFICATION_ID',
    },
  };
}

// Structured Data helpers
export function generateProductJsonLd(product: {
  title: string;
  description: string;
  price: number | null;
  currency: string;
  images: string[];
  slug: string;
  category: 'watch' | 'perfume';
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.images.map((img) =>
      img.startsWith('http') ? img : `${siteMetadata.siteUrl}${img}`
    ),
    offers: product.price
      ? {
          '@type': 'Offer',
          price: product.price.toString(),
          priceCurrency: product.currency,
          availability: 'https://schema.org/InStock',
          url: `${siteMetadata.siteUrl}/${product.category === 'watch' ? 'watches' : 'perfumes'}/${product.slug}`,
        }
      : {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          url: `${siteMetadata.siteUrl}/${product.category === 'watch' ? 'watches' : 'perfumes'}/${product.slug}`,
        },
    brand: {
      '@type': 'Brand',
      name: 'Sanfora Timepiece',
    },
  };
}

export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteMetadata.siteName,
    url: siteMetadata.siteUrl,
    logo: `${siteMetadata.siteUrl}/imgs/logo.jpeg`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.whatsapp.display,
      contactType: 'Customer Service',
      availableLanguage: ['de', 'en'],
    },
    sameAs: [
      'https://instagram.com/sanforatimepiece',
    ],
  };
}
