export default function AwardsSettings() {
  return (
    <div className="bg-white dark:bg-[#111] p-8 rounded-3xl border border-black/5 dark:border-white/5 shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-[#1A1B41] dark:text-[#FDFBF7]">Awards & Praise Manager</h2>
        <button className="bg-[#1A1B41] dark:bg-[#FDFBF7] text-white dark:text-black font-bold py-2 px-6 rounded-xl hover:scale-105 active:scale-95 transition-transform">
          + Add New Entry
        </button>
      </div>
      
      <div className="space-y-4">
        {[
          { title: 'Best Innovator Award', org: 'Tech Symposium', type: 'Achievement' },
          { title: 'Dr. Heinz Recommendation', org: 'FAU', type: 'Recommendation' }
        ].map(item => (
          <div key={item.title} className="flex flex-col md:flex-row md:items-center justify-between p-6 border border-black/5 dark:border-white/10 rounded-2xl bg-[#FDFBF7] dark:bg-[#050505] gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${item.type === 'Achievement' ? 'bg-[#FF4D4D]/10 text-[#FF4D4D]' : 'bg-[#00F0FF]/10 text-[#00F0FF]'}`}>
                  {item.type}
                </span>
              </div>
              <h3 className="font-bold text-xl text-[#1A1B41] dark:text-[#FDFBF7]">{item.title}</h3>
              <p className="text-gray-500 font-medium">{item.org}</p>
            </div>
            <div className="flex gap-2">
              <button className="text-gray-400 hover:text-blue-500 font-bold px-4 py-2 border border-black/10 dark:border-white/10 rounded-xl">Edit</button>
              <button className="text-gray-400 hover:text-red-500 font-bold px-4 py-2 border border-black/10 dark:border-white/10 rounded-xl">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
