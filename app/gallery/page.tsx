'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const GALLERY_IMAGES = [
  { src: "/gallery/university_group.jpg", title: "University Group Photo" },
  { src: "/gallery/engineers_day.jpg", title: "Engineers Day Speech" },
  { src: "/gallery/robotics_workshop.jpg", title: "Building Autonomous Robots" },
  { src: "/gallery/mahotsav_festival.jpg", title: "Mahotsav Youth Festival" },
]

const containerVars = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVars = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring', bounce: 0.4, duration: 0.8 } }
}

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#050505] pt-32 pb-24 px-6 md:px-20 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <Link href="/#home" className="text-sm font-bold text-gray-400 hover:text-[#1A1B41] dark:hover:text-[#FDFBF7] transition-colors mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-5xl md:text-7xl font-black text-[#1A1B41] dark:text-[#FDFBF7] uppercase tracking-tighter">
            Image <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D4D] to-[#00F0FF]">Gallery</span>
          </h1>
          <p className="text-xl text-gray-500 font-medium mt-4 max-w-2xl">
            A visual journey through my hardware builds, research setups, and workspaces.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVars}
          initial="hidden"
          animate="show"
          className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div 
              variants={itemVars} 
              key={i} 
              className="break-inside-avoid relative group rounded-3xl overflow-hidden border border-[#1A1B41]/5 dark:border-[#FDFBF7]/5"
            >
              <img 
                src={img.src} 
                alt={img.title} 
                className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                <h3 className="text-white font-bold text-xl">{img.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
