'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { getProductBySlug } from '@/data/products';
import { notFound } from 'next/navigation';

const mensSizes = ['S', 'M', 'L', 'XL', 'XXL'];
const womensSizes = ['S', 'M', 'L', 'XL'];

type Props = {
  params: Promise<{ slug: string }>;
};

export default function ProductPage({ params }: Props) {
  const { slug } = use(params);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const product = getProductBySlug(slug);
  
  if (!product) {
    notFound();
  }

  const images = product.product_images || [];

  const handleAddToCart = () => {
    if (!selectedSize) return;
    
    addItem({
      id: `${product.id}-${selectedSize}`,
      title: product.name,
      variant: selectedSize,
      price: product.price,
      quantity,
      image: images[0]?.url || '',
    });
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-cream/60">
            <li>
              <Link href="/" className="hover:text-cream transition-colors">Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/shop" className="hover:text-cream transition-colors">Shop</Link>
            </li>
            <li>/</li>
            <li>
              <Link href={`/shop/${product.category}`} className="hover:text-cream transition-colors capitalize">
                {product.category}
              </Link>
            </li>
            <li>/</li>
            <li className="text-cream">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-cream/5 overflow-hidden group">
              {images[selectedImage] && (
                <Image
                  src={images[selectedImage].url}
                  alt={images[selectedImage].alt_text || product.name}
                  fill
                  className="object-cover"
                  priority
                />
              )}
              
              {/* Navigation arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 glass opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} className="text-cream" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 glass opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} className="text-cream" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-4">
                {images.map((img, index) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 overflow-hidden ${
                      selectedImage === index ? 'ring-2 ring-red' : 'opacity-60 hover:opacity-100'
                    } transition-all`}
                  >
                    <Image
                      src={img.url}
                      alt={img.alt_text || ''}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <span className="text-red text-sm tracking-wider uppercase">{product.category}</span>
              <h1 className="font-[family-name:var(--font-bebas)] text-5xl sm:text-6xl text-cream tracking-wider mt-2">
                {product.name}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-[family-name:var(--font-bebas)] text-4xl text-red">
                ${product.price.toFixed(2)}
              </span>
              {product.compare_at_price !== null && product.compare_at_price > product.price && (
                <span className="text-cream/40 line-through text-xl">
                  ${product.compare_at_price.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-cream/70 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-cream font-medium">Size</span>
                <button className="text-cream/60 text-sm hover:text-cream transition-colors underline">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {(product.category === 'womens' ? womensSizes : mensSizes).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 font-[family-name:var(--font-bebas)] text-lg tracking-wider transition-all ${
                      selectedSize === size
                        ? 'bg-red text-cream'
                        : 'glass-light text-cream/60 hover:text-cream hover:bg-cream/10'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-red/80 text-sm mt-2">Please select a size</p>
              )}
            </div>

            {/* Quantity */}
            <div>
              <span className="text-cream font-medium block mb-3">Quantity</span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 glass-light text-cream/60 hover:text-cream transition-colors"
                >
                  <Minus size={20} />
                </button>
                <span className="font-[family-name:var(--font-bebas)] text-2xl text-cream w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 glass-light text-cream/60 hover:text-cream transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className="w-full py-5 bg-red text-cream font-[family-name:var(--font-bebas)] text-2xl tracking-wider hover:bg-red/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              <ShoppingBag size={24} />
              ADD TO CART
            </button>

            {/* Product Details */}
            <div className="pt-6 border-t border-cream/10 space-y-4">
              <div>
                <h3 className="font-[family-name:var(--font-bebas)] text-xl text-cream tracking-wider mb-2">
                  DETAILS
                </h3>
                <ul className="text-cream/60 space-y-1 text-sm">
                  <li>• 100% Premium Cotton</li>
                  <li>• Heavyweight 400gsm fabric</li>
                  <li>• Vintage wash finish</li>
                  <li>• Relaxed oversized fit</li>
                  <li>• Ribbed cuffs and hem</li>
                </ul>
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-bebas)] text-xl text-cream tracking-wider mb-2">
                  SHIPPING
                </h3>
                <p className="text-cream/60 text-sm">
                  Free shipping on orders over $100. Standard delivery 5-7 business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
