'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ImageUploader } from '@/components/admin/ImageUploader';
import type { Product, ProductCategory, WatchProduct, PerfumeProduct } from '@/lib/types';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<ProductCategory>('watch');
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    slug: '',
    price: '',
    currency: 'EUR',
    descriptionDE: '',
    descriptionEN: '',
    images: [] as string[],
    collection: [] as string[],
    // Watch fields
    referenceNumber: '',
    year: '',
    condition: '',
    boxAndPapers: '',
    caseSize: '',
    movement: '',
    // Perfume fields
    size: '',
    concentration: '',
    topNotes: '',
    heartNotes: '',
    baseNotes: '',
    gender: '',
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify');
        const data = await response.json();
        if (!data.authenticated) {
          router.push('/admin/login');
          return;
        }
      } catch {
        router.push('/admin/login');
        return;
      }

      // Fetch product data
      fetchProduct();
    };

    checkAuth();
  }, [router, productId]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${productId}`);
      const product: Product = await response.json();

      setCategory(product.category);

      const baseData = {
        id: product.id,
        title: product.title,
        slug: product.slug,
        price: product.price?.toString() || '',
        currency: product.currency,
        descriptionDE: product.description.de,
        descriptionEN: product.description.en,
        images: product.images,
        collection: product.collection,
      };

      if (product.category === 'watch') {
        const watchProduct = product as WatchProduct;
        setFormData({
          ...baseData,
          referenceNumber: watchProduct.specifications.referenceNumber,
          year: watchProduct.specifications.year,
          condition: watchProduct.specifications.condition,
          boxAndPapers: watchProduct.specifications.boxAndPapers,
          caseSize: watchProduct.specifications.caseSize,
          movement: watchProduct.specifications.movement,
          size: '',
          concentration: '',
          topNotes: '',
          heartNotes: '',
          baseNotes: '',
          gender: '',
        });
      } else {
        const perfumeProduct = product as PerfumeProduct;
        setFormData({
          ...baseData,
          referenceNumber: '',
          year: '',
          condition: '',
          boxAndPapers: '',
          caseSize: '',
          movement: '',
          size: perfumeProduct.specifications.size,
          concentration: perfumeProduct.specifications.concentration,
          topNotes: perfumeProduct.specifications.topNotes,
          heartNotes: perfumeProduct.specifications.heartNotes,
          baseNotes: perfumeProduct.specifications.baseNotes,
          gender: perfumeProduct.specifications.gender,
        });
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Failed to load product');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCollectionToggle = (collectionName: string) => {
    setFormData(prev => ({
      ...prev,
      collection: prev.collection.includes(collectionName)
        ? prev.collection.filter(c => c !== collectionName)
        : [...prev.collection, collectionName]
    }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const product: Product = {
      id: formData.id,
      title: formData.title,
      slug: formData.slug,
      category,
      collection: formData.collection,
      price: formData.price ? parseFloat(formData.price) : null,
      currency: formData.currency,
      description: {
        de: formData.descriptionDE,
        en: formData.descriptionEN,
      },
      images: formData.images,
      specifications: category === 'watch'
        ? {
          referenceNumber: formData.referenceNumber,
          year: formData.year,
          condition: formData.condition,
          boxAndPapers: formData.boxAndPapers,
          caseSize: formData.caseSize,
          movement: formData.movement,
        }
        : {
          size: formData.size,
          concentration: formData.concentration,
          topNotes: formData.topNotes,
          heartNotes: formData.heartNotes,
          baseNotes: formData.baseNotes,
          gender: formData.gender,
        }
    } as Product;

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        router.push('/admin/dashboard');
      } else {
        alert('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-luxury-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-serif text-luxury-black">Edit Product</h1>
          <Link
            href="/admin/dashboard"
            className="text-luxury-black hover:underline"
          >
            Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8 space-y-6">
          {/* Category Display (read-only) */}
          <div>
            <label className="block text-sm font-semibold text-luxury-black mb-2">
              Category
            </label>
            <div className="px-6 py-2 bg-luxury-gray-100 text-luxury-black rounded-md capitalize">
              {category}
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="id" className="block text-sm font-semibold text-luxury-black mb-2">
                Product ID *
              </label>
              <input
                type="text"
                id="id"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-luxury-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-black"
                required
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-semibold text-luxury-black mb-2">
                Price (€)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-luxury-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-black"
                placeholder="Leave empty for POA"
              />
            </div>
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-luxury-black mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleTitleChange}
              className="w-full px-4 py-2 border border-luxury-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-black"
              required
            />
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-semibold text-luxury-black mb-2">
              URL Slug *
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-luxury-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-black bg-luxury-gray-50"
              required
            />
          </div>

          <div>
            <label htmlFor="descriptionDE" className="block text-sm font-semibold text-luxury-black mb-2">
              Description (German) *
            </label>
            <textarea
              id="descriptionDE"
              name="descriptionDE"
              value={formData.descriptionDE}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 border border-luxury-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-black"
              required
            />
          </div>

          <div>
            <label htmlFor="descriptionEN" className="block text-sm font-semibold text-luxury-black mb-2">
              Description (English) *
            </label>
            <textarea
              id="descriptionEN"
              name="descriptionEN"
              value={formData.descriptionEN}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 border border-luxury-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-luxury-black mb-2">
              Produktbilder *
            </label>
            <p className="text-sm text-luxury-gray-600 mb-4">
              Laden Sie bis zu 5 Bilder hoch. Das erste Bild wird als Hauptbild verwendet.
            </p>
            <div className="space-y-4">
              {[0, 1, 2, 3, 4].map((index) => (
                <div key={index}>
                  <p className="text-xs text-luxury-gray-500 mb-2">
                    Bild {index + 1} {index === 0 && '(Hauptbild)'}
                  </p>
                  <ImageUploader
                    existingUrl={formData.images[index]}
                    onUploadComplete={(url) => {
                      const newImages = [...formData.images];
                      newImages[index] = url;
                      setFormData(prev => ({ ...prev, images: newImages.filter(Boolean) }));
                    }}
                    onRemove={() => {
                      const newImages = [...formData.images];
                      newImages.splice(index, 1);
                      setFormData(prev => ({ ...prev, images: newImages }));
                    }}
                  />
                </div>
              ))}
            </div>
            {formData.images.length === 0 && (
              <p className="text-sm text-red-600 mt-2">
                Bitte laden Sie mindestens ein Bild hoch
              </p>
            )}
          </div>

          {/* Collections */}
          <div>
            <label className="block text-sm font-semibold text-luxury-black mb-2">
              Collections
            </label>
            <div className="flex gap-2 flex-wrap">
              {['featured', 'new-in'].map(coll => (
                <button
                  key={coll}
                  type="button"
                  onClick={() => handleCollectionToggle(coll)}
                  className={`px-4 py-2 rounded-md transition-colors ${formData.collection.includes(coll)
                      ? 'bg-luxury-black text-white'
                      : 'bg-luxury-gray-100 text-luxury-black border border-luxury-gray-300'
                    }`}
                >
                  {coll}
                </button>
              ))}
            </div>
          </div>

          {/* Watch Specifications */}
          {category === 'watch' && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-luxury-black mb-4">
                Watch Specifications
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="referenceNumber" className="block text-sm font-semibold text-luxury-black mb-2">
                    Reference Number
                  </label>
                  <input
                    type="text"
                    id="referenceNumber"
                    name="referenceNumber"
                    value={formData.referenceNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-luxury-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-black"
                  />
                </div>
                <div>
                  <label htmlFor="year" className="block text-sm font-semibold text-luxury-black mb-2">
                    Year
                  </label>
                  <input
                    type="text"
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-luxury-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-black"
                  />
                </div>
                <div>
                  <label htmlFor="condition" className="block text-sm font-semibold text-luxury-black mb-2">
                    Condition
                  </label>
                  <input
                    type="text"
                    id="condition"
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-luxury-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-black"
                  />
                </div>
                <div>
                  <label htmlFor="boxAndPapers" className="block text-sm font-semibold text-luxury-black mb-2">
                    Box & Papers
                  </label>
                  <input
                    type="text"
                    id="boxAndPapers"
                    name="boxAndPapers"
                    value={formData.boxAndPapers}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-luxury-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-black"
                  />
                </div>
                <div>
                  <label htmlFor="caseSize" className="block text-sm font-semibold text-luxury-black mb-2">
                    Case Size
                  </label>
                  <input
                    type="text"
                    id="caseSize"
                    name="caseSize"
                    value={formData.caseSize}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-luxury-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-black"
                  />
                </div>
                <div>
                  <label htmlFor="movement" className="block text-sm font-semibold text-luxury-black mb-2">
                    Movement
                  </label>
                  <input
                    type="text"
                    id="movement"
                    name="movement"
                    value={formData.movement}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-luxury-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-black"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Perfume Specifications */}
          {category === 'perfume' && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-luxury-black mb-4">
                Perfume Specifications
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="size" className="block text-sm font-semibold text-luxury-black mb-2">
                    Size
                  </label>
                  <input
                    type="text"
                    id="size"
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-luxury-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-black"
                  />
                </div>
                <div>
                  <label htmlFor="concentration" className="block text-sm font-semibold text-luxury-black mb-2">
                    Concentration
                  </label>
                  <input
                    type="text"
                    id="concentration"
                    name="concentration"
                    value={formData.concentration}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-luxury-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-black"
                  />
                </div>
                <div>
                  <label htmlFor="topNotes" className="block text-sm font-semibold text-luxury-black mb-2">
                    Top Notes
                  </label>
                  <input
                    type="text"
                    id="topNotes"
                    name="topNotes"
                    value={formData.topNotes}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-luxury-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-black"
                  />
                </div>
                <div>
                  <label htmlFor="heartNotes" className="block text-sm font-semibold text-luxury-black mb-2">
                    Heart Notes
                  </label>
                  <input
                    type="text"
                    id="heartNotes"
                    name="heartNotes"
                    value={formData.heartNotes}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-luxury-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-black"
                  />
                </div>
                <div>
                  <label htmlFor="baseNotes" className="block text-sm font-semibold text-luxury-black mb-2">
                    Base Notes
                  </label>
                  <input
                    type="text"
                    id="baseNotes"
                    name="baseNotes"
                    value={formData.baseNotes}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-luxury-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-black"
                  />
                </div>
                <div>
                  <label htmlFor="gender" className="block text-sm font-semibold text-luxury-black mb-2">
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-luxury-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-black"
                  >
                    <option value="">Select...</option>
                    <option value="Unisex">Unisex</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-4 pt-6 border-t">
            <button
              type="submit"
              className="flex-1 bg-luxury-black text-white py-3 rounded-md hover:bg-luxury-gray-800 transition-colors font-medium"
            >
              Update Product
            </button>
            <Link
              href="/admin/dashboard"
              className="flex-1 bg-luxury-gray-100 text-luxury-black py-3 rounded-md hover:bg-luxury-gray-200 transition-colors font-medium text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
