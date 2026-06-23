import { motion } from 'framer-motion'
import { X, Minus, Maximize2 } from 'lucide-react'
import { useOSStore } from '../store/osStore'
import { useState } from 'react'

export default function Window({ id, title, children }) {
  const { closeApp, focusWindow, focusedWindow } = useOSStore()
  const isFocused = focusedWindow === id
  const [isMaximized, setIsMaximized] = useState(false)

  const zIndex = isFocused ? 50 : 10

  const windowVariants = {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 20 }
  }

  return (
    <motion.div
      drag={!isMaximized}
      dragMomentum={false}
      onMouseDown={() => focusWindow(id)}
      variants={windowVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`absolute flex flex-col bg-[#1e1e2e]/90 backdrop-blur-2xl border border-white/20 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${isMaximized ? 'inset-4' : 'w-[800px] h-[550px] top-20 left-20'}`}
      style={{ zIndex }}
    >
      {/* Title Bar */}
      <div className="h-12 bg-white/5 flex flex-row items-center px-4 border-b border-white/10 select-none cursor-move">
        <div className="flex gap-2 mr-4">
          <button onClick={(e) => { e.stopPropagation(); closeApp(id); }} className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-400 flex items-center justify-center group cursor-default">
            <X size={10} className="text-black opacity-0 group-hover:opacity-100" />
          </button>
          <button className="w-3.5 h-3.5 rounded-full bg-yellow-500 hover:bg-yellow-400 flex items-center justify-center group cursor-default">
            <Minus size={10} className="text-black opacity-0 group-hover:opacity-100" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); }} className="w-3.5 h-3.5 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center group cursor-default">
            <Maximize2 size={10} className="text-black opacity-0 group-hover:opacity-100" />
          </button>
        </div>
        <div className="flex-1 text-center font-medium text-sm text-white/80">{title}</div>
        <div className="w-[60px]" /> {/* Spacer to center title */}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6 text-white cursor-default bg-black/10">
        {children}
      </div>
    </motion.div>
  )
}
