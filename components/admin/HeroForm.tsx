'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { updateHeroSettings } from '@/actions/hero'

const heroSchema = z.object({
  availability_status: z.string().min(1, "Required"),
  name_line_1: z.string().min(1, "Required"),
  name_line_2: z.string().min(1, "Required"),
  profession_title: z.string().min(1, "Required"),
  tagline: z.string().min(1, "Required"),
  floating_tags: z.string().min(1, "Required"),
})

type HeroFormValues = z.infer<typeof heroSchema>

export default function HeroForm({ initialData }: { initialData: any }) {
  const [isPending, setIsPending] = useState(false)
  const [message, setMessage] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<HeroFormValues>({
    resolver: zodResolver(heroSchema),
    defaultValues: {
      availability_status: initialData?.availability_status || 'Available for Research & Collaboration',
      name_line_1: initialData?.name_line_1 || 'BRAHMA TEJA',
      name_line_2: initialData?.name_line_2 || 'JAMPU',
      profession_title: initialData?.profession_title || 'Autonomy & Robotics Engineer.',
      tagline: initialData?.tagline || 'Bridging the gap between intelligent software and physical hardware.',
      floating_tags: initialData?.floating_tags ? initialData.floating_tags.join(', ') : '#Autonomy 🤖, #AI 🧠, #Embedded ⚡, #Robotics 🔧',
    }
  })

  const onSubmit = async (data: HeroFormValues) => {
    setIsPending(true)
    setMessage('')
    
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => formData.append(key, value))
    
    const result = await updateHeroSettings(formData)
    
    setIsPending(false)
    if (result.error) {
      setMessage(`Error: ${result.error}`)
    } else {
      setMessage('Successfully updated hero settings!')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {message && (
        <div className={`p-4 rounded-xl ${message.includes('Error') ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'} font-bold`}>
          {message}
        </div>
      )}

      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Availability Status</label>
        <input {...register('availability_status')} className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#050505] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" />
        {errors.availability_status && <span className="text-red-500 text-sm">{errors.availability_status.message}</span>}
      </div>
      
      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Name Line 1</label>
        <input {...register('name_line_1')} className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#050505] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Name Line 2</label>
        <input {...register('name_line_2')} className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#050505] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Profession Title</label>
        <input {...register('profession_title')} className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#050505] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" />
      </div>
      
      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Subtitle / Tagline</label>
        <input {...register('tagline')} className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#050505] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Floating Tags (Comma Separated)</label>
        <textarea {...register('floating_tags')} rows={3} className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#050505] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 text-[#1A1B41] dark:text-[#FDFBF7]" />
      </div>

      <button disabled={isPending} type="submit" className="bg-[#1A1B41] dark:bg-[#FDFBF7] text-white dark:text-black font-bold py-3 px-8 rounded-xl hover:scale-105 active:scale-95 transition-transform disabled:opacity-50">
        {isPending ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  )
}
