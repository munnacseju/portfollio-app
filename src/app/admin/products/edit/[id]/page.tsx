'use client';

import { useState, useEffect } from 'react';
import { updateProduct, getProductById } from '@/app/admin/actions';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function EditProductPage() {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    getProductById(id).then(setProduct);
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    formData.append('existingImages', JSON.stringify(product.images || []));
    formData.append('existingVideo', product.video || '');

    try {
      await updateProduct(id, formData);
      router.push('/admin');
    } catch (error) {
      console.error(error);
      alert('Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <div className="p-8 text-center text-zinc-500">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Edit Jewelry</h1>
        <Link href="/admin" className="text-zinc-400 hover:text-white">Cancel</Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-zinc-900 p-8 rounded-xl border border-zinc-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-zinc-400 mb-2">Product Title</label>
            <input 
              name="title" 
              required 
              defaultValue={product.title}
              className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:border-white outline-none" 
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-zinc-400 mb-2">Category</label>
            <select name="category" required defaultValue={product.category} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:border-white outline-none">
              <option value="Churi">Churi</option>
              <option value="Golar Har">Golar Har</option>
              <option value="Ear Ring">Ear Ring</option>
              <option value="Finger Ring">Finger Ring</option>
              <option value="Payel">Payel</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-zinc-400 mb-2">Description</label>
            <textarea 
              name="description" 
              rows={4} 
              defaultValue={product.description}
              className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:border-white outline-none" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Price (BDT)</label>
            <input 
              name="price" 
              type="number" 
              step="0.01" 
              required 
              defaultValue={product.price}
              className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:border-white outline-none" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Discount (%)</label>
            <input 
              name="discount" 
              type="number" 
              step="0.01" 
              defaultValue={product.discount}
              className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:border-white outline-none" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Add New Images</label>
            <input 
              name="images" 
              type="file" 
              multiple 
              accept="image/*" 
              className="w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-800 file:text-white hover:file:bg-zinc-700" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Update Video</label>
            <input 
              name="video" 
              type="file" 
              accept="video/*" 
              className="w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-800 file:text-white hover:file:bg-zinc-700" 
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-4 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition disabled:opacity-50"
        >
          {loading ? 'Updating...' : 'Update Product'}
        </button>
      </form>
    </div>
  );
}
