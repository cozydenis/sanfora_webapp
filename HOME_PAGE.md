# Home Page Design

## Overview
The home page follows a minimal, luxury design aesthetic inspired by high-end timepiece retailers like Rekoci. It emphasizes whitespace, clean typography, and sophisticated layouts.

## Structure

### 1. Hero Section
**Design:**
- Full-width, full-height (85vh) background
- Dark overlay with gradient for text readability
- Centered content with large serif typography
- Minimal CTA button with border-only style

**Content:**
- Main heading: "Sanfora Timepiece" (Playfair Display serif font)
- Tagline: "Exclusive Watches & Luxury Perfumes"
- CTA: "Discover Collection" button linking to New In page

**Styling:**
- Black background with subtle gradient
- White text on dark background
- Large, impactful typography (text-7xl to text-8xl)
- Generous spacing and padding
- Hover effects on CTA (fills background white, inverts colors)

### 2. New In Section
**Design:**
- Clean white background
- Centered section heading with divider line
- 4-column grid on desktop, responsive down to 1 column
- Generous vertical spacing (py-24 to py-40)

**Content:**
- Section title: "Neuheiten" / "New Arrivals"
- Shows latest 4 products with "new-in" collection tag
- Each product card is clickable
- "View All" link at bottom

**Product Cards:**
- 3:4 aspect ratio images
- Minimal product information:
  - Product title
  - Price or "Price on request"
- Subtle hover effects
- "NEW" badge for new products
- Links to product detail page

### 3. Brand Statement Section
**Design:**
- Light gray background (luxury-gray-50)
- Centered content, max-width constraint
- Serif font for elegant feel

**Content:**
- Single paragraph showcasing brand philosophy
- Different text for DE/EN locales
- Large, readable text (text-2xl to text-3xl)

## Design Principles

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)
- **Tracking**: Wide letter-spacing for uppercase text
- **Weight**: Predominantly light (font-light) for luxury feel

### Spacing
- **Generous whitespace**: 24-40 vertical padding sections
- **Grid gaps**: 8-20 between items
- **Section breaks**: Clear visual hierarchy with spacing

### Colors
- **Primary**: Black (#0A0A0A) for text and accents
- **Secondary**: White (#FAFAFA) for backgrounds
- **Grays**: Range from 100-900 for subtle variations
- **Minimal color palette**: Maintains luxury aesthetic

### Interactions
- **Subtle transitions**: 300ms duration
- **Hover states**: Color changes, not jarring effects
- **Link styles**: Underlines or border-bottom for clarity
- **Button hovers**: Background fills with smooth transitions

## Responsive Design

### Breakpoints
- **Mobile**: 1 column grid, smaller typography
- **Tablet (md)**: 2 column grid, medium typography
- **Desktop (lg)**: 4 column grid, large typography
- **XL**: Enhanced spacing and max typography sizes

### Mobile Optimizations
- Hero height adjusts (min-h-600px)
- Typography scales down appropriately
- Grid collapses to single column
- Padding reduces on mobile (py-24 vs py-40)

## Product Card Details

### Visual Hierarchy
1. Image (largest element, 3:4 aspect ratio)
2. Product title (medium weight)
3. Price (smaller, lighter weight)

### States
- **Default**: Clean, minimal
- **Hover**: Text color changes to gray-600
- **Active**: Link to product detail page

### Information Display
- Title only (no brand or category cluttering)
- Price formatted with locale
- "NEW" badge positioned top-right
- Category indicated subtly in placeholder

## Product Detail Page

### URL Structure
`/[locale]/products/[slug]`

Example: `/de/products/rolex-submariner-date-116610ln`

### Page Sections
1. **Breadcrumb Navigation**
   - Home > Category > Product
   - Light gray, hover effects

2. **Product Layout**
   - Two-column grid (image | details)
   - Responsive: stacks on mobile

3. **Product Information**
   - Large title (serif, 4xl-6xl)
   - Price display
   - Full description
   - Specifications table

4. **Specifications**
   - Key-value pairs
   - Horizontal lines between rows
   - Category-specific fields:
     - **Watches**: Ref#, Year, Condition, Box&Papers, Size, Movement
     - **Perfumes**: Size, Concentration, Notes (Top/Heart/Base), Gender

5. **Call to Action**
   - "Make an Inquiry" button
   - Links to contact page
   - Full-width, prominent placement

### Design Features
- Minimal, clean layout
- Lots of whitespace
- Typography hierarchy (serif headings, sans body)
- Subtle borders and dividers
- Professional specs presentation

## Technical Implementation

### Server Components
- All pages are server-rendered
- Static generation for product pages (dynamic routes)
- Locale detection via middleware

### Data Flow
1. Get products from JSON via utility functions
2. Filter by collection tags ("new-in")
3. Pass to ProductCard components
4. Link to detail pages via slug

### Internationalization
- All text via next-intl
- Separate translations for DE/EN
- Product descriptions in both languages
- Dynamic price formatting by locale

## File Structure

```
app/[locale]/
├── page.tsx                    # Home page
├── products/[slug]/
│   └── page.tsx               # Product detail page
components/
├── products/
│   └── ProductCard.tsx        # Reusable product card
├── ui/
│   ├── Container.tsx          # Max-width container
│   └── PageHeader.tsx         # Page title headers
messages/
├── de.json                    # German translations
└── en.json                    # English translations
```

## Future Enhancements

### Images
- Replace placeholder backgrounds with actual product photos
- Add image galleries for product details
- Implement Next.js Image optimization

### Hero
- Add background image or video
- Implement parallax scrolling
- Add subtle animations

### Products
- Add filtering and sorting
- Implement search functionality
- Add favorites/wishlist

### Interactions
- Add smooth scroll to sections
- Implement product quick view modals
- Add image zoom on product pages
