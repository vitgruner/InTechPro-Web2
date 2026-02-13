import { createClient } from '@supabase/supabase-js';

// Standard Vite approach for environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create client only if we have credentials
const isProd = import.meta.env.PROD;

if (isProd && (!supabaseUrl || !supabaseAnonKey)) {
    throw new Error('CRITICAL: Supabase credentials are missing in production! Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
}

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials are missing. App will fallback to mock data.');
}

export const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : (null as any);
