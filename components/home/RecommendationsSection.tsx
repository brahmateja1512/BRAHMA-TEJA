'use client'

import { Quote, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function RecommendationsSection() {
  const [recommendations, setRecommendations] = useState<any[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase.from('recommendations').select('*').order('created_at', { ascending: false })
        if (data && !error) setRecommendations(data)
      } catch (e) {
        console.warn("Failed to fetch recommendations")
      }
    }
    fetchData()
  }, [])

  if (recommendations.length === 0) return null

  return (
    <section id="recommendations" className="py-24 px-6 md:px-20 bg-[#FDFBF7] dark:bg-[#050505] transition-colors duration-500 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 text-xs font-mono mb-6 shadow-sm text-[#1A1B41] dark:text-[#FDFBF7]">
            <Sparkles size={14} className="text-[#00F0FF]" />
            <span className="uppercase tracking-widest font-bold">Endorsements</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#1A1B41] dark:text-[#FDFBF7]">WORDS OF PRAISE</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          {recommendations.map((rec, index) => (
            <motion.div 
              key={rec.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
              className="group relative bg-white dark:bg-[#111] rounded-[2.5rem] p-10 md:p-12 border border-[#1A1B41]/5 dark:border-[#FDFBF7]/5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_20px_40px_rgba(0,240,255,0.05)] transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#00F0FF]/10 to-[#7B61FF]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Quote className="absolute top-8 right-8 text-[#1A1B41]/5 dark:text-[#FDFBF7]/5 w-32 h-32 -rotate-12 group-hover:rotate-0 transition-transform duration-700 ease-out" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex-grow">
                  <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 font-medium leading-relaxed mb-10">
                    "{rec.text}"
                  </p>
                </div>
                
                <div className="flex items-center gap-5 pt-6 border-t border-[#1A1B41]/5 dark:border-[#FDFBF7]/5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1A1B41] to-[#111] dark:from-[#FDFBF7] dark:to-gray-300 flex items-center justify-center font-bold text-white dark:text-[#050505] text-xl shadow-lg">
                    {rec.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-[#1A1B41] dark:text-[#FDFBF7]">{rec.author}</h4>
                    <p className="text-sm font-mono text-[#7B61FF] dark:text-[#00F0FF]">{rec.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
