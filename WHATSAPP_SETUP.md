# WhatsApp Integration

## Overview

Each product detail page includes a prominent WhatsApp button that allows customers to inquire about products directly via WhatsApp.

## How It Works

When a customer clicks the WhatsApp button:
1. Opens WhatsApp (web or app)
2. Starts a chat with your business number
3. Pre-fills the message with:
   ```
   Hi, I'm interested in [Product Title] — [Product URL]
   ```

### Example Messages

**Watch:**
```
Hi, I'm interested in Rolex Submariner Date — https://sanfora-timepieces.com/de/watches/rolex-submariner-date-116610ln
```

**Perfume:**
```
Hi, I'm interested in Creed Aventus — https://sanfora-timepieces.com/de/perfumes/creed-aventus-edp-100ml
```

## Configuration

### Change WhatsApp Number

**File:** `lib/config.ts`

```typescript
export const siteConfig = {
  whatsapp: {
    // Update this number in international format (without + or spaces)
    phoneNumber: '41799173326', // Current: +41 79 917 33 26
  },
};
```

**Format:** Remove all spaces, dashes, and the `+` symbol
- ✅ Correct: `41799173326`
- ❌ Wrong: `+41 79 917 33 26`
- ❌ Wrong: `+41799173326`

### Change Site URL

The product URL in the WhatsApp message uses the site URL.

**Option 1: Environment Variable (Recommended)**

Create `.env.local`:
```bash
NEXT_PUBLIC_SITE_URL=https://sanfora-timepieces.com
```

**Option 2: Default Fallback**

The code uses a fallback if no environment variable is set:
```typescript
const productUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://sanfora-timepieces.com'}/${locale}/watches/${slug}`;
```

Update the fallback URL in:
- `app/[locale]/watches/[slug]/page.tsx`
- `app/[locale]/perfumes/[slug]/page.tsx`

## Button Customization

### Button Text

**Files:** `messages/de.json` and `messages/en.json`

```json
{
  "product": {
    "whatsapp": {
      "inquire": "Per WhatsApp anfragen",  // German
      "responseTime": "Wir antworten in der Regel innerhalb von 24 Stunden"
    }
  }
}
```

```json
{
  "product": {
    "whatsapp": {
      "inquire": "Inquire via WhatsApp",  // English
      "responseTime": "We typically respond within 24 hours"
    }
  }
}
```

### Button Styling

**File:** `components/products/WhatsAppButton.tsx`

Current styling:
- **Color:** WhatsApp green (`#25D366`)
- **Hover:** Darker green (`#20BD5A`)
- **Icon:** WhatsApp logo (SVG)
- **Full-width button**

To customize:
```typescript
className="flex items-center justify-center gap-3 w-full
  bg-[#25D366] hover:bg-[#20BD5A]
  text-white py-5 px-6
  text-sm tracking-wider uppercase font-light
  transition-colors duration-300"
```

## Message Customization

### Change Message Template

**File:** `lib/config.ts`

```typescript
export function getWhatsAppLink(productTitle: string, productUrl: string): string {
  // Customize this message
  const message = `Hi, I'm interested in ${productTitle} — ${productUrl}`;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsapp.phoneNumber}?text=${encodedMessage}`;
}
```

**Examples:**

Simple inquiry:
```typescript
const message = `I would like to know more about ${productTitle}`;
```

Detailed inquiry:
```typescript
const message = `Hello! I'm interested in purchasing ${productTitle}. Could you provide more details? ${productUrl}`;
```

Include additional info:
```typescript
const message = `Hi, I saw ${productTitle} on your website and would like to inquire about availability and pricing. Link: ${productUrl}`;
```

## Testing

### Local Testing

1. Start dev server: `npm run dev`
2. Visit a product page (e.g., `/de/watches/rolex-submariner-date-116610ln`)
3. Click "Per WhatsApp anfragen" button
4. Verify:
   - Opens WhatsApp (web.whatsapp.com or app)
   - Correct phone number
   - Pre-filled message includes product title and URL

### Production Testing

1. Deploy to production
2. Set `NEXT_PUBLIC_SITE_URL` environment variable
3. Test from a real device
4. Ensure URLs are absolute (not localhost)

## Multiple Phone Numbers

To support different numbers for different products or regions:

**File:** `lib/config.ts`

```typescript
export const siteConfig = {
  whatsapp: {
    default: '41799173326',
    watches: '41799173326',
    perfumes: '41799173327', // Different number for perfumes
  },
};

export function getWhatsAppLink(
  productTitle: string,
  productUrl: string,
  category: 'watch' | 'perfume'
): string {
  const phoneNumber = category === 'watch'
    ? siteConfig.whatsapp.watches
    : siteConfig.whatsapp.perfumes;

  const message = `Hi, I'm interested in ${productTitle} — ${productUrl}`;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}
```

Then update the product pages to pass the category.

## Business Hours Message

Add business hours to the response time text:

**File:** `messages/de.json`

```json
{
  "product": {
    "whatsapp": {
      "inquire": "Per WhatsApp anfragen",
      "responseTime": "Öffnungszeiten: Mo-Fr 9:00-18:00 Uhr. Wir antworten innerhalb von 24 Stunden"
    }
  }
}
```

## Auto-Response Setup

To set up automatic responses:

1. Use **WhatsApp Business API** (paid)
2. Or use **WhatsApp Business App** (free, mobile only)
   - Download WhatsApp Business
   - Set up greeting messages
   - Set up away messages
   - Set up quick replies

## Analytics

Track WhatsApp clicks:

**File:** `components/products/WhatsAppButton.tsx`

```typescript
const handleClick = () => {
  // Track event with your analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'whatsapp_inquiry', {
      product_title: productTitle,
      product_url: productUrl,
    });
  }
};

return (
  <a
    href={whatsappUrl}
    onClick={handleClick}
    // ... rest of props
  >
```

## Troubleshooting

### WhatsApp doesn't open

**Issue:** Link doesn't work on desktop without WhatsApp Desktop
**Solution:** Opens web.whatsapp.com automatically

**Issue:** Wrong number format
**Solution:** Ensure format is: `[country code][number]` without `+` or spaces

### Message not pre-filled

**Issue:** Special characters breaking the URL
**Solution:** Already handled with `encodeURIComponent()`

### URL shows localhost in production

**Issue:** `NEXT_PUBLIC_SITE_URL` not set
**Solution:** Add to Vercel/Netlify environment variables:
```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Best Practices

1. **Response Time:** Always respond within stated time (24h)
2. **Professionalism:** Use WhatsApp Business for professional features
3. **Availability:** Set clear business hours
4. **Templates:** Create saved message templates for common questions
5. **Follow-up:** Ask for permission before sending marketing messages

## Security

- Never share sensitive information via WhatsApp
- Verify customer identity before sharing prices for high-value items
- Use WhatsApp Business encryption
- Keep conversation history for records

## Future Enhancements

- Add WhatsApp chat widget for live support
- Integrate WhatsApp Business API for automated responses
- Add multiple language support for WhatsApp messages
- Track conversion rates from WhatsApp inquiries
