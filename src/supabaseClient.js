import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate that the environment variables are present before creating the client
if (!supabaseUrl || !supabaseAnonKey) {
    console.error(
        'Supabase environment variables are missing!\n' +
        'VITE_SUPABASE_URL: ' + supabaseUrl + '\n' +
        'VITE_SUPABASE_ANON_KEY: ' + (supabaseAnonKey ? '[SET]' : '[MISSING]')
    );
}

export const supabase = createClient(
    supabaseUrl ?? 'https://placeholder.supabase.co',
    supabaseAnonKey ?? 'placeholder-key'
);
