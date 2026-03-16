import { verifyAuthFromCookies } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ProductForm } from '@/components/admin/ProductForm';

export default async function AddProductPage() {
  const isAuthenticated = await verifyAuthFromCookies();

  if (!isAuthenticated) {
    redirect('/admin/login');
  }

  return <ProductForm />;
}
