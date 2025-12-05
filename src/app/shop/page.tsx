import { ProductGrid } from '@/components/ProductGrid';
import { getProducts } from '@/lib/supabase';
import Link from 'next/link';

const categories = [
  { slug: '', label: 'ALL' },
  { slug: 'mens', label: 'MENS' },
  { slug: 'womens', label: 'WOMENS' },
  { slug: 'accessories', label: 'ACCESSORIES' },
  { slug: 'xtreme', label: 'XTREME' },
];

// Mock data for development
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
    product_images: [{ id: '1', product_id: '1', url: '/products/image0.png', alt_text: 'Bad Things Hoodie', position: 0, is_primary: true }],
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
    product_images: [{ id: '2', product_id: '2', url: '/products/image1.png', alt_text: 'Eyes Hoodie', position: 0, is_primary: true }],
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
    product_images: [{ id: '3', product_id: '3', url: '/products/image2.png', alt_text: 'Dogs Hoodie', position: 0, is_primary: true }],
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
    product_images: [{ id: '4', product_id: '4', url: '/products/image3.png', alt_text: 'UFO Hoodie', position: 0, is_primary: true }],
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
    product_images: [{ id: '5', product_id: '5', url: '/products/image4.png', alt_text: 'F1 Racer Hoodie', position: 0, is_primary: true }],
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
    product_images: [{ id: '6', product_id: '6', url: '/products/image5.png', alt_text: 'Helmet Tee', position: 0, is_primary: true }],
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
    product_images: [{ id: '7', product_id: '7', url: '/products/image6.png', alt_text: 'Dr Sleaze Longsleeve', position: 0, is_primary: true }],
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
    product_images: [{ id: '8', product_id: '8', url: '/products/image7.png', alt_text: 'Gym Hoodie', position: 0, is_primary: true }],
    product_variants: []
  },
  {
    id: '9',
    shopify_product_id: 'gid://shopify/Product/9',
    name: 'MAD MON TEE',
    slug: 'mad-mon-tee',
    description: 'Cream tee with character graphic',
    price: 44.99,
    compare_at_price: null,
    category: 'mens' as const,
    featured: false,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '9', product_id: '9', url: '/products/image8.png', alt_text: 'Mad Mon Tee', position: 0, is_primary: true }],
    product_variants: []
  },
  {
    id: '10',
    shopify_product_id: 'gid://shopify/Product/10',
    name: 'XTREME SPORTS LONGSLEEVE',
    slug: 'xtreme-sports-longsleeve',
    description: 'ATV racing graphic longsleeve',
    price: 64.99,
    compare_at_price: null,
    category: 'xtreme' as const,
    featured: false,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '10', product_id: '10', url: '/products/image10.jpeg', alt_text: 'Xtreme Longsleeve', position: 0, is_primary: true }],
    product_variants: []
  },
  {
    id: '11',
    shopify_product_id: 'gid://shopify/Product/11',
    name: 'THINK CASH TEE',
    slug: 'think-cash-tee',
    description: 'Eat Sleep Think Cash - washed black tee',
    price: 49.99,
    compare_at_price: null,
    category: 'mens' as const,
    featured: false,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '11', product_id: '11', url: '/products/image11.jpeg', alt_text: 'Think Cash Tee', position: 0, is_primary: true }],
    product_variants: []
  },
  {
    id: '12',
    shopify_product_id: 'gid://shopify/Product/12',
    name: 'CHEAPWORK HOODIE',
    slug: 'cheapwork-hoodie',
    description: 'Gray hoodie with vintage typography',
    price: 84.99,
    compare_at_price: null,
    category: 'mens' as const,
    featured: false,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '12', product_id: '12', url: '/products/image13.jpeg', alt_text: 'Cheapwork Hoodie', position: 0, is_primary: true }],
    product_variants: []
  },
  {
    id: '13',
    shopify_product_id: 'gid://shopify/Product/13',
    name: 'RACING LONGSLEEVE',
    slug: 'racing-longsleeve',
    description: 'Checkered flag SLEAZE longsleeve',
    price: 59.99,
    compare_at_price: null,
    category: 'xtreme' as const,
    featured: false,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '13', product_id: '13', url: '/products/image14.png', alt_text: 'Racing Longsleeve', position: 0, is_primary: true }],
    product_variants: []
  },
  {
    id: '14',
    shopify_product_id: 'gid://shopify/Product/14',
    name: "DON'T CRASH TEE",
    slug: 'dont-crash-tee',
    description: 'Cream oversized tee with bold text',
    price: 49.99,
    compare_at_price: null,
    category: 'mens' as const,
    featured: false,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '14', product_id: '14', url: '/products/image15.png', alt_text: 'Dont Crash Tee', position: 0, is_primary: true }],
    product_variants: []
  },
  {
    id: '15',
    shopify_product_id: 'gid://shopify/Product/15',
    name: 'SLEAZE SCRIPT HOODIE',
    slug: 'sleaze-script-hoodie',
    description: 'Purple wash with chenille lettering',
    price: 109.99,
    compare_at_price: null,
    category: 'mens' as const,
    featured: false,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '15', product_id: '15', url: '/products/image17.png', alt_text: 'Script Hoodie', position: 0, is_primary: true }],
    product_variants: []
  },
  {
    id: '16',
    shopify_product_id: 'gid://shopify/Product/16',
    name: 'HORROR SLEAZE TEE',
    slug: 'horror-sleaze-tee',
    description: '80s horror movie inspired graphic',
    price: 44.99,
    compare_at_price: null,
    category: 'womens' as const,
    featured: false,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '16', product_id: '16', url: '/products/image18.jpeg', alt_text: 'Horror Tee', position: 0, is_primary: true }],
    product_variants: []
  },
  {
    id: '17',
    shopify_product_id: 'gid://shopify/Product/17',
    name: 'ALIEN HOODIE',
    slug: 'alien-hoodie',
    description: 'Neon alien graphic on black',
    price: 94.99,
    compare_at_price: null,
    category: 'mens' as const,
    featured: false,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '17', product_id: '17', url: '/products/image20.png', alt_text: 'Alien Hoodie', position: 0, is_primary: true }],
    product_variants: []
  },
  {
    id: '18',
    shopify_product_id: 'gid://shopify/Product/18',
    name: 'PURPLE ZIP HOODIE',
    slug: 'purple-zip-hoodie',
    description: 'Washed purple zip-up hoodie',
    price: 99.99,
    compare_at_price: null,
    category: 'mens' as const,
    featured: false,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '18', product_id: '18', url: '/products/image21.png', alt_text: 'Purple Zip Hoodie', position: 0, is_primary: true }],
    product_variants: []
  },
  {
    id: '19',
    shopify_product_id: 'gid://shopify/Product/19',
    name: 'WORLD TOUR HOODIE',
    slug: 'world-tour-hoodie',
    description: 'Blow My Mind - World Tour 2025',
    price: 94.99,
    compare_at_price: null,
    category: 'mens' as const,
    featured: false,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '19', product_id: '19', url: '/products/image22.png', alt_text: 'World Tour Hoodie', position: 0, is_primary: true }],
    product_variants: []
  },
  {
    id: '20',
    shopify_product_id: 'gid://shopify/Product/20',
    name: 'WORLD TOUR TEE',
    slug: 'world-tour-tee',
    description: 'Blow My Mind - World Tour 2025 Tee',
    price: 49.99,
    compare_at_price: null,
    category: 'mens' as const,
    featured: false,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '20', product_id: '20', url: '/products/image23.png', alt_text: 'World Tour Tee', position: 0, is_primary: true }],
    product_variants: []
  },
];

export const metadata = {
  title: 'Shop All | SLEAZE',
  description: 'Browse our complete collection of urban streetwear and extreme sports apparel.',
};

export default async function ShopPage() {
  let products;
  
  try {
    products = await getProducts();
  } catch {
    products = mockProducts;
  }

  if (products.length === 0) {
    products = mockProducts;
  }

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-[family-name:var(--font-bebas)] text-6xl sm:text-7xl text-cream tracking-wider">
          SHOP ALL
        </h1>
        <p className="text-cream/60 mt-4 max-w-xl mx-auto">
          Explore our complete collection of urban streetwear
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
                cat.slug === ''
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

