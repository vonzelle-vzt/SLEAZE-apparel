import { Hero } from '@/components/Hero';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { VideoSection } from '@/components/VideoSection';
import { CategoryBanner } from '@/components/CategoryBanner';
import { Newsletter } from '@/components/Newsletter';
import { StreetSection } from '@/components/StreetSection';
import { getFeaturedProducts } from '@/lib/supabase';

// Mock data for development (remove when Supabase is connected)
const mockProducts = [
  {
    id: '1',
    shopify_product_id: 'gid://shopify/Product/1',
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
    product_images: [
      { id: '1', product_id: '1', url: '/products/image0.png', alt_text: 'Sleaze Tee', position: 0, is_primary: true }
    ],
    product_variants: []
  },
  {
    id: '2',
    shopify_product_id: 'gid://shopify/Product/2',
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
    product_images: [
      { id: '2', product_id: '2', url: '/products/image1.png', alt_text: 'Blow My Mind Tee', position: 0, is_primary: true }
    ],
    product_variants: []
  },
  {
    id: '3',
    shopify_product_id: 'gid://shopify/Product/3',
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
    product_images: [
      { id: '3', product_id: '3', url: '/products/image2.png', alt_text: 'Blow My Mind Hoodie', position: 0, is_primary: true }
    ],
    product_variants: []
  },
  {
    id: '4',
    shopify_product_id: 'gid://shopify/Product/4',
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
    product_images: [
      { id: '4', product_id: '4', url: '/products/image3.png', alt_text: 'Eat Sleep Think Cash Tee', position: 0, is_primary: true }
    ],
    product_variants: []
  },
  {
    id: '5',
    shopify_product_id: 'gid://shopify/Product/5',
    name: 'I DO VERY BAD THINGS HOODIE',
    slug: 'i-do-very-bad-things-hoodie',
    description: 'I Do Very Bad Things - And I Do Them Very Well',
    price: 89.99,
    compare_at_price: null,
    category: 'mens' as const,
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [
      { id: '5', product_id: '5', url: '/products/image4.png', alt_text: 'I Do Very Bad Things Hoodie', position: 0, is_primary: true }
    ],
    product_variants: []
  },
  {
    id: '6',
    shopify_product_id: 'gid://shopify/Product/6',
    name: 'MAD MON TEE',
    slug: 'mad-mon-tee',
    description: 'Mad Mon character graphic tee',
    price: 49.99,
    compare_at_price: null,
    category: 'mens' as const,
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [
      { id: '6', product_id: '6', url: '/products/image5.png', alt_text: 'Mad Mon Tee', position: 0, is_primary: true }
    ],
    product_variants: []
  },
  {
    id: '7',
    shopify_product_id: 'gid://shopify/Product/7',
    name: 'SLEAZE MAD MON TEE',
    slug: 'sleaze-mad-mon-tee',
    description: 'SLEAZE Mad Mon graphic tee',
    price: 54.99,
    compare_at_price: null,
    category: 'mens' as const,
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [
      { id: '7', product_id: '7', url: '/products/image6.png', alt_text: 'SLEAZE Mad Mon Tee', position: 0, is_primary: true }
    ],
    product_variants: []
  },
  {
    id: '8',
    shopify_product_id: 'gid://shopify/Product/8',
    name: 'CHEAPWORK HOODIE',
    slug: 'cheapwork-hoodie',
    description: 'CheapWork graphic hoodie',
    price: 84.99,
    compare_at_price: null,
    category: 'mens' as const,
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [
      { id: '8', product_id: '8', url: '/products/image7.png', alt_text: 'CheapWork Hoodie', position: 0, is_primary: true }
    ],
    product_variants: []
  },
];

export default async function Home() {
  let products;
  
  try {
    products = await getFeaturedProducts();
  } catch {
    // Use mock data if Supabase isn't configured
    products = mockProducts;
  }

  // If no products from DB, use mock data
  if (products.length === 0) {
    products = mockProducts;
  }

  return (
    <>
      <Hero />
      <FeaturedProducts products={products} />
      <StreetSection />
      <CategoryBanner />
      <VideoSection />
      <Newsletter />
    </>
  );
}
