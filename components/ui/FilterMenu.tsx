'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface FilterMenuProps {
  id?: string
  options: string[]
  activeOption: string
  onSelect: (option: string) => void
}

export default function FilterMenu({ id = 'default', options, activeOption, onSelect }: FilterMenuProps) {
  return (
    <div className="flex items-center justify-center w-full mb-8">
      <div className="inline-flex bg-white/50 dark:bg-[#111]/50 p-1.5 rounded-full backdrop-blur-xl border border-[#1A1B41]/10 dark:border-[#FDFBF7]/10 relative shadow-sm">
        {options.map((option) => {
          const isActive = activeOption === option

          return (
            <button
              key={option}
              onClick={() => onSelect(option)}
              className={`relative px-6 py-2 text-sm font-bold rounded-full transition-colors z-10 ${
                isActive 
                  ? 'text-white dark:text-[#050505]' 
                  : 'text-gray-500 hover:text-[#1A1B41] dark:hover:text-[#FDFBF7]'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId={`activeFilterBg-${id}`}
                  className="absolute inset-0 bg-[#1A1B41] dark:bg-[#FDFBF7] rounded-full shadow-md"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  style={{ zIndex: -1 }}
                />
              )}
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}
