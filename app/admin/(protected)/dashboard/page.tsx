export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#111] p-6 rounded-3xl border border-black/5 dark:border-white/5 shadow-sm">
          <h3 className="text-gray-500 font-bold mb-2">Total Views</h3>
          <p className="text-4xl font-black text-[#1A1B41] dark:text-[#FDFBF7]">1,204</p>
          <span className="text-emerald-500 text-sm font-bold mt-2 inline-block">↑ 12% this week</span>
        </div>
        <div className="bg-white dark:bg-[#111] p-6 rounded-3xl border border-black/5 dark:border-white/5 shadow-sm">
          <h3 className="text-gray-500 font-bold mb-2">New Messages</h3>
          <p className="text-4xl font-black text-[#1A1B41] dark:text-[#FDFBF7]">5</p>
          <span className="text-[#FF4D4D] text-sm font-bold mt-2 inline-block">Action Required</span>
        </div>
        <div className="bg-white dark:bg-[#111] p-6 rounded-3xl border border-black/5 dark:border-white/5 shadow-sm">
          <h3 className="text-gray-500 font-bold mb-2">Resume Downloads</h3>
          <p className="text-4xl font-black text-[#1A1B41] dark:text-[#FDFBF7]">42</p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#111] p-8 rounded-3xl border border-black/5 dark:border-white/5 shadow-sm">
        <h2 className="text-xl font-bold text-[#1A1B41] dark:text-[#FDFBF7] mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 rounded-2xl bg-gray-50 dark:bg-[#1a1a1a] hover:bg-gray-100 dark:hover:bg-[#222] font-bold text-gray-700 dark:text-gray-300 transition-colors">
            Update Resume
          </button>
          <button className="p-4 rounded-2xl bg-gray-50 dark:bg-[#1a1a1a] hover:bg-gray-100 dark:hover:bg-[#222] font-bold text-gray-700 dark:text-gray-300 transition-colors">
            Add Project
          </button>
          <button className="p-4 rounded-2xl bg-gray-50 dark:bg-[#1a1a1a] hover:bg-gray-100 dark:hover:bg-[#222] font-bold text-gray-700 dark:text-gray-300 transition-colors">
            Check Messages
          </button>
          <button className="p-4 rounded-2xl bg-gray-50 dark:bg-[#1a1a1a] hover:bg-gray-100 dark:hover:bg-[#222] font-bold text-gray-700 dark:text-gray-300 transition-colors">
            Site Settings
          </button>
        </div>
      </div>
    </div>
  )
}
