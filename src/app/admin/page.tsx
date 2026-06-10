import { getProducts, getOrders, logoutAdmin } from './actions';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function AdminDashboard() {
  const [products, orders] = await Promise.all([
    getProducts(),
    getOrders()
  ]);

  async function handleLogout() {
    'use server';
    await logoutAdmin();
    redirect('/admin/login');
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter">Shopno Buni Admin</h1>
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

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 border-l-4 border-white pl-4">Products Inventory</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.length === 0 ? (
            <p className="text-zinc-500">No products found.</p>
          ) : (
            products.map((product) => (
              <div key={product.id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden group">
                <div className="aspect-square bg-zinc-800 relative">
                  {product.images?.[0] ? (
                    <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-600 uppercase text-xs">No Image</div>
                  )}
                  <Link 
                    href={`/admin/products/edit/${product.id}`}
                    className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="bg-white text-black px-4 py-2 rounded-full font-bold text-sm">Edit Product</span>
                  </Link>
                </div>
                <div className="p-4">
                  <h3 className="font-bold truncate mb-1">{product.title}</h3>
                  <p className="text-white font-bold text-sm">BDT {product.price}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-8 border-l-4 border-white pl-4">Recent Orders</h2>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="p-4 text-sm font-bold text-zinc-400">Order ID</th>
                <th className="p-4 text-sm font-bold text-zinc-400">Product</th>
                <th className="p-4 text-sm font-bold text-zinc-400">Customer</th>
                <th className="p-4 text-sm font-bold text-zinc-400">Phone</th>
                <th className="p-4 text-sm font-bold text-zinc-400">Address</th>
                <th className="p-4 text-sm font-bold text-zinc-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-zinc-500 italic">No orders received yet.</td>
                </tr>
              ) : (
                orders.map((order: any) => (
                  <tr key={order.id} className="border-b border-zinc-800 hover:bg-zinc-800/50 transition">
                    <td className="p-4 text-sm font-mono text-zinc-500">...{order.id.slice(-6)}</td>
                    <td className="p-4 text-sm font-bold">{order.products?.title}</td>
                    <td className="p-4 text-sm">{order.customer_name}</td>
                    <td className="p-4 text-sm">{order.phone}</td>
                    <td className="p-4 text-sm max-w-xs truncate">{order.address}</td>
                    <td className="p-4 text-sm uppercase">
                      <span className="bg-zinc-800 px-2 py-1 rounded text-[10px] font-bold tracking-widest">{order.status}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
