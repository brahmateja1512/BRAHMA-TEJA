import Link from 'next/link'

export default function ProjectsPage() {
  // Normally this would fetch from Sanity: await client.fetch(`*[_type == "projects"]`)
  return (
    <div className="min-h-screen bg-black pt-32 px-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-600">Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Link key={i} href={`/projects/project-${i}`} className="group relative aspect-video bg-neutral-900 rounded-2xl overflow-hidden block">
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6 z-10">
                <h3 className="text-2xl font-bold">Project {i}</h3>
                <p className="text-neutral-400 mt-2">View details &rarr;</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
