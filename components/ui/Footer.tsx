'use client'

import Link from 'next/link'
import { Github, Linkedin, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#0a0a0a] border-t border-gray-200 dark:border-white/10 py-12 px-6 md:px-20 transition-colors duration-500">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="text-center md:text-left">
          <Link href="/" className="font-bold text-2xl tracking-tighter text-gray-900 dark:text-white mb-2 block">
            <span className="text-[#D71921]">B</span>TJ.
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            Engineering Autonomy & Building Robots.
          </p>
        </div>

        <div className="flex gap-6 text-sm font-medium text-gray-600 dark:text-gray-400">
          <Link href="#about" className="hover:text-gray-900 dark:hover:text-white transition-colors">About</Link>
          <Link href="#skills" className="hover:text-gray-900 dark:hover:text-white transition-colors">Skills</Link>
          <Link href="#projects" className="hover:text-gray-900 dark:hover:text-white transition-colors">Portfolio</Link>
        </div>

        <div className="flex items-center gap-4 text-gray-400 dark:text-gray-500">
          <a href="#" className="hover:text-[#D71921] transition-colors"><Github size={20} /></a>
          <a href="#" className="hover:text-[#D71921] transition-colors"><Linkedin size={20} /></a>
          <a href="#" className="hover:text-[#D71921] transition-colors"><Twitter size={20} /></a>
        </div>

      </div>
      
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-100 dark:border-white/5 text-center text-xs text-gray-400 dark:text-gray-600 font-mono">
        © {new Date().getFullYear()} Brahma Teja Jampu. All rights reserved.
      </div>
    </footer>
  )
}
