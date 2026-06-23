import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PUBLICATIONS_DATA } from '@/data/portfolio'
import { ArrowLeft, ExternalLink, Download, FileText } from 'lucide-react'

export function generateStaticParams() {
  return PUBLICATIONS_DATA.map((pub) => ({
    slug: pub.slug,
  }))
}

export default async function PublicationPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const pub = PUBLICATIONS_DATA.find(p => p.slug === resolvedParams.slug)

  if (!pub) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#050505] transition-colors duration-500 pt-32 pb-24 px-6 md:px-20">
      <div className="max-w-4xl mx-auto">
        <Link href="/publications" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#1A1B41] dark:hover:text-[#FDFBF7] transition-colors mb-12 bg-white/50 dark:bg-[#111]/50 backdrop-blur-md px-4 py-2 rounded-full border border-black/5 dark:border-white/5">
          <ArrowLeft size={16} /> Back to Publications
        </Link>
        
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-bold tracking-widest uppercase text-[#7B61FF] bg-[#7B61FF]/10 px-3 py-1 rounded-full border border-[#7B61FF]/20">
              {pub.type} • {pub.publisher}
            </span>
            <span className="text-sm font-bold tracking-widest text-gray-500 uppercase">
              {pub.date}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1A1B41] dark:text-[#FDFBF7] mb-6 leading-tight">
            {pub.title}
          </h1>
          
          <div className="flex items-center gap-2 text-lg text-gray-600 dark:text-gray-400 font-medium font-mono">
            <span className="text-[#1A1B41] dark:text-[#FDFBF7]">Authors:</span> {pub.authors}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-16 pb-8 border-b border-black/10 dark:border-white/10">
          <a href={pub.pdfUrl} className="flex items-center gap-2 bg-[#1A1B41] dark:bg-[#FDFBF7] text-[#FDFBF7] dark:text-[#050505] px-6 py-3 rounded-xl font-bold hover:scale-105 active:scale-95 transition-transform shadow-md">
            <Download size={20} /> Download PDF
          </a>
          <a href={pub.doiUrl} className="flex items-center gap-2 bg-white dark:bg-[#111] text-[#1A1B41] dark:text-[#FDFBF7] px-6 py-3 rounded-xl font-bold border border-black/10 dark:border-white/10 hover:border-[#00F0FF] dark:hover:border-[#00F0FF] transition-colors shadow-sm">
            <ExternalLink size={20} /> View Source / DOI
          </a>
        </div>

        {/* Abstract Section */}
        <div className="bg-white dark:bg-[#111] p-8 md:p-12 rounded-[2rem] border border-black/5 dark:border-white/5 shadow-xl relative overflow-hidden">
          {/* Decorative quote mark */}
          <div className="absolute top-4 right-8 text-8xl font-serif text-black/5 dark:text-white/5 pointer-events-none select-none">
            "
          </div>
          <h3 className="text-2xl font-black text-[#1A1B41] dark:text-[#FDFBF7] mb-6">Abstract</h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
            {pub.abstract}
          </p>
        </div>

        {/* PDF Viewer Placeholder */}
        <div className="mt-16">
          <h3 className="text-2xl font-black text-[#1A1B41] dark:text-[#FDFBF7] mb-6">Document Viewer</h3>
          <div className="w-full aspect-[1/1.4] bg-gray-100 dark:bg-[#1a1a1a] rounded-[2rem] border border-black/10 dark:border-white/10 flex items-center justify-center flex-col gap-4">
            <FileText size={48} className="text-gray-300 dark:text-gray-700" />
            <p className="text-gray-500 font-medium text-sm">PDF viewer will render the document here.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
