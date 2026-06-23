import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn("Supabase URL or Service Role Key is missing. Admin actions will fail.")
}

export const supabaseAdmin = (supabaseUrl && supabaseServiceKey) 
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : { 
      from: () => ({ 
        insert: () => ({ error: { message: "Missing Service Role Key" } }),
        update: () => ({ eq: () => ({ error: { message: "Missing Service Role Key" } }) }),
        delete: () => ({ eq: () => ({ error: { message: "Missing Service Role Key" } }) })
      }) 
    } as any
