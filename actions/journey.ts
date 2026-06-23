'use server'

import { supabaseAdmin as supabase } from '@/lib/supabase-admin'
import { revalidatePath } from 'next/cache'

export async function saveJourney(formData: FormData, id?: string) {
  const tagsString = formData.get('tags') as string
  const tags = tagsString ? tagsString.split(',').map(t => t.trim()) : []

  const payload = {
    type: formData.get('type') as string,
    role_degree: formData.get('role_degree') as string,
    organization_institution: formData.get('organization_institution') as string,
    period: formData.get('period') as string,
    location: formData.get('location') as string,
    description: formData.get('description') as string,
    grade: formData.get('grade') as string || null,
    courses: formData.get('courses') as string || null,
    tags: tags
  }

  let error;
  if (id) {
    const res = await supabase.from('journey').update(payload).eq('id', id)
    error = res.error
  } else {
    const res = await supabase.from('journey').insert([payload])
    error = res.error
  }

  if (error) return { error: error.message }
  revalidatePath('/')
  revalidatePath('/admin/journey')
  return { success: true }
}

export async function deleteJourney(id: string) {
  const { error } = await supabase.from('journey').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/')
  revalidatePath('/admin/journey')
  return { success: true }
}
