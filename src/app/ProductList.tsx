'use client';

import { useState } from 'react';
import { OrderModal } from './OrderModal';
import { MediaModal } from './MediaModal';

export const ProductList = ({ products }: { products: any[] }) => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [mediaView, setMediaView] = useState<{ type: 'video' | 'photo', data: any, title: string } | null>(null);
  const categories = ['Churi', 'Golar Har', 'Ear Ring', 'Finger Ring', 'Payel', 'Others'];

  return (
    <>
      <div className="space-y-32">
        {categories.map(cat => {
          const catProducts = products.filter(p => p.category === cat);
          if (catProducts.length === 0) return null;

          return (
            <div key={cat}>
              <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
                <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter whitespace-nowrap">{cat}</h3>
                <div className="h-[1px] md:h-[2px] bg-zinc-900 flex-grow"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {catProducts.map((product) => (
                  <div key={product.id} className="group cursor-pointer">
                    <div className="aspect-[4/5] bg-zinc-900 rounded-2xl overflow-hidden mb-4 md:mb-6 relative border border-zinc-800 group-hover:border-zinc-500 transition-colors shadow-2xl">
                      {product.images?.[0] ? (
                        <img 
                          src={product.images[0]} 
                          alt={product.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-700 font-bold uppercase tracking-widest text-[10px] md:text-xs">
                          {cat}
                        </div>
                      )}
                      {product.discount > 0 && (
                        <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-white text-black text-[8px] md:text-[10px] px-2 py-1 rounded-full font-black uppercase shadow-xl z-10">
                          -{product.discount}% OFF
                        </div>
                      )}
                      
                      <div className="absolute top-3 right-3 md:top-4 md:right-4 flex flex-col gap-1.5 items-end z-10">
                        {product.tags?.isTopSeller && (
                          <span className="bg-yellow-500 text-black text-[7px] md:text-[8px] px-2 py-0.5 md:py-1 rounded-full font-black uppercase shadow-lg">Top Seller</span>
                        )}
                        {product.tags?.isNew && (
                          <span className="bg-blue-500 text-white text-[7px] md:text-[8px] px-2 py-0.5 md:py-1 rounded-full font-black uppercase shadow-lg">New</span>
                        )}
                        {product.tags?.isPopular && (
                          <span className="bg-pink-500 text-white text-[7px] md:text-[8px] px-2 py-0.5 md:py-1 rounded-full font-black uppercase shadow-lg">Popular</span>
                        )}
                        {product.tags?.isEidCollection && (
                          <span className="bg-green-600 text-white text-[7px] md:text-[8px] px-2 py-0.5 md:py-1 rounded-full font-black uppercase shadow-lg">Eid</span>
                        )}
                        {product.tags?.isBoishakhiCollection && (
                          <span className="bg-orange-500 text-white text-[7px] md:text-[8px] px-2 py-0.5 md:py-1 rounded-full font-black uppercase shadow-lg">Boishakhi</span>
                        )}
                      </div>
                      <div className="absolute inset-0 bg-black/40 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 md:p-6 gap-3">
                        <button 
                          onClick={() => setSelectedProduct(product)}
                          className="w-full py-3 md:py-4 bg-white text-black font-black uppercase tracking-widest text-xs md:text-sm rounded-xl transform translate-y-0 md:translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl"
                        >
                          Order Now
                        </button>
                        
                        <div className="flex w-full gap-2 transform translate-y-0 md:translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                          {product.images?.length > 0 && (
                            <button 
                              onClick={() => setMediaView({ type: 'photo', data: product.images, title: product.title })}
                              className="flex-grow py-2 bg-zinc-900/80 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-zinc-800 border border-zinc-700 transition"
                            >
                              See Photos
                            </button>
                          )}
                          {product.video && (
                            <button 
                              onClick={() => setMediaView({ type: 'video', data: product.video, title: product.title })}
                              className="flex-grow py-2 bg-zinc-900/80 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-zinc-800 border border-zinc-700 transition"
                            >
                              See Video
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-bold mb-1 group-hover:underline underline-offset-4">{product.title}</h4>
                      <p className="text-zinc-500 text-xs md:text-sm mb-3 md:mb-4 line-clamp-1">{product.description}</p>
                      <div className="flex items-center gap-2 md:gap-3">
                        <span className="text-lg md:text-xl font-black">BDT {product.price}</span>
                        {product.discount > 0 && (
                          <span className="text-zinc-600 line-through text-xs">
                            BDT {(product.price * (1 + product.discount / 100)).toFixed(0)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {selectedProduct && (
        <OrderModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}

      {mediaView && (
        <MediaModal 
          type={mediaView.type}
          data={mediaView.data}
          title={mediaView.title}
          onClose={() => setMediaView(null)}
        />
      )}
    </>
  );
};
