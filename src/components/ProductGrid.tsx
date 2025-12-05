import { ProductCard } from './ProductCard';
import type { Product } from '@/lib/supabase';

type ProductGridProps = {
  products: Product[];
  title?: string;
};

export function ProductGrid({ products, title }: ProductGridProps) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {title && (
          <h2 className="font-[family-name:var(--font-bebas)] text-4xl sm:text-5xl text-cream tracking-wider mb-10 text-center">
            {title}
          </h2>
        )}
        
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-cream/60 text-lg">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

