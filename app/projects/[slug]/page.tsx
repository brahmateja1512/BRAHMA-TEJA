import Link from 'next/link'

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  return (
    <div className="min-h-screen bg-black pt-32 px-10 pb-32">
      <div className="max-w-4xl mx-auto">
        <Link href="/projects" className="text-neutral-400 hover:text-white transition-colors mb-10 inline-block">&larr; Back to Projects</Link>
        <div className="aspect-video w-full bg-neutral-900 rounded-3xl mb-12 flex items-center justify-center">
          <span className="text-neutral-600">Sanity Hero Image</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6">{slug}</h1>
        <div className="flex gap-4 mb-10">
          <span className="px-4 py-2 rounded-full bg-neutral-900 text-sm">React</span>
          <span className="px-4 py-2 rounded-full bg-neutral-900 text-sm">Three.js</span>
        </div>
        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-neutral-400 leading-relaxed">
            This is the dynamic details page for {slug}. Normally this content would be deeply fetched from Sanity's Portable Text rich text editor, allowing for embedded images, code blocks, and dynamic layouts natively within the content stream.
          </p>
        </div>
      </div>
    </div>
  )
}
