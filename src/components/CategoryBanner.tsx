import Link from 'next/link';
import Image from 'next/image';

const categories = [
  {
    name: 'MENS',
    slug: 'mens',
    image: '/categories/mens.jpg',
    description: 'Bold styles for bold moves',
  },
  {
    name: 'WOMENS',
    slug: 'womens',
    image: '/categories/womens.jpg',
    description: 'Fierce fashion forward',
  },
  {
    name: 'XTREME',
    slug: 'xtreme',
    image: '/categories/xtreme.jpg',
    description: 'Built for the extreme',
  },
];

export function CategoryBanner() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-red text-sm tracking-wider uppercase">Collections</span>
          <h2 className="font-[family-name:var(--font-bebas)] text-5xl sm:text-6xl text-cream tracking-wider mt-2">
            SHOP BY CATEGORY
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              href={`/shop/${category.slug}`}
              className="group relative aspect-[3/4] overflow-hidden opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-red/30 to-dark-gray">
                <div className="absolute inset-0 bg-cream/5" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <h3 className="font-[family-name:var(--font-bebas)] text-6xl text-cream tracking-wider group-hover:scale-110 transition-transform">
                  {category.name}
                </h3>
                <p className="text-cream/60 mt-2 group-hover:text-cream/80 transition-colors">
                  {category.description}
                </p>
                <span className="mt-6 px-6 py-2 glass-light text-cream text-sm tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                  EXPLORE
                </span>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-red/0 group-hover:bg-red/10 transition-colors" />

              {/* Border effect */}
              <div className="absolute inset-4 border border-cream/0 group-hover:border-cream/20 transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

