import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavigationWrapper from '@/components/ui/NavigationWrapper'
import { LenisProvider } from '@/components/LenisProvider'
import GlobalFallingTags from '@/components/ui/GlobalFallingTags'
import GameAccessButton from '@/components/ui/GameAccessButton'
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col font-sans antialiased bg-[#f5f0eb] dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 selection:bg-red-500/30 selection:text-red-500 transition-colors duration-500`} suppressHydrationWarning>
        <LenisProvider>
          <GlobalFallingTags />
          <GameAccessButton />
          <NavigationWrapper>
            {children}
          </NavigationWrapper>
        </LenisProvider>
      </body>
    </html>
  )
}
