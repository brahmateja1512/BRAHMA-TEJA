'use client'

import { useState } from 'react'
import { Plus, Briefcase, GraduationCap } from 'lucide-react'
import { saveJourney, deleteJourney } from '@/actions/journey'
import { bulkUpdateOrder } from '@/actions/reorder'
import { ArrowUp, ArrowDown } from 'lucide-react'

export default function JourneyManager({ initialJourney }: { initialJourney: any[] }) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formType, setFormType] = useState('Experience')

  const [items, setItems] = useState(() => {
    return [...initialJourney]
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
    await bulkUpdateOrder('journey', updates)
    setLoading(false)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    
    try {
      await saveJourney(formData, editingId || undefined)
      setShowAddForm(false)
      setEditingId(null)
      ;(e.target as HTMLFormElement).reset()
    } catch (err) {
      alert('Failed to save')
    }
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this entry?')) return
    setLoading(true)
    await deleteJourney(id)
    setLoading(false)
  }

  function handleEdit(item: any) {
    setEditingId(item.id)
    setFormType(item.type)
    setShowAddForm(true)
    setTimeout(() => {
      const form = document.getElementById('journeyForm') as HTMLFormElement
      if (form) {
        ;(form.elements.namedItem('type') as HTMLSelectElement).value = item.type
        ;(form.elements.namedItem('role_degree') as HTMLInputElement).value = item.role_degree
        ;(form.elements.namedItem('organization_institution') as HTMLInputElement).value = item.organization_institution
        ;(form.elements.namedItem('period') as HTMLInputElement).value = item.period
        ;(form.elements.namedItem('location') as HTMLInputElement).value = item.location
        ;(form.elements.namedItem('description') as HTMLTextAreaElement).value = item.description || ''
        ;(form.elements.namedItem('grade') as HTMLInputElement).value = item.grade || ''
        ;(form.elements.namedItem('courses') as HTMLInputElement).value = item.courses || ''
        ;(form.elements.namedItem('tags') as HTMLInputElement).value = item.tags ? item.tags.join(', ') : ''
      }
    }, 50)
  }

  return (
    <div className="bg-white dark:bg-[#111] p-8 rounded-3xl border border-black/5 dark:border-white/5 shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[#1A1B41] dark:text-[#FDFBF7]">Journey & Experience</h2>
          <p className="text-gray-500 mt-1 text-sm font-medium">Manage your career and education timeline</p>
        </div>
        <button 
          onClick={() => {
            setShowAddForm(!showAddForm)
            setEditingId(null)
          }}
          className="bg-[#1A1B41] dark:bg-[#FDFBF7] text-white dark:text-black font-bold py-2 px-6 rounded-xl hover:scale-105 active:scale-95 transition-transform flex items-center gap-2"
        >
          {showAddForm ? 'Close Form' : <><Plus size={16} /> Add Entry</>}
        </button>
      </div>

      {showAddForm && (
        <form id="journeyForm" onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-50 dark:bg-[#050505] rounded-2xl border border-black/5 dark:border-white/5">
          <h3 className="text-lg font-bold text-[#1A1B41] dark:text-[#FDFBF7] mb-4">
            {editingId ? 'Edit Entry' : 'Add New Entry'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Type</label>
              <select name="type" required value={formType} onChange={(e) => setFormType(e.target.value)} className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]">
                <option value="Experience">Experience (Work)</option>
                <option value="Education">Education</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">{formType === 'Experience' ? 'Role / Title' : 'Degree'}</label>
              <input name="role_degree" required type="text" className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">{formType === 'Experience' ? 'Company / Organization' : 'Institution'}</label>
              <input name="organization_institution" required type="text" className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Period</label>
              <input name="period" required type="text" className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" placeholder="e.g. 2022 - Present" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Location</label>
              <input name="location" required type="text" className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" placeholder="e.g. Erlangen, Germany" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Tags (Comma separated)</label>
              <input name="tags" type="text" className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" placeholder="e.g. ROS2, Python, C++" />
            </div>
            {formType === 'Education' && (
              <>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Grade / GPA</label>
                  <input name="grade" type="text" className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" placeholder="e.g. 1.4 / 1.0" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Relevant Coursework</label>
                  <input name="courses" type="text" className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" placeholder="e.g. Advanced Robotics, ML" />
                </div>
              </>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <textarea name="description" required rows={4} className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" placeholder="Detail your experience or studies..." />
          </div>
          <button disabled={loading} type="submit" className="bg-[#00F0FF] text-[#1A1B41] font-bold py-3 px-8 rounded-xl hover:scale-105 active:scale-95 transition-transform disabled:opacity-50">
            {loading ? 'Saving...' : (editingId ? 'Update Entry' : 'Save Entry')}
          </button>
        </form>
      )}

      <div className="space-y-4">
        {items.length === 0 ? (
          <p className="text-gray-500 italic p-4 text-center">No journey entries found.</p>
        ) : items.map((entry, index) => (
          <div key={entry.id} className="relative group p-6 border border-black/5 dark:border-white/10 rounded-2xl bg-[#FDFBF7] dark:bg-[#050505] flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            
            {/* Reorder Buttons */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => handleMove(index, 'up')} disabled={index === 0 || loading} className="p-1 bg-white dark:bg-gray-800 rounded-full shadow border border-gray-200 dark:border-gray-700 hover:text-blue-500 disabled:opacity-30"><ArrowUp size={14}/></button>
              <button onClick={() => handleMove(index, 'down')} disabled={index === items.length - 1 || loading} className="p-1 bg-white dark:bg-gray-800 rounded-full shadow border border-gray-200 dark:border-gray-700 hover:text-blue-500 disabled:opacity-30"><ArrowDown size={14}/></button>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0 border border-black/5 dark:border-white/10">
                {entry.type === 'Experience' ? <Briefcase size={20} className="text-[#00F0FF]" /> : <GraduationCap size={20} className="text-[#7B61FF]" />}
              </div>
              <div>
                <h4 className="font-bold text-lg text-[#1A1B41] dark:text-[#FDFBF7]">{entry.role_degree}</h4>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="font-medium text-[#1A1B41] dark:text-[#FDFBF7]">{entry.organization_institution}</span>
                  <span className="text-gray-300 dark:text-gray-700">•</span>
                  <span className="text-sm font-mono text-gray-500">{entry.period}</span>
                </div>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {entry.tags && entry.tags.map((tag: string) => (
                    <span key={tag} className="text-xs px-2 py-1 bg-black/5 dark:bg-white/5 rounded-md font-mono">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => handleEdit(entry)} disabled={loading} className="text-sm font-bold text-gray-400 hover:text-blue-500 px-4 py-2 border border-black/10 dark:border-white/10 rounded-xl disabled:opacity-50">Edit</button>
              <button onClick={() => handleDelete(entry.id)} disabled={loading} className="text-sm font-bold text-gray-400 hover:text-red-500 px-4 py-2 border border-black/10 dark:border-white/10 rounded-xl disabled:opacity-50">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
