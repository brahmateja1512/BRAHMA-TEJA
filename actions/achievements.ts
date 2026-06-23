'use server'

import { supabaseAdmin as supabase } from '@/lib/supabase-admin'
import { revalidatePath } from 'next/cache'

export async function saveAchievement(formData: FormData, id?: string) {
  const payload = {
    title: formData.get('title') as string,
    type: formData.get('type') as string,
    org: formData.get('org') as string,
    date: formData.get('date') as string,
    description: formData.get('description') as string,
  }

  let error;
  if (id) {
    const res = await supabase.from('achievements').update(payload).eq('id', id)
    error = res.error
  } else {
    const res = await supabase.from('achievements').insert([payload])
    error = res.error
  }

  if (error) return { error: error.message }
  
  revalidatePath('/')
  revalidatePath('/admin/achievements')
  return { success: true }
}

export async function deleteAchievement(id: string) {
  const { error } = await supabase.from('achievements').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/')
  revalidatePath('/admin/achievements')
  return { success: true }
}
