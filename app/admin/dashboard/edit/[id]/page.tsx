import { verifyAuthFromCookies } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { ProductForm } from '@/components/admin/ProductForm';
import { getProductById } from '@/lib/products';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: PageProps) {
  const isAuthenticated = await verifyAuthFromCookies();

  if (!isAuthenticated) {
    redirect('/admin/login');
  }

  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return <ProductForm initialData={product} />;
}
