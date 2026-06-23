'use server'

import { supabaseAdmin as supabase } from '@/lib/supabase-admin'
import { revalidatePath } from 'next/cache'

export async function updateAboutSettings(formData: FormData) {
  const headline = formData.get('headline') as string
  const biography = formData.get('biography') as string
  const projects_count = parseInt(formData.get('projects_count') as string || '0', 10)
  const publications_count = parseInt(formData.get('publications_count') as string || '0', 10)
  
  const { error } = await supabase
    .from('about_settings')
    .update({
      headline,
      biography,
      projects_count,
      publications_count,
      updated_at: new Date().toISOString()
    })
    .eq('id', 1)

  if (error) {
    console.error('Error updating about settings:', error)
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/about')
  
  return { success: true }
}
