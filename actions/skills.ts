'use server'

import { supabaseAdmin as supabase } from '@/lib/supabase-admin'
import { revalidatePath } from 'next/cache'

export async function saveSkill(formData: FormData, id?: string) {
  const payload = {
    name: formData.get('name') as string,
    category: formData.get('category') as string,
    stat: formData.get('stat') as string,
    color: formData.get('color') as string || 'text-[#00F0FF]',
    bg: formData.get('bg') as string || 'bg-[#00F0FF]',
  }

  let error;
  if (id) {
    const res = await supabase.from('skills').update(payload).eq('id', id)
    error = res.error
  } else {
    const res = await supabase.from('skills').insert([payload])
    error = res.error
  }

  if (error) return { error: error.message }
  revalidatePath('/')
  revalidatePath('/admin/skills')
  return { success: true }
}

export async function deleteSkill(id: string) {
  const { error } = await supabase.from('skills').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/')
  revalidatePath('/admin/skills')
  return { success: true }
}
