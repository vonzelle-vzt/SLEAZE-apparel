'use client';

import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image/Video Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-gray via-dark-gray to-red/20">
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-5" />
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cream/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
        <div className="opacity-0 animate-fade-in-up">
          <span className="inline-block px-4 py-2 glass-red rounded-full text-sm text-cream/80 tracking-wider mb-6">
            Clothing and Apparel
          </span>
        </div>

        <h1 
          className="opacity-0 animate-fade-in-up stagger-1 font-[family-name:var(--font-bebas)] text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] leading-none text-cream sleaze-text-hero"
          data-text="SLEAZE"
        >
          SLEAZE
        </h1>

        <p className="opacity-0 animate-fade-in-up stagger-2 mt-4 text-xl sm:text-2xl text-cream/60 max-w-xl tracking-wide">
          Where Fashion Meets Community and Culture
        </p>

        <div className="opacity-0 animate-fade-in-up stagger-3 flex flex-col sm:flex-row gap-4 mt-10">
          <Link
            href="/shop"
            className="px-10 py-4 bg-red text-cream font-[family-name:var(--font-bebas)] text-xl tracking-wider hover:bg-red/80 transition-all hover-glow"
          >
            SHOP NOW
          </Link>
          <Link
            href="/shop/new"
            className="px-10 py-4 glass-light text-cream font-[family-name:var(--font-bebas)] text-xl tracking-wider hover:bg-cream/10 transition-all"
          >
            NEW ARRIVALS
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/40 hover:text-cream transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={32} />
      </button>

      {/* Side text */}
      <div className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
        <span className="text-cream/20 tracking-[0.5em] text-sm">LIVE LIFE</span>
      </div>
      <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 rotate-90 origin-center">
        <span className="text-cream/20 tracking-[0.5em] text-sm">URBAN CULTURE</span>
      </div>
    </section>
  );
}

