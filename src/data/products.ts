export type ProductImage = {
  id: string;
  product_id: string;
  url: string;
  alt_text: string;
  position: number;
  is_primary: boolean;
};

export type ProductVariant = {
  id: string;
  product_id: string;
  shopify_variant_id: string;
  size: string;
  sku: string;
  inventory_count: number;
  created_at: string;
};

export type Product = {
  id: string;
  shopify_product_id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compare_at_price: number | null;
  category: 'mens' | 'womens' | 'accessories' | 'xtreme';
  featured: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
  product_images: ProductImage[];
  product_variants: ProductVariant[];
};

const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

function createVariants(productId: string, prefix: string): ProductVariant[] {
  return sizes.map((size, i) => ({
    id: `${productId}-v${i + 1}`,
    product_id: productId,
    shopify_variant_id: `v${productId}-${i + 1}`,
    size,
    sku: `${prefix}-${size}`,
    inventory_count: 10,
    created_at: new Date().toISOString(),
  }));
}

export const allProducts: Product[] = [
  {
    id: '1',
    shopify_product_id: 'gid://shopify/Product/1',
    name: 'SLEAZE TEE',
    slug: 'sleaze-tee',
    description: 'Classic SLEAZE branded tee. Premium heavyweight cotton with a relaxed fit.',
    price: 49.99,
    compare_at_price: null,
    category: 'mens',
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '1', product_id: '1', url: '/products/image0.png', alt_text: 'Sleaze Tee', position: 0, is_primary: true }],
    product_variants: createVariants('1', 'ST'),
  },
  {
    id: '2',
    shopify_product_id: 'gid://shopify/Product/2',
    name: 'BLOW MY MIND TEE',
    slug: 'blow-my-mind-tee',
    description: 'Blow My Mind graphic tee. Bold statement piece with premium cotton construction.',
    price: 54.99,
    compare_at_price: null,
    category: 'mens',
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '2', product_id: '2', url: '/products/image1.png', alt_text: 'Blow My Mind Tee', position: 0, is_primary: true }],
    product_variants: createVariants('2', 'BMT'),
  },
  {
    id: '3',
    shopify_product_id: 'gid://shopify/Product/3',
    name: 'BLOW MY MIND HOODIE',
    slug: 'blow-my-mind-hoodie',
    description: 'Blow My Mind graphic hoodie. Heavyweight fleece with vintage wash finish.',
    price: 89.99,
    compare_at_price: null,
    category: 'mens',
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '3', product_id: '3', url: '/products/image2.png', alt_text: 'Blow My Mind Hoodie', position: 0, is_primary: true }],
    product_variants: createVariants('3', 'BMH'),
  },
  {
    id: '4',
    shopify_product_id: 'gid://shopify/Product/4',
    name: 'EAT-SLEEP-THINK-CASH TEE',
    slug: 'eat-sleep-think-cash-tee',
    description: 'Eat Sleep Think Cash graphic tee. Premium cotton with bold statement print.',
    price: 49.99,
    compare_at_price: null,
    category: 'mens',
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '4', product_id: '4', url: '/products/image3.png', alt_text: 'Eat Sleep Think Cash Tee', position: 0, is_primary: true }],
    product_variants: createVariants('4', 'ESTC'),
  },
  {
    id: '5',
    shopify_product_id: 'gid://shopify/Product/5',
    name: 'I DO VERY BAD THINGS HOODIE',
    slug: 'i-do-very-bad-things-hoodie',
    description: 'I Do Very Bad Things - And I Do Them Very Well. Premium heavyweight hoodie.',
    price: 89.99,
    compare_at_price: null,
    category: 'mens',
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '5', product_id: '5', url: '/products/image4.png', alt_text: 'I Do Very Bad Things Hoodie', position: 0, is_primary: true }],
    product_variants: createVariants('5', 'IDVBT'),
  },
  {
    id: '6',
    shopify_product_id: 'gid://shopify/Product/6',
    name: 'MAD MON TEE',
    slug: 'mad-mon-tee',
    description: 'Mad Mon character graphic tee. Unique streetwear design on premium cotton.',
    price: 49.99,
    compare_at_price: null,
    category: 'mens',
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '6', product_id: '6', url: '/products/image5.png', alt_text: 'Mad Mon Tee', position: 0, is_primary: true }],
    product_variants: createVariants('6', 'MMT'),
  },
  {
    id: '7',
    shopify_product_id: 'gid://shopify/Product/7',
    name: 'SLEAZE MAD MON TEE',
    slug: 'sleaze-mad-mon-tee',
    description: 'SLEAZE Mad Mon graphic tee. Premium cotton with signature character print.',
    price: 54.99,
    compare_at_price: null,
    category: 'mens',
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '7', product_id: '7', url: '/products/image6.png', alt_text: 'SLEAZE Mad Mon Tee', position: 0, is_primary: true }],
    product_variants: createVariants('7', 'SMMT'),
  },
  {
    id: '8',
    shopify_product_id: 'gid://shopify/Product/8',
    name: 'CHEAPWORK HOODIE',
    slug: 'cheapwork-hoodie',
    description: 'CheapWork graphic hoodie. Heavyweight fleece with vintage typography.',
    price: 84.99,
    compare_at_price: null,
    category: 'mens',
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '8', product_id: '8', url: '/products/image7.png', alt_text: 'CheapWork Hoodie', position: 0, is_primary: true }],
    product_variants: createVariants('8', 'CWH'),
  },
  {
    id: '9',
    shopify_product_id: 'gid://shopify/Product/9',
    name: 'SLEAZE JOKER TEE',
    slug: 'sleaze-joker-tee',
    description: 'SLEAZE Joker graphic tee. Bold design on premium cotton.',
    price: 49.99,
    compare_at_price: null,
    category: 'mens',
    featured: false,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '9', product_id: '9', url: '/products/image8.png', alt_text: 'SLEAZE Joker Tee', position: 0, is_primary: true }],
    product_variants: createVariants('9', 'SJT'),
  },
  {
    id: '10',
    shopify_product_id: 'gid://shopify/Product/10',
    name: 'SLEAZE RACER HOODIE',
    slug: 'sleaze-racer-hoodie',
    description: 'SLEAZE Racer graphic hoodie. Racing-inspired design on heavyweight fleece.',
    price: 89.99,
    compare_at_price: null,
    category: 'mens',
    featured: false,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '10', product_id: '10', url: '/products/image10.jpeg', alt_text: 'SLEAZE Racer Hoodie', position: 0, is_primary: true }],
    product_variants: createVariants('10', 'SRH'),
  },
  {
    id: '11',
    shopify_product_id: 'gid://shopify/Product/11',
    name: 'ALL EYES ON ME HOODIE',
    slug: 'all-eyes-on-me-hoodie',
    description: 'All Eyes On Me graphic hoodie. Statement piece on heavyweight fleece.',
    price: 89.99,
    compare_at_price: null,
    category: 'mens',
    featured: false,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '11', product_id: '11', url: '/products/image11.jpeg', alt_text: 'All Eyes On Me Hoodie', position: 0, is_primary: true }],
    product_variants: createVariants('11', 'AEOM'),
  },
  {
    id: '12',
    shopify_product_id: 'gid://shopify/Product/12',
    name: 'SLEAZED OUT GYM HOODIE',
    slug: 'sleazed-out-gym-hoodie',
    description: 'SLEAZED Out Gym graphic hoodie. Premium athletic-inspired streetwear.',
    price: 89.99,
    compare_at_price: null,
    category: 'mens',
    featured: false,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '12', product_id: '12', url: '/products/image13.jpeg', alt_text: 'SLEAZED Out Gym Hoodie', position: 0, is_primary: true }],
    product_variants: createVariants('12', 'SOGH'),
  },
  {
    id: '13',
    shopify_product_id: 'gid://shopify/Product/13',
    name: 'SLEAZE ZIP-UP HOODIE',
    slug: 'sleaze-zip-up-hoodie',
    description: 'SLEAZE Zip-up hoodie. Premium heavyweight with front zip and SLEAZE back print.',
    price: 99.99,
    compare_at_price: null,
    category: 'mens',
    featured: false,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [
      { id: '13a', product_id: '13', url: '/products/image14.png', alt_text: 'SLEAZE Zip-up Hoodie Front', position: 0, is_primary: true },
      { id: '13b', product_id: '13', url: '/products/image15.png', alt_text: 'SLEAZE Zip-up Hoodie Back', position: 1, is_primary: false }
    ],
    product_variants: createVariants('13', 'SZUH'),
  },
  {
    id: '14',
    shopify_product_id: 'gid://shopify/Product/14',
    name: 'DR. SLEAZE CREW SWEATSHIRT',
    slug: 'dr-sleaze-crew-sweatshirt',
    description: 'Dr. Sleaze Crew Sweatshirt. Classic crew neck with signature graphic.',
    price: 79.99,
    compare_at_price: null,
    category: 'mens',
    featured: false,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '14', product_id: '14', url: '/products/image17.png', alt_text: 'Dr. Sleaze Crew Sweatshirt', position: 0, is_primary: true }],
    product_variants: createVariants('14', 'DSCS'),
  },
  {
    id: '15',
    shopify_product_id: 'gid://shopify/Product/15',
    name: 'DOGS GOTTA EAT HOODIE',
    slug: 'dogs-gotta-eat-hoodie',
    description: 'Dogs Gotta Eat graphic hoodie. Bold streetwear statement on heavyweight fleece.',
    price: 89.99,
    compare_at_price: null,
    category: 'mens',
    featured: false,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '15', product_id: '15', url: '/products/image18.jpeg', alt_text: 'Dogs Gotta Eat Hoodie', position: 0, is_primary: true }],
    product_variants: createVariants('15', 'DGEH'),
  },
  {
    id: '16',
    shopify_product_id: 'gid://shopify/Product/16',
    name: 'SLEAZE MARTIAN HOODIE',
    slug: 'sleaze-martian-hoodie',
    description: 'SLEAZE Martian graphic hoodie. Out-of-this-world design on premium fleece.',
    price: 89.99,
    compare_at_price: null,
    category: 'mens',
    featured: false,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '16', product_id: '16', url: '/products/image20.png', alt_text: 'SLEAZE Martian Hoodie', position: 0, is_primary: true }],
    product_variants: createVariants('16', 'SMH'),
  },
  {
    id: '17',
    shopify_product_id: 'gid://shopify/Product/17',
    name: 'SLEAZE UFO HOODIE',
    slug: 'sleaze-ufo-hoodie',
    description: 'SLEAZE UFO graphic hoodie. Alien-inspired design on heavyweight fleece.',
    price: 89.99,
    compare_at_price: null,
    category: 'mens',
    featured: false,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '17', product_id: '17', url: '/products/image21.png', alt_text: 'SLEAZE UFO Hoodie', position: 0, is_primary: true }],
    product_variants: createVariants('17', 'SUFOH'),
  },
  {
    id: '18',
    shopify_product_id: 'gid://shopify/Product/18',
    name: 'XTREME SPORTS LONG SLEEVE',
    slug: 'xtreme-sports-long-sleeve',
    description: 'Xtreme Sports Long Sleeve. Action-inspired graphics on premium cotton.',
    price: 59.99,
    compare_at_price: null,
    category: 'mens',
    featured: false,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [
      { id: '18a', product_id: '18', url: '/products/image22.png', alt_text: 'Xtreme Sports Long Sleeve Back', position: 0, is_primary: true },
      { id: '18b', product_id: '18', url: '/products/image23.png', alt_text: 'Xtreme Sports Long Sleeve Front', position: 1, is_primary: false }
    ],
    product_variants: createVariants('18', 'XSLS'),
  },
  // XTREME category products
  {
    id: '19',
    shopify_product_id: 'gid://shopify/Product/19',
    name: 'XTREME SPORTS LONG SLEEVE',
    slug: 'xtreme-sports-long-sleeve-xtreme',
    description: 'Xtreme Sports Long Sleeve. Built for extreme action and adventure.',
    price: 59.99,
    compare_at_price: null,
    category: 'xtreme',
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [
      { id: '19a', product_id: '19', url: '/products/image22.png', alt_text: 'Xtreme Sports Long Sleeve Back', position: 0, is_primary: true },
      { id: '19b', product_id: '19', url: '/products/image23.png', alt_text: 'Xtreme Sports Long Sleeve Front', position: 1, is_primary: false }
    ],
    product_variants: createVariants('19', 'XSLSX'),
  },
  {
    id: '20',
    shopify_product_id: 'gid://shopify/Product/20',
    name: 'SLEAZE RACER HOODIE',
    slug: 'sleaze-racer-hoodie-xtreme',
    description: 'SLEAZE Racer graphic hoodie. Racing inspired extreme gear.',
    price: 89.99,
    compare_at_price: null,
    category: 'xtreme',
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '20', product_id: '20', url: '/products/image10.jpeg', alt_text: 'SLEAZE Racer Hoodie', position: 0, is_primary: true }],
    product_variants: createVariants('20', 'SRHX'),
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find(p => p.slug === slug);
}

export function getAllProducts(): Product[] {
  return allProducts;
}

export function getFeaturedProducts(): Product[] {
  return allProducts.filter(p => p.featured);
}

