'use client'

import { motion } from 'framer-motion'
import type { Experience } from '@/lib/types'

export default function Timeline({ experience }: { experience: Experience[] }) {
  if (!experience || experience.length === 0) {
    experience = [
      { id: '1', role: 'STEM Engineer', company: 'Tech Corp', start_date: '2024', end_date: 'Present', description: 'Developed advanced robotics modules and integrated ROS2 navigation stacks for autonomous delivery robots.', created_at: '' },
      { id: '2', role: 'Robotics Intern', company: 'AutoBotics', start_date: '2023', end_date: '2024', description: 'Assisted in building visual SLAM systems and mapping algorithms using stereo cameras.', created_at: '' },
      { id: '3', role: 'B.Tech in Robotics', company: 'FAU Erlangen-Nürnberg', start_date: '2019', end_date: '2023', description: 'Graduated with honors. Thesis focused on rocker-bogie mechanisms for uneven terrain.', created_at: '' },
    ]
  }

  return (
    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
      {experience.map((exp, i) => (
        <motion.div 
          key={exp.id || i}
          initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-background text-white/50 group-hover:text-white group-hover:border-white/50 transition-colors shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
            <div className="w-2 h-2 bg-white/50 rounded-full group-hover:bg-white transition-colors" />
          </div>
          
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
            <div className="flex flex-col mb-4">
              <span className="text-xs text-white/50 font-mono tracking-wider uppercase mb-2">{exp.start_date} - {exp.end_date || 'Present'}</span>
              <h4 className="text-xl font-bold tracking-tight">{exp.role}</h4>
              <span className="text-sm font-medium text-white/70">{exp.company}</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">{exp.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
