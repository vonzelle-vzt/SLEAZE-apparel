'use client';

import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

export function Cart() {
  const { items, removeItem, updateQuantity, total, isOpen, setIsOpen } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Cart Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md glass border-l border-cream/10 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-cream/10">
          <h2 className="font-[family-name:var(--font-bebas)] text-2xl tracking-wider text-cream">
            YOUR CART
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-cream/60 hover:text-red transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-cream/60">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map(item => (
                <div key={`${item.id}-${item.variant}`} className="flex gap-4">
                  <div className="relative w-20 h-20 bg-cream/5 rounded overflow-hidden flex-shrink-0">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-[family-name:var(--font-bebas)] text-lg text-cream truncate">
                      {item.title}
                    </h3>
                    <p className="text-cream/60 text-sm">{item.variant}</p>
                    <p className="text-red font-semibold">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 text-cream/40 hover:text-red transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 glass-light rounded text-cream/60 hover:text-cream transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-cream w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 glass-light rounded text-cream/60 hover:text-cream transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-cream/10">
            <div className="flex justify-between items-center mb-4">
              <span className="text-cream/60">Subtotal</span>
              <span className="font-[family-name:var(--font-bebas)] text-2xl text-red">
                ${total.toFixed(2)}
              </span>
            </div>
            <button className="w-full py-4 bg-red text-cream font-[family-name:var(--font-bebas)] text-xl tracking-wider hover:bg-red/80 transition-colors">
              CHECKOUT
            </button>
            <p className="text-center text-cream/40 text-sm mt-3">
              Shipping calculated at checkout
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

