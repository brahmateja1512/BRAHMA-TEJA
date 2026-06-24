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
                    <div className="flex flex-col gap-0.5 mt-1">
                      <a href={`mailto:${msg.email}`} className="text-sm font-medium text-[#00F0FF] hover:underline">{msg.email}</a>
                      {msg.phone && <span className="text-sm font-mono text-gray-500">Phone: {msg.phone}</span>}
                    </div>
                  </div>
                  <span className="text-xs font-mono text-gray-500">{new Date(msg.created_at).toLocaleString()}</span>
                </div>
                
                {(msg.subject || msg.company || msg.project_type) && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {msg.project_type && (
                      <span className="px-2 py-1 text-xs font-bold rounded-md bg-[#7B61FF]/10 text-[#7B61FF] dark:text-[#a594ff] border border-[#7B61FF]/20">
                        {msg.project_type}
                      </span>
                    )}
                    {msg.company && (
                      <span className="px-2 py-1 text-xs font-bold rounded-md bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10">
                        🏢 {msg.company}
                      </span>
                    )}
                    {msg.subject && (
                      <span className="px-2 py-1 text-xs font-bold rounded-md bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10">
                        Subject: {msg.subject}
                      </span>
                    )}
                  </div>
                )}

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
