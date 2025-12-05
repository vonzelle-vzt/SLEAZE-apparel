'use client';

import { Play } from 'lucide-react';
import { useState } from 'react';

type VideoSectionProps = {
  videoUrl?: string;
  thumbnailUrl?: string;
};

export function VideoSection({ 
  videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  thumbnailUrl 
}: VideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-red text-sm tracking-wider uppercase">Watch</span>
          <h2 className="font-[family-name:var(--font-bebas)] text-5xl sm:text-6xl text-cream mt-2">
            THE <span className="sleaze-text text-red" data-text="SLEAZE">SLEAZE</span> LIFESTYLE
          </h2>
          <p className="text-cream/60 mt-4 max-w-xl mx-auto">
            Pushing boundaries. Breaking limits. Living on the edge.
          </p>
        </div>

        <div className="relative aspect-video glass rounded-lg overflow-hidden group">
          {!isPlaying ? (
            <>
              {/* Thumbnail/Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-red/20 to-dark-gray flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('/video-thumb.jpg')] bg-cover bg-center opacity-50" />
              </div>
              
              {/* Play button */}
              <button
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 flex items-center justify-center z-10"
                aria-label="Play video"
              >
                <div className="w-24 h-24 rounded-full bg-red/90 flex items-center justify-center group-hover:scale-110 transition-transform animate-pulse-glow">
                  <Play size={40} className="text-cream ml-2" fill="currentColor" />
                </div>
              </button>

              {/* Corner decorations */}
              <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-cream/20" />
              <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-cream/20" />
              <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-cream/20" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-cream/20" />
            </>
          ) : (
            <iframe
              src={`${videoUrl}?autoplay=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          )}
        </div>
      </div>
    </section>
  );
}

