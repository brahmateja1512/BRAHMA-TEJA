import { supabase } from '@/lib/supabase'
import AboutManager from '@/components/admin/AboutManager'

export const dynamic = 'force-dynamic'

export default async function AboutSettingsPage() {
  const { data } = await supabase.from('about_settings').select('*').eq('id', 1).single()

  return <AboutManager initialData={data} />
}
