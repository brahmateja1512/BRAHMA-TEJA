'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Loader2, CheckCircle, XCircle } from 'lucide-react'

export default function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setStatus('idle')

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setStatus('success')
        ;(e.target as HTMLFormElement).reset()
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 max-w-2xl mx-auto backdrop-blur-sm"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">Establish Communication</h3>
        <p className="text-white/60">Initialize a handshake protocol to discuss robotics, autonomy, or collaborations.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-white/80">Name / Callsign</label>
            <input 
              required type="text" id="name" name="name"
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-white/80">Frequency (Email)</label>
            <input 
              required type="email" id="email" name="email"
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-white/80">Transmission Data</label>
          <textarea 
            required id="message" name="message" rows={5}
            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all resize-none"
            placeholder="Awaiting transmission..."
          />
        </div>

        <button 
          type="submit" disabled={loading}
          className="w-full bg-white text-black font-semibold rounded-lg py-4 flex items-center justify-center gap-2 hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
          {loading ? 'Transmitting...' : 'Dispatch Packet'}
        </button>

        {status === 'success' && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2 text-green-400 bg-green-400/10 p-4 rounded-lg mt-4">
            <CheckCircle size={20} /> Packet received successfully. I will respond shortly.
          </motion.div>
        )}
        {status === 'error' && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-lg mt-4">
            <XCircle size={20} /> Transmission failed. Database or API error.
          </motion.div>
        )}
      </form>
    </motion.div>
  )
}
