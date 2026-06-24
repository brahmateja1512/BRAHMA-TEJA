'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const TAGS = [
  '#Autonomy', '#AI', '#Robotics', '#ComputerVision', 
  '#SLAM', '#ROS2', '#C++', '#Python', '#Embedded',
  '#DeepLearning', '#Hardware', '#Sensors', '#Navigation',
  '#Kinematics', '#Dynamics', '#Gazebo', '#Controls'
]

export default function GlobalFallingTags() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current
    const tagsElements: HTMLDivElement[] = []

    // Create tag elements
    for (let i = 0; i < 20; i++) {
      const el = document.createElement('div')
      el.innerText = TAGS[Math.floor(Math.random() * TAGS.length)]
      el.className = 'absolute font-mono font-bold text-xs sm:text-sm px-3 py-1.5 rounded-full border bg-white/60 dark:bg-black/60 backdrop-blur-md border-black/10 dark:border-white/10 text-[#1A1B41]/70 dark:text-[#FDFBF7]/70 whitespace-nowrap pointer-events-auto cursor-crosshair select-none shadow-sm hover:scale-110 hover:border-[#FF4D4D] transition-colors'
      
      // Initial positioning
      gsap.set(el, {
        x: Math.random() * window.innerWidth,
        y: -100 - (Math.random() * 500), // Start above screen
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.8
      })

      container.appendChild(el)
      tagsElements.push(el)

      // Fall animation
      const duration = 15 + Math.random() * 25
      
      const startFalling = () => {
        gsap.to(el, {
          y: window.innerHeight + 200,
          rotation: '+=random(-180, 180)',
          x: '+=random(-150, 150)',
          duration: duration,
          ease: 'none',
          repeat: -1,
          delay: -Math.random() * duration // Stagger start times
        })
      }
      
      startFalling()

      // Pop Mechanics
      el.addEventListener('pointerdown', (e) => {
        e.preventDefault()
        gsap.killTweensOf(el)
        
        // Pop effect
        gsap.to(el, {
          scale: 1.8,
          opacity: 0,
          rotation: '+=45',
          backgroundColor: '#FF4D4D',
          color: 'white',
          borderColor: '#FF4D4D',
          duration: 0.3,
          ease: 'power2.out',
          onComplete: () => {
            // Respawn at the top
            gsap.set(el, {
              y: -100 - (Math.random() * 300),
              x: Math.random() * window.innerWidth,
              opacity: 1,
              scale: 0.5 + Math.random() * 0.8,
              rotation: Math.random() * 360,
              backgroundColor: '', // reset inline styles
              color: '',
              borderColor: ''
            })
            // Fall again but without the negative delay to prevent instant jumps
            gsap.to(el, {
              y: window.innerHeight + 200,
              rotation: '+=random(-180, 180)',
              x: '+=random(-150, 150)',
              duration: 15 + Math.random() * 25,
              ease: 'none',
              repeat: -1
            })
          }
        })
      })
    }

    // Handle resize
    const handleResize = () => {
      tagsElements.forEach(el => {
        // Just update the target Y to new window height
        gsap.to(el, {
          y: window.innerHeight + 200,
          overwrite: 'auto',
          duration: 15 + Math.random() * 25,
          repeat: -1,
          ease: 'none'
        })
      })
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      tagsElements.forEach(el => el.remove())
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none overflow-hidden z-[5]" 
      aria-hidden="true"
    />
  )
}
