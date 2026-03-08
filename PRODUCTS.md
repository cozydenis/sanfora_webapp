# Product Data Structure

This document describes the structure for products in `data/products.json`.

## Product Schema

```json
{
  "id": "unique-id",
  "title": "Product Title",
  "slug": "product-url-slug",
  "category": "watch" | "perfume",
  "collection": ["featured", "new-in"],
  "price": 12500 | null,
  "currency": "EUR",
  "description": {
    "de": "German description",
    "en": "English description"
  },
  "images": [
    "/products/category/image-1.jpg",
    "/products/category/image-2.jpg"
  ],
  "specifications": {
    // Category-specific fields (see below)
  }
}
```

## Watch Product

For watches, the `specifications` object should contain:

```json
{
  "referenceNumber": "116610LN",
  "year": "2018",
  "condition": "Excellent",
  "boxAndPapers": "Complete Set",
  "caseSize": "40mm",
  "movement": "Automatic Cal. 3135"
}
```

### Watch Example

```json
{
  "id": "w001",
  "title": "Rolex Submariner Date",
  "slug": "rolex-submariner-date-116610ln",
  "category": "watch",
  "collection": ["featured", "new-in"],
  "price": 12500,
  "currency": "EUR",
  "description": {
    "de": "Die legendäre Rolex Submariner...",
    "en": "The legendary Rolex Submariner..."
  },
  "images": [
    "/products/watches/rolex-submariner-1.jpg"
  ],
  "specifications": {
    "referenceNumber": "116610LN",
    "year": "2018",
    "condition": "Excellent",
    "boxAndPapers": "Complete Set",
    "caseSize": "40mm",
    "movement": "Automatic Cal. 3135"
  }
}
```

## Perfume Product

For perfumes, the `specifications` object should contain:

```json
{
  "size": "100ml",
  "concentration": "Eau de Parfum",
  "topNotes": "Ananas, Bergamotte, Schwarze Johannisbeere",
  "heartNotes": "Rosa Pfeffer, Birke, Patschuli",
  "baseNotes": "Eichenmoos, Vanille, Ambergris",
  "gender": "Herren / Unisex"
}
```

### Perfume Example

```json
{
  "id": "p001",
  "title": "Creed Aventus",
  "slug": "creed-aventus-edp-100ml",
  "category": "perfume",
  "collection": ["featured"],
  "price": 385,
  "currency": "EUR",
  "description": {
    "de": "Creed Aventus ist ein legendärer Herrenduft...",
    "en": "Creed Aventus is a legendary men's fragrance..."
  },
  "images": [
    "/products/perfumes/creed-aventus-1.jpg"
  ],
  "specifications": {
    "size": "100ml",
    "concentration": "Eau de Parfum",
    "topNotes": "Ananas, Bergamotte, Schwarze Johannisbeere",
    "heartNotes": "Rosa Pfeffer, Birke, Patschuli",
    "baseNotes": "Eichenmoos, Vanille, Ambergris",
    "gender": "Herren / Unisex"
  }
}
```

## Field Details

### Required Fields

All products must have:
- `id` - Unique identifier (use prefixes like "w" for watches, "p" for perfumes)
- `title` - Display name
- `slug` - URL-friendly version for future routing
- `category` - Either "watch" or "perfume"
- `collection` - Array of collection tags
- `price` - Number or `null` (for "Price on request")
- `currency` - ISO currency code
- `description` - Both DE and EN translations
- `images` - At least one image path
- `specifications` - Category-specific details

### Collection Tags

Common collection tags:
- `"featured"` - Shows on homepage featured section
- `"new-in"` - Shows in "New In" page and displays "NEW" badge
- You can add custom tags as needed

### Price

- Set to a number for products with fixed prices
- Set to `null` for "Price on request" items
- The `formatPrice()` function automatically handles both cases

### Images

- Use relative paths starting with `/products/`
- Recommended: Multiple images per product
- Format: JPEG or PNG
- Recommended size: 1000x1000px minimum

## Utility Functions

The following functions are available in `lib/products.ts`:

```typescript
getAllProducts()              // Get all products
getWatches()                  // Get only watches
getPerfumes()                 // Get only perfumes
getNewProducts()              // Get products with "new-in" tag
getFeaturedProducts()         // Get products with "featured" tag
getProductById(id)            // Find by ID
getProductBySlug(slug)        // Find by slug
getProductsByCategory(cat)    // Filter by category
getProductsByCollection(tag)  // Filter by collection tag
formatPrice(price, curr, loc) // Format price with locale
```
