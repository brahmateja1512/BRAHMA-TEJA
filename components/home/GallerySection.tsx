'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Image as ImageIcon } from 'lucide-react'

const GALLERY_PREVIEW = [
  { src: "/gallery/DSC05166.JPG", title: "University Event" },
  { src: "/gallery/DSC06108.JPG", title: "Speaker Session" },
  { src: "/gallery/DSC06722.JPG", title: "Robotics Workshop" },
  { src: "/gallery/IMG-20240806-WA0003.jpg", title: "Team Assembly" },
  { src: "/gallery/IMG_20240606_115930_289.jpg", title: "Hardware Testing" },
  { src: "/gallery/IMG_20240706_202531_695.jpg", title: "Hackathon Highlight" },
  { src: "/gallery/IMG_20250720_013550.jpg", title: "Research Lab" },
  { src: "/gallery/PXL_20260604_111125472.jpg", title: "Project Deployment" },
  { src: "/gallery/_DSC0479.JPG", title: "Award Ceremony" },
]

export default function GallerySection() {
  return (
    <section id="gallery-preview" className="py-24 px-6 md:px-20 bg-white dark:bg-[#0a0a0a] transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-white/5 border border-black/5 dark:border-white/10 text-xs font-mono mb-6 text-[#1A1B41] dark:text-[#FDFBF7]"
            >
              <ImageIcon size={14} className="text-[#FF4D4D]" />
              <span className="uppercase tracking-widest font-bold">Snapshots</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1B41] dark:text-[#FDFBF7]">LIFE IN <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D4D] to-[#7B61FF]">ACTION</span></h2>
          </div>
          
          <Link href="/gallery">
            <button className="group inline-flex items-center justify-center font-bold transition-all hover:scale-105 active:scale-95 border-2 h-12 text-sm rounded-full px-6 border-[#1A1B41]/10 dark:border-[#FDFBF7]/10 text-[#1A1B41] dark:text-[#FDFBF7] hover:border-[#7B61FF] dark:hover:border-[#7B61FF] hover:text-[#7B61FF]">
              View Full Gallery <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
        </div>

        {/* CSS Marquee / Scroll */}
        <div className="relative w-full overflow-hidden rounded-3xl">
          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {GALLERY_PREVIEW.map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="snap-center shrink-0 w-[85vw] md:w-[400px] lg:w-[500px] relative group rounded-3xl overflow-hidden border border-[#1A1B41]/5 dark:border-[#FDFBF7]/5 aspect-[4/3] bg-gray-100 dark:bg-[#111]"
              >
                <img 
                  src={img.src} 
                  alt={img.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                  <h3 className="text-white font-bold text-xl">{img.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Fading Edges */}
          <div className="absolute top-0 bottom-8 left-0 w-12 bg-gradient-to-r from-white dark:from-[#0a0a0a] to-transparent pointer-events-none" />
          <div className="absolute top-0 bottom-8 right-0 w-12 bg-gradient-to-l from-white dark:from-[#0a0a0a] to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  )
}
