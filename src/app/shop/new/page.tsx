import { ProductGrid } from '@/components/ProductGrid';
import Link from 'next/link';

const categories = [
  { slug: '', label: 'SHOP' },
  { slug: 'mens', label: 'MENS' },
  { slug: 'womens', label: 'WOMENS' },
  { slug: 'new', label: 'NEW ARRIVALS' },
];

const newArrivals = [
  {
    id: 'new-1',
    shopify_product_id: 'gid://shopify/Product/new1',
    name: 'SLEAZE TEE',
    slug: 'sleaze-tee',
    description: 'Classic SLEAZE branded tee',
    price: 49.99,
    compare_at_price: null,
    category: 'mens' as const,
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: 'new-1', product_id: 'new-1', url: '/products/image0.png', alt_text: 'Sleaze Tee', position: 0, is_primary: true }],
    product_variants: []
  },
  {
    id: 'new-2',
    shopify_product_id: 'gid://shopify/Product/new2',
    name: 'BLOW MY MIND TEE',
    slug: 'blow-my-mind-tee',
    description: 'Blow My Mind graphic tee',
    price: 54.99,
    compare_at_price: null,
    category: 'mens' as const,
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: 'new-2', product_id: 'new-2', url: '/products/image1.png', alt_text: 'Blow My Mind Tee', position: 0, is_primary: true }],
    product_variants: []
  },
  {
    id: 'new-3',
    shopify_product_id: 'gid://shopify/Product/new3',
    name: 'BLOW MY MIND HOODIE',
    slug: 'blow-my-mind-hoodie',
    description: 'Blow My Mind graphic hoodie',
    price: 89.99,
    compare_at_price: null,
    category: 'mens' as const,
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: 'new-3', product_id: 'new-3', url: '/products/image2.png', alt_text: 'Blow My Mind Hoodie', position: 0, is_primary: true }],
    product_variants: []
  },
  {
    id: 'new-4',
    shopify_product_id: 'gid://shopify/Product/new4',
    name: 'EAT-SLEEP-THINK-CASH TEE',
    slug: 'eat-sleep-think-cash-tee',
    description: 'Eat Sleep Think Cash graphic tee',
    price: 49.99,
    compare_at_price: null,
    category: 'mens' as const,
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: 'new-4', product_id: 'new-4', url: '/products/image3.png', alt_text: 'Eat Sleep Think Cash Tee', position: 0, is_primary: true }],
    product_variants: []
  },
];

export const metadata = {
  title: 'New Arrivals | SLEAZE',
  description: 'Shop the latest drops from SLEAZE - fresh streetwear just landed.',
};

export default function NewArrivalsPage() {
  return (
    <div className="pt-20">
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-red text-sm tracking-wider uppercase">Just Dropped</span>
        <h1 className="font-[family-name:var(--font-bebas)] text-6xl sm:text-7xl text-cream tracking-wider mt-2">
          NEW ARRIVALS
        </h1>
        <p className="text-cream/60 mt-4 max-w-xl mx-auto">
          Fresh styles just landed - be the first to cop
        </p>
      </section>

      <div className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-4">
          {categories.map(cat => (
            <Link
              key={cat.slug}
              href={cat.slug === '' ? '/shop' : `/shop/${cat.slug}`}
              className={`px-6 py-2 font-[family-name:var(--font-bebas)] tracking-wider transition-colors ${
                cat.slug === 'new'
                  ? 'bg-red text-cream'
                  : 'glass-light text-cream/60 hover:text-cream hover:bg-cream/10'
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>

      <ProductGrid products={newArrivals} />
    </div>
  );
}

