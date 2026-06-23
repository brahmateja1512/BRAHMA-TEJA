'use server'

import { supabaseAdmin as supabase } from '@/lib/supabase-admin'
import { revalidatePath } from 'next/cache'

export async function saveRecommendation(formData: FormData, id?: string) {
  const payload = {
    author: formData.get('author') as string,
    role: formData.get('role') as string,
    text: formData.get('text') as string,
  }

  let error;
  if (id) {
    const res = await supabase.from('recommendations').update(payload).eq('id', id)
    error = res.error
  } else {
    const res = await supabase.from('recommendations').insert([payload])
    error = res.error
  }

  if (error) return { error: error.message }
  revalidatePath('/')
  revalidatePath('/admin/recommendations')
  return { success: true }
}

export async function deleteRecommendation(id: string) {
  const { error } = await supabase.from('recommendations').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/')
  revalidatePath('/admin/recommendations')
  return { success: true }
}
