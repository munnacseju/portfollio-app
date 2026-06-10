# Shopno Buni E-commerce Management Guide

This project has been transformed into a jewelry e-commerce platform.

## 1. Storefront
The home page (`/`) displays your jewelry collection. It automatically fetches products from the database.

## 2. Admin Portal (`/admin`)
You can manage your inventory through the admin portal.

- **Login**: Access `/admin/login`.
- **Secret Key**: Use the `ADMIN_SECRET` defined in your `.env.local` to log in.
- **Adding Products**: Go to `/admin/products/new` to add a new piece of jewelry.
  - You can upload multiple images.
  - You can attach a video.
  - Set price and discount (in percentage).

## 3. Database & Storage
- **Database**: Product metadata is stored in the `products` table in Supabase.
- **Storage**: Media (images/videos) are uploaded to the `products-media` bucket in Supabase.
  - The application automatically ensures the bucket exists and is public.

## 4. Environment Variables
Ensure these are set in your deployment environment:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (Required for uploads and admin bypass)
- `ADMIN_SECRET` (Password for the admin portal)

## 5. Deployment
When deploying to Vercel:
1. Add all environment variables.
2. The middleware will protect your `/admin` route automatically.
3. Media will be served directly from Supabase Storage.
