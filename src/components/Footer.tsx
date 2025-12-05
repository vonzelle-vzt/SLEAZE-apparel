import Link from 'next/link';
import { Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-dark-gray border-t border-cream/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block group">
              <span 
                className="font-[family-name:var(--font-bebas)] text-5xl text-cream sleaze-text group-hover:text-red transition-colors"
                data-text="SLEAZE"
              >
                SLEAZE
              </span>
            </Link>
            <p className="mt-4 text-cream/60 max-w-md">
              Modern, urban, extreme-sports inspired clothing. Built for those who live on the edge.
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 glass-light rounded-full text-cream/60 hover:text-red transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 glass-light rounded-full text-cream/60 hover:text-red transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-[family-name:var(--font-bebas)] text-xl tracking-wider text-cream mb-4">
              SHOP
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="text-cream/60 hover:text-red transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/shop/mens" className="text-cream/60 hover:text-red transition-colors">
                  Mens
                </Link>
              </li>
              <li>
                <Link href="/shop/womens" className="text-cream/60 hover:text-red transition-colors">
                  Womens
                </Link>
              </li>
              <li>
                <Link href="/shop/accessories" className="text-cream/60 hover:text-red transition-colors">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h3 className="font-[family-name:var(--font-bebas)] text-xl tracking-wider text-cream mb-4">
              INFO
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-cream/60 hover:text-red transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-cream/60 hover:text-red transition-colors">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-cream/60 hover:text-red transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-cream/60 hover:text-red transition-colors">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-cream/40 text-sm">
            © {new Date().getFullYear()} Sleaze Apparel. All rights reserved.
          </p>
          <p className="text-cream/40 text-sm mt-2 md:mt-0">
            Built with 🔥 for the bold
          </p>
        </div>
      </div>
    </footer>
  );
}

