'use client'

import { useState } from 'react'
import { updateAboutSettings } from '@/actions/about'

export default function AboutManager({ initialData }: { initialData: any }) {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    
    try {
      await updateAboutSettings(formData)
      alert('About settings saved successfully!')
    } catch (err) {
      alert('Failed to save')
    }
    setLoading(false)
  }

  return (
    <div className="bg-white dark:bg-[#111] p-8 rounded-3xl border border-black/5 dark:border-white/5 shadow-sm">
      <h2 className="text-2xl font-bold text-[#1A1B41] dark:text-[#FDFBF7] mb-8">About Section Configuration</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Section Headline</label>
          <input name="headline" required type="text" className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#050505] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" defaultValue={initialData?.headline || "Engineering Autonomy & Building Robots."} />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Biography</label>
          <textarea name="biography" required rows={5} className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#050505] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" defaultValue={initialData?.biography || "I am an ambitious Autonomy Technologies & Robotics Engineer. With a robust background in embedded systems and simulation, I strive to bridge the gap between software and physical hardware."} />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Projects Count</label>
            <input name="projects_count" required type="number" className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#050505] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" defaultValue={initialData?.projects_count || 10} />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Publications Count</label>
            <input name="publications_count" required type="number" className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#050505] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" defaultValue={initialData?.publications_count || 2} />
          </div>
        </div>

        <button disabled={loading} type="submit" className="bg-[#1A1B41] dark:bg-[#FDFBF7] text-white dark:text-black font-bold py-3 px-8 rounded-xl hover:scale-105 active:scale-95 transition-transform mt-4 disabled:opacity-50">
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}
