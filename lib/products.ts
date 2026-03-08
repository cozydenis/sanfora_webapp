import { Product, WatchProduct, PerfumeProduct } from './types';
import productsData from '@/data/products.json';

export function getAllProducts(): Product[] {
  return productsData as Product[];
}

export function getWatches(): WatchProduct[] {
  return productsData.filter(p => p.category === 'watch') as WatchProduct[];
}

export function getPerfumes(): PerfumeProduct[] {
  return productsData.filter(p => p.category === 'perfume') as PerfumeProduct[];
}

export function getNewProducts(): Product[] {
  return getAllProducts().filter(product =>
    product.collection.includes('new-in')
  );
}

export function getFeaturedProducts(): Product[] {
  return getAllProducts().filter(product =>
    product.collection.includes('featured')
  );
}

export function getProductById(id: string): Product | undefined {
  return getAllProducts().find(product => product.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find(product => product.slug === slug);
}

export function getProductsByCategory(category: 'watch' | 'perfume'): Product[] {
  return getAllProducts().filter(product => product.category === category);
}

export function getProductsByCollection(collection: string): Product[] {
  return getAllProducts().filter(product =>
    product.collection.includes(collection)
  );
}

export function formatPrice(price: number | null, currency: string, locale: 'de' | 'en'): string {
  if (price === null) {
    return locale === 'de' ? 'Preis auf Anfrage' : 'Price on request';
  }

  return price.toLocaleString(locale === 'de' ? 'de-DE' : 'en-US', {
    style: 'currency',
    currency: currency,
  });
}
