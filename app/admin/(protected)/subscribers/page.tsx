'use client'

import { Mail, Search, Download } from 'lucide-react'

export default function SubscribersPage() {
  const subscribers = [
    { name: 'prudhvirajchalapaka', email: 'prudhvirajchalapaka@gmail.com' },
    { name: 'chalapakaraj1', email: 'chalapakaraj1@gmail.com' },
    { name: 'prudhvirajchalapaka07', email: 'prudhvirajchalapaka07@gmail.com' }
  ]

  return (
    <div className="bg-white dark:bg-[#111] p-8 rounded-3xl border border-black/5 dark:border-white/5 shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[#1A1B41] dark:text-[#FDFBF7]">Subscribers</h2>
          <p className="text-gray-500 mt-1 text-sm font-medium">Manage your newsletter subscribers</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="bg-[#7B61FF]/10 text-[#7B61FF] px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 border border-[#7B61FF]/20">
            <UsersIcon size={16} /> {subscribers.length} subscribers
          </span>
          <button className="bg-[#1A1B41] dark:bg-[#FDFBF7] text-white dark:text-black font-bold py-2 px-6 rounded-xl hover:scale-105 active:scale-95 transition-transform flex items-center gap-2">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-[#FDFBF7] dark:bg-[#050505] border border-black/5 dark:border-white/5 rounded-2xl overflow-hidden shadow-inner">
        <div className="p-4 border-b border-black/5 dark:border-white/5 flex items-center justify-between bg-white dark:bg-[#111]">
          <h3 className="font-bold text-[#1A1B41] dark:text-[#FDFBF7]">All Subscribers</h3>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              className="w-72 pl-10 pr-4 py-2 bg-[#FDFBF7] dark:bg-[#050505] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7] text-sm"
            />
          </div>
        </div>
        
        <div className="divide-y divide-black/5 dark:divide-white/5 p-4">
          {subscribers.map((sub, i) => (
            <div key={i} className="flex items-center gap-4 p-4 hover:bg-white dark:hover:bg-[#111] rounded-2xl transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-[#7B61FF]/10 rounded-full flex items-center justify-center text-[#7B61FF] shrink-0 border border-[#7B61FF]/20 group-hover:scale-110 transition-transform">
                <Mail size={20} />
              </div>
              <div>
                <h4 className="font-bold text-[#1A1B41] dark:text-[#FDFBF7]">{sub.name}</h4>
                <p className="text-gray-500 font-medium text-sm">{sub.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function UsersIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
