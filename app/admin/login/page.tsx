'use client'

import { useState } from 'react'
import { login } from '@/actions/auth'
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react'

export default function AdminLogin() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    const result = await login(formData)
    
    if (result?.error) {
      setError(result.error)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] dark:bg-[#050505] p-6 transition-colors duration-500 relative overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#FF4D4D]/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#00F0FF]/10 blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white dark:bg-[#111] border border-black/5 dark:border-white/5 shadow-xl mb-6">
            <ShieldCheck size={32} className="text-[#1A1B41] dark:text-[#FDFBF7]" />
          </div>
          <h1 className="text-3xl font-black text-[#1A1B41] dark:text-[#FDFBF7] mb-2">Admin Portal</h1>
          <p className="text-gray-500 font-medium">Enter your master password to access the CMS.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-[#111] border border-black/5 dark:border-white/5 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,240,255,0.02)]">
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Master Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input 
                type="password" 
                name="password"
                required
                className="w-full pl-12 pr-4 py-3 bg-[#FDFBF7] dark:bg-[#050505] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7] font-medium" 
                placeholder="••••••••" 
              />
            </div>
            {error && (
              <p className="mt-3 text-sm text-[#FF4D4D] font-medium">{error}</p>
            )}
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#1A1B41] dark:bg-[#FDFBF7] text-[#FDFBF7] dark:text-[#050505] font-bold py-3.5 rounded-xl hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
          >
            {isLoading ? 'Authenticating...' : 'Secure Login'}
            {!isLoading && <ArrowRight size={18} />}
          </button>
        </form>

        <div className="text-center mt-8">
          <a href="/" className="text-sm font-bold text-gray-400 hover:text-[#1A1B41] dark:hover:text-[#FDFBF7] transition-colors">
            ← Return to Portfolio
          </a>
        </div>
      </div>
    </div>
  )
}
