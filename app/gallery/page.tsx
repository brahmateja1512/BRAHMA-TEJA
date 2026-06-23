export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-black pt-32 px-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-20 text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-600">Gallery</h1>
        
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {[...Array(9)].map((_, i) => (
            <div key={i} className={`break-inside-avoid relative group overflow-hidden rounded-2xl bg-neutral-900 ${i % 3 === 0 ? 'aspect-square' : 'aspect-[3/4]'}`}>
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay z-10" />
              <div className="absolute inset-0 scale-105 group-hover:scale-100 transition-transform duration-700 ease-out flex items-center justify-center">
                <span className="text-neutral-600">High-Res Image {i+1}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                <p className="text-white font-medium">Hardware Build #{i+1}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
