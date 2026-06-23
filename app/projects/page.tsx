'use client'

import Link from 'next/link'
import { PROJECTS_DATA } from '@/data/portfolio'
import { ArrowRight, Github, ExternalLink } from 'lucide-react'
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
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.4, duration: 0.8 } }
}

export default function ProjectsListing() {
  const [projects, setProjects] = useState(PROJECTS_DATA)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
        if (data && data.length > 0 && !error) {
          const formatted = data.map((p: any) => ({
            ...p,
            shortDescription: p.short_description,
            detailedContent: p.detailed_content,
            githubUrl: p.github_url,
            demoUrl: p.demo_url
          }))
          setProjects(formatted as any)
        }
      } catch (e) {
        console.warn("Using fallback static project data")
      }
    }
    fetchProjects()
  }, [])

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#050505] pt-32 pb-24 px-6 md:px-20 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
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
            All <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B61FF] to-[#00F0FF]">Projects</span>
          </h1>
          <p className="text-xl text-gray-500 font-medium mt-4 max-w-2xl">
            A comprehensive gallery of my hardware builds, software architecture, and robotics implementations.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVars}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            <motion.div variants={itemVars} key={project.slug} className="group bg-white dark:bg-[#111] rounded-[2rem] overflow-hidden border border-[#1A1B41]/5 dark:border-[#FDFBF7]/5 hover:shadow-2xl transition-all duration-500">
              {/* Image Banner */}
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={project.images[0] || 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000'} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-6 flex gap-2">
                  {project.tags.map((tag: string) => (
                    <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-bold text-white border border-white/20">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-bold tracking-widest uppercase text-[#7B61FF] mb-2 block">
                      {project.type}
                    </span>
                    <h2 className="text-2xl font-bold text-[#1A1B41] dark:text-[#FDFBF7] group-hover:text-[#00F0FF] transition-colors">
                      {project.title}
                    </h2>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed mb-8 h-12 line-clamp-2">
                  {project.shortDescription}
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-black/5 dark:border-white/5">
                  <div className="flex gap-4">
                    {project.githubUrl && (
                      <a href={project.githubUrl} className="text-gray-400 hover:text-[#1A1B41] dark:hover:text-[#FDFBF7] transition-colors">
                        <Github size={20} />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a href={project.demoUrl} className="text-gray-400 hover:text-[#00F0FF] transition-colors">
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                  <Link href={`/projects/${project.slug}`} className="flex items-center gap-2 text-sm font-bold text-[#1A1B41] dark:text-[#FDFBF7] hover:text-[#00F0FF] dark:hover:text-[#00F0FF] transition-colors">
                    Read Case Study <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
