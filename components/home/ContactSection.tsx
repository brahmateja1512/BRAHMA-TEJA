'use client'

import { Mail, MapPin, Send, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { submitContactMessage } from '@/actions/contact'

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    const formData = new FormData(e.currentTarget)
    
    try {
      const res = await submitContactMessage(formData)
      if (res.error) throw new Error(res.error)
      setStatus('success')
      ;(e.target as HTMLFormElement).reset()
      setTimeout(() => setStatus('idle'), 5000)
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-24 px-6 md:px-20 bg-white dark:bg-[#111111] transition-colors duration-500">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">
        
        <div className="lg:w-1/2">
          <h2 className="text-4xl md:text-5xl font-bold font-display text-gray-900 dark:text-white mb-6">GET IN TOUCH</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-12">
            Interested in collaboration or have a question? Fill out the form or reach out directly via email.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4 text-gray-800 dark:text-gray-300">
              <div className="w-12 h-12 bg-[#F8F9FA] dark:bg-white/5 rounded-full flex items-center justify-center border border-black/5 dark:border-white/10 shrink-0">
                <Mail size={20} className="text-[#D71921]" />
              </div>
              <span className="font-mono text-sm md:text-base">brahmateja1512@gmail.com</span>
            </div>
            <div className="flex items-center gap-4 text-gray-800 dark:text-gray-300">
              <div className="w-12 h-12 bg-[#F8F9FA] dark:bg-white/5 rounded-full flex items-center justify-center border border-black/5 dark:border-white/10 shrink-0">
                <MapPin size={20} className="text-[#D71921]" />
              </div>
              <span className="font-mono text-sm md:text-base">Erlangen, Germany</span>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2">
          <form onSubmit={handleSubmit} className="bg-[#F8F9FA] dark:bg-white/5 border border-black/5 dark:border-white/10 p-8 md:p-10 rounded-3xl shadow-lg relative">
            
            {status === 'success' && (
              <div className="absolute inset-0 bg-[#F8F9FA]/90 dark:bg-[#1d1d1f]/90 backdrop-blur-sm z-10 rounded-3xl flex flex-col items-center justify-center text-center p-8">
                <CheckCircle2 size={48} className="text-green-500 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                <p className="text-gray-600 dark:text-gray-400">Thank you for reaching out. I'll get back to you as soon as possible.</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                <input name="name" required type="text" className="w-full px-4 py-3 bg-white dark:bg-[#1d1d1f] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D71921]/50 dark:text-white" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input name="email" required type="email" className="w-full px-4 py-3 bg-white dark:bg-[#1d1d1f] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D71921]/50 dark:text-white" placeholder="john@example.com" />
              </div>
            </div>
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
              <textarea name="message" required rows={4} className="w-full px-4 py-3 bg-white dark:bg-[#1d1d1f] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D71921]/50 dark:text-white resize-none" placeholder="How can I help you?"></textarea>
            </div>
            <button disabled={status === 'loading'} type="submit" className="w-full bg-gray-900 dark:bg-white text-white dark:text-black font-bold py-4 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
              {status === 'loading' ? 'Sending...' : <><Send size={18} /> Send Message</>}
            </button>
            {status === 'error' && <p className="text-red-500 mt-4 text-center text-sm font-bold">Failed to send message. Please try again.</p>}
          </form>
        </div>

      </div>
    </section>
  )
}
