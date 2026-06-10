'use server';

import { supabaseAdmin } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function submitMessage(formData: { name: string; message: string }) {
  console.log('Attempting to submit message. Supabase URL present:', !!process.env.SUPABASE_URL);
  if (!formData.name || !formData.message) {
    throw new Error('Name and message are required');
  }

  const { error } = await supabaseAdmin
    .from('messages')
    .insert([
      { name: formData.name, message: formData.message }
    ]);

  if (error) {
    console.error('Detailed Submission Error:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code
    });
    throw new Error(`Supabase Error: ${error.message}`);
  }
  
  revalidatePath('/');
}

export async function getMessages() {
  try {
    const { data, error } = await supabaseAdmin
      .from('messages')
      .select('name, message, created_at')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw error;
    
    // Map created_at to date for compatibility with the component
    return data.map(m => ({
      ...m,
      date: m.created_at
    }));
  } catch (e) {
    console.error('Fetch error:', e);
    return [];
  }
}
