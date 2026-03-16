import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { revalidatePath } from 'next/cache';
import type { Product } from '@/lib/types';
import { verifyAuthFromRequest } from '@/lib/auth';

// GET single product
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
        specifications
      FROM products
      WHERE id = ${params.id}
    `;

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const row = rows[0];
    const product: Product = {
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

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error reading product:', error);
    return NextResponse.json(
      { error: 'Failed to read product' },
      { status: 500 }
    );
  }
}

// PUT update product (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!verifyAuthFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const updatedProduct: Product = await request.json();
    const sql = neon(process.env.DATABASE_URL!);

    const result = await sql`
      UPDATE products
      SET
        title = ${updatedProduct.title},
        slug = ${updatedProduct.slug},
        category = ${updatedProduct.category},
        collection = ${updatedProduct.collection},
        price = ${updatedProduct.price},
        currency = ${updatedProduct.currency},
        description_de = ${updatedProduct.description.de},
        description_en = ${updatedProduct.description.en},
        images = ${updatedProduct.images},
        specifications = ${JSON.stringify(updatedProduct.specifications)}
      WHERE id = ${params.id}
      RETURNING id
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Revalidate all pages that might show this product
    revalidatePath('/de');
    revalidatePath('/en');
    revalidatePath('/de/new-in');
    revalidatePath('/en/new-in');
    revalidatePath('/de/watches');
    revalidatePath('/en/watches');
    revalidatePath('/de/perfumes');
    revalidatePath('/en/perfumes');
    revalidatePath(`/de/${updatedProduct.category === 'watch' ? 'watches' : 'perfumes'}/${updatedProduct.slug}`);
    revalidatePath(`/en/${updatedProduct.category === 'watch' ? 'watches' : 'perfumes'}/${updatedProduct.slug}`);

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// DELETE product (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!verifyAuthFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const sql = neon(process.env.DATABASE_URL!);

    const result = await sql`
      DELETE FROM products
      WHERE id = ${params.id}
      RETURNING id
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Revalidate all pages that might have shown this product
    revalidatePath('/de');
    revalidatePath('/en');
    revalidatePath('/de/new-in');
    revalidatePath('/en/new-in');
    revalidatePath('/de/watches');
    revalidatePath('/en/watches');
    revalidatePath('/de/perfumes');
    revalidatePath('/en/perfumes');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
