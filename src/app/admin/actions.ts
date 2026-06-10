'use server';

import { supabaseAdmin } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

const BUCKET_NAME = 'products-media';

async function ensureBucketExists() {
  const { data: buckets } = await supabaseAdmin.storage.listBuckets();
  const exists = buckets?.some(b => b.name === BUCKET_NAME);
  
  if (!exists) {
    await supabaseAdmin.storage.createBucket(BUCKET_NAME, {
      public: true,
      allowedMimeTypes: ['image/*', 'video/*'],
      fileSizeLimit: 52428800 // 50MB
    });
  }
}

export async function uploadMedia(files: File[]) {
  await ensureBucketExists();
  const urls: string[] = [];

  for (const file of files) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .upload(filePath, file);

    if (error) {
      console.error('Upload error:', error);
      continue;
    }

    const { data } = supabaseAdmin.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    if (data?.publicUrl) {
      urls.push(data.publicUrl);
    }
  }

  return urls;
}

export async function createProduct(formData: FormData) {
  const adminSecret = (await cookies()).get('admin_secret')?.value;
  if (adminSecret !== process.env.ADMIN_SECRET) {
    throw new Error('Unauthorized');
  }

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const category = formData.get('category') as string;
  const price = parseFloat(formData.get('price') as string);
  const discount = parseFloat(formData.get('discount') as string) || 0;
  
  const imageFiles = formData.getAll('images') as File[];
  const videoFile = formData.get('video') as File;

  let imageUrls: string[] = [];
  if (imageFiles.length > 0 && imageFiles[0].size > 0) {
    imageUrls = await uploadMedia(imageFiles);
  }

  let videoUrl = '';
  if (videoFile && videoFile.size > 0) {
    const uploadedVideos = await uploadMedia([videoFile]);
    videoUrl = uploadedVideos[0] || '';
  }

  const { error } = await supabaseAdmin
    .from('products')
    .insert([{
      title,
      description,
      category,
      price,
      discount,
      images: imageUrls,
      video: videoUrl
    }]);

  if (error) {
    console.error('Product creation error:', error);
    throw new Error('Failed to create product');
  }

  revalidatePath('/');
  revalidatePath('/admin');
}

export async function getProducts() {
  const { data, error } = await supabaseAdmin
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Fetch products error:', error);
    return [];
  }

  return data;
}

export async function deleteProduct(id: string) {
  const adminSecret = (await cookies()).get('admin_secret')?.value;
  if (adminSecret !== process.env.ADMIN_SECRET) {
    throw new Error('Unauthorized');
  }

  const { error } = await supabaseAdmin
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw new Error('Failed to delete product');

  revalidatePath('/');
  revalidatePath('/admin');
}

export async function loginAdmin(secret: string) {
  if (secret === process.env.ADMIN_SECRET) {
    (await cookies()).set('admin_secret', secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 1 day
    });
    return true;
  }
  return false;
}

export async function logoutAdmin() {
  (await cookies()).delete('admin_secret');
}

export async function updateProduct(id: string, formData: FormData) {
  const adminSecret = (await cookies()).get('admin_secret')?.value;
  if (adminSecret !== process.env.ADMIN_SECRET) {
    throw new Error('Unauthorized');
  }

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const category = formData.get('category') as string;
  const price = parseFloat(formData.get('price') as string);
  const discount = parseFloat(formData.get('discount') as string) || 0;
  
  const imageFiles = formData.getAll('images') as File[];
  const videoFile = formData.get('video') as File;
  const existingImages = JSON.parse(formData.get('existingImages') as string || '[]');

  let imageUrls = [...existingImages];
  if (imageFiles.length > 0 && imageFiles[0].size > 0) {
    const uploadedImages = await uploadMedia(imageFiles);
    imageUrls = [...imageUrls, ...uploadedImages];
  }

  let videoUrl = formData.get('existingVideo') as string || '';
  if (videoFile && videoFile.size > 0) {
    const uploadedVideos = await uploadMedia([videoFile]);
    videoUrl = uploadedVideos[0] || '';
  }

  const { error } = await supabaseAdmin
    .from('products')
    .update({
      title,
      description,
      category,
      price,
      discount,
      images: imageUrls,
      video: videoUrl
    })
    .eq('id', id);

  if (error) {
    console.error('Product update error:', error);
    throw new Error('Failed to update product');
  }

  revalidatePath('/');
  revalidatePath('/admin');
}

export async function getProductById(id: string) {
  const { data, error } = await supabaseAdmin
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Fetch product error:', error);
    return null;
  }

  return data;
}

export async function createOrder(formData: FormData) {
  const productId = formData.get('productId') as string;
  const customerName = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const address = formData.get('address') as string;
  const quantity = parseInt(formData.get('quantity') as string) || 1;
  const notes = formData.get('notes') as string;

  const { error } = await supabaseAdmin
    .from('orders')
    .insert([{
      product_id: productId,
      customer_name: customerName,
      phone,
      address,
      quantity,
      notes
    }]);

  if (error) {
    console.error('Order creation error:', error);
    throw new Error('Failed to place order');
  }

  revalidatePath('/admin');
}

export async function getOrders() {
  const adminSecret = (await cookies()).get('admin_secret')?.value;
  if (adminSecret !== process.env.ADMIN_SECRET) {
    throw new Error('Unauthorized');
  }

  const { data, error } = await supabaseAdmin
    .from('orders')
    .select('*, products(title, price, category)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Fetch orders error:', error);
    return [];
  }

  return data;
}
