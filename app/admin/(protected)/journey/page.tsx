import { supabase } from '@/lib/supabase'
import JourneyManager from '@/components/admin/JourneyManager'

export const dynamic = 'force-dynamic'

export default async function JourneyPage() {
  const { data } = await supabase.from('journey').select('*').order('created_at', { ascending: false })

  return <JourneyManager initialJourney={data || []} />
}
