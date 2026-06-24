'use client'

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import Link from 'next/link'
import { ArrowLeft, Trophy, Clock, Play, RotateCcw, User, Medal } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { submitGameScore, getTopScores } from '@/actions/game'

const TAG_WORDS = [
  '#Autonomy', '#AI', '#Robotics', '#ComputerVision', 
  '#SLAM', '#ROS2', '#C++', '#Python', '#Embedded',
  '#DeepLearning', '#Hardware', '#Sensors', '#Navigation',
  '#Kinematics', '#Dynamics', '#Gazebo', '#Controls',
  '#MachineLearning', '#PathPlanning', '#LIDAR', '#KalmanFilter', '#Arduino'
]

const GAME_DURATION = 120 // 2 minutes

export default function GamesPage() {
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  
  const [playerName, setPlayerName] = useState('')
  const [leaderboard, setLeaderboard] = useState<any[]>([])
  
  const isPlayingRef = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  
  // Fetch leaderboard on mount
  useEffect(() => {
    async function fetchLeaderboard() {
      const { data } = await getTopScores(5)
      if (data) setLeaderboard(data)
    }
    fetchLeaderboard()
  }, [])

  // Submit score when game ends
  useEffect(() => {
    if (isGameOver && score > 0 && playerName.trim()) {
      submitGameScore(playerName.trim(), score).then(async () => {
         const { data } = await getTopScores(5)
         if (data) setLeaderboard(data)
      }).catch(console.error)
    }
  }, [isGameOver, score, playerName])

  const startGame = () => {
    if (!playerName.trim()) {
      alert("Please enter your Player Name to join the Leaderboard!")
      return
    }
    setScore(0)
    setTimeLeft(GAME_DURATION)
    setIsPlaying(true)
    isPlayingRef.current = true
    setIsGameOver(false)
    initTags()
  }

  const stopGame = () => {
    setIsPlaying(false)
    isPlayingRef.current = false
    setIsGameOver(true)
    if (timerRef.current) clearInterval(timerRef.current)
    if (containerRef.current) {
       // kill all tweens on children
       const tags = gsap.utils.toArray('.game-tag')
       gsap.killTweensOf(tags)
    }
  }

  // Timer effect
  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            stopGame()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPlaying, timeLeft])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
       if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const initTags = () => {
    if (!containerRef.current) return
    const container = containerRef.current
    
    // Clear existing tags to prevent duplicates if restarting
    container.innerHTML = ''
    
    // Generate 35 tags for a good density
    for (let i = 0; i < 35; i++) {
      const el = document.createElement('div')
      el.innerText = TAG_WORDS[Math.floor(Math.random() * TAG_WORDS.length)]
      el.className = 'game-tag absolute font-mono font-bold text-sm sm:text-base px-4 py-2 rounded-xl border border-white/40 dark:border-white/10 bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-lg cursor-crosshair text-[#1A1B41] dark:text-[#FDFBF7] select-none hover:scale-110 hover:border-[#FF4D4D] hover:text-[#FF4D4D] transition-colors z-10'
      
      // Init position
      gsap.set(el, {
        x: Math.random() * window.innerWidth,
        y: -100 - (Math.random() * 800), // Staggered starting heights above the screen
        rotation: Math.random() * 360,
        scale: 0.8 + Math.random() * 0.5
      })

      // Click / Pop Logic
      const handlePop = (e: Event) => {
        if (!isPlayingRef.current) return
        e.preventDefault() // prevent highlighting/selection
        
        // Use a state variable equivalent for the element so we don't double click
        if (el.dataset.popped === 'true') return
        el.dataset.popped = 'true'

        gsap.killTweensOf(el)
        
        setScore(s => s + 1)
        
        // Pop animation
        gsap.to(el, {
          scale: 2.5,
          opacity: 0,
          rotation: '+=90',
          backgroundColor: '#FF4D4D',
          color: 'white',
          borderColor: '#FF4D4D',
          duration: 0.3,
          ease: 'power2.out',
          onComplete: () => {
            // Respawn
            el.dataset.popped = 'false'
            if (!isPlayingRef.current) return
            
            gsap.set(el, {
              y: -100 - (Math.random() * 200),
              x: Math.random() * window.innerWidth,
              opacity: 1,
              scale: 0.8 + Math.random() * 0.5,
              rotation: Math.random() * 360,
              backgroundColor: '',
              color: '',
              borderColor: ''
            })
            fall(el)
          }
        })
      }

      el.addEventListener('pointerdown', handlePop)
      container.appendChild(el)
      fall(el)
    }
  }

  const fall = (el: Element) => {
    // Check if the game state is valid before falling
    // But since fall is called inside initTags or onComplete, we can let it run.
    const duration = 8 + Math.random() * 15 // Random speed
    gsap.to(el, {
      y: window.innerHeight + 200,
      rotation: '+=random(-180, 180)',
      x: '+=random(-150, 150)',
      duration: duration,
      ease: 'none',
      repeat: -1,
      delay: Math.random() > 0.5 ? -Math.random() * duration : 0 // Randomize start offset
    })
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const getRank = (score: number) => {
    if (score > 200) return "Tag God 👑"
    if (score > 150) return "Master Blaster 🔥"
    if (score > 100) return "Pro Coder 💻"
    if (score > 50) return "Rookie 🚀"
    return "Trainee 😴"
  }

  return (
    <main className="relative w-full min-h-screen overflow-hidden bg-[#FDFBF7] dark:bg-[#050505] selection:bg-transparent touch-none">
      
      {/* Background Graphic */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
         <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-[#FF4D4D] blur-[150px] mix-blend-multiply dark:mix-blend-screen" />
         <div className="absolute bottom-[20%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-[#00F0FF] blur-[150px] mix-blend-multiply dark:mix-blend-screen" />
      </div>

      {/* Top HUD */}
      <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between p-6 gap-4">
        <Link href="/">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 border border-black/10 dark:border-white/10 backdrop-blur-md text-[#1A1B41] dark:text-[#FDFBF7] font-bold shadow-lg"
          >
            <ArrowLeft size={18} /> Exit to Portfolio
          </motion.button>
        </Link>
        
        <div className="flex gap-4">
          <div className="flex items-center gap-2 px-6 py-2 rounded-full bg-white/80 dark:bg-white/10 border border-black/10 dark:border-white/10 backdrop-blur-md shadow-lg">
            <Trophy className="text-[#FF4D4D]" size={20} />
            <span className="font-mono text-xl font-black text-[#1A1B41] dark:text-[#FDFBF7]">{score}</span>
          </div>
          <div className={`flex items-center gap-2 px-6 py-2 rounded-full bg-white/80 dark:bg-white/10 border border-black/10 dark:border-white/10 backdrop-blur-md shadow-lg transition-colors ${timeLeft <= 10 ? 'bg-[#FF4D4D]/20 border-[#FF4D4D] text-[#FF4D4D]' : 'text-[#1A1B41] dark:text-[#FDFBF7]'}`}>
            <Clock size={20} />
            <span className="font-mono text-xl font-black">{formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      {/* Game Area Container */}
      <div ref={containerRef} className="absolute inset-0 z-10 overflow-hidden touch-none" />

      {/* UI Overlays */}
      <AnimatePresence>
        {!isPlaying && !isGameOver && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="absolute inset-0 z-30 flex items-center justify-center bg-white/30 dark:bg-black/30 backdrop-blur-sm"
          >
            <div className="max-w-md w-full mx-4 p-8 rounded-[2rem] bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 shadow-2xl flex flex-col items-center text-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#FF4D4D] to-[#7B61FF] flex items-center justify-center shadow-lg mx-auto">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              
              <div className="w-full">
                <h1 className="text-4xl font-black text-[#1A1B41] dark:text-[#FDFBF7] mb-4">TAG BLASTER</h1>
                
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    maxLength={20}
                    placeholder="Enter Player Name..." 
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-[#1A1A1A] border-2 border-black/10 dark:border-white/10 rounded-xl outline-none focus:border-[#7B61FF] transition-colors text-[#1A1B41] dark:text-white font-bold placeholder-gray-400"
                  />
                </div>

                <div className="bg-gray-100 dark:bg-[#1A1A1A] p-4 rounded-xl text-left border border-black/5 dark:border-white/5 mb-2">
                  <h3 className="font-bold text-[#FF4D4D] mb-2 uppercase tracking-wider text-sm">How to Play:</h3>
                  <ul className="text-gray-600 dark:text-gray-400 font-medium text-sm space-y-2 list-disc pl-4">
                    <li>Click or tap the falling tech tags to blast them.</li>
                    <li>Each blasted tag gives you <strong className="text-[#1A1B41] dark:text-white">1 point</strong>.</li>
                    <li>You have exactly <strong className="text-[#1A1B41] dark:text-white">2 minutes</strong> to get the highest score possible.</li>
                    <li>Reach a score of 200 to become a <strong className="text-[#00F0FF]">Tag God</strong>!</li>
                  </ul>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startGame}
                className="w-full py-4 rounded-2xl bg-[#1A1B41] dark:bg-[#FDFBF7] text-[#FDFBF7] dark:text-[#1A1B41] font-black text-xl flex items-center justify-center gap-2 shadow-xl hover:shadow-[#FF4D4D]/20 transition-all"
              >
                <Play fill="currentColor" /> START GAME
              </motion.button>

              {/* Leaderboard Section */}
              {leaderboard.length > 0 && (
                <div className="w-full mt-2">
                  <div className="flex items-center gap-2 justify-center mb-3 text-gray-500">
                    <Medal size={18} />
                    <h3 className="font-bold uppercase tracking-widest text-sm">Top 5 Leaderboard</h3>
                  </div>
                  <div className="flex flex-col gap-2">
                    {leaderboard.map((entry, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-gray-50 dark:bg-[#1A1A1A] px-4 py-2 rounded-lg border border-black/5 dark:border-white/5">
                        <div className="flex items-center gap-3">
                          <span className={`font-black ${idx === 0 ? 'text-[#FF4D4D]' : idx === 1 ? 'text-[#7B61FF]' : idx === 2 ? 'text-[#00F0FF]' : 'text-gray-400'}`}>#{idx + 1}</span>
                          <span className="font-bold text-[#1A1B41] dark:text-[#FDFBF7] truncate max-w-[120px]">{entry.player_name}</span>
                        </div>
                        <span className="font-mono font-black text-[#1A1B41] dark:text-white">{entry.score}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {isGameOver && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute inset-0 z-30 flex items-center justify-center bg-white/30 dark:bg-black/30 backdrop-blur-sm"
          >
            <div className="max-w-md w-full mx-4 p-8 rounded-[2rem] bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 shadow-2xl flex flex-col items-center text-center gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-500 uppercase tracking-widest mb-2">Time's Up!</h2>
                <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D4D] to-[#7B61FF]">
                  {score}
                </div>
                <p className="text-xl font-bold mt-4 text-[#1A1B41] dark:text-[#FDFBF7]">Rank: <span className="text-[#00F0FF]">{getRank(score)}</span></p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startGame}
                className="w-full py-4 rounded-2xl border-2 border-[#1A1B41]/20 dark:border-[#FDFBF7]/20 text-[#1A1B41] dark:text-[#FDFBF7] font-black text-xl flex items-center justify-center gap-2 hover:border-[#1A1B41] dark:hover:border-[#FDFBF7] transition-all"
              >
                <RotateCcw strokeWidth={2.5} /> PLAY AGAIN
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
