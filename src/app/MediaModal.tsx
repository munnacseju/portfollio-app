'use client';

import { useState } from 'react';
import { VideoPlayer } from './VideoPlayer';

export const MediaModal = ({ 
  type, 
  data, 
  title, 
  onClose 
}: { 
  type: 'video' | 'photo', 
  data: string | string[], 
  title: string,
  onClose: () => void 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = Array.isArray(data) ? data : [];

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-[110] flex items-center justify-center p-4 md:p-10">
      <button 
        onClick={onClose} 
        className="absolute top-6 right-6 text-white hover:text-zinc-400 z-[120] p-2 bg-zinc-900/50 rounded-full"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="w-full max-w-5xl h-full flex flex-col items-center justify-center">
        <h3 className="text-white text-lg md:text-2xl font-bold mb-6 tracking-tight">{title}</h3>
        
        <div className="w-full relative flex-grow flex items-center justify-center min-h-0">
          {type === 'video' ? (
            <div className="w-full max-w-4xl">
              <VideoPlayer url={data as string} />
            </div>
          ) : (
            <>
              {images.length > 0 && (
                <div className="relative h-full w-full flex items-center justify-center">
                  <img 
                    src={images[currentImageIndex]} 
                    alt={`${title} view ${currentImageIndex + 1}`}
                    className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
                  />
                  
                  {images.length > 1 && (
                    <>
                      <button 
                        onClick={() => setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                        className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition"
                      >
                        ←
                      </button>
                      <button 
                        onClick={() => setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                        className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition"
                      >
                        →
                      </button>
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {type === 'photo' && images.length > 1 && (
          <div className="flex gap-2 mt-6 overflow-x-auto p-2 max-w-full">
            {images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-16 h-16 rounded-md overflow-hidden border-2 flex-shrink-0 transition ${idx === currentImageIndex ? 'border-white scale-110' : 'border-transparent opacity-50'}`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
