'use client'

import { useState } from 'react'
import { Mail, Trash2 } from 'lucide-react'
import { deleteContactMessage } from '@/actions/contact'

export default function MessagesManager({ initialMessages }: { initialMessages: any[] }) {
  const [loading, setLoading] = useState(false)

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this message?')) return
    setLoading(true)
    await deleteContactMessage(id)
    setLoading(false)
  }

  return (
    <div className="bg-white dark:bg-[#111] p-8 rounded-3xl border border-black/5 dark:border-white/5 shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#1A1B41] dark:text-[#FDFBF7]">Contact Messages</h2>
        <p className="text-gray-500 mt-1 text-sm font-medium">Inquiries from your portfolio contact form</p>
      </div>

      <div className="space-y-4">
        {initialMessages.length === 0 ? (
          <p className="text-gray-500 italic p-4 text-center">Your inbox is empty.</p>
        ) : initialMessages.map((msg) => (
          <div key={msg.id} className="p-6 border border-black/5 dark:border-white/10 rounded-2xl bg-[#FDFBF7] dark:bg-[#050505] flex flex-col md:flex-row gap-6 items-start justify-between group">
            <div className="flex gap-4 w-full">
              <div className="w-12 h-12 rounded-full bg-[#D71921]/10 flex items-center justify-center shrink-0 border border-[#D71921]/20">
                <Mail size={20} className="text-[#D71921]" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-lg text-[#1A1B41] dark:text-[#FDFBF7]">{msg.name}</h4>
                    <a href={`mailto:${msg.email}`} className="text-sm font-medium text-[#00F0FF] hover:underline">{msg.email}</a>
                  </div>
                  <span className="text-xs font-mono text-gray-500">{new Date(msg.created_at).toLocaleString()}</span>
                </div>
                <div className="bg-white dark:bg-white/5 p-4 rounded-xl border border-black/5 dark:border-white/5">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-medium">{msg.message}</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => handleDelete(msg.id)} 
              disabled={loading} 
              className="text-gray-400 hover:text-red-500 p-2 rounded-xl border border-transparent hover:border-red-500/20 hover:bg-red-500/10 transition-colors disabled:opacity-50 shrink-0"
              title="Delete Message"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
