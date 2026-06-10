import { getProducts } from './admin/actions';
import Link from 'next/link';
import { ProductList } from './ProductList';

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-zinc-800 p-6 flex justify-between items-center sticky top-0 bg-black/80 backdrop-blur-md z-50">
        <h1 className="text-2xl font-bold tracking-tighter">SHOPNO BUNI</h1>
        <div className="flex gap-8 text-sm font-medium text-zinc-400">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="#collections" className="hover:text-white transition">Collections</Link>
          <Link href="/admin" className="hover:text-white transition">Admin</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-24 px-6 text-center border-b border-zinc-800">
        <h2 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter">আমাদের স্বপ্নবুনি - Amader Shopnobuni 
s</h2>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-12">
          Discover our exclusive collection of fine jewelry, where every piece tells a story of dreams and artistry.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="#collections" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition">
            Explore Collection
          </Link>
        </div>
      </section>

      {/* Collections / Products Grid */}
      <section id="collections" className="py-24 px-6 max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold mb-12 border-l-4 border-white pl-4">Latest Arrivals</h3>
        
        {products.length === 0 ? (
          <div className="py-20 text-center bg-zinc-900 rounded-2xl border border-zinc-800">
            <p className="text-zinc-500 italic text-lg">New collection coming soon. Stay tuned!</p>
          </div>
        ) : (
          <ProductList products={products} />
        )}
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-zinc-800 bg-zinc-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h5 className="font-bold text-lg mb-6 uppercase tracking-widest">Shopno Buni</h5>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Exquisite jewelry for every occasion. Our pieces are crafted with passion and precision to bring your dreams to life.
            </p>
          </div>
          <div>
            <h5 className="font-bold text-lg mb-6 uppercase tracking-widest">Quick Links</h5>
            <ul className="space-y-3 text-zinc-500 text-sm">
              <li><Link href="#" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition">Shipping Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-lg mb-6 uppercase tracking-widest">Connect</h5>
            <ul className="space-y-3 text-zinc-500 text-sm">
              <li><a href="#" className="hover:text-white transition">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition">Facebook</a></li>
              <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-zinc-900 text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} Shopno Buni Jewelry. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
