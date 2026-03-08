# Configuration Guide

This guide covers all configurable settings in the Sanfora Time Pieces website.

## WhatsApp Number

**File:** `lib/config.ts`

```typescript
export const siteConfig = {
  whatsapp: {
    phoneNumber: '41799173326', // Change this number
  },
};
```

**Format:** International format without `+` or spaces
- Current: `41799173326` (+41 79 917 33 26)
- To change to a German number: `491234567890` (+49 123 456 7890)

See [WHATSAPP_SETUP.md](./WHATSAPP_SETUP.md) for detailed instructions.

## Company Information

**File:** `lib/config.ts`

```typescript
export const siteConfig = {
  company: {
    name: 'Sanfora Time Pieces',
    email: 'info@sanfora-timepieces.de',
    phone: '+41 79 917 33 26',
  },
};
```

Update these values to match your business details.

**Also update in:**
- `app/[locale]/contact/page.tsx` - Contact page details
- `app/[locale]/impressum/page.tsx` - Legal information
- `messages/de.json` and `messages/en.json` - Any hardcoded text

## Site URL

For WhatsApp links and SEO, set your site URL:

**File:** `.env.local` (create if doesn't exist)

```bash
NEXT_PUBLIC_SITE_URL=https://sanfora-timepieces.com
```

For local development:
```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Products

**File:** `data/products.json`

Add, edit, or remove products. See [PRODUCTS.md](./PRODUCTS.md) for the schema.

## Translations

**Files:** `messages/de.json` and `messages/en.json`

All visible text is in these files. Edit to customize:
- Navigation labels
- Page titles and descriptions
- Button text
- Form labels
- Error messages
- WhatsApp button text

## Styling

### Colors

**File:** `tailwind.config.ts`

```typescript
colors: {
  luxury: {
    black: '#0A0A0A',
    white: '#FAFAFA',
    gray: {
      100: '#F5F5F5',
      // ... more shades
    }
  }
}
```

### Fonts

**File:** `app/[locale]/layout.tsx`

```typescript
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});
```

To change fonts:
1. Import from `next/font/google`
2. Update the font constants
3. CSS variables automatically update

## Languages

### Add a New Language

1. **Add locale to routing:**

**File:** `i18n/routing.ts`
```typescript
export const routing = defineRouting({
  locales: ['de', 'en', 'fr'], // Add 'fr'
  defaultLocale: 'de',
});
```

2. **Create translation file:**

Create `messages/fr.json` with all translations

3. **Update middleware:**

**File:** `middleware.ts`
```typescript
export const config = {
  matcher: ['/', '/(de|en|fr)/:path*'] // Add 'fr'
};
```

4. **Rebuild:** `npm run build`

### Change Default Language

**File:** `i18n/routing.ts`

```typescript
export const routing = defineRouting({
  locales: ['de', 'en'],
  defaultLocale: 'en', // Change from 'de' to 'en'
});
```

## Meta Tags and SEO

**File:** `app/[locale]/layout.tsx`

```typescript
export const metadata = {
  title: 'Sanfora Time Pieces - Luxury Watches & Perfumes',
  description: 'Discover our exclusive collection...',
};
```

For page-specific meta tags, add to each page:

```typescript
export const metadata = {
  title: 'Watches - Sanfora Time Pieces',
  description: 'Browse our collection of luxury timepieces',
};
```

## Environment Variables

Create `.env.local` for local development:

```bash
# Site URL (required for WhatsApp links)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Add other variables as needed
# NEXT_PUBLIC_ANALYTICS_ID=G-XXXXXXXXXX
```

**Production:** Set these in your hosting platform (Vercel, Netlify, etc.)

## Analytics

### Google Analytics

1. Get your GA4 Measurement ID
2. Add to `.env.local`:
   ```bash
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

3. Add to `app/[locale]/layout.tsx`:
   ```typescript
   <Script
     src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
     strategy="afterInteractive"
   />
   <Script id="google-analytics" strategy="afterInteractive">
     {`
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
       gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
     `}
   </Script>
   ```

### Vercel Analytics

```bash
npm i @vercel/analytics
```

Add to layout:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

## Image Optimization

### Add Product Images

1. Place images in `public/products/`
   ```
   public/
   ├── products/
   │   ├── watches/
   │   │   ├── rolex-submariner-1.jpg
   │   │   └── rolex-submariner-2.jpg
   │   └── perfumes/
   │       ├── creed-aventus-1.jpg
   │       └── creed-aventus-2.jpg
   ```

2. Update product image paths in `data/products.json`
   ```json
   {
     "images": [
       "/products/watches/rolex-submariner-1.jpg",
       "/products/watches/rolex-submariner-2.jpg"
     ]
   }
   ```

3. Enable Next.js Image optimization:

**File:** `components/products/ImageGallery.tsx`

Uncomment the Image components:
```typescript
<Image
  src={images[selectedIndex]}
  alt={`${productTitle} - Image ${selectedIndex + 1}`}
  fill
  className="object-cover"
  priority={selectedIndex === 0}
/>
```

## Logo

**File:** `public/imgs/logo.jpeg`

Replace with your logo. Recommended:
- Format: PNG or SVG for transparency
- Size: 300x100px minimum
- File: `logo.png` or `logo.svg`

Update reference in `components/layout/Header.tsx`:
```typescript
<Image
  src="/imgs/logo.png" // Update extension
  alt="Sanfora Time Pieces"
  width={120}
  height={40}
/>
```

## Contact Form

The contact form is currently client-side only (shows alert).

To add email functionality:

1. **Use a service:**
   - [Formspree](https://formspree.io/)
   - [EmailJS](https://www.emailjs.com/)
   - [SendGrid](https://sendgrid.com/)

2. **Add API route:**

Create `app/api/contact/route.ts`:
```typescript
export async function POST(request: Request) {
  const data = await request.json();
  // Send email using your service
  return Response.json({ success: true });
}
```

3. **Update form submit:**

**File:** `app/[locale]/contact/page.tsx`
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
  // Handle response
};
```

## Deployment Configuration

### Vercel

Set environment variables in project settings:
- `NEXT_PUBLIC_SITE_URL`
- Any analytics IDs
- API keys (if needed)

### Environment-Specific Settings

```typescript
// lib/config.ts
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

export const siteConfig = {
  whatsapp: {
    phoneNumber: isDevelopment
      ? '1234567890' // Test number
      : '41799173326', // Production number
  },
};
```

## Security

### Contact Form Spam Protection

Add reCAPTCHA:

1. Get keys from [Google reCAPTCHA](https://www.google.com/recaptcha)
2. Install: `npm install react-google-recaptcha`
3. Add to form component
4. Verify on backend

### Rate Limiting

For WhatsApp links, consider rate limiting to prevent abuse.

## Maintenance Mode

Create `app/[locale]/maintenance/page.tsx`:

```typescript
export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl mb-4">Under Maintenance</h1>
        <p>We'll be back soon!</p>
      </div>
    </div>
  );
}
```

Redirect in `middleware.ts` when needed.

## Backup

Regularly backup:
1. `data/products.json`
2. `messages/` translations
3. `public/` images
4. `.env.local` settings (securely)

Use Git for version control of code.
