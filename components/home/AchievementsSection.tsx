'use client'

import { Trophy, Star, Award, Medal } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

const FALLBACK_ACHIEVEMENTS = [
  { title: 'Best Innovator Award', org: 'Tech Symposium 2025', type: 'Recognition', date: 'Mar 2025', icon: Trophy },
  { title: 'First Place Hackathon', org: 'National Robotics Challenge', type: 'Competition', date: 'Jan 2025', icon: Award },
  { title: 'Outstanding Contribution', org: 'Open Source Community', type: 'Recognition', date: 'Dec 2024', icon: Star },
  { title: 'Excellence in AI', org: 'Global AI Summit', type: 'Award', date: 'Nov 2024', icon: Trophy },
]

export default function AchievementsSection() {
  const [achievements, setAchievements] = useState(FALLBACK_ACHIEVEMENTS)

  useEffect(() => {
    async function fetchAchievements() {
      try {
        const { data, error } = await supabase.from('achievements').select('*').order('display_order', { ascending: true })
        if (data && data.length > 0 && !error) {
          const formatted = data.map((ach: any) => {
            let Icon = Trophy
            if (ach.type === 'Competition') Icon = Award
            else if (ach.type === 'Certification') Icon = Medal
            else if (ach.type === 'Recognition') Icon = Star

            return {
              ...ach,
              icon: Icon
            }
          })
          setAchievements(formatted as any)
        }
      } catch (e) {
        console.warn("Using fallback static achievements data")
      }
    }
    fetchAchievements()
  }, [])

  // Duplicate items for seamless looping
  const scrollItems = [...achievements, ...achievements, ...achievements, ...achievements]

  return (
    <section id="achievements" className="py-24 bg-[#FDFBF7] dark:bg-[#050505] transition-colors duration-500 overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-6 md:px-20 mb-16 relative z-10">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-black text-[#1A1B41] dark:text-[#FDFBF7] mb-4 uppercase tracking-tighter">
            Awards & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D4D] to-[#7B61FF]">Recognition</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">Milestones achieved throughout my journey.</p>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full flex items-center">
        {/* Left/Right Fade Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-[#FDFBF7] dark:from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-[#FDFBF7] dark:from-[#050505] to-transparent z-10 pointer-events-none" />

        <motion.div 
          className="flex gap-6 pl-6 w-max"
          animate={{ x: [0, -1000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 20,
              ease: 'linear'
            }
          }}
        >
          {scrollItems.map((ach, index) => {
            const Icon = ach.icon
            return (
              <div key={index} className="w-[350px] bg-white dark:bg-[#111] border border-[#1A1B41]/5 dark:border-[#FDFBF7]/5 rounded-[2rem] p-8 shrink-0 flex flex-col hover:shadow-2xl dark:hover:shadow-[0_10px_40px_rgba(255,77,77,0.1)] transition-all duration-300 group">
                <div className="w-16 h-16 rounded-2xl bg-[#FF4D4D]/10 text-[#FF4D4D] flex items-center justify-center mb-6 border border-[#FF4D4D]/20 group-hover:scale-110 transition-transform duration-500">
                  <Icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#1A1B41] dark:text-[#FDFBF7] mb-2">{ach.title}</h3>
                <p className="text-gray-500 font-medium mb-6 flex-1">{ach.org}</p>
                <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-widest mt-auto">
                  <span className="px-3 py-1.5 bg-gray-100 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-lg text-gray-600 dark:text-gray-400">
                    {ach.type}
                  </span>
                  <span className="text-[#FF4D4D]">{ach.date}</span>
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
