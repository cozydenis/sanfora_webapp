import { Product, WatchProduct, PerfumeProduct } from './types';
import { neon, NeonQueryFunction } from '@neondatabase/serverless';

/**
 * Get a database connection, or null if DATABASE_URL is not configured.
 * This allows the app to run locally without a database (pages will show empty product lists).
 */
function getSQL(): NeonQueryFunction<false, false> | null {
  if (!process.env.DATABASE_URL) {
    console.warn('DATABASE_URL is not set — returning empty product data.');
    return null;
  }
  return neon(process.env.DATABASE_URL);
}

// Helper function to transform database row to Product
function rowToProduct(row: any): Product {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category,
    collection: row.collection || [],
    price: row.price ? parseFloat(row.price) : null,
    currency: row.currency,
    description: {
      de: row.description_de,
      en: row.description_en,
    },
    images: row.images || [],
    specifications: row.specifications,
  } as Product;
}

export async function getAllProducts(): Promise<Product[]> {
  const sql = getSQL();
  if (!sql) return [];

  const rows = await sql`
    SELECT * FROM products
    ORDER BY created_at DESC
  `;
  return rows.map(rowToProduct);
}

export async function getWatches(): Promise<WatchProduct[]> {
  const sql = getSQL();
  if (!sql) return [];

  const rows = await sql`
    SELECT * FROM products
    WHERE category = 'watch'
    ORDER BY created_at DESC
  `;
  return rows.map(rowToProduct) as WatchProduct[];
}

export async function getPerfumes(): Promise<PerfumeProduct[]> {
  const sql = getSQL();
  if (!sql) return [];

  const rows = await sql`
    SELECT * FROM products
    WHERE category = 'perfume'
    ORDER BY created_at DESC
  `;
  return rows.map(rowToProduct) as PerfumeProduct[];
}

export async function getNewProducts(): Promise<Product[]> {
  const sql = getSQL();
  if (!sql) return [];

  const rows = await sql`
    SELECT * FROM products
    WHERE 'new-in' = ANY(collection)
    ORDER BY created_at DESC
  `;
  return rows.map(rowToProduct);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const sql = getSQL();
  if (!sql) return [];

  const rows = await sql`
    SELECT * FROM products
    WHERE 'featured' = ANY(collection)
    ORDER BY created_at DESC
  `;
  return rows.map(rowToProduct);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const sql = getSQL();
  if (!sql) return undefined;

  const rows = await sql`
    SELECT * FROM products
    WHERE id = ${id}
  `;
  return rows.length > 0 ? rowToProduct(rows[0]) : undefined;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const sql = getSQL();
  if (!sql) return undefined;

  const rows = await sql`
    SELECT * FROM products
    WHERE slug = ${slug}
  `;
  return rows.length > 0 ? rowToProduct(rows[0]) : undefined;
}

export async function getProductsByCategory(category: 'watch' | 'perfume'): Promise<Product[]> {
  const sql = getSQL();
  if (!sql) return [];

  const rows = await sql`
    SELECT * FROM products
    WHERE category = ${category}
    ORDER BY created_at DESC
  `;
  return rows.map(rowToProduct);
}

export async function getProductsByCollection(collection: string): Promise<Product[]> {
  const sql = getSQL();
  if (!sql) return [];

  const rows = await sql`
    SELECT * FROM products
    WHERE ${collection} = ANY(collection)
    ORDER BY created_at DESC
  `;
  return rows.map(rowToProduct);
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
