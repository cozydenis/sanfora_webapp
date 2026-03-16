import { verifyAuthFromCookies } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getAllProducts } from '@/lib/products';
import { ProductList } from '@/components/admin/ProductList';

export default async function AdminDashboardPage() {
  const isAuthenticated = await verifyAuthFromCookies();

  if (!isAuthenticated) {
    redirect('/admin/login');
  }

  const products = await getAllProducts();

  return <ProductList initialProducts={products} />;
}
