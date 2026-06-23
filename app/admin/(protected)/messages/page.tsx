import { supabase } from '@/lib/supabase'
import MessagesManager from '@/components/admin/MessagesManager'

export const dynamic = 'force-dynamic'

export default async function MessagesPage() {
  const { data } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false })

  return <MessagesManager initialMessages={data || []} />
}
