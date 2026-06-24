'use client'

import { useState } from 'react'
import { Plus, Quote } from 'lucide-react'
import { saveRecommendation, deleteRecommendation } from '@/actions/recommendations'
import { bulkUpdateOrder } from '@/actions/reorder'
import { ArrowUp, ArrowDown } from 'lucide-react'

export default function RecommendationsManager({ initialRecommendations }: { initialRecommendations: any[] }) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [items, setItems] = useState(() => {
    return [...initialRecommendations]
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
    await bulkUpdateOrder('recommendations', updates)
    setLoading(false)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    
    try {
      await saveRecommendation(formData, editingId || undefined)
      setShowAddForm(false)
      setEditingId(null)
      ;(e.target as HTMLFormElement).reset()
    } catch (err) {
      alert('Failed to save')
    }
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this recommendation?')) return
    setLoading(true)
    await deleteRecommendation(id)
    setLoading(false)
  }

  function handleEdit(item: any) {
    setEditingId(item.id)
    setShowAddForm(true)
    setTimeout(() => {
      const form = document.getElementById('recommendationsForm') as HTMLFormElement
      if (form) {
        ;(form.elements.namedItem('author') as HTMLInputElement).value = item.author
        ;(form.elements.namedItem('role') as HTMLInputElement).value = item.role
        ;(form.elements.namedItem('text') as HTMLTextAreaElement).value = item.text
      }
    }, 50)
  }

  return (
    <div className="bg-white dark:bg-[#111] p-8 rounded-3xl border border-black/5 dark:border-white/5 shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[#1A1B41] dark:text-[#FDFBF7]">Recommendations</h2>
          <p className="text-gray-500 mt-1 text-sm font-medium">Manage endorsements from colleagues and mentors</p>
        </div>
        <button 
          onClick={() => {
            setShowAddForm(!showAddForm)
            setEditingId(null)
          }}
          className="bg-[#1A1B41] dark:bg-[#FDFBF7] text-white dark:text-black font-bold py-2 px-6 rounded-xl hover:scale-105 active:scale-95 transition-transform flex items-center gap-2"
        >
          {showAddForm ? 'Close Form' : <><Plus size={16} /> Add Endorsement</>}
        </button>
      </div>

      {showAddForm && (
        <form id="recommendationsForm" onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-50 dark:bg-[#050505] rounded-2xl border border-black/5 dark:border-white/5">
          <h3 className="text-lg font-bold text-[#1A1B41] dark:text-[#FDFBF7] mb-4">
            {editingId ? 'Edit Endorsement' : 'Add New Endorsement'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Author Name</label>
              <input name="author" required type="text" className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" placeholder="e.g. Dr. Heinz" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Role / Relationship</label>
              <input name="role" required type="text" className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" placeholder="e.g. Professor, FAU" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Recommendation Text</label>
            <textarea name="text" required rows={4} className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" placeholder="Brahma Teja is an exceptional engineer..." />
          </div>
          <button disabled={loading} type="submit" className="bg-[#00F0FF] text-[#1A1B41] font-bold py-3 px-8 rounded-xl hover:scale-105 active:scale-95 transition-transform disabled:opacity-50">
            {loading ? 'Saving...' : (editingId ? 'Update Entry' : 'Save Entry')}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.length === 0 ? (
          <p className="text-gray-500 italic p-4 col-span-full text-center">No recommendations found.</p>
        ) : items.map((rec, index) => (
          <div key={rec.id} className="relative group p-8 border border-black/5 dark:border-white/10 rounded-3xl bg-[#FDFBF7] dark:bg-[#050505] flex flex-col justify-between">
            
            {/* Reorder Buttons */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => handleMove(index, 'up')} disabled={index === 0 || loading} className="p-1 bg-white dark:bg-gray-800 rounded-full shadow border border-gray-200 dark:border-gray-700 hover:text-blue-500 disabled:opacity-30"><ArrowUp size={14}/></button>
              <button onClick={() => handleMove(index, 'down')} disabled={index === items.length - 1 || loading} className="p-1 bg-white dark:bg-gray-800 rounded-full shadow border border-gray-200 dark:border-gray-700 hover:text-blue-500 disabled:opacity-30"><ArrowDown size={14}/></button>
            </div>

            <div>
              <Quote className="text-gray-200 dark:text-white/5 w-12 h-12 mb-4" />
              <p className="text-gray-700 dark:text-gray-300 italic mb-6">"{rec.text}"</p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-black/5 dark:border-white/5">
              <div>
                <h4 className="font-bold text-[#1A1B41] dark:text-[#FDFBF7]">{rec.author}</h4>
                <p className="text-xs font-mono text-gray-500">{rec.role}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(rec)} disabled={loading} className="text-xs font-bold text-gray-400 hover:text-blue-500 border border-black/10 dark:border-white/10 px-3 py-1.5 rounded-lg disabled:opacity-50">Edit</button>
                <button onClick={() => handleDelete(rec.id)} disabled={loading} className="text-xs font-bold text-gray-400 hover:text-red-500 border border-black/10 dark:border-white/10 px-3 py-1.5 rounded-lg disabled:opacity-50">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
