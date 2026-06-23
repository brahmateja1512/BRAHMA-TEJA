import { supabase } from '@/lib/supabase'
import AchievementsManager from '@/components/admin/AchievementsManager'

export const dynamic = 'force-dynamic'

export default async function AchievementsPage() {
  const { data } = await supabase.from('achievements').select('*').order('created_at', { ascending: false })

  return <AchievementsManager initialAchievements={data || []} />
}
