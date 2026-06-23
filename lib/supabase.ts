import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Ensure the variables are defined before creating the client to avoid cryptic errors.
if (!supabaseUrl || !supabaseKey) {
  console.warn("Supabase URL or Key is missing. Check your .env.local file.")
}

// Export a real client if keys exist, otherwise export a dummy object that won't crash the app
export const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey) 
  : { 
      from: () => ({ select: () => ({ eq: () => ({ single: () => ({ data: null, error: true }) }), order: () => ({ data: null, error: true }) }) }) 
    } as any
