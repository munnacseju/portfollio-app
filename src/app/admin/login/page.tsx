'use client';

import { useState } from 'react';
import { loginAdmin } from '../actions';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [secret, setSecret] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await loginAdmin(secret);
    if (success) {
      router.push('/admin');
    } else {
      setError('Invalid Admin Secret');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="max-w-md w-full p-8 bg-zinc-900 rounded-xl border border-zinc-800">
        <h1 className="text-2xl font-bold mb-6 text-center">Shopno Buni Admin</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Admin Secret</label>
            <input 
              type="password"
              required
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-white text-white"
              placeholder="Enter secret key"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
