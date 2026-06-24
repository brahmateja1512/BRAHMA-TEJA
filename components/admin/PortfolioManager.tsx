'use client'

import { useState } from 'react'
import { saveProject, deleteProject, savePublication, deletePublication } from '@/actions/portfolio'
import { bulkUpdateOrder } from '@/actions/reorder'
import { ArrowUp, ArrowDown } from 'lucide-react'

export default function PortfolioManager({ initialProjects, initialPublications }: { initialProjects: any[], initialPublications: any[] }) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [entryType, setEntryType] = useState('Project')
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  const [projects, setProjects] = useState(() => {
    return [...initialProjects]
      .map((item, idx) => ({ ...item, display_order: item.display_order ?? idx }))
      .sort((a, b) => a.display_order - b.display_order)
  })

  const [publications, setPublications] = useState(() => {
    return [...initialPublications]
      .map((item, idx) => ({ ...item, display_order: item.display_order ?? idx }))
      .sort((a, b) => a.display_order - b.display_order)
  })

  async function handleMove(index: number, direction: 'up' | 'down', kind: 'projects' | 'publications') {
    const items = kind === 'projects' ? projects : publications
    const setItems = kind === 'projects' ? setProjects : setPublications

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
    await bulkUpdateOrder(kind, updates)
    setLoading(false)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    
    try {
      if (entryType === 'Project') {
        await saveProject(formData, editingId || undefined)
      } else {
        await savePublication(formData, editingId || undefined)
      }
      setShowAddForm(false)
      setEditingId(null)
      ;(e.target as HTMLFormElement).reset()
    } catch (err) {
      alert('Failed to save')
    }
    setLoading(false)
  }

  async function handleDelete(id: string, kind: string) {
    if (!confirm('Are you sure you want to delete this entry?')) return
    setLoading(true)
    if (kind === 'Projects') {
      await deleteProject(id)
    } else {
      await deletePublication(id)
    }
    setLoading(false)
  }

  function handleEdit(item: any) {
    setEntryType(item._kind === 'Projects' ? 'Project' : 'Publication')
    setEditingId(item.id)
    setShowAddForm(true)
    // Wait for render then populate form
    setTimeout(() => {
      const form = document.getElementById('portfolioForm') as HTMLFormElement
      if (form) {
        if (item._kind === 'Projects') {
          ;(form.elements.namedItem('title') as HTMLInputElement).value = item.title
          ;(form.elements.namedItem('slug') as HTMLInputElement).value = item.slug
          ;(form.elements.namedItem('org') as HTMLInputElement).value = item.type
          ;(form.elements.namedItem('githubUrl') as HTMLInputElement).value = item.github_url || ''
          ;(form.elements.namedItem('demoUrl') as HTMLInputElement).value = item.demo_url || ''
          ;(form.elements.namedItem('images') as HTMLInputElement).value = item.images?.join(', ') || ''
          ;(form.elements.namedItem('shortDescription') as HTMLTextAreaElement).value = item.short_description || ''
          ;(form.elements.namedItem('detailedContent') as HTMLTextAreaElement).value = item.detailed_content || ''
        } else {
          ;(form.elements.namedItem('title') as HTMLInputElement).value = item.title
          ;(form.elements.namedItem('slug') as HTMLInputElement).value = item.slug
          ;(form.elements.namedItem('org') as HTMLInputElement).value = item.publisher || ''
          ;(form.elements.namedItem('authors') as HTMLInputElement).value = item.authors || ''
          ;(form.elements.namedItem('publishedDate') as HTMLInputElement).value = item.published_date || ''
          ;(form.elements.namedItem('pdfUrl') as HTMLInputElement).value = item.pdf_url || ''
          ;(form.elements.namedItem('doiUrl') as HTMLInputElement).value = item.doi_url || ''
          ;(form.elements.namedItem('shortDescription') as HTMLTextAreaElement).value = item.short_description || ''
          ;(form.elements.namedItem('detailedContent') as HTMLTextAreaElement).value = item.abstract || ''
        }
      }
    }, 50)
  }

  return (
    <div className="bg-white dark:bg-[#111] p-8 rounded-3xl border border-black/5 dark:border-white/5 shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-[#1A1B41] dark:text-[#FDFBF7]">Portfolio Manager (Projects & Publications)</h2>
        <button 
          onClick={() => {
            setShowAddForm(!showAddForm);
            setEditingId(null);
            setTimeout(() => {
              const form = document.getElementById('portfolioForm') as HTMLFormElement
              if (form) form.reset()
            }, 50)
          }}
          className="bg-[#1A1B41] dark:bg-[#FDFBF7] text-white dark:text-black font-bold py-2 px-6 rounded-xl hover:scale-105 active:scale-95 transition-transform"
        >
          {showAddForm ? 'Close Form' : '+ Add New Entry'}
        </button>
      </div>

      {showAddForm && (
        <form id="portfolioForm" onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-50 dark:bg-[#050505] rounded-2xl border border-black/5 dark:border-white/5">
          <h3 className="text-lg font-bold text-[#1A1B41] dark:text-[#FDFBF7] mb-4">
            {editingId ? 'Edit Entry' : 'Add New Portfolio Entry'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Type</label>
              <select 
                value={entryType}
                onChange={(e) => setEntryType(e.target.value)}
                disabled={!!editingId} // Don't allow changing type while editing
                className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]"
              >
                <option value="Project">Project</option>
                <option value="Publication">Publication</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                {entryType === 'Project' ? 'Project Title' : 'Publication Title'}
              </label>
              <input name="title" required type="text" className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" placeholder={entryType === 'Project' ? "e.g. Autonomous Rover" : "e.g. Visual SLAM Paper"} />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">URL Slug</label>
              <input name="slug" required type="text" className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" placeholder="e.g. my-autonomous-rover" />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                {entryType === 'Project' ? 'Organization / Client' : 'Journal / Conference / Publisher'}
              </label>
              <input name="org" required type="text" className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" placeholder={entryType === 'Project' ? "e.g. Karthikesh Robotics" : "e.g. IEEE Robotics"} />
            </div>
            
            {entryType === 'Project' && (
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">GitHub URL</label>
                <input name="githubUrl" type="text" className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" placeholder="https://..." />
              </div>
            )}
            
            {entryType === 'Project' && (
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Live Demo URL</label>
                <input name="demoUrl" type="text" className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" placeholder="https://..." />
              </div>
            )}

            {entryType === 'Project' && (
              <div className="md:col-span-2 grid grid-cols-1 gap-4 p-4 border border-[#00F0FF]/20 bg-[#00F0FF]/5 rounded-xl mt-2 animate-in fade-in slide-in-from-top-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#00F0FF] block mb-2">Project Specific Details</span>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Image URLs (comma separated for gallery)</label>
                  <input name="images" type="text" className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" placeholder="https://image1.jpg, https://image2.jpg" />
                </div>
              </div>
            )}

            {entryType === 'Publication' && (
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-[#7B61FF]/20 bg-[#7B61FF]/5 rounded-xl mt-2 animate-in fade-in slide-in-from-top-2">
                <div className="md:col-span-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#7B61FF] block">Publication Specific Details</span>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Co-Authors</label>
                  <input name="authors" required type="text" className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" placeholder="e.g. John Doe, Jane Smith" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Publication Date</label>
                  <input name="publishedDate" required type="text" className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" placeholder="e.g. Jan 2024" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">DOI URL</label>
                  <input name="doiUrl" type="text" className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" placeholder="https://doi.org/..." />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">PDF Document URL</label>
                  <input name="pdfUrl" type="text" className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" placeholder="/documents/paper.pdf or https://..." />
                </div>
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Short Description</label>
            <textarea name="shortDescription" required rows={2} className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" placeholder="A 1-2 sentence summary for the homepage card..." />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              {entryType === 'Project' ? 'Detailed Content (Markdown Supported)' : 'Full Abstract'}
            </label>
            <textarea name="detailedContent" required rows={6} className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" placeholder={entryType === 'Project' ? "Write out the full case study here..." : "The full abstract of the paper..."} />
          </div>
          <button disabled={loading} type="submit" className="bg-[#00F0FF] text-[#1A1B41] font-bold py-3 px-8 rounded-xl hover:scale-105 active:scale-95 transition-transform w-full md:w-auto disabled:opacity-50 disabled:pointer-events-none">
            {loading ? 'Saving...' : (editingId ? 'Update Entry' : 'Save Entry')}
          </button>
        </form>
      )}
      
      <div className="mb-4">
        <h3 className="text-xl font-bold text-[#1A1B41] dark:text-[#FDFBF7] mb-4">Projects</h3>
        <div className="space-y-4">
          {projects.length === 0 ? (
            <p className="text-gray-500 italic p-4 text-center">No projects found.</p>
          ) : projects.map((item, index) => (
            <div key={item.id} className="relative group flex flex-col md:flex-row md:items-center justify-between p-6 border border-black/5 dark:border-white/10 rounded-2xl bg-[#FDFBF7] dark:bg-[#050505] gap-4">
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleMove(index, 'up', 'projects')} disabled={index === 0 || loading} className="p-1 bg-white dark:bg-gray-800 rounded-full shadow border border-gray-200 dark:border-gray-700 hover:text-blue-500 disabled:opacity-30"><ArrowUp size={14}/></button>
                <button onClick={() => handleMove(index, 'down', 'projects')} disabled={index === projects.length - 1 || loading} className="p-1 bg-white dark:bg-gray-800 rounded-full shadow border border-gray-200 dark:border-gray-700 hover:text-blue-500 disabled:opacity-30"><ArrowDown size={14}/></button>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-[#7B61FF]/10 text-[#7B61FF]">
                    Projects
                  </span>
                </div>
                <h3 className="font-bold text-xl text-[#1A1B41] dark:text-[#FDFBF7]">{item.title}</h3>
                <p className="text-gray-500 font-medium">{item.type}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit({ ...item, _kind: 'Projects' })} disabled={loading} className="text-gray-400 hover:text-blue-500 font-bold px-4 py-2 border border-black/10 dark:border-white/10 rounded-xl transition-colors disabled:opacity-50">Edit</button>
                <button onClick={() => handleDelete(item.id, 'Projects')} disabled={loading} className="text-gray-400 hover:text-red-500 font-bold px-4 py-2 border border-black/10 dark:border-white/10 rounded-xl transition-colors disabled:opacity-50">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-[#1A1B41] dark:text-[#FDFBF7] mb-4 mt-8">Publications</h3>
        <div className="space-y-4">
          {publications.length === 0 ? (
            <p className="text-gray-500 italic p-4 text-center">No publications found.</p>
          ) : publications.map((item, index) => (
            <div key={item.id} className="relative group flex flex-col md:flex-row md:items-center justify-between p-6 border border-black/5 dark:border-white/10 rounded-2xl bg-[#FDFBF7] dark:bg-[#050505] gap-4">
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleMove(index, 'up', 'publications')} disabled={index === 0 || loading} className="p-1 bg-white dark:bg-gray-800 rounded-full shadow border border-gray-200 dark:border-gray-700 hover:text-blue-500 disabled:opacity-30"><ArrowUp size={14}/></button>
                <button onClick={() => handleMove(index, 'down', 'publications')} disabled={index === publications.length - 1 || loading} className="p-1 bg-white dark:bg-gray-800 rounded-full shadow border border-gray-200 dark:border-gray-700 hover:text-blue-500 disabled:opacity-30"><ArrowDown size={14}/></button>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-[#00F0FF]/10 text-[#00F0FF]">
                    Publications
                  </span>
                </div>
                <h3 className="font-bold text-xl text-[#1A1B41] dark:text-[#FDFBF7]">{item.title}</h3>
                <p className="text-gray-500 font-medium">{item.publisher}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit({ ...item, _kind: 'Publications' })} disabled={loading} className="text-gray-400 hover:text-blue-500 font-bold px-4 py-2 border border-black/10 dark:border-white/10 rounded-xl transition-colors disabled:opacity-50">Edit</button>
                <button onClick={() => handleDelete(item.id, 'Publications')} disabled={loading} className="text-gray-400 hover:text-red-500 font-bold px-4 py-2 border border-black/10 dark:border-white/10 rounded-xl transition-colors disabled:opacity-50">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
