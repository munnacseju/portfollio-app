'use client';

import { useState } from 'react';
import { createOrder } from '@/app/admin/actions';

export const OrderModal = ({ product, onClose }: { product: any, onClose: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    formData.append('productId', product.id);

    try {
      await createOrder(formData);
      setSuccess(true);
      setTimeout(onClose, 3000);
    } catch (error) {
      console.error(error);
      alert('Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
          <h3 className="text-xl font-bold tracking-tight">Order {product.title}</h3>
          <button onClick={onClose} className="text-zinc-500 hover:text-white">✕</button>
        </div>

        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
              <h4 className="text-xl font-bold mb-2">Order Placed!</h4>
              <p className="text-zinc-400 text-sm">We will contact you shortly to confirm your delivery.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Your Name</label>
                <input name="name" required className="w-full bg-zinc-800 border border-zinc-700 p-3 rounded-lg focus:border-white outline-none transition" placeholder="Enter your full name" />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Phone Number</label>
                <input name="phone" type="tel" required className="w-full bg-zinc-800 border border-zinc-700 p-3 rounded-lg focus:border-white outline-none transition" placeholder="e.g. 017XXXXXXXX" />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Delivery Address</label>
                <textarea name="address" required rows={3} className="w-full bg-zinc-800 border border-zinc-700 p-3 rounded-lg focus:border-white outline-none transition" placeholder="Enter your full shipping address" />
              </div>
              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-4 bg-white text-black font-black uppercase tracking-widest rounded-lg hover:bg-zinc-200 transition disabled:opacity-50"
                >
                  {loading ? 'Processing...' : `Confirm Order - BDT ${product.price}`}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
