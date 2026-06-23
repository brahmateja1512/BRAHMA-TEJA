'use client'

import Link from 'next/link'
import { PUBLICATIONS_DATA } from '@/data/portfolio'
import { ArrowRight, FileText, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

const containerVars = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

const itemVars = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { type: 'spring', bounce: 0.4, duration: 0.8 } }
}

export default function PublicationsListing() {
  const [publications, setPublications] = useState(PUBLICATIONS_DATA)

  useEffect(() => {
    async function fetchPublications() {
      try {
        const { data, error } = await supabase.from('publications').select('*').order('created_at', { ascending: false })
        if (data && data.length > 0 && !error) {
          const formatted = data.map((p: any) => ({
            ...p,
            shortDescription: p.short_description,
            doiUrl: p.doi_url,
            pdfUrl: p.pdf_url,
            date: p.published_date
          }))
          setPublications(formatted as any)
        }
      } catch (e) {
        console.warn("Using fallback static publication data")
      }
    }
    fetchPublications()
  }, [])

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#050505] pt-32 pb-24 px-6 md:px-20 transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <Link href="/#projects" className="text-sm font-bold text-gray-400 hover:text-[#1A1B41] dark:hover:text-[#FDFBF7] transition-colors mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-5xl md:text-7xl font-black text-[#1A1B41] dark:text-[#FDFBF7] uppercase tracking-tighter">
            All <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#7B61FF]">Publications</span>
          </h1>
          <p className="text-xl text-gray-500 font-medium mt-4 max-w-2xl">
            A collection of my academic research, journal entries, and conference papers.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVars}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {publications.map((pub) => (
            <motion.div variants={itemVars} key={pub.slug} className="group bg-white dark:bg-[#111] rounded-[2rem] p-8 md:p-10 border border-[#1A1B41]/5 dark:border-[#FDFBF7]/5 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
              {/* Subtle hover background element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#00F0FF]/10 to-[#7B61FF]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="flex flex-col md:flex-row gap-6 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-[#00F0FF]/10 text-[#00F0FF] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <FileText size={32} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold tracking-widest uppercase text-[#7B61FF]">
                      {pub.publisher}
                    </span>
                    <span className="text-gray-300 dark:text-gray-700">•</span>
                    <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">
                      {pub.date}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-[#1A1B41] dark:text-[#FDFBF7] mb-3 group-hover:text-[#00F0FF] transition-colors">
                    {pub.title}
                  </h2>
                  
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-6 font-mono">
                    Authors: {pub.authors}
                  </p>
                  
                  <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed mb-8">
                    {pub.shortDescription}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4">
                    <Link href={`/publications/${pub.slug}`}>
                      <button className="flex items-center gap-2 bg-[#1A1B41] dark:bg-[#FDFBF7] text-[#FDFBF7] dark:text-[#050505] px-6 py-2.5 rounded-xl font-bold text-sm hover:scale-105 active:scale-95 transition-transform shadow-md">
                        Read Details <ArrowRight size={16} />
                      </button>
                    </Link>
                    {pub.doiUrl && (
                      <a href={pub.doiUrl} className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#00F0FF] transition-colors border border-black/5 dark:border-white/10 px-6 py-2.5 rounded-xl">
                        View DOI <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
