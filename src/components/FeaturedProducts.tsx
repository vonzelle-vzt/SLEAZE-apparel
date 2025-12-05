import Link from 'next/link';
import { ProductCard } from './ProductCard';
import type { Product } from '@/lib/supabase';
import { ArrowRight } from 'lucide-react';

type FeaturedProductsProps = {
  products: Product[];
};

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-dark-gray to-dark-gray/95">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
          <div>
            <span className="text-red text-sm tracking-wider uppercase">Featured</span>
            <h2 className="font-[family-name:var(--font-bebas)] text-5xl sm:text-6xl text-cream tracking-wider mt-2">
              HOT PICKS
            </h2>
          </div>
          <Link
            href="/shop"
            className="group flex items-center gap-2 text-cream/60 hover:text-red transition-colors"
          >
            <span className="tracking-wider">VIEW ALL</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {products.slice(0, 8).map((product, index) => (
            <div
              key={product.id}
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

