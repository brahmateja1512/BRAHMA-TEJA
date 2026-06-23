'use client'

import { BookOpen, Plus, ExternalLink } from 'lucide-react'

export default function PublicationsPage() {
  const publications = [
    { title: 'Assessing the Visual SLAM performance in Autonomous Mobile Robots using adaptive GMapping and Cartography', publisher: 'Wiley', date: '2026-03-03', type: 'Journal', link: '#' },
    { title: 'Integrating robotic surgery and pharmacotherapy: A dual approach to lung cancer management', publisher: 'Elsevier', date: '2024-01-01', type: 'Journal', link: '#' }
  ]

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Publications</h2>
          <p className="text-gray-500 mt-1 text-sm">Manage research papers and articles</p>
        </div>
        <button className="bg-gray-100 text-white font-medium px-4 py-2 rounded-lg flex items-center gap-2 text-sm cursor-not-allowed">
          <Plus size={16} /> Add Publication
        </button>
      </div>

      <div className="space-y-4">
        {publications.map((pub, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex gap-4 hover:border-gray-300 transition-colors">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 shrink-0">
              <BookOpen size={20} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-[15px]">{pub.title}</h4>
              <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-500 font-medium">
                <span>{pub.publisher}</span>
                <span>• {pub.date}</span>
                <span>• {pub.type}</span>
                <a href={pub.link} className="flex items-center gap-1 text-blue-500 hover:text-blue-600 transition-colors ml-1">
                  <ExternalLink size={12} /> DOI
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
