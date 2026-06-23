'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Scene from '@/components/canvas/Scene'
import ContactForm from '@/components/ui/ContactForm'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroTextRef = useRef<HTMLHeadingElement>(null)
  const horizontalSectionRef = useRef<HTMLDivElement>(null)
  const svgPathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    // 1. Hero Text Reveal Mask Animation
    gsap.fromTo(
      heroTextRef.current,
      { clipPath: 'inset(100% 0 0 0)', y: 50, opacity: 0 },
      { clipPath: 'inset(0% 0 0 0)', y: 0, opacity: 1, duration: 1.5, ease: 'power4.out', delay: 0.5 }
    )

    // 2. Horizontal Scroll Section for Projects
    const projects = gsap.utils.toArray('.project-card')
    gsap.to(projects, {
      xPercent: -100 * (projects.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: horizontalSectionRef.current,
        pin: true,
        scrub: 1,
        end: () => "+=" + horizontalSectionRef.current?.offsetWidth,
      },
    })

    // 3. SVG Timeline Drawing Animation
    if (svgPathRef.current) {
      const length = svgPathRef.current.getTotalLength()
      gsap.set(svgPathRef.current, { strokeDasharray: length, strokeDashoffset: length })
      
      gsap.to(svgPathRef.current, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        },
      })
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden bg-black text-white">
      {/* 1. Hero Section with WebGL Canvas */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <Scene />
        <div className="z-10 text-center pointer-events-none">
          <h1 
            ref={heroTextRef} 
            className="text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500"
          >
            Brahma Teja Jampu
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-neutral-400 font-light tracking-wide">
            Autonomy Technologies & Robotics
          </p>
        </div>
      </section>

      {/* 2. GSAP Horizontal Scroll: Projects Showcase */}
      <section ref={horizontalSectionRef} className="h-screen flex items-center overflow-hidden bg-neutral-950">
        <div className="flex w-[300vw] h-full items-center px-20">
          <div className="project-card w-screen flex-shrink-0 flex items-center justify-center p-10">
            <div className="w-full max-w-4xl aspect-video bg-neutral-900 rounded-2xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <h2 className="absolute bottom-10 left-10 text-4xl font-bold z-10">Autonomous Navigation Stack</h2>
            </div>
          </div>
          <div className="project-card w-screen flex-shrink-0 flex items-center justify-center p-10">
            <div className="w-full max-w-4xl aspect-video bg-neutral-900 rounded-2xl overflow-hidden relative group">
              <h2 className="absolute bottom-10 left-10 text-4xl font-bold z-10">Smart Radar System</h2>
            </div>
          </div>
          <div className="project-card w-screen flex-shrink-0 flex items-center justify-center p-10">
            <div className="w-full max-w-4xl aspect-video bg-neutral-900 rounded-2xl overflow-hidden relative group">
              <h2 className="absolute bottom-10 left-10 text-4xl font-bold z-10">STEMx Rover Platform</h2>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SVG Timeline Drawing: Experience & Education */}
      <section className="timeline-container relative min-h-screen bg-black py-32 px-10 flex justify-center">
        <div className="max-w-4xl w-full relative">
          <svg className="absolute left-1/2 top-0 h-full w-24 -ml-12 pointer-events-none" viewBox="0 0 100 1000" preserveAspectRatio="none">
            <path 
              ref={svgPathRef}
              d="M50,0 C80,200 20,400 50,600 C80,800 20,1000 50,1200" 
              fill="none" 
              stroke="rgba(255,255,255,0.2)" 
              strokeWidth="2"
            />
          </svg>
          
          <div className="grid grid-cols-2 gap-20 py-20 relative z-10">
            <div className="text-right flex flex-col justify-center">
              <h3 className="text-3xl font-bold">M.Sc. Autonomy Technologies</h3>
              <p className="text-neutral-400 mt-2">Friedrich-Alexander-Universität Erlangen-Nürnberg</p>
            </div>
            <div></div>

            <div></div>
            <div className="text-left flex flex-col justify-center">
              <h3 className="text-3xl font-bold">Student Assistant - STEMx</h3>
              <p className="text-neutral-400 mt-2">Built comprehensive testing platforms.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Masonry Grid: Gallery */}
      <section className="min-h-screen bg-neutral-950 py-32 px-10">
        <h2 className="text-5xl font-bold text-center mb-20">Hardware Builds & Photography</h2>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 max-w-7xl mx-auto">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="break-inside-avoid relative group overflow-hidden rounded-xl bg-neutral-900 aspect-[3/4]">
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
              <div className="absolute inset-0 scale-105 group-hover:scale-100 transition-transform duration-700 ease-out flex items-center justify-center">
                <span className="text-neutral-600">Sanity CMS Image Placeholder</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* 5. Contact Form Section */}
      <section className="relative z-10 py-32 px-10 bg-black border-t border-white/10">
        <ContactForm />
      </section>
    </div>
  )
}
