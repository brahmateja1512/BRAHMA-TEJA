'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'
import type { Project } from '@/lib/types'

export default function BentoGrid({ projects }: { projects: Project[] }) {
  if (!projects || projects.length === 0) {
    projects = [
      { id: '1', title: 'Iravath Autonomous Rover', description: 'Rocker-bogie mechanism rover with autonomous navigation.', technical_details: 'ROS2, LiDAR, Visual SLAM', github_url: '#', demo_url: '#', image_urls: [], created_at: '' },
      { id: '2', title: 'ROS2 Navigation Stack', description: 'Custom path planning and obstacle avoidance algorithms.', technical_details: 'C++, Python, Nav2', github_url: '#', demo_url: '#', image_urls: [], created_at: '' },
      { id: '3', title: 'LiDAR Integration System', description: 'Real-time point cloud processing and mapping.', technical_details: 'PCL, C++, Velodyne', github_url: '#', demo_url: '#', image_urls: [], created_at: '' }
    ]
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, i) => (
        <motion.div 
          key={project.id || i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: i * 0.1, type: "spring", stiffness: 200, damping: 20 }}
          whileHover={{ scale: 1.02, y: -5, boxShadow: "0 20px 40px -10px rgba(255,255,255,0.05)" }}
          whileTap={{ scale: 0.98 }}
          className={`group relative flex flex-col bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors overflow-hidden ${i === 0 ? 'md:col-span-2 lg:col-span-2 min-h-[300px]' : 'min-h-[250px]'}`}
        >
          <div className="mb-4">
            <h3 className="text-xl font-bold tracking-tight">{project.title}</h3>
            <p className="text-sm text-white/50 mt-2 font-mono bg-white/5 inline-block px-3 py-1 rounded-md">{project.technical_details}</p>
          </div>
          <p className="text-white/70 text-sm flex-1 mb-6 leading-relaxed">{project.description}</p>
          
          <div className="flex items-center gap-4 mt-auto">
            {project.github_url && (
              <a href={project.github_url} className="flex items-center gap-2 text-sm font-medium hover:text-white transition-colors">
                <Github size={16} /> Repository
              </a>
            )}
            {project.demo_url && (
              <a href={project.demo_url} className="flex items-center gap-2 text-sm font-medium hover:text-white transition-colors">
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
