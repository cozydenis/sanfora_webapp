'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ImageUploader } from '@/components/admin/ImageUploader';
import type { Product, ProductCategory } from '@/lib/types';

interface ProductFormProps {
    initialData?: Product | null;
}

export function ProductForm({ initialData }: ProductFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isEditing = !!initialData;
    const [category, setCategory] = useState<ProductCategory>(
        initialData?.category || 'watch'
    );

    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        price: initialData?.price?.toString() || '',
        currency: initialData?.currency || 'CHF',
        descriptionDE: initialData?.description?.de || '',
        descriptionEN: initialData?.description?.en || '',
        images: initialData?.images || [] as string[],
        collection: initialData?.collection || [] as string[],
        // Watch fields
        referenceNumber: (initialData?.specifications as any)?.referenceNumber || '',
        year: (initialData?.specifications as any)?.year || '',
        condition: (initialData?.specifications as any)?.condition || '',
        boxAndPapers: (initialData?.specifications as any)?.boxAndPapers || '',
        caseSize: (initialData?.specifications as any)?.caseSize || '',
        movement: (initialData?.specifications as any)?.movement || '',
        // Perfume fields
        size: (initialData?.specifications as any)?.size || '',
        concentration: (initialData?.specifications as any)?.concentration || '',
        topNotes: (initialData?.specifications as any)?.topNotes || '',
        heartNotes: (initialData?.specifications as any)?.heartNotes || '',
        baseNotes: (initialData?.specifications as any)?.baseNotes || '',
        gender: (initialData?.specifications as any)?.gender || '',
    });

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
        if (isSubmitting) return;
        setIsSubmitting(true);

        const product: Product = {
            id: isEditing && initialData ? initialData.id : `${category === 'watch' ? 'w' : 'p'}-${Date.now()}`,
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
            const url = isEditing && initialData ? `/api/products/${initialData.id}` : '/api/products';
            const method = isEditing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            });

            if (response.ok) {
                router.push('/admin/dashboard');
                router.refresh();
            } else {
                alert(`Failed to ${isEditing ? 'update' : 'add'} product`);
            }
        } catch (error) {
            console.error(`Error ${isEditing ? 'updating' : 'adding'} product:`, error);
            alert(`Failed to ${isEditing ? 'update' : 'add'} product`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-luxury-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-luxury-gray-200 px-6 py-4">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-serif text-luxury-black">
                        {isEditing ? 'Edit Product' : 'Add Product'}
                    </h1>
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
                    {/* Category Selection */}
                    <div>
                        <label className="block text-sm font-semibold text-luxury-black mb-2">
                            Category *
                        </label>
                        <div className="flex gap-4">
                            <button
                                type="button"
                                disabled={isEditing}
                                onClick={() => setCategory('watch')}
                                className={`px-6 py-2 rounded-md transition-colors ${category === 'watch'
                                    ? 'bg-luxury-black text-white'
                                    : 'bg-luxury-gray-100 text-luxury-black'
                                    } ${isEditing && category !== 'watch' ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Watch
                            </button>
                            <button
                                type="button"
                                disabled={isEditing}
                                onClick={() => setCategory('perfume')}
                                className={`px-6 py-2 rounded-md transition-colors ${category === 'perfume'
                                    ? 'bg-luxury-black text-white'
                                    : 'bg-luxury-gray-100 text-luxury-black'
                                    } ${isEditing && category !== 'perfume' ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Perfume
                            </button>
                        </div>
                        {isEditing && (
                            <p className="text-sm text-luxury-gray-500 mt-2">Category cannot be changed after creation.</p>
                        )}
                    </div>

                    {/* Basic Information */}
                    <div className="space-y-4">
                        <p className="text-sm text-luxury-gray-600">
                            {isEditing ? `Product ID: ${initialData.id}` : 'Product ID wird automatisch generiert'}
                        </p>

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
                                placeholder="e.g., Rolex Submariner Date"
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
                                placeholder="Auto-generated from title"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="price" className="block text-sm font-semibold text-luxury-black mb-2">
                                Preis (CHF)
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-luxury-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-black"
                                placeholder="Leer lassen für Preis auf Anfrage"
                            />
                        </div>
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
                                        placeholder="e.g., Excellent, Unworn"
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
                                        placeholder="e.g., Complete Set"
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
                                        placeholder="e.g., 40mm"
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
                                        placeholder="e.g., Automatic Cal. 3135"
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
                                        placeholder="e.g., 100ml"
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
                                        placeholder="e.g., Eau de Parfum"
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
                            disabled={isSubmitting}
                            className={`flex-1 bg-luxury-black text-white py-3 rounded-md transition-colors font-medium ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-luxury-gray-800'}`}
                        >
                            {isSubmitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Add Product'}
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
