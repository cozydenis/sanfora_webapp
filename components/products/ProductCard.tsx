import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/products';

interface ProductCardProps {
  product: Product;
  locale: string;
}

export function ProductCard({ product, locale }: ProductCardProps) {
  const localeTyped = locale as 'de' | 'en';
  const categoryPath = product.category === 'watch' ? 'watches' : 'perfumes';

  return (
    <Link
      href={`/${locale}/${categoryPath}/${product.slug}`}
      className="group block"
    >
      {/* Product Image */}
      <div className="relative aspect-[3/4] bg-luxury-gray-100 mb-6 overflow-hidden">
        {/* Placeholder background */}
        <div className="absolute inset-0 bg-luxury-gray-100 flex items-center justify-center">
          <div className="text-center p-8">
            <p className="text-luxury-gray-400 text-xs font-light tracking-wider uppercase mb-2">
              {product.category === 'watch' ? 'Timepiece' : 'Fragrance'}
            </p>
            <p className="text-luxury-gray-500 text-sm font-light">
              {product.title}
            </p>
          </div>
        </div>

        {/* Image would go here */}
        {/* <Image
          src={product.images[0]}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        /> */}

        {/* New Badge */}
        {product.collection.includes('new-in') && (
          <div className="absolute top-6 right-6 bg-luxury-black text-luxury-white px-4 py-2 text-xs tracking-widest uppercase font-light z-10">
            New
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <h3 className="text-lg font-light text-luxury-black group-hover:text-luxury-gray-600 transition-colors duration-300 leading-tight">
          {product.title}
        </h3>

        <p className="text-sm font-light text-luxury-gray-600 tracking-wide">
          {formatPrice(product.price, product.currency, localeTyped)}
        </p>
      </div>
    </Link>
  );
}
