import Link from 'next/link'
import { Download, Moon } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold tracking-tighter text-xl">
          BTJ.
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/experience" className="hover:text-white/70 transition-colors">Experience</Link>
          <Link href="/projects" className="hover:text-white/70 transition-colors">Projects</Link>
          <Link href="/achievements" className="hover:text-white/70 transition-colors">Achievements</Link>
          <Link href="/gallery" className="hover:text-white/70 transition-colors">Gallery</Link>
          
          <div className="h-4 w-px bg-white/20 mx-2" />
          
          <Link href="/cv" className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full hover:bg-white/90 transition-colors">
            <Download size={14} /> Resume
          </Link>
          
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <Moon size={18} />
          </button>
        </div>
      </div>
    </nav>
  )
}
