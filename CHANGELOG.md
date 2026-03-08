# Changelog

## 2026-03-08 - Product Structure Update

### Changed
- **Unified Product Data**: Migrated from separate `watches.json` and `perfumes.json` to a single `data/products.json` file
- **Enhanced Product Schema**:
  - Added `title` field (replacing `name`)
  - Added `slug` field for URL-friendly routing
  - Changed `price` to support `null` for "Price on request"
  - Changed `isNew` and `featured` booleans to `collection` array for flexible tagging
  - Updated specifications to be more category-specific

### Product Structure
**Watches**:
- referenceNumber, year, condition, boxAndPapers, caseSize, movement

**Perfumes**:
- size, concentration, topNotes, heartNotes, baseNotes, gender

### Added
- `formatPrice()` utility function to handle both fixed prices and "Price on request"
- `getProductBySlug()` function for future routing
- `getProductsByCollection()` function for filtering by tags
- Type guards: `isWatchProduct()` and `isPerfumeProduct()`
- Comprehensive product documentation in `PRODUCTS.md`

### Sample Data
- 3 luxury watches (Rolex Submariner, Patek Philippe Nautilus, Audemars Piguet Royal Oak)
- 2 luxury perfumes (Creed Aventus, Tom Ford Oud Wood)

### Fixed
- Moved logo from `imgs/` to `public/imgs/` for proper Next.js serving
- Created product image directories in `public/products/`
- Updated `.gitignore` with IDE and macOS entries

## Initial Release

### Features
- Next.js 14 with App Router
- TypeScript & Tailwind CSS
- Internationalization (German/English)
- Luxury minimalist design
- Product catalog (watches & perfumes)
- Multiple pages: Home, Collections, About, Contact, FAQ, Impressum
- Static site generation for optimal performance
