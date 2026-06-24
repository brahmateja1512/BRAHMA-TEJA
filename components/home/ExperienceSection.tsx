'use client'

import { useState, useEffect } from 'react'
import FilterMenu from '@/components/ui/FilterMenu'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, GraduationCap, Calendar, MapPin } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function ExperienceSection() {
  const [activeTab, setActiveTab] = useState('Experience')
  const [experienceData, setExperienceData] = useState<any[]>([])
  const [educationData, setEducationData] = useState<any[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase.from('journey').select('*').order('display_order', { ascending: true })
        if (data && !error) {
          setExperienceData(data.filter((d: any) => d.type === 'Experience'))
          setEducationData(data.filter((d: any) => d.type === 'Education'))
        }
      } catch (e) {
        console.warn("Failed to fetch journey")
      }
    }
    fetchData()
  }, [])

  const currentData = activeTab === 'Experience' ? experienceData : educationData
  const Icon = activeTab === 'Experience' ? Building2 : GraduationCap

  return (
    <section id="experience" className="py-24 px-6 md:px-20 bg-white dark:bg-[#0a0a0a] transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-[#1A1B41] dark:text-[#FDFBF7] mb-8">JOURNEY</h2>
          <FilterMenu 
            id="experience-filter"
            options={['Experience', 'Education']} 
            activeOption={activeTab} 
            onSelect={setActiveTab} 
          />
        </div>

        <div className="relative border-l-2 border-[#1A1B41]/10 dark:border-[#FDFBF7]/10 ml-6 md:ml-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-12 pl-8 md:pl-12"
            >
              {currentData.length === 0 ? (
                <p className="text-gray-500 italic">No entries yet.</p>
              ) : currentData.map((item, index) => (
                <div key={item.id || index} className="relative group">
                  {/* Timeline Dot */}
                  <div className="absolute w-5 h-5 bg-[#FDFBF7] dark:bg-[#050505] border-[3px] border-[#00F0FF] rounded-full -left-[43px] md:-left-[59px] top-1.5 shadow-[0_0_10px_rgba(0,240,255,0.5)] group-hover:scale-125 transition-transform duration-300" />
                  
                  <div className="bg-[#FDFBF7] dark:bg-[#111] border border-[#1A1B41]/5 dark:border-[#FDFBF7]/5 rounded-[2rem] p-6 md:p-8 hover:shadow-xl dark:hover:shadow-[0_10px_40px_rgba(123,97,255,0.1)] transition-all">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-[#1A1B41] dark:text-[#FDFBF7]">
                          {item.role_degree}
                        </h3>
                        <div className="flex items-center gap-2 mt-2 text-[#7B61FF] font-bold">
                          <Icon size={18} />
                          <span>{item.organization_institution}</span>
                        </div>
                      </div>
                      <div className="flex flex-col md:items-end gap-1 text-sm font-mono text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-2"><Calendar size={14}/> {item.period}</span>
                        <span className="flex items-center gap-2"><MapPin size={14}/> {item.location}</span>
                      </div>
                    </div>
                    
                    {item.grade && (
                      <div className="flex flex-col gap-1 mb-4 p-4 rounded-xl bg-white dark:bg-white/5 border border-[#1A1B41]/5 dark:border-white/5">
                        <span className="text-sm font-bold text-[#1A1B41] dark:text-[#FDFBF7]">Grade / GPA: <span className="text-[#00F0FF]">{item.grade}</span></span>
                        {item.courses && <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Relevant Coursework: {item.courses}</span>}
                      </div>
                    )}

                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 font-medium whitespace-pre-wrap">
                      {item.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {item.tags && item.tags.map((tag: string) => (
                        <span key={tag} className="px-3 py-1 bg-white dark:bg-[#050505] border border-[#1A1B41]/10 dark:border-[#FDFBF7]/10 rounded-lg text-xs font-bold font-mono text-[#1A1B41] dark:text-[#FDFBF7]">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
