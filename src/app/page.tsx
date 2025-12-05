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
    name: 'BAD THINGS HOODIE',
    slug: 'bad-things-hoodie',
    description: 'I Do Very Bad Things - And I Do Them Very Well',
    price: 89.99,
    compare_at_price: null,
    category: 'mens' as const,
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [
      { id: '1', product_id: '1', url: '/products/image0.png', alt_text: 'Bad Things Hoodie', position: 0, is_primary: true }
    ],
    product_variants: [
      { id: '1', product_id: '1', shopify_variant_id: 'v1', size: 'S', sku: 'BAD-S', inventory_count: 10, created_at: new Date().toISOString() }
    ]
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
    product_images: [
      { id: '2', product_id: '2', url: '/products/image1.png', alt_text: 'Eyes Hoodie', position: 0, is_primary: true }
    ],
    product_variants: []
  },
  {
    id: '3',
    shopify_product_id: 'gid://shopify/Product/3',
    name: 'DOGS GOTTA EAT HOODIE',
    slug: 'dogs-gotta-eat-hoodie',
    description: 'Doberman graphic hoodie',
    price: 89.99,
    compare_at_price: null,
    category: 'mens' as const,
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [
      { id: '3', product_id: '3', url: '/products/image2.png', alt_text: 'Dogs Hoodie', position: 0, is_primary: true }
    ],
    product_variants: []
  },
  {
    id: '4',
    shopify_product_id: 'gid://shopify/Product/4',
    name: 'SLEAZE UFO HOODIE',
    slug: 'sleaze-ufo-hoodie',
    description: 'Black hoodie with UFO graphic',
    price: 89.99,
    compare_at_price: null,
    category: 'mens' as const,
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [
      { id: '4', product_id: '4', url: '/products/image3.png', alt_text: 'UFO Hoodie', position: 0, is_primary: true }
    ],
    product_variants: []
  },
  {
    id: '5',
    shopify_product_id: 'gid://shopify/Product/5',
    name: 'F1 RACER HOODIE',
    slug: 'f1-racer-hoodie',
    description: 'Racing inspired hoodie with skull helmet',
    price: 99.99,
    compare_at_price: null,
    category: 'mens' as const,
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [
      { id: '5', product_id: '5', url: '/products/image4.png', alt_text: 'F1 Racer Hoodie', position: 0, is_primary: true }
    ],
    product_variants: []
  },
  {
    id: '6',
    shopify_product_id: 'gid://shopify/Product/6',
    name: 'HELMET RIDER TEE',
    slug: 'helmet-rider-tee',
    description: 'Oversized cream tee with helmet graphic',
    price: 54.99,
    compare_at_price: null,
    category: 'mens' as const,
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [
      { id: '6', product_id: '6', url: '/products/image5.png', alt_text: 'Helmet Tee', position: 0, is_primary: true }
    ],
    product_variants: []
  },
  {
    id: '7',
    shopify_product_id: 'gid://shopify/Product/7',
    name: 'DR. SLEAZE LONGSLEEVE',
    slug: 'dr-sleaze-longsleeve',
    description: 'Washed gray longsleeve with Dr. Sleaze graphic',
    price: 64.99,
    compare_at_price: null,
    category: 'mens' as const,
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [
      { id: '7', product_id: '7', url: '/products/image6.png', alt_text: 'Dr Sleaze Longsleeve', position: 0, is_primary: true }
    ],
    product_variants: []
  },
  {
    id: '8',
    shopify_product_id: 'gid://shopify/Product/8',
    name: "SLEAZE'D OUT GYM HOODIE",
    slug: 'sleazed-out-gym-hoodie',
    description: 'Tiger gym graphic hoodie',
    price: 89.99,
    compare_at_price: null,
    category: 'mens' as const,
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [
      { id: '8', product_id: '8', url: '/products/image7.png', alt_text: 'Gym Hoodie', position: 0, is_primary: true }
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
