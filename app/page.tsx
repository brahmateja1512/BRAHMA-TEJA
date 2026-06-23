'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Link from 'next/link'
import { ArrowRight, Download } from 'lucide-react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'

// Import all the new sections
import SkillsSection from '@/components/home/SkillsSection'
import ExperienceSection from '@/components/home/ExperienceSection'
import ProjectsSection from '@/components/home/ProjectsSection'
import AchievementsSection from '@/components/home/AchievementsSection'
import RecommendationsSection from '@/components/home/RecommendationsSection'
import ContactSection from '@/components/home/ContactSection'

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const [heroData, setHeroData] = useState({
    availability_status: "Available for Research & Collaboration",
    name_line_1: "BRAHMA TEJA",
    name_line_2: "JAMPU",
    profession_title: "Autonomy & Robotics Engineer.",
    tagline: "Bridging the gap between intelligent software and physical hardware.",
    floating_tags: ['#Autonomy 🤖', '#AI 🧠', '#Embedded ⚡', '#Robotics 🔧', '#Vision 👁️', '#SLAM 🌐', '#Gazebo ⚙️']
  })

  const [aboutData, setAboutData] = useState({
    headline: "Engineering Autonomy & Building Robots.",
    biography: "I am an ambitious Autonomy Technologies & Robotics Engineer. With a robust background in embedded systems and simulation, I strive to bridge the gap between software and physical hardware.",
    projects_count: 10,
    publications_count: 2
  })

  useEffect(() => {
    async function fetchHero() {
      try {
        const { data: hero, error: heroErr } = await supabase.from('hero_settings').select('*').eq('id', 1).single()
        if (hero && !heroErr) setHeroData(hero)

        const { data: about, error: aboutErr } = await supabase.from('about_settings').select('*').eq('id', 1).single()
        if (about && !aboutErr) setAboutData(about)
      } catch (e) {
        console.warn("Supabase fetch failed, likely missing credentials")
      }
    }
    fetchHero()
  }, [])

  useEffect(() => {
    // Basic GSAP animations for the hero section elements
    const ctx = gsap.context(() => {
      // Tags initial pop-in
      gsap.to('.floating-tag', {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        onComplete: () => {
          // Continuous floating effect
          gsap.to('.floating-tag', {
            y: '-=15',
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut',
            stagger: 0.2
          })
        }
      })
      
      // Name animation
      gsap.to('.name-text', {
        y: '0%',
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.5
      })

      // Other elements fade in
      gsap.to('.fade-in-up', {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 1.2
      })
      
      // Background drifting blobs
      gsap.to('.bg-blob', {
        x: 'random(-50, 50)',
        y: 'random(-50, 50)',
        rotation: 'random(-10, 10)',
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.5
      })

    }, containerRef)

    return () => ctx.revert()
  }, [heroData.floating_tags.length]) // re-run if tags length changes

  return (
    <main ref={containerRef} className="w-full overflow-x-hidden bg-[#FDFBF7] dark:bg-[#050505] transition-colors duration-500">
      
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
        
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="bg-blob absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#FF4D4D]/10 dark:bg-[#FF4D4D]/5 blur-[100px] mix-blend-multiply dark:mix-blend-screen" />
          <div className="bg-blob absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#00F0FF]/10 dark:bg-[#00F0FF]/5 blur-[120px] mix-blend-multiply dark:mix-blend-screen" />
          <div className="bg-blob absolute top-[40%] left-[60%] w-[40vw] h-[40vw] rounded-full bg-[#7B61FF]/10 dark:bg-[#7B61FF]/5 blur-[80px] mix-blend-multiply dark:mix-blend-screen" />
        </div>
        
        {/* Deep Background Typography (Parallax effect) */}
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-5 dark:opacity-10 pointer-events-none select-none overflow-hidden">
          <h1 className="text-[20vw] font-black leading-none text-center whitespace-nowrap -rotate-6">
            ENGINEER<br/>ROBOTICS
          </h1>
        </div>

        {/* Floating Tags */}
        {heroData.floating_tags.map((tag, i) => {
          // Pre-calculate positions for up to 10 tags
          const positions = [
            { left: '10%', top: '20%', rot: '-10deg' },
            { left: '85%', top: '15%', rot: '15deg' },
            { left: '5%', top: '60%', rot: '5deg' },
            { left: '80%', top: '70%', rot: '-8deg' },
            { left: '15%', top: '85%', rot: '12deg' },
            { left: '75%', top: '40%', rot: '-5deg' },
            { left: '50%', top: '90%', rot: '0deg' },
            { left: '30%', top: '10%', rot: '8deg' },
            { left: '90%', top: '50%', rot: '-12deg' },
            { left: '40%', top: '25%', rot: '5deg' },
          ]
          const pos = positions[i % positions.length]
          
          return (
            <div key={i} className="floating-tag absolute z-20 px-4 py-2 bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/40 dark:border-white/10 rounded-xl text-sm font-mono font-bold text-[#1A1B41] dark:text-[#FDFBF7] shadow-lg pointer-events-none select-none opacity-0 scale-0" style={{left: pos.left, top: pos.top, transform: `rotate(${pos.rot})`}}>
              {tag}
            </div>
          )
        })}

        <div className="container relative z-10 px-6 w-full mt-10 md:mt-0">
          <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto gap-8">
            
            <div className="fade-in-up inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/60 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-xl text-xs sm:text-sm font-mono opacity-0 translate-y-4 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] shadow-[0_0_10px_#00F0FF] animate-pulse"></span>
              <span className="text-[#1A1B41] dark:text-[#FDFBF7] font-semibold tracking-wide uppercase">{heroData.availability_status}</span>
            </div>

            <div className="flex flex-col gap-y-2 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-[#1A1B41] dark:text-[#FDFBF7] uppercase leading-[0.85]">
              <div className="overflow-hidden pb-4 mb-[-1rem]">
                <div className="name-text inline-block translate-y-[100%] opacity-0">{heroData.name_line_1}</div>
              </div>
              <div className="overflow-hidden pb-4 mb-[-1rem]">
                <div className="name-text inline-block translate-y-[100%] opacity-0 text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D4D] via-[#7B61FF] to-[#00F0FF]">
                  {heroData.name_line_2}
                </div>
              </div>
            </div>
            
            <div className="fade-in-up w-full max-w-2xl opacity-0 translate-y-4 mt-6">
              <p className="text-xl md:text-2xl font-medium text-gray-600 dark:text-gray-400 leading-relaxed">
                <span className="font-mono text-[#FF4D4D]">{heroData.profession_title}</span><br/>
                {heroData.tagline}
              </p>
            </div>
            
            <div className="fade-in-up flex flex-col sm:flex-row gap-4 opacity-0 translate-y-4 mt-8">
              <Link href="/cv">
                <button className="group relative inline-flex items-center justify-center font-bold overflow-hidden rounded-full px-8 h-14 text-lg bg-[#1A1B41] dark:bg-[#FDFBF7] text-[#FDFBF7] dark:text-[#050505] transition-all hover:scale-105 active:scale-95 shadow-xl">
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#FF4D4D] to-[#7B61FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative flex items-center gap-2">
                    <Download className="w-5 h-5" /> Download Resume
                  </span>
                </button>
              </Link>
              <Link href="#projects">
                <button className="group inline-flex items-center justify-center font-bold transition-all hover:scale-105 active:scale-95 border-2 h-14 text-lg rounded-full px-8 border-[#1A1B41]/10 dark:border-[#FDFBF7]/10 text-[#1A1B41] dark:text-[#FDFBF7] hover:border-[#00F0FF] dark:hover:border-[#00F0FF] hover:text-[#00F0FF] backdrop-blur-sm">
                  View Work <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative overflow-hidden transition-colors duration-500 bg-white dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -50, rotate: -10 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, type: "spring", bounce: 0.4 }}
              className="w-full lg:w-5/12 relative"
            >
              {/* Unique Glass Image Frame */}
              <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-[3rem] p-2 bg-gradient-to-tr from-[#FF4D4D]/20 via-transparent to-[#00F0FF]/20 backdrop-blur-3xl shadow-2xl rotate-[-3deg] hover:rotate-0 transition-transform duration-700">
                <div className="absolute inset-0 bg-white/40 dark:bg-black/40 rounded-[3rem] backdrop-blur-md border border-white/50 dark:border-white/10" />
                <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative bg-[#1A1B41] dark:bg-[#111] flex items-center justify-center z-10 shadow-inner">
                   <span className="text-[#00F0FF] text-sm font-mono tracking-widest uppercase">Profile_Photo.jpg</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, type: "spring", bounce: 0.4, delay: 0.2 }}
              className="w-full lg:w-7/12 flex flex-col gap-8"
            >
              <div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-white/5 border border-black/5 dark:border-white/10 text-xs font-mono mb-8 text-[#1A1B41] dark:text-[#FDFBF7] shadow-sm"
                >
                  <span className="text-[#FF4D4D]">✦</span>
                  <span className="uppercase tracking-widest font-bold">About Me</span>
                </motion.div>
                <div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 text-[#1A1B41] dark:text-[#FDFBF7]" dangerouslySetInnerHTML={{ __html: aboutData.headline.replace('Autonomy', '<span class="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D4D] to-[#7B61FF]">Autonomy</span>') }}>
                  </h2>
                  <div className="flex flex-col gap-6 text-gray-600 dark:text-gray-400 text-lg md:text-xl leading-relaxed font-medium">
                    <p>{aboutData.biography}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-6 rounded-3xl bg-gray-50 dark:bg-[#111] border border-black/5 dark:border-white/5 flex flex-col gap-2 transition-transform duration-300"
                >
                  <span className="text-5xl font-black text-[#1A1B41] dark:text-[#FDFBF7]">{aboutData.projects_count}<span className="text-[#00F0FF]">+</span></span>
                  <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">Projects</span>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-6 rounded-3xl bg-gray-50 dark:bg-[#111] border border-black/5 dark:border-white/5 flex flex-col gap-2 transition-transform duration-300"
                >
                  <span className="text-5xl font-black text-[#1A1B41] dark:text-[#FDFBF7]">{aboutData.publications_count}<span className="text-[#FF4D4D]">+</span></span>
                  <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">Publications</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Inserted Sub-components */}
      <div className="bg-[#FDFBF7] dark:bg-[#050505]">
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <AchievementsSection />
        <RecommendationsSection />
        <ContactSection />
      </div>
      
    </main>
  )
}
