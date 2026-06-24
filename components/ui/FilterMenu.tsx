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
    <div className="flex items-center justify-start md:justify-end w-full mb-8">
      <div className="flex flex-wrap gap-2 md:justify-end">
        {options.map((option) => {
          const isActive = activeOption === option

          return (
            <button
              key={option}
              onClick={() => onSelect(option)}
              className={`relative px-5 py-2 text-sm font-bold rounded-full transition-all duration-300 border shadow-sm overflow-hidden group ${
                isActive 
                  ? 'border-transparent text-white dark:text-[#050505]' 
                  : 'bg-white/50 dark:bg-[#111]/50 backdrop-blur-md border-[#1A1B41]/10 dark:border-[#FDFBF7]/10 text-gray-500 hover:text-[#1A1B41] dark:hover:text-[#FDFBF7] hover:border-[#1A1B41]/30 dark:hover:border-[#FDFBF7]/30'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId={`activeFilterBg-${id}`}
                  className="absolute inset-0 bg-[#1A1B41] dark:bg-[#FDFBF7] rounded-full shadow-md"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  style={{ zIndex: 0 }}
                />
              )}
              <span className="relative z-10">{option}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
