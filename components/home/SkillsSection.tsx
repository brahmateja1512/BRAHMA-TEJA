'use client'

import { useState, useEffect } from 'react'
import FilterMenu from '@/components/ui/FilterMenu'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Code2, BrainCircuit, Cpu, Zap, Activity, Wrench, Globe } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const CATEGORIES = ['All', 'Hardware & Boards', 'Technologies', 'Tools & Software', 'Frameworks & Libraries', 'Programming Languages', 'CAD/CAM']

const CategoryIcon = ({ category, className }: { category: string, className?: string }) => {
  switch (category) {
    case 'Hardware & Boards': return <Cpu className={className} />
    case 'Technologies': return <BrainCircuit className={className} />
    case 'Tools & Software': return <Wrench className={className} />
    case 'Frameworks & Libraries': return <Bot className={className} />
    case 'Programming Languages': return <Code2 className={className} />
    case 'CAD/CAM': return <Activity className={className} />
    default: return <Zap className={className} />
  }
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Hardware & Boards': return '#FFD700' // Gold
    case 'Technologies': return '#00F0FF'     // Cyan
    case 'Tools & Software': return '#FF00FF' // Magenta
    case 'Frameworks & Libraries': return '#7B61FF' // Purple
    case 'Programming Languages': return '#00FF00' // Neon Green
    case 'CAD/CAM': return '#FF4D4D'          // Red
    default: return '#00F0FF'
  }
}

export default function SkillsSection() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [skills, setSkills] = useState<any[]>([])

  useEffect(() => {
    async function fetchSkills() {
      try {
        const { data, error } = await supabase.from('skills').select('*').order('display_order', { ascending: true })
        if (data && !error) setSkills(data)
      } catch (e) {
        console.warn('Failed to fetch skills')
      }
    }
    fetchSkills()
  }, [])

  const filteredSkills = activeFilter === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === activeFilter)

  return (
    <section id="skills" className="py-24 px-6 md:px-20 bg-[#FDFBF7] dark:bg-[#050505] transition-colors duration-500 relative overflow-hidden">
      
      {/* High-Tech Grid Blueprint Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] dark:from-[#050505] via-transparent to-transparent pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-5 h-5 text-[#FF4D4D] animate-pulse" />
              <span className="text-xs font-bold font-mono tracking-[0.2em] text-gray-500 uppercase">System Array // Modules</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1B41] dark:text-[#FDFBF7] tracking-tighter uppercase leading-none">
              Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D4D] via-[#7B61FF] to-[#00F0FF]">Architecture</span>
            </h2>
          </div>
          
          <FilterMenu 
            options={CATEGORIES} 
            activeOption={activeFilter} 
            onSelect={setActiveFilter} 
          />
        </div>

        {skills.length === 0 ? (
          <p className="text-gray-500 italic text-center py-10">No skills loaded.</p>
        ) : (
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill, idx) => {
                const color = getCategoryColor(skill.category)
                
                return (
                  <motion.div
                    key={skill.id || skill.name}
                    layout
                    initial={{ opacity: 0, scale: 0.8, rotateX: 45 }}
                    animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotateX: -45 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25, delay: idx * 0.02 }}
                    style={{ '--theme-color': color } as React.CSSProperties}
                    className="group relative bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 p-4 flex flex-col justify-between transition-all duration-300 cursor-crosshair overflow-hidden min-h-[130px] rounded-sm hover:border-[var(--theme-color)] shadow-sm hover:shadow-[0_0_15px_var(--theme-color)]"
                  >
                    {/* Glowing corner brackets (high-tech aesthetic) */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-transparent group-hover:border-[var(--theme-color)] transition-colors duration-300 pointer-events-none" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-transparent group-hover:border-[var(--theme-color)] transition-colors duration-300 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-transparent group-hover:border-[var(--theme-color)] transition-colors duration-300 pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-transparent group-hover:border-[var(--theme-color)] transition-colors duration-300 pointer-events-none" />

                    {/* Cyberpunk Scanline overlay on hover */}
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.02)_50%)] dark:bg-[linear-gradient(transparent_50%,rgba(255,255,255,0.02)_50%)] bg-[size:100%_4px] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
                    
                    {/* Light background glow on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" style={{ backgroundColor: color }} />

                    <div className="flex justify-between items-start w-full relative z-10">
                      <CategoryIcon category={skill.category} className="w-6 h-6 text-gray-400 group-hover:text-[var(--theme-color)] group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_var(--theme-color)] transition-all duration-300" />
                      <span className="text-[10px] font-mono font-bold text-gray-300 dark:text-gray-700 group-hover:text-[var(--theme-color)] transition-colors duration-300">
                        {idx.toString(16).padStart(2, '0').toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex flex-col mt-4 relative z-10">
                      <span className="text-[10px] font-mono font-bold text-gray-400 group-hover:text-[var(--theme-color)] uppercase tracking-widest transition-colors duration-300 mb-1">
                        {skill.category}
                      </span>
                      <span className="text-sm font-black text-[#1A1B41] dark:text-[#FDFBF7] tracking-tight truncate group-hover:translate-x-1 transition-transform duration-300">
                        {skill.name}
                      </span>
                      
                      {/* Active Status indicator instead of progress bar */}
                      <div className="mt-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: color, boxShadow: `0 0 5px ${color}` }} />
                        <span className="text-[8px] font-mono font-bold tracking-widest uppercase" style={{ color: color }}>STATUS: ONLINE</span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  )
}

