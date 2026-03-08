export type ProductCategory = 'watch' | 'perfume';

export interface BaseProduct {
  id: string;
  title: string;
  slug: string;
  category: ProductCategory;
  collection: string[];
  price: number | null;
  currency: string;
  description: {
    de: string;
    en: string;
  };
  images: string[];
}

export interface WatchProduct extends BaseProduct {
  category: 'watch';
  specifications: {
    referenceNumber: string;
    year: string;
    condition: string;
    boxAndPapers: string;
    caseSize: string;
    movement: string;
  };
}

export interface PerfumeProduct extends BaseProduct {
  category: 'perfume';
  specifications: {
    size: string;
    concentration: string;
    topNotes: string;
    heartNotes: string;
    baseNotes: string;
    gender: string;
  };
}

export type Product = WatchProduct | PerfumeProduct;

// Helper type guards
export function isWatchProduct(product: Product): product is WatchProduct {
  return product.category === 'watch';
}

export function isPerfumeProduct(product: Product): product is PerfumeProduct {
  return product.category === 'perfume';
}
