'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Product } from '@/lib/types';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'watch' | 'perfume'>('all');

  useEffect(() => {
    // Verify authentication server-side
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

      // Fetch products
      fetchProducts();
    };

    checkAuth();
  }, [router]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Sind Sie sicher, dass Sie dieses Produkt löschen möchten?')) {
      return;
    }

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Refresh products list
        fetchProducts();
      } else {
        alert('Fehler beim Löschen des Produkts');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Fehler beim Löschen des Produkts');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const filteredProducts = products.filter(p =>
    filter === 'all' ? true : p.category === filter
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Lädt...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-luxury-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-serif text-luxury-black">
            Inventarverwaltung
          </h1>
          <div className="flex gap-4">
            <Link
              href="/admin/dashboard/add"
              className="bg-luxury-black text-white px-6 py-2 rounded-md hover:bg-luxury-gray-800 transition-colors"
            >
              Produkt hinzufügen
            </Link>
            <button
              onClick={handleLogout}
              className="border border-luxury-gray-300 text-luxury-black px-6 py-2 rounded-md hover:bg-luxury-gray-100 transition-colors"
            >
              Abmelden
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Filter Tabs */}
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md transition-colors ${filter === 'all'
              ? 'bg-luxury-black text-white'
              : 'bg-white text-luxury-black border border-luxury-gray-300'
              }`}
          >
            Alle ({products.length})
          </button>
          <button
            onClick={() => setFilter('watch')}
            className={`px-4 py-2 rounded-md transition-colors ${filter === 'watch'
              ? 'bg-luxury-black text-white'
              : 'bg-white text-luxury-black border border-luxury-gray-300'
              }`}
          >
            Uhren ({products.filter(p => p.category === 'watch').length})
          </button>
          <button
            onClick={() => setFilter('perfume')}
            className={`px-4 py-2 rounded-md transition-colors ${filter === 'perfume'
              ? 'bg-luxury-black text-white'
              : 'bg-white text-luxury-black border border-luxury-gray-300'
              }`}
          >
            Parfüms ({products.filter(p => p.category === 'perfume').length})
          </button>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-luxury-gray-100 border-b border-luxury-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-luxury-black">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-luxury-black">
                  Titel
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-luxury-black">
                  Kategorie
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-luxury-black">
                  Preis
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-luxury-black">
                  Sammlungen
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-luxury-black">
                  Aktionen
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-luxury-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-luxury-gray-50">
                  <td className="px-6 py-4 text-sm text-luxury-black">
                    {product.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-luxury-black">
                      {product.title}
                    </div>
                    <div className="text-sm text-luxury-gray-600">
                      {product.slug}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-luxury-gray-100 text-luxury-black capitalize">
                      {product.category === 'watch' ? 'Uhr' : 'Parfüm'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-luxury-black">
                    {product.price ? `CHF ${product.price.toLocaleString()}` : 'Auf Anfrage'}
                  </td>
                  <td className="px-6 py-4 text-sm text-luxury-gray-600">
                    {product.collection.join(', ')}
                  </td>
                  <td className="px-6 py-4 text-right text-sm">
                    <Link
                      href={`/admin/dashboard/edit/${product.id}`}
                      className="text-luxury-black hover:underline mr-4"
                    >
                      Bearbeiten
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:underline"
                    >
                      Löschen
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12 text-luxury-gray-600">
              Keine Produkte gefunden
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
