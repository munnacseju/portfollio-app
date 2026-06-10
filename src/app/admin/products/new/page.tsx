'use client';

import { useState, useEffect } from 'react';
import { createProduct } from '@/app/admin/actions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewProductPage() {
  const [loading, setLoading] = useState(false);
  const [videoLink, setVideoLink] = useState('');
  const [videoStatus, setVideoStatus] = useState<'idle' | 'loading' | 'valid' | 'invalid'>('idle');
  const router = useRouter();

  const validateVideoLink = (url: string) => {
    if (!url) {
      setVideoStatus('idle');
      return;
    }
    setVideoStatus('loading');
    
    // Simulate brief validation delay for UX
    setTimeout(() => {
      const isYouTube = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/.test(url);
      const isFacebook = url.includes('facebook.com');
      
      if (isYouTube || isFacebook) {
        setVideoStatus('valid');
      } else {
        setVideoStatus('invalid');
      }
    }, 500);
  };

  useEffect(() => {
    const timer = setTimeout(() => validateVideoLink(videoLink), 300);
    return () => clearTimeout(timer);
  }, [videoLink]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (videoStatus === 'invalid') {
      alert('Please provide a valid video link or remove it.');
      return;
    }
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

        <div className="md:col-span-2 space-y-4 pt-4 border-t border-zinc-800">
          <h3 className="text-sm font-black uppercase tracking-widest text-white">Product Video</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Option 1: Upload File</label>
              <input name="video" type="file" accept="video/*" className="w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-800 file:text-white hover:file:bg-zinc-700" />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Option 2: Social Link</label>
              <div className="relative">
                <input 
                  name="videoLink" 
                  value={videoLink}
                  onChange={(e) => setVideoLink(e.target.value)}
                  className={`w-full p-3 bg-zinc-800 border ${videoStatus === 'invalid' ? 'border-red-500' : 'border-zinc-700'} rounded-lg focus:border-white outline-none text-sm pr-10`} 
                  placeholder="YouTube or Facebook link" 
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {videoStatus === 'loading' && (
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  )}
                  {videoStatus === 'valid' && (
                    <span className="text-green-500 text-lg">✓</span>
                  )}
                  {videoStatus === 'invalid' && (
                    <span className="text-red-500 text-lg">⚠</span>
                  )}
                </div>
              </div>
              {videoStatus === 'invalid' && (
                <p className="text-[10px] text-red-500 mt-1">Invalid video link. Please check the URL.</p>
              )}
            </div>
          </div>
          <p className="text-[10px] text-zinc-600">Tip: Social links are recommended for faster loading. Link will take priority if both are provided.</p>
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
