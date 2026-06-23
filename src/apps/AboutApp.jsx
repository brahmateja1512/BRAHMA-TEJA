import { useState, useEffect } from 'react'

export default function AboutApp() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('/api/config/about')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  if (!data) return <div className="flex items-center justify-center h-full animate-pulse">Loading About data...</div>

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-os-accent to-blue-400 bg-clip-text text-transparent">About Me</h1>
      <p className="text-lg leading-relaxed text-white/90">{data.bio || "Hello! I am Brahma Teja Jampu. Welcome to my OS portfolio."}</p>
      
      {data.skills && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.split(',').map((skill, i) => (
              <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-sm border border-white/20 shadow-sm">{skill.trim()}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
