'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import CustomCursor from './CustomCursor'
import Footer from './Footer'

export default function NavigationWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminPath = pathname?.startsWith('/admin')

  return (
    <>
      {!isAdminPath && <CustomCursor />}
      {!isAdminPath && <Navbar />}
      
      <main className="flex-1">
        {children}
      </main>

      {!isAdminPath && <Footer />}
    </>
  )
}
