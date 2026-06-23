import { supabase } from '@/lib/supabase'
import PortfolioManager from '@/components/admin/PortfolioManager'

export const dynamic = 'force-dynamic'

export default async function PortfolioSettings() {
  const [projectsRes, publicationsRes] = await Promise.all([
    supabase.from('projects').select('*').order('created_at', { ascending: false }),
    supabase.from('publications').select('*').order('created_at', { ascending: false })
  ])

  return (
    <PortfolioManager 
      initialProjects={projectsRes.data || []} 
      initialPublications={publicationsRes.data || []} 
    />
  )
}
