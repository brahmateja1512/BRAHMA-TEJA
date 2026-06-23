'use server'

import { supabaseAdmin as supabase } from '@/lib/supabase-admin'
import { revalidatePath } from 'next/cache'

export async function submitContactMessage(formData: FormData) {
  const payload = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    message: formData.get('message') as string,
  }

  const { error } = await supabase.from('contact_messages').insert([payload])
  if (error) return { error: error.message }
  
  revalidatePath('/admin/messages')
  return { success: true }
}

export async function deleteContactMessage(id: string) {
  const { error } = await supabase.from('contact_messages').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin/messages')
  return { success: true }
}
