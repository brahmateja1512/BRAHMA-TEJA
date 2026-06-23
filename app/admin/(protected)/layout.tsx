'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logout } from '@/actions/auth'
import { useState, useEffect } from 'react'
import { 
  LayoutDashboard, 
  MonitorPlay, 
  UserCircle, 
  Wrench, 
  Route, 
  FolderGit2, 
  Trophy,
  LogOut,
  Settings,
  Sun,
  Moon
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard Overview', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Hero Settings', href: '/admin/hero', icon: MonitorPlay },
  { name: 'About Settings', href: '/admin/about', icon: UserCircle },
  { name: 'Skills Manager', href: '/admin/skills', icon: Wrench },
  { name: 'Journey Manager', href: '/admin/journey', icon: Route },
  { name: 'Portfolio Manager', href: '/admin/portfolio', icon: FolderGit2 },
  { name: 'Achievements', href: '/admin/achievements', icon: Trophy },
  { name: 'Recommendations', href: '/admin/recommendations', icon: UserCircle },
  { name: 'System Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setTheme('dark')
    }
  }, [])

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains('dark')
    if (isDark) {
      document.documentElement.classList.remove('dark')
      setTheme('light')
    } else {
      document.documentElement.classList.add('dark')
      setTheme('dark')
    }
  }

  return (
    <div className="flex h-screen bg-[#FDFBF7] dark:bg-[#050505] transition-colors duration-500 font-sans">
      
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-[#111] border-r border-black/5 dark:border-white/5 flex flex-col shadow-sm z-10">
        <div className="p-6 border-b border-black/5 dark:border-white/5">
          <Link href="/admin/dashboard" className="font-black text-xl tracking-tighter text-[#1A1B41] dark:text-[#FDFBF7] flex items-center gap-2">
            <span className="text-[#00F0FF]">✦</span> CMS Control
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  isActive 
                    ? 'bg-[#1A1B41] text-white dark:bg-[#FDFBF7] dark:text-[#050505] shadow-md' 
                    : 'text-gray-500 hover:text-[#1A1B41] dark:hover:text-[#FDFBF7] hover:bg-gray-100 dark:hover:bg-white/5'
                }`}
              >
                <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                {item.name}
              </Link>
            )
          })}
        </nav>
        
        <div className="p-4 border-t border-black/5 dark:border-white/5">
          <button 
            onClick={() => logout()}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-bold text-[#FF4D4D] hover:bg-[#FF4D4D]/10 transition-colors"
          >
            <LogOut size={18} strokeWidth={2.5} />
            Secure Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Subtle mesh background for admin */}
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[#00F0FF]/5 blur-[120px] pointer-events-none rounded-full" />
        
        <header className="h-16 bg-white/80 dark:bg-[#111]/80 backdrop-blur-md border-b border-black/5 dark:border-white/5 flex items-center justify-between px-8 z-10 sticky top-0">
          <h1 className="text-xl font-bold text-[#1A1B41] dark:text-[#FDFBF7]">
            {navigation.find(n => n.href === pathname)?.name || 'Admin Panel'}
          </h1>
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-gray-100 dark:bg-white/5 border border-black/5 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:text-[#1A1B41] dark:hover:text-[#FDFBF7] transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-bold font-mono border border-emerald-500/20">
              System Online
            </span>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-8 z-10">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
