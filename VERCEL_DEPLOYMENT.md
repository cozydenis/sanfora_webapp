# Vercel Deployment Guide

## Important: Database Required for Production

⚠️ **Critical Issue**: The current setup saves products to `data/products.json`, which **will NOT work on Vercel** because Vercel's file system is read-only in production.

Before deploying to Vercel, you MUST set up a database to store products.

## Recommended Solutions

### Option 1: Vercel Postgres (Recommended)
**Best for**: Production deployment, reliable and scalable
**Cost**: Free tier available (60 hours compute time/month)

1. Create a Vercel Postgres database in your Vercel dashboard
2. Install the package:
   ```bash
   npm install @vercel/postgres
   ```
3. Update the API routes to use Postgres instead of JSON file
4. Vercel will automatically configure environment variables

### Option 2: Keep JSON File (Development Only)
**Best for**: Testing and development
**Cost**: Free
**Limitation**: Changes won't persist on Vercel, resets on every deployment

If you want to keep using the JSON file for now:
- It will work locally
- On Vercel, products will reset to the JSON file state on every deployment
- Any products added through the admin panel will be lost on redeploy

## Setting Up Vercel Blob for Images

Vercel Blob is already configured in the code. Follow these steps:

### 1. Create a Blob Store
1. Go to your Vercel dashboard
2. Navigate to Storage
3. Create a new Blob store
4. Copy the `BLOB_READ_WRITE_TOKEN`

### 2. Add Environment Variable
In your Vercel project settings:
```
BLOB_READ_WRITE_TOKEN=your_token_here
```

### 3. Set Admin Password and Session Secret
Add these environment variables:
```
ADMIN_PASSWORD=your_secure_password_here
ADMIN_SESSION_SECRET=your_random_secret_here
```

Generate a session secret with: `openssl rand -hex 32`

## Complete Deployment Checklist

### Before First Deploy:
- [ ] Set up Vercel Postgres database (or choose to keep JSON file)
- [ ] Create Vercel Blob storage
- [ ] Set `BLOB_READ_WRITE_TOKEN` environment variable
- [ ] Set `ADMIN_PASSWORD` environment variable
- [ ] Set `ADMIN_SESSION_SECRET` environment variable
- [ ] Update WhatsApp number in `lib/config.ts`
- [ ] Update company email in `lib/config.ts`

### Deploy to Vercel:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your Git repository to Vercel for automatic deployments.

## After Deployment

### Test the Admin Panel:
1. Visit `https://your-domain.com/admin/login`
2. Log in with your password
3. Add a test product
4. Upload a test image
5. Verify it appears on the website

### If Using JSON File (Not Recommended for Production):
- Understand that all admin changes will be lost on redeploy
- Consider this a temporary solution
- Migrate to Postgres when ready for production

## Migrating to Postgres

When you're ready to migrate from JSON to Postgres:

1. **Create the database schema**:
```sql
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  collection TEXT[] DEFAULT ARRAY[]::TEXT[],
  price DECIMAL,
  currency TEXT DEFAULT 'EUR',
  description_de TEXT,
  description_en TEXT,
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  specifications JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

2. **Update API routes** (`app/api/products/route.ts` and `app/api/products/[id]/route.ts`):
   - Replace `fs.readFile` with SQL queries
   - Replace `fs.writeFile` with SQL INSERT/UPDATE

3. **Import existing products**:
```typescript
// One-time migration script
import { sql } from '@vercel/postgres';
import products from './data/products.json';

for (const product of products) {
  await sql`
    INSERT INTO products (id, title, slug, category, ...)
    VALUES (${product.id}, ${product.title}, ...)
  `;
}
```

## Troubleshooting

### Images not uploading
- Check `BLOB_READ_WRITE_TOKEN` is set correctly
- Verify token has write permissions
- Check file size is under 10MB

### Products not saving
- If using JSON: This is expected on Vercel, migrate to Postgres
- If using Postgres: Check database connection and credentials

### Admin panel not accessible
- Verify middleware is excluding `/admin` routes
- Check `ADMIN_PASSWORD` is set

## Environment Variables Summary

Required for production:
```env
# Admin Access
ADMIN_PASSWORD=your_secure_password
ADMIN_SESSION_SECRET=your_random_secret_here

# Image Uploads (Vercel Blob)
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token_here

# Database (if using Postgres)
DATABASE_URL=postgres://...
```

## Cost Estimate

For a small watch/perfume resale business:

- **Vercel Hosting**: Free (Hobby plan)
- **Vercel Blob**: ~$0.15/GB/month (likely <$1/month for images)
- **Vercel Postgres**: Free tier (60 hours/month) or $20/month Pro

**Total**: ~$0-20/month depending on database choice

## Support

For help migrating to Postgres or issues with deployment, contact your developer.
