'use client'

import { motion } from 'framer-motion'
import { Download } from 'lucide-react'

export default function CVPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#050505] transition-colors duration-500 pt-32 px-6 md:px-20 pb-10 flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-5xl mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6"
      >
        <div>
          <h1 className="text-5xl md:text-6xl font-black text-[#1A1B41] dark:text-[#FDFBF7] uppercase tracking-tighter">
            Curriculum <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D4D] via-[#7B61FF] to-[#00F0FF]">Vitae</span>
          </h1>
          <p className="text-lg text-gray-500 font-medium mt-2">
            My complete academic and professional history.
          </p>
        </div>
        
        <a 
          href="/cv.pdf" 
          download 
          className="group relative inline-flex items-center justify-center font-bold overflow-hidden rounded-full px-8 h-12 text-sm bg-[#1A1B41] dark:bg-[#FDFBF7] text-[#FDFBF7] dark:text-[#050505] transition-all hover:scale-105 active:scale-95 shadow-xl shrink-0"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#FF4D4D] to-[#7B61FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="relative flex items-center gap-2">
            <Download className="w-4 h-4" /> Download PDF
          </span>
        </a>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
        className="w-full max-w-5xl flex-1 bg-white dark:bg-[#111] rounded-[2rem] overflow-hidden border border-[#1A1B41]/5 dark:border-[#FDFBF7]/5 relative shadow-2xl min-h-[80vh] group"
      >
        <iframe 
          src="/cv.pdf" 
          className="absolute inset-0 w-full h-full border-0"
          title="Curriculum Vitae"
        />
        {/* Subtle overlay pointer events none just for initial frame aesthetics */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none rounded-[2rem]" />
      </motion.div>
    </div>
  )
}
