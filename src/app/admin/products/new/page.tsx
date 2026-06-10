'use client';

import { useState } from 'react';
import { createProduct } from '../../actions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewProductPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    try {
      await createProduct(formData);
      router.push('/admin');
    } catch (error) {
      console.error(error);
      alert('Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Add New Jewelry</h1>
        <Link href="/admin" className="text-zinc-400 hover:text-white">Cancel</Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-zinc-900 p-8 rounded-xl border border-zinc-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-zinc-400 mb-2">Product Title</label>
            <input name="title" required className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:border-white outline-none" placeholder="e.g. Diamond Necklace" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-zinc-400 mb-2">Category</label>
            <select name="category" required className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:border-white outline-none">
              <option value="Churi">Churi</option>
              <option value="Golar Har">Golar Har</option>
              <option value="Ear Ring">Ear Ring</option>
              <option value="Finger Ring">Finger Ring</option>
              <option value="Payel">Payel</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-zinc-400 mb-4">Product Tags</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { id: 'isTopSeller', label: 'Top Seller' },
                { id: 'isNew', label: 'New Product' },
                { id: 'isPopular', label: 'Popular' },
                { id: 'isEidCollection', label: 'Eid Collection' },
                { id: 'isBoishakhiCollection', label: 'Boishakhi Collection' },
              ].map(tag => (
                <label key={tag.id} className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" name={tag.id} value="true" className="w-5 h-5 bg-zinc-800 border-zinc-700 rounded focus:ring-0 text-white" />
                  <span className="text-sm text-zinc-400 group-hover:text-white transition">{tag.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-zinc-400 mb-2">Description</label>
            <textarea name="description" rows={4} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:border-white outline-none" placeholder="Product details..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Price (BDT)</label>
            <input name="price" type="number" step="0.01" required className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:border-white outline-none" placeholder="0.00" />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Discount (%)</label>
            <input name="discount" type="number" step="0.01" className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:border-white outline-none" placeholder="0" defaultValue="0" />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Images (Select Multiple)</label>
            <input name="images" type="file" multiple accept="image/*" className="w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-800 file:text-white hover:file:bg-zinc-700" />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Video File Upload</label>
            <input name="video" type="file" accept="video/*" className="w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-800 file:text-white hover:file:bg-zinc-700" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-zinc-400 mb-2">Social Video Link (YouTube / Facebook)</label>
            <input name="videoLink" className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:border-white outline-none" placeholder="Paste link here (e.g. https://www.youtube.com/watch?v=...)" />
            <p className="text-[10px] text-zinc-500 mt-1">If both file and link are provided, the link will be used.</p>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-4 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition disabled:opacity-50"
        >
          {loading ? 'Uploading & Creating...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
}
