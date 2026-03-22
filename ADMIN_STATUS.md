# Admin Portal - Status & Setup Guide

## ✅ What's Been Completed

### 1. German Translation
- **Login page**: Fully translated
- **Dashboard**: Fully translated (Inventarverwaltung)
- **Add/Edit forms**: **Partially translated** (needs completion)

Key translated terms:
- "Admin Login" → "Admin Anmeldung"
- "Password" → "Passwort"
- "Inventory Management" → "Inventarverwaltung"
- "Add Product" → "Produkt hinzufügen"
- "Edit" → "Bearbeiten"
- "Delete" → "Löschen"
- "Watch" → "Uhr"
- "Perfume" → "Parfüm"
- "All" → "Alle"
- "Watches" → "Uhren"
- "Perfumes" → "Parfüms"

### 2. Image Upload with Vercel Blob
- ✅ Installed `@vercel/blob` package
- ✅ Created upload API that works on Vercel
- ✅ Updated ImageUploader component with German text
- ✅ Image validation (10MB max, image files only)
- ✅ Preview functionality

### 3. Admin Portal Features
- ✅ Password-protected login
- ✅ Product list with filtering
- ✅ Add product form
- ✅ Edit product form
- ✅ Delete with confirmation
- ✅ German interface

## ⚠️ Critical: Vercel Deployment Requirements

### Problem: JSON File Storage Won't Work on Vercel
The current system saves products to `data/products.json`. **This will NOT work on Vercel** because:
- Vercel's file system is READ-ONLY in production
- Any changes made through the admin panel will be LOST on redeploy
- Products will reset to the JSON file state

### Solution Options:

#### Option A: Vercel Postgres (Recommended for Production)
**Pros:**
- Persistent data storage
- Scalable and reliable
- Free tier available

**Cons:**
- Requires database setup (~30 minutes)
- Need to migrate existing products

**Steps:**
1. Create Vercel Postgres database in dashboard
2. Run SQL schema (see VERCEL_DEPLOYMENT.md)
3. Update API routes to use Postgres
4. Migrate existing products from JSON

**Cost:** Free tier or $20/month

#### Option B: Keep JSON File (Development/Testing Only)
**Pros:**
- No setup required
- Works locally

**Cons:**
- Products reset on every Vercel deployment
- Not suitable for production
- Your cousin's changes will be lost

**When to use:** Testing only

## 🔧 Required Environment Variables for Vercel

Add these in your Vercel project settings:

```env
# Admin password (server-side only — CHANGE THIS!)
ADMIN_PASSWORD=choose_a_secure_password

# Session signing secret (generate with: openssl rand -hex 32)
ADMIN_SESSION_SECRET=your_random_secret_here

# Vercel Blob for image uploads
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token_here

# If using Postgres (recommended):
DATABASE_URL=postgres://...
```

## 📝 How Your Cousin Will Use the Admin

### 1. Login
Visit: `https://your-domain.com/admin/login`
Enter the password you set

### 2. View Products
- See all watches and perfumes
- Filter by category
- View details

### 3. Add Product
1. Click "Produkt hinzufügen"
2. Select category (Uhr or Parfüm)
3. Fill in details:
   - ID (e.g., w001, p001)
   - Title
   - Price (or leave empty for "Auf Anfrage")
   - Description in German and English
4. **Upload images**:
   - Click on the upload area
   - Select image (max 10MB)
   - Image is automatically uploaded to Vercel Blob
   - URL is added to product
5. Select collections (featured, new-in)
6. Add specifications (watch: reference, year, etc.)
7. Click "Produkt hinzufügen"

### 4. Edit Product
1. Find product in dashboard
2. Click "Bearbeiten"
3. Update any fields
4. Upload new images if needed
5. Click "Update Product"

### 5. Delete Product
1. Click "Löschen" next to product
2. Confirm deletion

## 🖼️ Image Upload Flow

**Your cousin doesn't need file system access!**

1. He clicks the upload area in the form
2. Selects an image from his computer
3. Image is automatically uploaded to Vercel Blob
4. He sees a preview
5. The image URL is saved with the product

All images are stored in Vercel's cloud storage, not in the code repository.

## 🎨 Interface Language

**Current status:**
- Login: 100% German ✅
- Dashboard: 100% German ✅
- Add/Edit forms: ~60% German ⚠️

**To complete German translation:**

The add/edit forms still have some English labels. Key areas to translate:

```
Add Product → Produkt hinzufügen ✅
Product ID → Produkt-ID
Title → Titel
URL Slug → URL-Slug
Description (German) → Beschreibung (Deutsch)
Description (English) → Beschreibung (Englisch)
Image URLs → Bild-URLs
Collections → Sammlungen
Watch Specifications → Uhren-Spezifikationen
Perfume Specifications → Parfüm-Spezifikationen
Reference Number → Referenznummer
Year → Jahr
Condition → Zustand
Box & Papers → Box & Papiere
Case Size → Gehäusegrösse
Movement → Uhrwerk
Size → Grösse
Concentration → Konzentration
Top Notes → Kopfnoten
Heart Notes → Herznoten
Base Notes → Basisnoten
Gender → Geschlecht
Submit → Absenden
Cancel → Abbrechen
```

If you want me to complete the full German translation, let me know!

## 🚀 Next Steps for Production

### Before Deploying to Vercel:

1. **Choose storage solution:**
   - [ ] Set up Vercel Postgres (recommended)
   - OR accept that products will reset (not recommended)

2. **Set environment variables:**
   - [ ] `ADMIN_PASSWORD`
   - [ ] `ADMIN_SESSION_SECRET`
   - [ ] `BLOB_READ_WRITE_TOKEN` (from Vercel Blob store)
   - [ ] Postgres credentials (if using database)

3. **Update configuration:**
   - [ ] Change WhatsApp number in `lib/config.ts`
   - [ ] Update company email
   - [ ] Add real product images

4. **Optional improvements:**
   - [ ] Complete German translation of add/edit forms
   - [ ] Add proper authentication (NextAuth.js)
   - [ ] Add product inventory status (sold/available)
   - [ ] Add bulk import/export

### Deploy:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect GitHub repo to Vercel for auto-deploy
```

## 📚 Documentation Files

- `ADMIN_GUIDE.md` - For your cousin (how to use the admin)
- `VERCEL_DEPLOYMENT.md` - Technical deployment guide
- `ADMIN_STATUS.md` - This file (current status)

## ❓ FAQs

**Q: Can my cousin add products without touching code?**
A: Yes! The admin panel provides a web interface. He just needs the password.

**Q: Where are images stored?**
A: On Vercel Blob (cloud storage), not in the code repository.

**Q: Do I need a database?**
A: For production on Vercel, YES. For local testing, no.

**Q: How much does it cost?**
A: Vercel hosting is free. Blob storage is ~$1/month. Postgres free tier or $20/month.

**Q: Can I test this before deploying?**
A: Yes! Run `npm run dev` locally and test at `http://localhost:3000/admin/login`

## 🆘 Need Help?

For production deployment with Postgres database, you'll need developer help to:
1. Create database schema
2. Update API routes to use Postgres
3. Migrate existing products

Let me know if you want me to complete any of these steps!
