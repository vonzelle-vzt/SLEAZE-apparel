'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { Product } from '@/lib/supabase';

type ProductCardProps = {
  product: Product;
  fromCategory?: string;
};

export function ProductCard({ product, fromCategory }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const primaryImage = product.product_images?.find(img => img.is_primary) || product.product_images?.[0];
  const secondaryImage = product.product_images?.find(img => !img.is_primary && img.position === 1);

  const productUrl = fromCategory 
    ? `/product/${product.slug}?from=${fromCategory}`
    : `/product/${product.slug}`;

  return (
    <Link
      href={productUrl}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-cream/5 mb-4">
        {primaryImage && (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt_text || product.name}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-105"
          />
        )}
        {secondaryImage && (
          <Image
            src={secondaryImage.url}
            alt={secondaryImage.alt_text || product.name}
            fill
            className={`object-cover transition-all duration-500 absolute inset-0 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            } group-hover:scale-105`}
          />
        )}
        
        {/* Quick view overlay - shows primary image */}
        <div className="absolute inset-0 bg-dark-gray/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="px-6 py-3 glass text-cream font-[family-name:var(--font-bebas)] tracking-wider">
            QUICK VIEW
          </span>
        </div>

        {/* Sale badge */}
        {product.compare_at_price && product.compare_at_price > product.price && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-red text-cream text-sm font-bold">
            SALE
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 right-3 px-3 py-1 glass-light text-cream/80 text-xs tracking-wider uppercase">
          {product.category}
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="font-[family-name:var(--font-bebas)] text-xl text-cream tracking-wider group-hover:text-red transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-red font-semibold">${product.price.toFixed(2)}</span>
          {product.compare_at_price && product.compare_at_price > product.price && (
            <span className="text-cream/40 line-through text-sm">
              ${product.compare_at_price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

