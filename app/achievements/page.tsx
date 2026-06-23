export default function AchievementsPage() {
  return (
    <div className="min-h-screen bg-black pt-32 px-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-20 text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-600">Achievements</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <section>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-4">
              <span className="w-10 h-px bg-neutral-700"></span> Publications
            </h2>
            <div className="space-y-6">
              <div className="p-6 bg-neutral-900 rounded-2xl border border-neutral-800 hover:border-neutral-600 transition-colors">
                <span className="text-sm font-mono text-neutral-400">2024</span>
                <h3 className="text-xl font-bold mt-2">Advanced SLAM in GPS-Denied Environments</h3>
                <p className="text-neutral-400 mt-2">IEEE Robotics and Automation Letters</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-4">
              <span className="w-10 h-px bg-neutral-700"></span> Leadership & Awards
            </h2>
            <div className="space-y-6">
              <div className="p-6 bg-neutral-900 rounded-2xl border border-neutral-800 hover:border-neutral-600 transition-colors">
                <span className="text-sm font-mono text-neutral-400">2023</span>
                <h3 className="text-xl font-bold mt-2">1st Place Robotics Hackathon</h3>
                <p className="text-neutral-400 mt-2">Developed autonomous drone navigation module.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
