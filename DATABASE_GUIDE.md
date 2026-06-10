# Database Configuration & Management Guide

This project uses **Supabase** for database management and **Next.js Server Actions** for data operations. This guide explains how to manage the database, environment variables, and how the integration works.

## 1. Environment Variables

The project relies on environment variables stored in `.env.local` for local development. These variables are essential for connecting to Supabase via both the REST API (Supabase Client) and direct Postgres connection (SQL scripts).

### Required Variables:
- `SUPABASE_URL`: Your Supabase project URL.
- `SUPABASE_ANON_KEY`: The public API key (used for client-side operations, respects RLS).
- `SUPABASE_SERVICE_ROLE_KEY`: The secret admin key (used for server-side operations, bypasses RLS).
- `POSTGRES_URL`: The full connection string for direct SQL access (used for migrations/initialization).

## 2. Supabase Client Setup

The connection logic is centralized in `src/lib/supabase.ts`.

- **`supabase`**: Use this for client-side operations. It respects Row Level Security (RLS) policies.
- **`supabaseAdmin`**: Use this in **Server Actions** or **API Routes**. It uses the `service_role` key to bypass RLS, allowing you to perform administrative tasks securely on the server.

```typescript
// Example usage in Server Action
import { supabaseAdmin } from '@/lib/supabase';

export async function addData(data) {
  const { error } = await supabaseAdmin.from('table_name').insert([data]);
}
```

## 3. Database Table Management

### Initializing Tables
To create or update tables, you can use direct SQL via the Supabase Dashboard or a local script. In this project, we used a `postgres` client script to initialize the `messages` table.

### Schema (Messages Table)
```sql
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## 4. Best Practices

1.  **Never Expose Service Role Key**: Ensure `SUPABASE_SERVICE_ROLE_KEY` is never used in client-side code (`use client`).
2.  **Use Server Actions**: For database writes, always use Server Actions (defined with `'use server'`) to keep logic secure.
3.  **RLS Policies**: If you decide to fetch data directly on the client, ensure you have set up proper **Row Level Security (RLS)** policies in the Supabase Dashboard to protect your data.
4.  **Types**: As the project grows, consider generating TypeScript types from your Supabase schema using the Supabase CLI:
    ```bash
    npx supabase gen types typescript --project-id your-project-id > src/types/supabase.ts
    ```

## 5. Troubleshooting

- **Connection Errors**: Check if your IP is whitelisted in the Supabase Network settings if you are using direct Postgres connections.
- **Permission Denied**: If a query fails, check if RLS is enabled on the table and if you are using the correct client (`supabase` vs `supabaseAdmin`).
- **Build Failures**: Ensure all required environment variables are added to your deployment platform (e.g., Vercel, Netlify) with the same names used in `.env.local`.
