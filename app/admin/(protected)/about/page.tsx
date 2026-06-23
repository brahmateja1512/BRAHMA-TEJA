export default function AboutSettings() {
  return (
    <div className="bg-white dark:bg-[#111] p-8 rounded-3xl border border-black/5 dark:border-white/5 shadow-sm">
      <h2 className="text-2xl font-bold text-[#1A1B41] dark:text-[#FDFBF7] mb-8">About Section Configuration</h2>
      
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Section Headline</label>
          <input type="text" className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#050505] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" defaultValue="Engineering Autonomy & Building Robots." />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Biography</label>
          <textarea rows={5} className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#050505] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" defaultValue="I am an ambitious Autonomy Technologies & Robotics Engineer. With a robust background in embedded systems and simulation, I strive to bridge the gap between software and physical hardware." />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Projects Count</label>
            <input type="number" className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#050505] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" defaultValue="10" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Publications Count</label>
            <input type="number" className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#050505] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" defaultValue="2" />
          </div>
        </div>

        <div className="pt-4">
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Profile Photo URL</label>
          <div className="flex gap-4">
            <input type="text" className="flex-1 px-4 py-3 bg-[#FDFBF7] dark:bg-[#050505] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" placeholder="https://..." />
            <button type="button" className="bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 font-bold py-3 px-6 rounded-xl hover:bg-gray-200 dark:hover:bg-white/20 transition-colors">
              Upload New
            </button>
          </div>
        </div>

        <button type="button" className="bg-[#1A1B41] dark:bg-[#FDFBF7] text-white dark:text-black font-bold py-3 px-8 rounded-xl hover:scale-105 active:scale-95 transition-transform mt-4">
          Save Changes
        </button>
      </form>
    </div>
  )
}
