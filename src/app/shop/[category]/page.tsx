'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductGrid } from '@/components/ProductGrid';
import { getProducts } from '@/lib/supabase';
import type { Product } from '@/lib/supabase';

const validCategories = ['mens', 'womens', 'new', 'xtreme'];

const categoryLabels: Record<string, string> = {
  mens: 'MENS',
  womens: 'WOMENS',
  new: 'NEW ARRIVALS',
  xtreme: 'XTREME GEAR',
};

const categoryDescriptions: Record<string, string> = {
  mens: 'Bold streetwear for the modern man.',
  womens: 'Fierce fashion for the fearless.',
  new: 'Be the first to cop the latest drops.',
  xtreme: 'Built for the extreme lifestyle.',
};

const categories = [
  { name: 'SHOP', slug: '' },
  { name: 'MENS', slug: 'mens' },
  { name: 'WOMENS', slug: 'womens' },
  { name: 'NEW ARRIVALS', slug: 'new' },
  { name: 'XTREME', slug: 'xtreme' },
];

const mockProducts: Product[] = [
  // Row 1: Sleaze Tee, Blow My Mind Tee, Blow My Mind Hoodie, Eat-Sleep-Think-Cash Tee
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
    product_images: [{ id: '1', product_id: '1', url: '/products/image0.png', alt_text: 'Sleaze Tee', position: 0, is_primary: true }],
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
    product_images: [{ id: '2', product_id: '2', url: '/products/image1.png', alt_text: 'Blow My Mind Tee', position: 0, is_primary: true }],
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
    product_images: [{ id: '3', product_id: '3', url: '/products/image2.png', alt_text: 'Blow My Mind Hoodie', position: 0, is_primary: true }],
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
    product_images: [{ id: '4', product_id: '4', url: '/products/image3.png', alt_text: 'Eat Sleep Think Cash Tee', position: 0, is_primary: true }],
    product_variants: []
  },
  // Row 2: I Do Very Bad Things Hoodie, Mad Mon Tee, SLEAZE Mad Mon Tee, CheapWork Hoodie
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
    product_images: [{ id: '5', product_id: '5', url: '/products/image4.png', alt_text: 'I Do Very Bad Things Hoodie', position: 0, is_primary: true }],
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
    product_images: [{ id: '6', product_id: '6', url: '/products/image5.png', alt_text: 'Mad Mon Tee', position: 0, is_primary: true }],
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
    product_images: [{ id: '7', product_id: '7', url: '/products/image6.png', alt_text: 'SLEAZE Mad Mon Tee', position: 0, is_primary: true }],
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
    product_images: [{ id: '8', product_id: '8', url: '/products/image7.png', alt_text: 'CheapWork Hoodie', position: 0, is_primary: true }],
    product_variants: []
  },
  // Row 3: SLEAZE Joker Tee, SLEAZE Racer Hoodie, All Eyes On Me Hoodie, SLEAZED Out Gym Hoodie
  {
    id: '9',
    shopify_product_id: 'gid://shopify/Product/9',
    name: 'SLEAZE JOKER TEE',
    slug: 'sleaze-joker-tee',
    description: 'SLEAZE Joker graphic tee',
    price: 49.99,
    compare_at_price: null,
    category: 'mens' as const,
    featured: false,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '9', product_id: '9', url: '/products/image8.png', alt_text: 'SLEAZE Joker Tee', position: 0, is_primary: true }],
    product_variants: []
  },
  {
    id: '10',
    shopify_product_id: 'gid://shopify/Product/10',
    name: 'SLEAZE RACER HOODIE',
    slug: 'sleaze-racer-hoodie',
    description: 'SLEAZE Racer graphic hoodie',
    price: 89.99,
    compare_at_price: null,
    category: 'mens' as const,
    featured: false,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '10', product_id: '10', url: '/products/image10.jpeg', alt_text: 'SLEAZE Racer Hoodie', position: 0, is_primary: true }],
    product_variants: []
  },
  {
    id: '11',
    shopify_product_id: 'gid://shopify/Product/11',
    name: 'ALL EYES ON ME HOODIE',
    slug: 'all-eyes-on-me-hoodie',
    description: 'All Eyes On Me graphic hoodie',
    price: 89.99,
    compare_at_price: null,
    category: 'mens' as const,
    featured: false,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '11', product_id: '11', url: '/products/image11.jpeg', alt_text: 'All Eyes On Me Hoodie', position: 0, is_primary: true }],
    product_variants: []
  },
  {
    id: '12',
    shopify_product_id: 'gid://shopify/Product/12',
    name: 'SLEAZED OUT GYM HOODIE',
    slug: 'sleazed-out-gym-hoodie',
    description: 'SLEAZED Out Gym graphic hoodie',
    price: 89.99,
    compare_at_price: null,
    category: 'mens' as const,
    featured: false,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '12', product_id: '12', url: '/products/image13.jpeg', alt_text: 'SLEAZED Out Gym Hoodie', position: 0, is_primary: true }],
    product_variants: []
  },
  // Row 4: SLEAZE Zip-up Hoodie (merged), Dr. Sleaze Crew Sweatshirt, Dogs Gotta Eat Hoodie, SLEAZE Martian Hoodie
  {
    id: '13',
    shopify_product_id: 'gid://shopify/Product/13',
    name: 'SLEAZE ZIP-UP HOODIE',
    slug: 'sleaze-zip-up-hoodie',
    description: 'SLEAZE Zip-up hoodie with front zip and SLEAZE back print',
    price: 99.99,
    compare_at_price: null,
    category: 'mens' as const,
    featured: false,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [
      { id: '13a', product_id: '13', url: '/products/image14.png', alt_text: 'SLEAZE Zip-up Hoodie Front', position: 0, is_primary: true },
      { id: '13b', product_id: '13', url: '/products/image15.png', alt_text: 'SLEAZE Zip-up Hoodie Back', position: 1, is_primary: false }
    ],
    product_variants: []
  },
  {
    id: '14',
    shopify_product_id: 'gid://shopify/Product/14',
    name: 'DR. SLEAZE CREW SWEATSHIRT',
    slug: 'dr-sleaze-crew-sweatshirt',
    description: 'Dr. Sleaze Crew Sweatshirt',
    price: 79.99,
    compare_at_price: null,
    category: 'mens' as const,
    featured: false,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '14', product_id: '14', url: '/products/image17.png', alt_text: 'Dr. Sleaze Crew Sweatshirt', position: 0, is_primary: true }],
    product_variants: []
  },
  {
    id: '15',
    shopify_product_id: 'gid://shopify/Product/15',
    name: 'DOGS GOTTA EAT HOODIE',
    slug: 'dogs-gotta-eat-hoodie',
    description: 'Dogs Gotta Eat graphic hoodie',
    price: 89.99,
    compare_at_price: null,
    category: 'mens' as const,
    featured: false,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '15', product_id: '15', url: '/products/image18.jpeg', alt_text: 'Dogs Gotta Eat Hoodie', position: 0, is_primary: true }],
    product_variants: []
  },
  {
    id: '16',
    shopify_product_id: 'gid://shopify/Product/16',
    name: 'SLEAZE MARTIAN HOODIE',
    slug: 'sleaze-martian-hoodie',
    description: 'SLEAZE Martian graphic hoodie',
    price: 89.99,
    compare_at_price: null,
    category: 'mens' as const,
    featured: false,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '16', product_id: '16', url: '/products/image20.png', alt_text: 'SLEAZE Martian Hoodie', position: 0, is_primary: true }],
    product_variants: []
  },
  // Row 5: SLEAZE UFO Hoodie, Xtreme Sports Long Sleeve (merged)
  {
    id: '17',
    shopify_product_id: 'gid://shopify/Product/17',
    name: 'SLEAZE UFO HOODIE',
    slug: 'sleaze-ufo-hoodie',
    description: 'SLEAZE UFO graphic hoodie',
    price: 89.99,
    compare_at_price: null,
    category: 'mens' as const,
    featured: false,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '17', product_id: '17', url: '/products/image21.png', alt_text: 'SLEAZE UFO Hoodie', position: 0, is_primary: true }],
    product_variants: []
  },
  {
    id: '18',
    shopify_product_id: 'gid://shopify/Product/18',
    name: 'XTREME SPORTS LONG SLEEVE',
    slug: 'xtreme-sports-long-sleeve',
    description: 'Xtreme Sports Long Sleeve',
    price: 59.99,
    compare_at_price: null,
    category: 'mens' as const,
    featured: false,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [
      { id: '18a', product_id: '18', url: '/products/image22.png', alt_text: 'Xtreme Sports Long Sleeve Back', position: 0, is_primary: true },
      { id: '18b', product_id: '18', url: '/products/image23.png', alt_text: 'Xtreme Sports Long Sleeve Front', position: 1, is_primary: false }
    ],
    product_variants: []
  },
  // Xtreme category products
  {
    id: '19',
    shopify_product_id: 'gid://shopify/Product/19',
    name: 'XTREME SPORTS LONG SLEEVE',
    slug: 'xtreme-sports-long-sleeve-xtreme',
    description: 'Xtreme Sports Long Sleeve - Extreme gear',
    price: 59.99,
    compare_at_price: null,
    category: 'xtreme' as const,
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [
      { id: '19a', product_id: '19', url: '/products/image22.png', alt_text: 'Xtreme Sports Long Sleeve Back', position: 0, is_primary: true },
      { id: '19b', product_id: '19', url: '/products/image23.png', alt_text: 'Xtreme Sports Long Sleeve Front', position: 1, is_primary: false }
    ],
    product_variants: []
  },
  {
    id: '20',
    shopify_product_id: 'gid://shopify/Product/20',
    name: 'SLEAZE RACER HOODIE',
    slug: 'sleaze-racer-hoodie-xtreme',
    description: 'SLEAZE Racer graphic hoodie - Racing inspired extreme gear',
    price: 89.99,
    compare_at_price: null,
    category: 'xtreme' as const,
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '20', product_id: '20', url: '/products/image10.jpeg', alt_text: 'SLEAZE Racer Hoodie', position: 0, is_primary: true }],
    product_variants: []
  },
  {
    id: '21',
    shopify_product_id: 'gid://shopify/Product/21',
    name: "DON'T CRASH TEE",
    slug: 'dont-crash-tee',
    description: "Don't Crash Tee - Bold statement piece",
    price: 49.99,
    compare_at_price: null,
    category: 'mens' as const,
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: '21', product_id: '21', url: '/products/image24.png', alt_text: "Don't Crash Tee", position: 0, is_primary: true }],
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
    products = await getProducts();
  } catch {
    products = mockProducts;
  }

  if (products.length === 0) {
    products = mockProducts;
  }

  // Filter by xtreme category if on xtreme page, exclude xtreme from mens/womens
  if (category === 'xtreme') {
    products = products.filter(p => p.category === 'xtreme');
  } else if (category === 'mens' || category === 'womens') {
    products = products.filter(p => p.category !== 'xtreme');
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

      {/* Category Navigation */}
      <nav className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.slug ? `/shop/${cat.slug}` : '/shop'}
              className={`px-6 py-2 font-[family-name:var(--font-bebas)] text-lg tracking-wider transition-all ${
                cat.slug === category
                  ? 'bg-red text-cream'
                  : 'glass-light text-cream/60 hover:text-cream hover:bg-cream/10'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </nav>

      <ProductGrid products={products} fromCategory={category} />
    </div>
  );
}
