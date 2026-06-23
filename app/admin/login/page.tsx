'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Lock, Mail, Key } from 'lucide-react'

export default function AdminLogin() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function requestOtp(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      if (!res.ok) throw new Error('Unauthorized or failed to send')
      setStep(2)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function verifyOtp(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      })
      if (!res.ok) throw new Error('Invalid or expired OTP')
      router.push('/admin/dashboard')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-2xl"
      >
        <div className="flex justify-center mb-6 text-white/50">
          <Lock size={48} />
        </div>
        <h2 className="text-2xl font-bold text-center mb-8">Admin Access Protocol</h2>

        {error && <div className="bg-red-500/10 text-red-400 p-3 rounded-lg text-sm mb-6 text-center border border-red-500/20">{error}</div>}

        {step === 1 ? (
          <form onSubmit={requestOtp} className="space-y-4">
            <div>
              <label className="text-sm text-white/60 mb-2 block">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-white/40" size={18} />
                <input 
                  type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-white/30"
                  placeholder="admin@example.com"
                />
              </div>
            </div>
            <button disabled={loading} className="w-full bg-white text-black font-semibold rounded-lg py-3 hover:bg-white/90 disabled:opacity-50 transition-colors">
              {loading ? 'Requesting...' : 'Request OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={verifyOtp} className="space-y-4">
            <div>
              <label className="text-sm text-white/60 mb-2 block">6-Digit OTP</label>
              <div className="relative">
                <Key className="absolute left-3 top-3 text-white/40" size={18} />
                <input 
                  type="text" required value={otp} onChange={e => setOtp(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-white/30 text-center tracking-widest text-lg"
                  placeholder="123456" maxLength={6}
                />
              </div>
            </div>
            <button disabled={loading} className="w-full bg-white text-black font-semibold rounded-lg py-3 hover:bg-white/90 disabled:opacity-50 transition-colors">
              {loading ? 'Verifying...' : 'Authenticate'}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  )
}
