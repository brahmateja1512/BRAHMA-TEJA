import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("URL:", url);
console.log("KEY prefix:", key ? key.substring(0, 10) : "missing");

try {
  const supabase = createClient(url, key);
  const { data, error } = await supabase.from('hero_settings').select('*').limit(1);
  console.log("Data:", data);
  console.log("Error:", error);
} catch (e) {
  console.log("Exception:", e.message, e);
}
