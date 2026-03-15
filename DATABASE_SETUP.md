# Database Setup Guide

## Overview

Your Sanfora webapp now uses **Neon Postgres** (Vercel's database solution) to store products instead of a JSON file. This ensures data persists on Vercel.

## Step-by-Step Setup

### 1. Create Neon Postgres Database on Vercel

1. Go to **Vercel Dashboard** → **Storage**
2. Click **Create Database**
3. Select **Neon Postgres**
4. Name it: `sanfora-products`
5. Select your region (choose closest to your users)
6. Click **Create**
7. **Connect to Project**: Select your Sanfora project
8. Vercel will automatically add `DATABASE_URL` to your environment variables

### 2. Add DATABASE_URL to Local Environment

1. In Vercel Dashboard, go to your database
2. Copy the **DATABASE_URL** connection string
3. Add it to your `.env.local` file:

```env
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
```

Your `.env.local` should now have:
```env
BLOB_READ_WRITE_TOKEN="your_vercel_blob_token_here"
ADMIN_PASSWORD="your_secure_password"
ADMIN_SESSION_SECRET="your_random_secret_here"
DATABASE_URL="postgresql://..."
```

### 3. Run Database Schema

Create the products table by running the SQL schema:

**Option A: Using Vercel Dashboard**
1. Go to your database in Vercel Dashboard
2. Click the **"Query"** tab
3. Copy the contents of `schema.sql`
4. Paste and click **"Run Query"**

**Option B: Using psql (if installed)**
```bash
psql $DATABASE_URL -f schema.sql
```

### 4. Migrate Existing Products

Run the migration script to move products from JSON to database:

```bash
npx tsx scripts/migrate-to-db.ts
```

You should see output like:
```
🚀 Starting migration...
📦 Found 12 products in JSON file

✅ Migrated: w001 - Rolex Submariner Date
✅ Migrated: w002 - Patek Philippe Nautilus
✅ Migrated: p001 - Creed Aventus
...

📊 Migration Summary:
   ✅ Success: 12 products
   ❌ Failed: 0 products

🎉 Migration completed successfully!
```

### 5. Test the Database

1. Restart your dev server:
   ```bash
   npm run dev
   ```

2. Open `http://localhost:3000/de`
3. Products should appear on the homepage
4. Try the admin panel at `http://localhost:3000/admin/login`
5. Add a new product to test database inserts

## Verifying It Works

### Check Products are in Database

**Via Vercel Dashboard:**
1. Go to Storage → Your Database → Query tab
2. Run:
   ```sql
   SELECT id, title, category FROM products;
   ```

**Via API:**
Visit: `http://localhost:3000/api/products`

You should see JSON array of all products.

## What Changed

### Before (JSON File):
```
data/products.json
  ↓
lib/products.ts reads file
  ↓
Pages display products
```

### After (Neon Database):
```
Neon Postgres Database
  ↓
API routes (app/api/products/)
  ↓
lib/products.ts queries database
  ↓
Pages display products
```

## Files Updated

- ✅ `app/api/products/route.ts` - Now uses Neon SQL
- ✅ `app/api/products/[id]/route.ts` - CRUD operations via database
- ✅ `lib/products.ts` - Queries database instead of JSON
- ✅ `schema.sql` - Database table definition
- ✅ `scripts/migrate-to-db.ts` - Migration script

## Important Notes

### JSON File Still Exists
The `data/products.json` file still exists but is **NO LONGER USED** in production. It's only used for the initial migration.

### All Functions Now Async
Product functions in `lib/products.ts` are now `async`:

**Before:**
```typescript
const products = getAllProducts();
```

**After:**
```typescript
const products = await getAllProducts();
```

Your page components already handle this correctly since they're Server Components.

## Troubleshooting

### Error: "DATABASE_URL is not set"
- Make sure you added `DATABASE_URL` to `.env.local`
- Restart your dev server after adding environment variables

### Migration script fails
```bash
# Check database connection
psql $DATABASE_URL -c "SELECT 1"

# Verify table exists
psql $DATABASE_URL -c "SELECT * FROM products LIMIT 1"
```

### Products not showing on website
1. Check database has data:
   ```sql
   SELECT COUNT(*) FROM products;
   ```
2. Check API works: Visit `/api/products`
3. Check browser console for errors

### "relation 'products' does not exist"
You forgot to run the schema! Go back to Step 3 and create the table.

## Production Deployment

When deploying to Vercel:

1. ✅ Database is already created (Step 1)
2. ✅ `DATABASE_URL` is automatically set by Vercel
3. ✅ Run migration once in Vercel:
   - Go to Project Settings → Functions
   - Or run migration locally pointing to production DB

4. ✅ Deploy your code:
   ```bash
   git push
   ```

## Environment Variables Summary

### Local (.env.local):
```env
DATABASE_URL="postgresql://..."
BLOB_READ_WRITE_TOKEN="your_vercel_blob_token_here"
ADMIN_PASSWORD="your_secure_password"
ADMIN_SESSION_SECRET="your_random_secret_here"
```

### Production (Vercel automatically sets):
- ✅ `DATABASE_URL` (when you connect database to project)
- ⚠️ `BLOB_READ_WRITE_TOKEN` (you need to add manually)
- ⚠️ `ADMIN_PASSWORD` (you need to add manually)
- ⚠️ `ADMIN_SESSION_SECRET` (you need to add manually)

## Cost

- **Neon Postgres on Vercel**: Free tier includes:
  - 0.5 GB storage
  - 100 hours compute/month
  - Perfect for small catalog (100s of products)

- If you exceed free tier: ~$20/month

## Next Steps

After setup:
1. ✅ Test adding products via admin panel
2. ✅ Test editing products
3. ✅ Test deleting products
4. ✅ Verify all changes persist after server restart
5. ✅ Deploy to Vercel

## Need Help?

If you encounter issues:
1. Check the error message carefully
2. Verify all environment variables are set
3. Make sure schema.sql was run successfully
4. Check the migration script output
5. Contact your developer if stuck

---

**Version**: 1.0
**Last Updated**: 2026-03-15
