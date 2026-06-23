import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  console.log("Checking tables...")

  const tables = ['skills', 'journey', 'recommendations', 'contact_messages', 'hero_settings', 'projects', 'publications']

  for (const table of tables) {
    const { data, error } = await supabase.from(table).select('*').limit(1)
    if (error) {
      console.log(`❌ Table '${table}' failed:`, error.message)
    } else {
      console.log(`✅ Table '${table}' OK!`)
    }
  }
}

testConnection()
