import { useState } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

export default function ContactApp() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="max-w-md mx-auto h-full flex flex-col justify-center">
      <h2 className="text-2xl font-bold mb-2">Initialize Communication</h2>
      <p className="text-white/60 mb-8 text-sm">Send a direct message to my secure server.</p>

      {status === 'success' && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl flex items-center gap-3 text-green-400">
          <CheckCircle /> Message transmitted successfully.
        </div>
      )}

      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-400">
          <AlertCircle /> Transmission failed. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">Identity (Name)</label>
          <input 
            required 
            type="text" 
            value={form.name}
            onChange={e => setForm({...form, name: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 outline-none focus:border-os-accent text-white transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">Return Address (Email)</label>
          <input 
            required 
            type="email" 
            value={form.email}
            onChange={e => setForm({...form, email: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 outline-none focus:border-os-accent text-white transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">Payload (Message)</label>
          <textarea 
            required 
            rows={4}
            value={form.message}
            onChange={e => setForm({...form, message: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 outline-none focus:border-os-accent text-white transition-colors resize-none"
          />
        </div>
        
        <button 
          disabled={status === 'loading'}
          className="mt-2 bg-os-accent text-black font-semibold py-3 rounded-lg hover:bg-os-accent/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {status === 'loading' ? 'Transmitting...' : 'Send Transmission'}
          <Send size={18} />
        </button>
      </form>
    </div>
  )
}
