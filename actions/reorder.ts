'use server'

import { supabaseAdmin as supabase } from '@/lib/supabase-admin'
import { revalidatePath } from 'next/cache'

export async function bulkUpdateOrder(
  table: 'skills' | 'journey' | 'projects' | 'publications' | 'recommendations' | 'achievements',
  updates: { id: string, order: number }[]
) {
  // Update all provided items with their new order index
  // We run them sequentially or in parallel. Promise.all is faster.
  const promises = updates.map(item => 
    supabase
      .from(table)
      .update({ display_order: item.order })
      .eq('id', item.id)
  )

  await Promise.all(promises)

  revalidatePath('/')
  revalidatePath(`/admin/${table}`)
  
  if (table === 'projects' || table === 'publications') revalidatePath('/admin/portfolio')
  if (table === 'journey') revalidatePath('/admin/journey')
  if (table === 'achievements') revalidatePath('/admin/achievements')

  return { success: true }
}
