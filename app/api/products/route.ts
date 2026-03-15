import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import type { Product } from '@/lib/types';
import { verifyAuthFromRequest } from '@/lib/auth';

// GET all products (public — storefront needs this)
export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!);

    const rows = await sql`
      SELECT
        id,
        title,
        slug,
        category,
        collection,
        price,
        currency,
        description_de,
        description_en,
        images,
        specifications,
        created_at,
        updated_at
      FROM products
      ORDER BY created_at DESC
    `;

    // Transform database rows to Product objects
    const products: Product[] = rows.map((row: any) => ({
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
    }));

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error reading products:', error);
    return NextResponse.json(
      { error: 'Failed to read products' },
      { status: 500 }
    );
  }
}

// POST new product (admin only)
export async function POST(request: NextRequest) {
  if (!verifyAuthFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const newProduct: Product = await request.json();
    const sql = neon(process.env.DATABASE_URL!);

    await sql`
      INSERT INTO products (
        id,
        title,
        slug,
        category,
        collection,
        price,
        currency,
        description_de,
        description_en,
        images,
        specifications
      ) VALUES (
        ${newProduct.id},
        ${newProduct.title},
        ${newProduct.slug},
        ${newProduct.category},
        ${newProduct.collection},
        ${newProduct.price},
        ${newProduct.currency},
        ${newProduct.description.de},
        ${newProduct.description.en},
        ${newProduct.images},
        ${JSON.stringify(newProduct.specifications)}
      )
    `;

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json(
      { error: 'Failed to add product' },
      { status: 500 }
    );
  }
}
