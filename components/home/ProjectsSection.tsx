'use client'

import { useState } from 'react'
import FilterMenu from '@/components/ui/FilterMenu'
import { motion, AnimatePresence } from 'framer-motion'
import { Rocket, BookOpen, ArrowRight, ExternalLink } from 'lucide-react'
import { PROJECTS_DATA, PUBLICATIONS_DATA } from '@/data/portfolio'
import Link from 'next/link'

export default function ProjectsSection() {
  const [activeTab, setActiveTab] = useState('Projects')

  const isProjects = activeTab === 'Projects'
  const currentData = isProjects ? PROJECTS_DATA.slice(0, 4) : PUBLICATIONS_DATA.slice(0, 4)
  const Icon = isProjects ? Rocket : BookOpen

  return (
    <section id="projects" className="py-24 px-6 md:px-20 bg-[#FDFBF7] dark:bg-[#050505] transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-[#1A1B41] dark:text-[#FDFBF7] mb-8">PORTFOLIO</h2>
          <FilterMenu 
            options={['Projects', 'Publications']} 
            activeOption={activeTab} 
            onSelect={setActiveTab} 
          />
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <AnimatePresence mode="popLayout">
            {currentData.map((item, index) => (
              <motion.div
                key={item.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-[#111] border border-[#1A1B41]/5 dark:border-[#FDFBF7]/5 rounded-[2rem] p-8 flex flex-col hover:shadow-xl dark:hover:shadow-[0_10px_40px_rgba(0,240,255,0.05)] transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Icon size={24} />
                  </div>
                  <div>
                    <span className="text-xs font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400">
                      {'publisher' in item ? `${item.publisher} • ${item.date}` : item.type}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-tight mt-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 flex-1">
                  {'shortDescription' in item ? item.shortDescription : (item as any).description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100 dark:border-white/10">
                  <div className="flex gap-2">
                    {'tags' in item && item.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-gray-50 dark:bg-black/40 border border-black/5 dark:border-white/10 rounded-lg text-xs font-mono text-gray-700 dark:text-gray-300">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <Link href={isProjects ? `/projects/${item.slug}` : `/publications/${item.slug}`} className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {isProjects ? 'View Project' : 'Read Paper'}
                    {isProjects ? <ArrowRight size={16} /> : <ExternalLink size={16} />}
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-12 text-center">
          <Link href={isProjects ? "/projects" : "/publications"}>
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[#1A1B41]/10 dark:border-[#FDFBF7]/10 font-bold text-[#1A1B41] dark:text-[#FDFBF7] hover:border-[#00F0FF] hover:text-[#00F0FF] dark:hover:border-[#00F0FF] dark:hover:text-[#00F0FF] transition-all hover:scale-105 active:scale-95 shadow-sm bg-white dark:bg-[#111]">
              View All {isProjects ? 'Projects' : 'Publications'} <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
