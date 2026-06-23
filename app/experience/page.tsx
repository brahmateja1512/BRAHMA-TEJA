export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-black pt-32 px-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-600">Experience</h1>
        
        <div className="space-y-20 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-neutral-800 before:to-transparent">
          
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-700 bg-black shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm">
              <span className="text-sm text-neutral-400 font-mono">2023 - Present</span>
              <h3 className="text-2xl font-bold mt-2">M.Sc. Autonomy Technologies</h3>
              <p className="text-neutral-400 mt-2">FAU Erlangen-Nürnberg</p>
            </div>
          </div>

          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-700 bg-black shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              <div className="w-3 h-3 bg-neutral-600 rounded-full"></div>
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm">
              <span className="text-sm text-neutral-400 font-mono">2022 - 2023</span>
              <h3 className="text-2xl font-bold mt-2">Student Assistant</h3>
              <p className="text-neutral-400 mt-2">STEMx</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
