'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Cart } from './Cart';

const navLinks = [
  { href: '/', label: 'HOME' },
  { href: '/shop', label: 'SHOP' },
  { href: '/shop/mens', label: 'MENS' },
  { href: '/shop/womens', label: 'WOMENS' },
  { href: '/contact', label: 'CONTACT' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount, setIsOpen } = useCart();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <span 
                className="font-[family-name:var(--font-bebas)] text-4xl text-cream sleaze-text group-hover:text-red transition-colors"
                data-text="SLEAZE"
              >
                SLEAZE
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-[family-name:var(--font-bebas)] text-lg tracking-wider text-cream/80 hover:text-red transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Cart & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsOpen(true)}
                className="relative p-2 text-cream hover:text-red transition-colors"
                aria-label="Open cart"
              >
                <ShoppingBag size={24} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red text-cream text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {itemCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-cream hover:text-red transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-light border-t border-cream/10">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-[family-name:var(--font-bebas)] text-2xl tracking-wider text-cream/80 hover:text-red transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
      <Cart />
    </>
  );
}

