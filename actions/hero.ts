'use server'

import { supabaseAdmin as supabase } from '@/lib/supabase-admin'
import { revalidatePath } from 'next/cache'

export async function updateHeroSettings(formData: FormData) {
  const availability_status = formData.get('availability_status') as string
  const name_line_1 = formData.get('name_line_1') as string
  const name_line_2 = formData.get('name_line_2') as string
  const profession_title = formData.get('profession_title') as string
  const tagline = formData.get('tagline') as string
  const floatingTagsStr = formData.get('floating_tags') as string
  
  // Convert comma separated string to array and trim whitespace
  const floating_tags = floatingTagsStr.split(',').map(tag => tag.trim()).filter(Boolean)

  const { error } = await supabase
    .from('hero_settings')
    .update({
      availability_status,
      name_line_1,
      name_line_2,
      profession_title,
      tagline,
      floating_tags,
      updated_at: new Date().toISOString()
    })
    .eq('id', 1)

  if (error) {
    console.error('Error updating hero settings:', error)
    return { error: error.message }
  }

  // Revalidate the homepage so it fetches the new data instantly
  revalidatePath('/')
  revalidatePath('/admin/hero')
  
  return { success: true }
}
