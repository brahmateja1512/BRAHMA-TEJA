import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavigationWrapper from '@/components/ui/NavigationWrapper'
import { LenisProvider } from '@/components/LenisProvider'
import GlobalFallingTags from '@/components/ui/GlobalFallingTags'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Brahma Teja Jampu | Autonomy & Robotics',
  description: 'High-Performance Portfolio built with Next.js 16',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col font-sans antialiased bg-[#f5f0eb] dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 selection:bg-red-500/30 selection:text-red-500 transition-colors duration-500`} suppressHydrationWarning>
        <LenisProvider>
          <GlobalFallingTags />
          <NavigationWrapper>
            {children}
          </NavigationWrapper>
        </LenisProvider>
      </body>
    </html>
  )
}
