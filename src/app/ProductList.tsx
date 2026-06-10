'use client';

import { useState } from 'react';
import { OrderModal } from './OrderModal';

export const ProductList = ({ products }: { products: any[] }) => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map((product) => (
          <div key={product.id} className="group cursor-pointer">
            <div className="aspect-[4/5] bg-zinc-900 rounded-2xl overflow-hidden mb-6 relative border border-zinc-800 group-hover:border-zinc-500 transition-colors">
              {product.images?.[0] ? (
                <img 
                  src={product.images[0]} 
                  alt={product.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-700 font-bold uppercase tracking-widest">
                  Jewelry
                </div>
              )}
              {product.discount > 0 && (
                <div className="absolute top-4 left-4 bg-white text-black text-xs px-3 py-1 rounded-full font-black uppercase shadow-xl">
                  -{product.discount}% OFF
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6">
                <button 
                  onClick={() => setSelectedProduct(product)}
                  className="w-full py-4 bg-white text-black font-black uppercase tracking-widest rounded-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                >
                  Order Now
                </button>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-1 group-hover:underline underline-offset-4">{product.title}</h4>
              <p className="text-zinc-500 text-sm mb-4 line-clamp-1">{product.description}</p>
              <div className="flex items-center gap-3">
                <span className="text-xl font-black">BDT {product.price}</span>
                {product.discount > 0 && (
                  <span className="text-zinc-600 line-through text-sm">
                    BDT {(product.price * (1 + product.discount / 100)).toFixed(0)}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <OrderModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </>
  );
};
