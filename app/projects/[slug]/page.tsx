import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PROJECTS_DATA } from '@/data/portfolio'
import { ArrowLeft, Github, ExternalLink } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

export function generateStaticParams() {
  return PROJECTS_DATA.map((project) => ({
    slug: project.slug,
  }))
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const slug = resolvedParams.slug

  // Try to fetch from Supabase first
  let project = null
  try {
    const { data, error } = await supabase.from('projects').select('*').eq('slug', slug).single()
    if (data && !error) {
      project = {
        ...data,
        shortDescription: data.short_description,
        detailedContent: data.detailed_content,
        githubUrl: data.github_url,
        demoUrl: data.demo_url
      }
    }
  } catch (e) {
    // Suppress error
  }

  // Fallback to static data
  if (!project) {
    project = PROJECTS_DATA.find(p => p.slug === slug)
  }

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#050505] transition-colors duration-500">
      {/* Hero Header with Image */}
      <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
        <img 
          src={project.images?.[0] || 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000'} 
          alt={project.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] dark:from-[#050505] via-[#FDFBF7]/50 dark:via-[#050505]/50 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end pb-16 px-6 md:px-20 max-w-6xl mx-auto w-full">
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-bold text-[#1A1B41] dark:text-[#FDFBF7] hover:text-[#00F0FF] dark:hover:text-[#00F0FF] transition-colors mb-6 bg-white/20 dark:bg-black/20 backdrop-blur-md px-4 py-2 rounded-full self-start border border-white/20">
            <ArrowLeft size={16} /> Back to Projects
          </Link>
          <span className="text-sm font-bold tracking-widest uppercase text-[#7B61FF] mb-2 block drop-shadow-md">
            {project.type}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#1A1B41] dark:text-[#FDFBF7] mb-6 drop-shadow-lg max-w-4xl">
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            {project.tags?.map((tag: string) => (
              <span key={tag} className="px-4 py-1.5 bg-[#1A1B41]/10 dark:bg-white/10 backdrop-blur-md rounded-xl text-sm font-bold text-[#1A1B41] dark:text-white border border-[#1A1B41]/20 dark:border-white/20">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-6 md:px-20 py-16">
        <div className="flex flex-wrap gap-4 mb-16 pb-8 border-b border-black/10 dark:border-white/10">
          {project.githubUrl && (
            <a href={project.githubUrl} className="flex items-center gap-2 bg-[#1A1B41] dark:bg-[#FDFBF7] text-[#FDFBF7] dark:text-[#050505] px-6 py-3 rounded-xl font-bold hover:scale-105 active:scale-95 transition-transform shadow-md">
              <Github size={20} /> View Source Code
            </a>
          )}
          {project.demoUrl && (
            <a href={project.demoUrl} className="flex items-center gap-2 bg-white dark:bg-[#111] text-[#1A1B41] dark:text-[#FDFBF7] px-6 py-3 rounded-xl font-bold border border-black/10 dark:border-white/10 hover:border-[#00F0FF] dark:hover:border-[#00F0FF] transition-colors shadow-sm">
              <ExternalLink size={20} /> Live Demo
            </a>
          )}
        </div>

        {/* Markdown-style Content Renderer */}
        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-[#1A1B41] dark:prose-headings:text-[#FDFBF7] prose-a:text-[#00F0FF] prose-img:rounded-2xl prose-img:shadow-xl">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {project.detailedContent}
          </ReactMarkdown>
        </div>

        {/* Image Gallery */}
        {project.images && project.images.length > 1 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-[#1A1B41] dark:text-[#FDFBF7] mb-6">Gallery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.images.slice(1).map((img: string, idx: number) => (
                <div key={idx} className="rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 shadow-md">
                  <img src={img} alt={`Gallery ${idx}`} className="w-full h-auto hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
