import { getProducts, logoutAdmin } from './actions';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function AdminDashboard() {
  const products = await getProducts();

  async function handleLogout() {
    'use server';
    await logoutAdmin();
    redirect('/admin/login');
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold">Shopno Buni Admin</h1>
        <div className="flex gap-4">
          <Link href="/admin/products/new" className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition">
            Add Product
          </Link>
          <form action={handleLogout}>
            <button className="px-6 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition">
              Logout
            </button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <div className="col-span-full p-12 bg-zinc-900 border border-zinc-800 rounded-xl text-center">
            <p className="text-zinc-500 mb-4">No products found.</p>
            <Link href="/admin/products/new" className="text-white underline">Create your first product</Link>
          </div>
        ) : (
          products.map((product) => (
            <div key={product.id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
              <div className="aspect-square bg-zinc-800 relative">
                {product.images?.[0] ? (
                  <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-600">No Image</div>
                )}
                {product.discount > 0 && (
                  <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded font-bold">
                    -{product.discount}%
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{product.title}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-white font-bold">BDT {product.price}</span>
                  {product.discount > 0 && (
                    <span className="text-zinc-500 line-through text-sm">
                      BDT {(product.price * (1 + product.discount / 100)).toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="flex justify-between">
                   {/* We could add edit/delete here later */}
                   <span className="text-xs text-zinc-500">ID: ...{product.id.slice(-6)}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
