'use client'

import { useState } from 'react'
import { Trophy, Plus } from 'lucide-react'
import { saveAchievement, deleteAchievement } from '@/actions/achievements'
import { bulkUpdateOrder } from '@/actions/reorder'
import { ArrowUp, ArrowDown } from 'lucide-react'

export default function AchievementsManager({ initialAchievements }: { initialAchievements: any[] }) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [items, setItems] = useState(() => {
    return [...initialAchievements]
      .map((item, idx) => ({ ...item, display_order: item.display_order ?? idx }))
      .sort((a, b) => a.display_order - b.display_order)
  })

  async function handleMove(index: number, direction: 'up' | 'down') {
    if (direction === 'up' && index === 0) return
    if (direction === 'down' && index === items.length - 1) return

    const newItems = [...items]
    const swapIndex = direction === 'up' ? index - 1 : index + 1
    
    const temp = newItems[index]
    newItems[index] = newItems[swapIndex]
    newItems[swapIndex] = temp

    const updatedItems = newItems.map((item, idx) => ({ ...item, display_order: idx }))
    setItems(updatedItems)
    
    setLoading(true)
    const updates = updatedItems.map(item => ({ id: item.id, order: item.display_order }))
    await bulkUpdateOrder('achievements', updates)
    setLoading(false)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    
    try {
      await saveAchievement(formData, editingId || undefined)
      setShowAddForm(false)
      setEditingId(null)
      ;(e.target as HTMLFormElement).reset()
    } catch (err) {
      alert('Failed to save')
    }
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this achievement?')) return
    setLoading(true)
    await deleteAchievement(id)
    setLoading(false)
  }

  function handleEdit(item: any) {
    setEditingId(item.id)
    setShowAddForm(true)
    setTimeout(() => {
      const form = document.getElementById('achievementForm') as HTMLFormElement
      if (form) {
        ;(form.elements.namedItem('title') as HTMLInputElement).value = item.title
        ;(form.elements.namedItem('org') as HTMLInputElement).value = item.org
        ;(form.elements.namedItem('date') as HTMLInputElement).value = item.date
        ;(form.elements.namedItem('type') as HTMLSelectElement).value = item.type
        ;(form.elements.namedItem('description') as HTMLTextAreaElement).value = item.description || ''
      }
    }, 50)
  }

  return (
    <div className="bg-white dark:bg-[#111] p-8 rounded-3xl border border-black/5 dark:border-white/5 shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[#1A1B41] dark:text-[#FDFBF7]">Achievements & Awards</h2>
          <p className="text-gray-500 mt-1 text-sm font-medium">Track your awards, certifications, and recognitions</p>
        </div>
        <button 
          onClick={() => {
            setShowAddForm(!showAddForm);
            setEditingId(null);
            setTimeout(() => {
              const form = document.getElementById('achievementForm') as HTMLFormElement
              if (form) form.reset()
            }, 50)
          }}
          className="bg-[#1A1B41] dark:bg-[#FDFBF7] text-white dark:text-black font-bold py-2 px-6 rounded-xl hover:scale-105 active:scale-95 transition-transform flex items-center gap-2"
        >
          {showAddForm ? 'Close Form' : <><Plus size={16} /> Add Achievement</>}
        </button>
      </div>

      {showAddForm && (
        <form id="achievementForm" onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-50 dark:bg-[#050505] rounded-2xl border border-black/5 dark:border-white/5">
          <h3 className="text-lg font-bold text-[#1A1B41] dark:text-[#FDFBF7] mb-4">
            {editingId ? 'Edit Achievement' : 'Add New Achievement'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Title</label>
              <input name="title" required type="text" className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" placeholder="e.g. Best Innovator Award" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Organization</label>
              <input name="org" required type="text" className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" placeholder="e.g. IEEE or University Name" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Date</label>
              <input name="date" required type="text" className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" placeholder="e.g. Mar 2024" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Type</label>
              <select name="type" className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]">
                <option value="Award">Award</option>
                <option value="Certification">Certification</option>
                <option value="Recognition">Recognition</option>
                <option value="Competition">Competition</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <textarea name="description" rows={3} className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" placeholder="Details about this achievement..." />
          </div>
          <button disabled={loading} type="submit" className="bg-[#00F0FF] text-[#1A1B41] font-bold py-3 px-8 rounded-xl hover:scale-105 active:scale-95 transition-transform disabled:opacity-50">
            {loading ? 'Saving...' : (editingId ? 'Update Entry' : 'Save Entry')}
          </button>
        </form>
      )}

      <div className="space-y-4">
        {items.length === 0 ? (
          <p className="text-gray-500 italic p-4 text-center">No achievements found. Add your first award above!</p>
        ) : items.map((ach, index) => (
          <div key={ach.id} className="relative group flex items-center justify-between p-6 border border-black/5 dark:border-white/10 rounded-2xl bg-[#FDFBF7] dark:bg-[#050505] gap-4">
            
            {/* Reorder Buttons */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => handleMove(index, 'up')} disabled={index === 0 || loading} className="p-1 bg-white dark:bg-gray-800 rounded-full shadow border border-gray-200 dark:border-gray-700 hover:text-blue-500 disabled:opacity-30"><ArrowUp size={14}/></button>
              <button onClick={() => handleMove(index, 'down')} disabled={index === items.length - 1 || loading} className="p-1 bg-white dark:bg-gray-800 rounded-full shadow border border-gray-200 dark:border-gray-700 hover:text-blue-500 disabled:opacity-30"><ArrowDown size={14}/></button>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-yellow-50 dark:bg-yellow-500/10 rounded-2xl flex items-center justify-center text-yellow-600 dark:text-yellow-400 shrink-0 border border-yellow-200 dark:border-yellow-500/20">
                <Trophy size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg text-[#1A1B41] dark:text-[#FDFBF7]">{ach.title}</h4>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs font-bold uppercase tracking-widest bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full border border-black/5 dark:border-white/5">{ach.type}</span>
                  <span className="text-sm font-medium text-gray-500">{ach.org}</span>
                  <span className="text-sm font-medium text-gray-400">• {ach.date}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(ach)} disabled={loading} className="text-gray-400 hover:text-blue-500 font-bold px-4 py-2 border border-black/10 dark:border-white/10 rounded-xl disabled:opacity-50">Edit</button>
              <button onClick={() => handleDelete(ach.id)} disabled={loading} className="text-gray-400 hover:text-red-500 font-bold px-4 py-2 border border-black/10 dark:border-white/10 rounded-xl disabled:opacity-50">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
