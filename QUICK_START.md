# Quick Start Guide

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit http://localhost:3000

## Important: Change WhatsApp Number

**File:** `lib/config.ts`

```typescript
export const siteConfig = {
  whatsapp: {
    phoneNumber: '41799173326', // ⚠️ CHANGE THIS
  },
};
```

## Product Routes

### Watches
- Collection: `/de/watches` or `/en/watches`
- Detail: `/de/watches/[slug]`
- Example: `/de/watches/rolex-submariner-date-116610ln`

### Perfumes
- Collection: `/de/perfumes` or `/en/perfumes`
- Detail: `/de/perfumes/[slug]`
- Example: `/de/perfumes/creed-aventus-edp-100ml`

## WhatsApp Button

On each product detail page, customers can click the WhatsApp button to send:

```
Hi, I'm interested in [Product Name] — [Product URL]
```

Example:
```
Hi, I'm interested in Rolex Submariner Date — https://sanfora-timepieces.com/de/watches/rolex-submariner-date-116610ln
```

## Add Products

**File:** `data/products.json`

```json
{
  "id": "w004",
  "title": "Your Watch Name",
  "slug": "your-watch-name",
  "category": "watch",
  "collection": ["featured", "new-in"],
  "price": 5000,
  "currency": "EUR",
  "description": {
    "de": "German description",
    "en": "English description"
  },
  "images": [
    "/products/watches/your-watch-1.jpg",
    "/products/watches/your-watch-2.jpg"
  ],
  "specifications": {
    "referenceNumber": "ABC123",
    "year": "2024",
    "condition": "Unworn",
    "boxAndPapers": "Complete Set",
    "caseSize": "40mm",
    "movement": "Automatic"
  }
}
```

## Add Images

1. Place images in `public/products/watches/` or `public/products/perfumes/`
2. Update image paths in `data/products.json`
3. Uncomment Image components in `components/products/ImageGallery.tsx`

## Deploy

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

Set environment variable:
- `NEXT_PUBLIC_SITE_URL` = Your production URL

### Build for Production

```bash
npm run build
npm start
```

## Common Tasks

### Change WhatsApp Number
→ See `WHATSAPP_SETUP.md`

### Add/Edit Products
→ Edit `data/products.json`

### Change Translations
→ Edit `messages/de.json` and `messages/en.json`

### Update Company Info
→ Edit `lib/config.ts`, `app/[locale]/contact/page.tsx`, and `app/[locale]/impressum/page.tsx`

## Folder Structure

```
sanfora_webapp/
├── app/[locale]/              # Pages (German & English)
│   ├── watches/[slug]/        # Watch detail pages
│   ├── perfumes/[slug]/       # Perfume detail pages
│   └── ...other pages
├── components/
│   ├── products/              # Product components
│   │   ├── ImageGallery.tsx  # Image gallery
│   │   ├── ProductCard.tsx   # Product cards
│   │   └── WhatsAppButton.tsx # WhatsApp CTA
│   ├── layout/                # Header, Footer
│   └── ui/                    # UI components
├── data/
│   └── products.json          # ⚠️ Edit this to add products
├── lib/
│   ├── config.ts              # ⚠️ WhatsApp number here
│   ├── products.ts            # Product utilities
│   └── types.ts               # TypeScript types
├── messages/
│   ├── de.json                # German translations
│   └── en.json                # English translations
└── public/
    ├── imgs/logo.jpeg         # Your logo
    └── products/              # Product images
        ├── watches/
        └── perfumes/
```

## Documentation

- `README.md` - Overview and installation
- `PRODUCTS.md` - Product data structure
- `WHATSAPP_SETUP.md` - WhatsApp configuration ⭐
- `CONFIGURATION.md` - All settings
- `DEPLOYMENT.md` - Deployment guide
- `HOME_PAGE.md` - Design documentation

## Support

For issues or questions, check the documentation files above.

## Next Steps

1. ✅ Change WhatsApp number in `lib/config.ts`
2. ✅ Add your products to `data/products.json`
3. ✅ Add product images to `public/products/`
4. ✅ Update company info in Contact and Impressum pages
5. ✅ Test WhatsApp functionality
6. ✅ Deploy to production
7. ✅ Set `NEXT_PUBLIC_SITE_URL` environment variable
