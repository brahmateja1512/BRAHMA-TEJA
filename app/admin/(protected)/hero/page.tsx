import HeroForm from '@/components/admin/HeroForm'
import { supabase } from '@/lib/supabase'

export const revalidate = 0 // Disable cache for admin panel

export default async function HeroSettings() {
  const { data: heroData, error } = await supabase
    .from('hero_settings')
    .select('*')
    .eq('id', 1)
    .single()

  if (error && error.code !== 'PGRST116') {
    console.error('Failed to fetch hero settings:', error)
  }

  return (
    <div className="bg-white dark:bg-[#111] p-8 rounded-3xl border border-black/5 dark:border-white/5 shadow-sm">
      <h2 className="text-2xl font-bold text-[#1A1B41] dark:text-[#FDFBF7] mb-8">Hero Section Configuration</h2>
      <HeroForm initialData={heroData} />
    </div>
  )
}
