'use client'

import { useState } from 'react'
import { Code2, Plus } from 'lucide-react'
import { saveSkill, deleteSkill } from '@/actions/skills'
import { bulkUpdateOrder } from '@/actions/reorder'
import { ArrowUp, ArrowDown } from 'lucide-react'

export default function SkillsManager({ initialSkills }: { initialSkills: any[] }) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  // Initialize local sorted items state for reordering
  const [items, setItems] = useState(() => {
    return [...initialSkills]
      .map((item, idx) => ({ ...item, display_order: item.display_order ?? idx }))
      .sort((a, b) => a.display_order - b.display_order)
  })

  async function handleMove(index: number, direction: 'up' | 'down') {
    if (direction === 'up' && index === 0) return
    if (direction === 'down' && index === items.length - 1) return

    const newItems = [...items]
    const swapIndex = direction === 'up' ? index - 1 : index + 1
    
    // Swap in array
    const temp = newItems[index]
    newItems[index] = newItems[swapIndex]
    newItems[swapIndex] = temp

    // Update display_order property based on new array index
    const updatedItems = newItems.map((item, idx) => ({ ...item, display_order: idx }))
    
    // Optimistic update
    setItems(updatedItems)
    
    // Persist to DB
    setLoading(true)
    const updates = updatedItems.map(item => ({ id: item.id, order: item.display_order }))
    await bulkUpdateOrder('skills', updates)
    setLoading(false)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    
    try {
      await saveSkill(formData, editingId || undefined)
      setShowAddForm(false)
      setEditingId(null)
      ;(e.target as HTMLFormElement).reset()
    } catch (err) {
      alert('Failed to save')
    }
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this skill?')) return
    setLoading(true)
    await deleteSkill(id)
    setLoading(false)
  }

  function handleEdit(item: any) {
    setEditingId(item.id)
    setShowAddForm(true)
    setTimeout(() => {
      const form = document.getElementById('skillForm') as HTMLFormElement
      if (form) {
        ;(form.elements.namedItem('name') as HTMLInputElement).value = item.name
        ;(form.elements.namedItem('category') as HTMLSelectElement).value = item.category
        ;(form.elements.namedItem('stat') as HTMLInputElement).value = item.stat
        ;(form.elements.namedItem('color') as HTMLInputElement).value = item.color
        ;(form.elements.namedItem('bg') as HTMLInputElement).value = item.bg
      }
    }, 50)
  }

  return (
    <div className="bg-white dark:bg-[#111] p-8 rounded-3xl border border-black/5 dark:border-white/5 shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[#1A1B41] dark:text-[#FDFBF7]">Skills & Tech Stack</h2>
          <p className="text-gray-500 mt-1 text-sm font-medium">Manage your technical array modules</p>
        </div>
        <button 
          onClick={() => {
            setShowAddForm(!showAddForm)
            setEditingId(null)
          }}
          className="bg-[#1A1B41] dark:bg-[#FDFBF7] text-white dark:text-black font-bold py-2 px-6 rounded-xl hover:scale-105 active:scale-95 transition-transform flex items-center gap-2"
        >
          {showAddForm ? 'Close Form' : <><Plus size={16} /> Add Skill</>}
        </button>
      </div>

      {showAddForm && (
        <form id="skillForm" onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-50 dark:bg-[#050505] rounded-2xl border border-black/5 dark:border-white/5">
          <h3 className="text-lg font-bold text-[#1A1B41] dark:text-[#FDFBF7] mb-4">
            {editingId ? 'Edit Skill' : 'Add New Skill'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Skill Name</label>
              <input name="name" required type="text" className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" placeholder="e.g. ROS2" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Category</label>
              <select name="category" className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]">
                <option value="Robotics">Robotics</option>
                <option value="Software">Software</option>
                <option value="AI/ML">AI/ML</option>
                <option value="Hardware">Hardware</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Proficiency (Stat)</label>
              <input name="stat" required type="text" className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" placeholder="e.g. 98%" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Tailwind Text Color</label>
              <input name="color" defaultValue="text-[#00F0FF]" required type="text" className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" placeholder="text-[#00F0FF]" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Tailwind BG Color</label>
              <input name="bg" defaultValue="bg-[#00F0FF]" required type="text" className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" placeholder="bg-[#00F0FF]" />
            </div>
          </div>
          <button disabled={loading} type="submit" className="bg-[#00F0FF] text-[#1A1B41] font-bold py-3 px-8 rounded-xl hover:scale-105 active:scale-95 transition-transform disabled:opacity-50">
            {loading ? 'Saving...' : (editingId ? 'Update Entry' : 'Save Entry')}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.length === 0 ? (
          <p className="text-gray-500 italic p-4 col-span-full text-center">No skills found.</p>
        ) : items.map((skill, index) => (
          <div key={skill.id} className="p-4 border border-black/5 dark:border-white/10 rounded-2xl bg-[#FDFBF7] dark:bg-[#050505] flex flex-col justify-between h-[120px] relative group">
            
            {/* Reorder Buttons */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => handleMove(index, 'up')} disabled={index === 0 || loading} className="p-1 bg-white dark:bg-gray-800 rounded-full shadow border border-gray-200 dark:border-gray-700 hover:text-blue-500 disabled:opacity-30"><ArrowUp size={14}/></button>
              <button onClick={() => handleMove(index, 'down')} disabled={index === items.length - 1 || loading} className="p-1 bg-white dark:bg-gray-800 rounded-full shadow border border-gray-200 dark:border-gray-700 hover:text-blue-500 disabled:opacity-30"><ArrowDown size={14}/></button>
            </div>
            <div className="flex justify-between items-start">
              <Code2 className={`w-5 h-5 ${skill.color}`} />
              <div className="flex gap-2">
                <button onClick={() => handleEdit(skill)} disabled={loading} className="text-xs font-bold text-gray-400 hover:text-blue-500">Edit</button>
                <button onClick={() => handleDelete(skill.id)} disabled={loading} className="text-xs font-bold text-gray-400 hover:text-red-500">Del</button>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-[#1A1B41] dark:text-[#FDFBF7]">{skill.name}</h4>
              <div className="flex justify-between mt-1">
                <span className="text-[10px] font-mono text-gray-500 uppercase">{skill.category}</span>
                <span className={`text-[10px] font-mono ${skill.color}`}>{skill.stat}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
