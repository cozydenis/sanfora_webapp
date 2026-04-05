# Sanfora Timepiece

A luxury catalog website showcasing exclusive watches and perfumes. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Luxury Design**: Minimal black & white aesthetic inspired by high-end retailers
- **Full-Width Hero**: Impactful hero section with large typography and CTA
- **Product Cards**: Clean, minimal cards with hover effects and "NEW" badges
- **Product Details**: Individual pages with image galleries, specifications, and WhatsApp CTAs
- **WhatsApp Integration**: Direct customer inquiries with pre-filled messages
- **Image Gallery**: Multi-image support with thumbnail navigation
- **Multilingual**: German (default) and English support with easy language switching
- **Product Catalog**: Unified data structure with flexible collection tags
- **Responsive**: Mobile-first design that works on all devices
- **Static Generation**: Pre-rendered pages for optimal performance

## Pages

- **Home** (`/`): Full-width hero section with "New In" products
- **Watches** (`/watches`): Complete watch collection
- **Perfumes** (`/perfumes`): Complete perfume collection
- **New In** (`/new-in`): Latest product additions
- **Watch Detail** (`/watches/[slug]`): Individual watch pages with gallery and WhatsApp
- **Perfume Detail** (`/perfumes/[slug]`): Individual perfume pages with gallery and WhatsApp
- **About** (`/about`): Company information
- **Contact** (`/contact`): Contact form and information
- **FAQ** (`/faq`): Frequently asked questions
- **Impressum** (`/impressum`): Legal information

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Project Structure

```
sanfora_webapp/
├── app/
│   └── [locale]/           # Internationalized pages
│       ├── watches/
│       ├── perfumes/
│       ├── new-in/
│       ├── about/
│       ├── contact/
│       ├── faq/
│       └── impressum/
├── components/
│   ├── layout/             # Header, Footer, LanguageSwitcher
│   ├── products/           # ProductCard
│   └── ui/                 # Reusable UI components
├── data/
│   └── products.json       # All products data (watches & perfumes)
├── i18n/                   # Internationalization config
├── lib/
│   ├── products.ts         # Product data functions
│   └── types.ts            # TypeScript types
├── messages/
│   ├── de.json             # German translations
│   └── en.json             # English translations
└── public/
    └── imgs/               # Images and assets
```

## Adding Products

All products are stored in a single file: `data/products.json`

### Product Structure

Each product should include:

**Common Fields:**
- `id`: Unique identifier (string)
- `title`: Product title (string)
- `slug`: URL-friendly slug (string)
- `category`: "watch" or "perfume" (string)
- `collection`: Array of tags like ["featured", "new-in"]
- `price`: Price as number or `null` for "Price on request"
- `currency`: Currency code (e.g., "EUR")
- `description`: Object with `de` and `en` translations
- `images`: Array of image URLs/paths
- `specifications`: Category-specific object (see below)

**Watch Specifications:**
- `referenceNumber`: Reference/model number
- `year`: Year of manufacture
- `condition`: Condition (e.g., "Excellent", "Unworn")
- `boxAndPapers`: Included accessories (e.g., "Complete Set")
- `caseSize`: Case diameter (e.g., "40mm")
- `movement`: Movement type (e.g., "Automatic Cal. 3135")

**Perfume Specifications:**
- `size`: Volume (e.g., "100ml")
- `concentration`: Type (e.g., "Eau de Parfum")
- `topNotes`: Top notes description
- `heartNotes`: Heart notes description
- `baseNotes`: Base notes description
- `gender`: Target gender (e.g., "Unisex", "Herren")

## Customization

### Colors

Edit `tailwind.config.ts` to customize the luxury color palette:

```typescript
colors: {
  luxury: {
    black: '#0A0A0A',
    white: '#FAFAFA',
    // ... more colors
  }
}
```

### Translations

Add or edit translations in `messages/de.json` and `messages/en.json`.

### Fonts

The site uses:
- **Playfair Display** (serif) for headings
- **Inter** (sans-serif) for body text

Change fonts in `app/[locale]/layout.tsx`.

## Technologies

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **next-intl** - Internationalization
- **Google Fonts** - Playfair Display & Inter

## License

All rights reserved © Sanfora Timepiece
