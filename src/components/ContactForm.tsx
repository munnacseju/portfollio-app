'use client';

import { useState } from 'react';

export const ContactForm = () => {
  const [messages, setMessages] = useState<{ name: string; message: string; date: string }[]>([]);
  const [formData, setFormData] = useState({ name: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    
    const newMessage = {
      ...formData,
      date: new Date().toLocaleTimeString()
    };
    
    setMessages([newMessage, ...messages]);
    setFormData({ name: '', message: '' });
  };

  return (
    <section id="contact" className="py-16 pb-32">
      <h3 className="text-3xl font-bold mb-8 border-b border-zinc-800 pb-2">Contact</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-white transition"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Message</label>
            <textarea 
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-white transition"
              placeholder="Your Message"
            />
          </div>
          <button type="submit" className="w-full py-3 bg-white text-black rounded-lg font-bold hover:bg-zinc-200 transition">
            Send Message
          </button>
        </form>

        <div className="space-y-6">
          <h4 className="text-xl font-bold">Recent Messages (Client-side Only)</h4>
          <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
            {messages.length === 0 ? (
              <p className="text-zinc-500 italic">No messages yet. Send one to see it appear here!</p>
            ) : (
              messages.map((m, i) => (
                <div key={i} className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-zinc-300">{m.name}</span>
                    <span className="text-xs text-zinc-500">{m.date}</span>
                  </div>
                  <p className="text-sm text-zinc-400">{m.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
