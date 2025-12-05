import { ProductGrid } from '@/components/ProductGrid';
import { getProducts } from '@/lib/supabase';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const validCategories = ['mens', 'womens', 'accessories', 'xtreme'];

const categoryLabels: Record<string, string> = {
  mens: 'MENS',
  womens: 'WOMENS',
  accessories: 'ACCESSORIES',
  xtreme: 'XTREME GEAR',
};

const categoryDescriptions: Record<string, string> = {
  mens: 'Bold streetwear for the modern man',
  womens: 'Fierce fashion for fearless women',
  accessories: 'Complete your look',
  xtreme: 'Built for extreme sports',
};

const categories = [
  { slug: '', label: 'ALL' },
  { slug: 'mens', label: 'MENS' },
  { slug: 'womens', label: 'WOMENS' },
  { slug: 'accessories', label: 'ACCESSORIES' },
  { slug: 'xtreme', label: 'XTREME' },
];

// Mock data
const mockProducts = [
  {
    id: '1',
    shopify_product_id: 'gid://shopify/Product/1',
    name: 'SLEAZE UFO HOODIE',
    slug: 'sleaze-ufo-hoodie',
    description: 'Washed black hoodie with UFO graphic',
    price: 89.99,
    compare_at_price: null,
    category: 'mens' as const,
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '1', product_id: '1', url: '/products/ufo-hoodie.jpg', alt_text: 'UFO Hoodie', position: 0, is_primary: true }],
    product_variants: []
  },
  {
    id: '2',
    shopify_product_id: 'gid://shopify/Product/2',
    name: 'EYES BACK PRINT HOODIE',
    slug: 'eyes-back-print-hoodie',
    description: 'Mysterious eyes graphic on back',
    price: 94.99,
    compare_at_price: 119.99,
    category: 'womens' as const,
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '2', product_id: '2', url: '/products/eyes-hoodie.jpg', alt_text: 'Eyes Hoodie', position: 0, is_primary: true }],
    product_variants: []
  },
  {
    id: '3',
    shopify_product_id: 'gid://shopify/Product/3',
    name: 'HELMET RIDER TEE',
    slug: 'helmet-rider-tee',
    description: 'Oversized tee with helmet graphic',
    price: 49.99,
    compare_at_price: null,
    category: 'mens' as const,
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '3', product_id: '3', url: '/products/helmet-tee.jpg', alt_text: 'Helmet Tee', position: 0, is_primary: true }],
    product_variants: []
  },
  {
    id: '6',
    shopify_product_id: 'gid://shopify/Product/6',
    name: 'XTREME SPORTS LONGSLEEVE',
    slug: 'xtreme-sports-longsleeve',
    description: 'ATV racing graphic longsleeve',
    price: 54.99,
    compare_at_price: null,
    category: 'xtreme' as const,
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '6', product_id: '6', url: '/products/xtreme-ls.jpg', alt_text: 'Xtreme Longsleeve', position: 0, is_primary: true }],
    product_variants: []
  },
];

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const label = categoryLabels[category] || category.toUpperCase();
  return {
    title: `${label} | SLEAZE`,
    description: categoryDescriptions[category] || `Shop ${label} at SLEAZE`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  
  if (!validCategories.includes(category)) {
    notFound();
  }

  let products;
  
  try {
    products = await getProducts(category);
  } catch {
    products = mockProducts.filter(p => p.category === category);
  }

  if (products.length === 0) {
    products = mockProducts.filter(p => p.category === category);
  }

  const label = categoryLabels[category];
  const description = categoryDescriptions[category];

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-red text-sm tracking-wider uppercase">Collection</span>
        <h1 className="font-[family-name:var(--font-bebas)] text-6xl sm:text-7xl text-cream tracking-wider mt-2">
          {label}
        </h1>
        <p className="text-cream/60 mt-4 max-w-xl mx-auto">
          {description}
        </p>
      </section>

      {/* Category Filter */}
      <div className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-4">
          {categories.map(cat => (
            <Link
              key={cat.slug}
              href={cat.slug ? `/shop/${cat.slug}` : '/shop'}
              className={`px-6 py-2 font-[family-name:var(--font-bebas)] tracking-wider transition-colors ${
                cat.slug === category
                  ? 'bg-red text-cream'
                  : 'glass-light text-cream/60 hover:text-cream hover:bg-cream/10'
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>

      <ProductGrid products={products} />
    </div>
  );
}

