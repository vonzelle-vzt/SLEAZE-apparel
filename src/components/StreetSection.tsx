'use client';

import Image from 'next/image';

const streetImages = [
  {
    src: "https://images.unsplash.com/photo-1601935111741-ae98b2b230b0?w=800&q=80",
    alt: "Urban street style",
    text: "SLEAZE"
  },
  {
    src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    alt: "Hip hop artist performing",
    text: "LIVE RAW"
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    alt: "Beach vibes",
    text: "NO LIMITS"
  },
  {
    src: "https://images.unsplash.com/photo-1621544402532-78c290378588?w=800&q=80",
    alt: "Skateboarder doing trick",
    text: "SEND IT"
  },
];

export function StreetSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {streetImages.map((image, index) => (
            <div 
              key={index}
              className="relative aspect-[4/3] overflow-hidden group cursor-pointer bg-dark-gray"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="sleaze-street-text font-[family-name:var(--font-bebas)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                  {image.text}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

