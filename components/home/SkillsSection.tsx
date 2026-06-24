'use client'

import { useState, useEffect } from 'react'
import FilterMenu from '@/components/ui/FilterMenu'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Code2, BrainCircuit, Cpu, Zap, Activity } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const CATEGORIES = ['All', 'Robotics', 'Software', 'AI/ML', 'Hardware']

const CategoryIcon = ({ category, className }: { category: string, className?: string }) => {
  switch (category) {
    case 'Robotics': return <Bot className={className} />
    case 'Software': return <Code2 className={className} />
    case 'AI/ML': return <BrainCircuit className={className} />
    case 'Hardware': return <Cpu className={className} />
    default: return <Code2 className={className} />
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
      
      {/* Grid Blueprint Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

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
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill, idx) => (
                <motion.div
                  key={skill.id || skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.8, rotateX: 45 }}
                  animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotateX: -45 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25, delay: idx * 0.02 }}
                  className="group relative bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 p-4 rounded-xl flex flex-col justify-between hover:bg-gray-50 dark:hover:bg-[#111] transition-colors cursor-crosshair overflow-hidden min-h-[120px]"
                >
                  {/* HUD Accent Line */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${skill.bg || 'bg-[#00F0FF]'} ${skill.color ? skill.color.replace('text-', 'bg-') : 'bg-[#00F0FF]'} opacity-50 group-hover:opacity-100 transition-opacity`} />
                  
                  {/* Cyberpunk Scanline overlay on hover */}
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.02)_50%)] dark:bg-[linear-gradient(transparent_50%,rgba(255,255,255,0.02)_50%)] bg-[size:100%_4px] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />

                  <div className="flex justify-between items-start w-full relative z-10">
                    <CategoryIcon category={skill.category} className={`w-5 h-5 ${skill.color || 'text-[#00F0FF]'} opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all`} />
                    <span className="text-[10px] font-mono font-bold text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300">
                      ID_{(idx * 13).toString(16).padStart(4, '0').toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex flex-col mt-4 relative z-10">
                    <span className="text-sm font-black text-[#1A1B41] dark:text-[#FDFBF7] tracking-tight">{skill.name}</span>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">{skill.category}</span>
                      <span className={`text-[10px] font-mono font-bold ${skill.color || 'text-[#00F0FF]'} opacity-0 group-hover:opacity-100 transition-opacity`}>
                        {skill.stat || '100%'}
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full h-[2px] bg-black/5 dark:bg-white/5 mt-2 rounded-full overflow-hidden">
                      <div className={`h-full ${skill.color ? skill.color.replace('text-', 'bg-') : 'bg-[#00F0FF]'} opacity-50 group-hover:opacity-100 transition-all duration-1000 ease-out`} style={{ width: '0%' }} />
                      <div className={`h-full ${skill.color ? skill.color.replace('text-', 'bg-') : 'bg-[#00F0FF]'} opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-out`} style={{ width: skill.stat || '100%' }} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  )
}
