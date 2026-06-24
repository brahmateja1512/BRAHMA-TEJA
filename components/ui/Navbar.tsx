'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Download, Moon, Sun, Home, User, Briefcase, GraduationCap, FileCode2, Mail, BookOpen, Trophy, Zap, Image as ImageIcon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [theme, setTheme] = useState('light')
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeSection, setActiveSection] = useState<string>('')
  const pathname = usePathname()

  // Initialize theme state on mount based on what the layout script applied
  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }, [])

  // Track active section for homepage hash links
  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection(pathname)
      return
    }

    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'achievements', 'gallery-preview', 'contact']
      let currentSection = ''
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          // If the top of the section is above the middle of the screen, it's active
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentSection = `/#${section}`
          }
        }
      }
      
      // Default to home if right at the top
      if (window.scrollY < 100) {
        currentSection = '/#home'
      }

      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains('dark')
    if (isDark) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      setTheme('light')
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setTheme('dark')
    }
  }

  const navLinks = [
    { name: 'Home', href: '/#home', icon: Home },
    { name: 'About', href: '/#about', icon: User },
    { name: 'Skills', href: '/#skills', icon: Zap },
    { name: 'Experience', href: '/#experience', icon: Briefcase },
    { name: 'Education', href: '/#experience', icon: GraduationCap },
    { name: 'Projects', href: '/projects', icon: FileCode2 },
    { name: 'Publications', href: '/publications', icon: BookOpen },
    { name: 'Awards', href: '/#achievements', icon: Trophy },
    { name: 'Gallery', href: '/gallery', icon: ImageIcon },
    { name: 'Contact', href: '/#contact', icon: Mail },
  ]

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <nav className="flex items-end gap-2 px-4 py-3 bg-white/50 dark:bg-black/50 backdrop-blur-2xl border border-white/40 dark:border-white/10 rounded-3xl shadow-2xl transition-colors duration-500">
        
        {navLinks.map((link, i) => {
          const Icon = link.icon
          const isHovered = hoveredIndex === i
          const isNeighbor = hoveredIndex !== null && Math.abs(hoveredIndex - i) === 1
          
          // Custom Active Logic
          let isActive = activeSection === link.href
          
          // Highlight Projects and Publications when scrolling over #projects section on homepage
          if (activeSection === '/#projects' && (link.href === '/projects' || link.href === '/publications')) {
            isActive = true
          }
          
          // Highlight Gallery when scrolling over #gallery-preview section on homepage
          if (activeSection === '/#gallery-preview' && link.href === '/gallery') {
            isActive = true
          }

          let scale = 1
          let y = 0
          
          if (isHovered) {
            scale = 1.4
            y = -10
          } else if (isNeighbor) {
            scale = 1.15
            y = -4
          } else if (isActive) {
            scale = 1.05
            y = -2
          }

          return (
            <Link key={link.name} href={link.href}>
              <motion.div
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                animate={{ scale, y }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className={`relative flex items-center justify-center w-12 h-12 border rounded-2xl shadow-sm transition-colors duration-300 ${
                  isActive 
                    ? 'bg-[#1A1B41] dark:bg-[#FDFBF7] border-transparent text-[#FDFBF7] dark:text-[#1A1B41] shadow-lg' 
                    : 'bg-white/80 dark:bg-white/5 border-black/5 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:text-[#1A1B41] dark:hover:text-[#FDFBF7] hover:bg-white dark:hover:bg-white/10'
                }`}
              >
                <Icon strokeWidth={isActive ? 2 : 1.5} size={22} />
                
                {/* Minimalist Active Indicator Dot */}
                {isActive && (
                  <motion.div layoutId="activeDot" className="absolute -bottom-2 w-1 h-1 bg-[#1A1B41] dark:bg-[#FDFBF7] rounded-full" />
                )}

                {/* Tooltip */}
                {isHovered && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-12 px-3 py-1.5 bg-[#1A1B41] dark:bg-[#FDFBF7] text-[#FDFBF7] dark:text-[#1A1B41] text-xs font-bold rounded-lg whitespace-nowrap pointer-events-none shadow-xl"
                  >
                    {link.name}
                  </motion.div>
                )}
              </motion.div>
            </Link>
          )
        })}

        <div className="w-px h-10 bg-gray-300 dark:bg-white/20 mx-2 self-center rounded-full" />

        <motion.button
          onClick={toggleTheme}
          onMouseEnter={() => setHoveredIndex(navLinks.length)}
          onMouseLeave={() => setHoveredIndex(null)}
          animate={{
            scale: hoveredIndex === navLinks.length ? 1.4 : hoveredIndex === navLinks.length - 1 ? 1.15 : 1,
            y: hoveredIndex === navLinks.length ? -10 : hoveredIndex === navLinks.length - 1 ? -4 : 0
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="relative flex items-center justify-center w-12 h-12 bg-white/80 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl shadow-sm text-gray-600 dark:text-gray-400 hover:text-[#1A1B41] dark:hover:text-[#FDFBF7] hover:bg-white dark:hover:bg-white/10"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun strokeWidth={1.5} size={22} /> : <Moon strokeWidth={1.5} size={22} />}
          {hoveredIndex === navLinks.length && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -top-12 px-3 py-1.5 bg-[#1A1B41] dark:bg-[#FDFBF7] text-[#FDFBF7] dark:text-[#1A1B41] text-xs font-bold rounded-lg whitespace-nowrap pointer-events-none shadow-xl"
            >
              Theme
            </motion.div>
          )}
        </motion.button>

        <Link href="/cv">
          <motion.div
            onMouseEnter={() => setHoveredIndex(navLinks.length + 1)}
            onMouseLeave={() => setHoveredIndex(null)}
            animate={{
              scale: hoveredIndex === navLinks.length + 1 ? 1.4 : hoveredIndex === navLinks.length ? 1.15 : 1,
              y: hoveredIndex === navLinks.length + 1 ? -10 : hoveredIndex === navLinks.length ? -4 : 0
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="relative flex items-center justify-center w-12 h-12 bg-[#FF4D4D] border border-red-600 rounded-2xl shadow-md text-white"
          >
            <Download strokeWidth={2} size={22} />
            {hoveredIndex === navLinks.length + 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-12 px-3 py-1.5 bg-[#FF4D4D] text-white text-xs font-bold rounded-lg whitespace-nowrap pointer-events-none shadow-lg"
              >
                Resume
              </motion.div>
            )}
          </motion.div>
        </Link>
      </nav>
    </div>
  )
}
