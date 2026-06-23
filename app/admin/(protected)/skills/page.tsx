import { supabase } from '@/lib/supabase'
import SkillsManager from '@/components/admin/SkillsManager'

export const dynamic = 'force-dynamic'

export default async function SkillsPage() {
  const { data } = await supabase.from('skills').select('*').order('created_at', { ascending: false })

  return <SkillsManager initialSkills={data || []} />
}
