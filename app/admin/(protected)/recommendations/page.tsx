import { supabase } from '@/lib/supabase'
import RecommendationsManager from '@/components/admin/RecommendationsManager'

export const dynamic = 'force-dynamic'

export default async function RecommendationsPage() {
  const { data } = await supabase.from('recommendations').select('*').order('created_at', { ascending: false })

  return <RecommendationsManager initialRecommendations={data || []} />
}
