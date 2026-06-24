'use client'

import Link from 'next/link'
import { Gamepad2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function GameAccessButton() {
  const pathname = usePathname()
  
  // Don't show the button if we are already on the games page
  if (pathname === '/games') return null

  return (
    <Link href="/games" className="fixed top-6 right-6 z-50 group">
      <div className="relative">
        {/* Animated glowing backdrop */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF4D4D] via-[#7B61FF] to-[#00F0FF] rounded-2xl blur opacity-70 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
        
        {/* Button container */}
        <motion.div 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative flex items-center justify-center p-3 sm:px-4 sm:py-3 bg-white dark:bg-[#0a0a0a] border border-white/40 dark:border-white/10 rounded-2xl shadow-xl backdrop-blur-xl overflow-hidden"
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none"></div>
          
          <div className="flex items-center gap-3">
            <Gamepad2 className="w-6 h-6 text-[#1A1B41] dark:text-[#FDFBF7]" />
            <span className="hidden sm:block font-black tracking-widest text-xs uppercase bg-clip-text text-transparent bg-gradient-to-r from-[#FF4D4D] to-[#7B61FF]">
              Play
            </span>
          </div>
        </motion.div>
      </div>
    </Link>
  )
}
