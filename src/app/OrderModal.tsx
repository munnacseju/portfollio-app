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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-2 md:p-4 overflow-y-auto">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl my-auto">
        <div className="p-4 md:p-6 border-b border-zinc-800 flex justify-between items-center">
          <h3 className="text-lg md:text-xl font-bold tracking-tight">Order {product.title}</h3>
          <button onClick={onClose} className="text-zinc-500 hover:text-white p-2">✕</button>
        </div>

        <div className="p-4 md:p-6">
          {success ? (
            <div className="text-center py-6 md:py-8">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-xl md:text-2xl">✓</div>
              <h4 className="text-lg md:text-xl font-bold mb-2">Order Placed!</h4>
              <p className="text-zinc-400 text-xs md:text-sm">We will contact you shortly to confirm your delivery.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
              <div>
                <label className="block text-[10px] md:text-xs font-bold text-zinc-500 uppercase mb-1 md:mb-2">Your Name</label>
                <input name="name" required className="w-full bg-zinc-800 border border-zinc-700 p-2 md:p-3 text-sm rounded-lg focus:border-white outline-none transition" placeholder="Enter your full name" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label className="block text-[10px] md:text-xs font-bold text-zinc-500 uppercase mb-1 md:mb-2">Phone Number</label>
                  <input name="phone" type="tel" required className="w-full bg-zinc-800 border border-zinc-700 p-2 md:p-3 text-sm rounded-lg focus:border-white outline-none transition" placeholder="017XXXXXXXX" />
                </div>
                <div>
                  <label className="block text-[10px] md:text-xs font-bold text-zinc-500 uppercase mb-1 md:mb-2">Quantity</label>
                  <input name="quantity" type="number" required min="1" defaultValue="1" className="w-full bg-zinc-800 border border-zinc-700 p-2 md:p-3 text-sm rounded-lg focus:border-white outline-none transition" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] md:text-xs font-bold text-zinc-500 uppercase mb-1 md:mb-2">Delivery Address</label>
                <textarea name="address" required rows={2} className="w-full bg-zinc-800 border border-zinc-700 p-2 md:p-3 text-sm rounded-lg focus:border-white outline-none transition" placeholder="Enter shipping address" />
              </div>
              <div>
                <label className="block text-[10px] md:text-xs font-bold text-zinc-500 uppercase mb-1 md:mb-2">Special Notes</label>
                <textarea name="notes" rows={2} className="w-full bg-zinc-800 border border-zinc-700 p-2 md:p-3 text-sm rounded-lg focus:border-white outline-none transition" placeholder="Any special requests?" />
              </div>
              <div className="pt-2 md:pt-4">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-3 md:py-4 bg-white text-black font-black uppercase tracking-widest text-xs md:text-sm rounded-lg hover:bg-zinc-200 transition disabled:opacity-50"
                >
                  {loading ? 'Processing...' : `Confirm Order`}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
