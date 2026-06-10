import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
  console.error('Missing Supabase Environment Variables:', {
    hasUrl: !!supabaseUrl,
    hasAnonKey: !!supabaseAnonKey,
    hasServiceRole: !!supabaseServiceRoleKey
  });
}

// Client for client-side use (respects RLS)
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// Client for server-side use
// Note: Using anonKey as fallback because the provided serviceRoleKey was invalid in local testing
export const supabaseAdmin = createClient(
  supabaseUrl || '', 
  supabaseServiceRoleKey && supabaseServiceRoleKey.split('.').length === 3 
    ? supabaseServiceRoleKey 
    : (supabaseAnonKey || '')
);
