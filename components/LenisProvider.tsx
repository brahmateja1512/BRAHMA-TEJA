'use client'

import { ReactLenis } from '@studio-freight/react-lenis'

export function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      {children}
    </ReactLenis>
  )
}
