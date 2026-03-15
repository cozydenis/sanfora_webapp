/**
 * Migration script to move products from JSON file to Neon Postgres database
 *
 * Run this script ONCE after setting up your database:
 * npx tsx scripts/migrate-to-db.ts
 */

import { neon } from '@neondatabase/serverless';
import productsData from '../data/products.json';
import type { Product } from '../lib/types';

async function migrate() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ ERROR: DATABASE_URL environment variable is not set');
    console.log('\nPlease add DATABASE_URL to your .env.local file:');
    console.log('DATABASE_URL=postgresql://...');
    process.exit(1);
  }

  const sql = neon(process.env.DATABASE_URL);

  console.log('🚀 Starting migration...\n');
  console.log(`📦 Found ${productsData.length} products in JSON file\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const product of productsData as Product[]) {
    try {
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
          ${product.id},
          ${product.title},
          ${product.slug},
          ${product.category},
          ${product.collection},
          ${product.price},
          ${product.currency},
          ${product.description.de},
          ${product.description.en},
          ${product.images},
          ${JSON.stringify(product.specifications)}
        )
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          slug = EXCLUDED.slug,
          category = EXCLUDED.category,
          collection = EXCLUDED.collection,
          price = EXCLUDED.price,
          currency = EXCLUDED.currency,
          description_de = EXCLUDED.description_de,
          description_en = EXCLUDED.description_en,
          images = EXCLUDED.images,
          specifications = EXCLUDED.specifications
      `;

      console.log(`✅ Migrated: ${product.id} - ${product.title}`);
      successCount++;
    } catch (error) {
      console.error(`❌ Failed to migrate ${product.id}:`, error);
      errorCount++;
    }
  }

  console.log('\n📊 Migration Summary:');
  console.log(`   ✅ Success: ${successCount} products`);
  console.log(`   ❌ Failed: ${errorCount} products`);

  if (errorCount === 0) {
    console.log('\n🎉 Migration completed successfully!');
  } else {
    console.log('\n⚠️  Migration completed with errors. Please check the logs above.');
  }
}

migrate().catch((error) => {
  console.error('💥 Migration failed:', error);
  process.exit(1);
});
