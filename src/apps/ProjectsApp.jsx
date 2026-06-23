import { useState, useEffect } from 'react'
import { Folder, ExternalLink, Github } from 'lucide-react'

export default function ProjectsApp() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetch('/api/projects?is_published=true')
      .then(res => res.json())
      .then(setProjects)
      .catch(console.error)
  }, [])

  if (projects.length === 0) return <div className="flex items-center justify-center h-full">Loading Projects...</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((p, i) => (
        <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors flex flex-col group">
          <div className="flex items-center gap-3 mb-3 text-os-accent">
            <Folder size={24} className="group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold text-white">{p.title}</h3>
          </div>
          <p className="text-white/70 text-sm flex-1 mb-4 line-clamp-3">{p.description}</p>
          <div className="flex items-center gap-3 mt-auto">
            {p.demo_url && (
              <a href={p.demo_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300">
                <ExternalLink size={14} /> Demo
              </a>
            )}
            {p.github_url && (
              <a href={p.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm text-gray-400 hover:text-white">
                <Github size={14} /> Code
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
