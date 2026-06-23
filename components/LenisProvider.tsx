// @ts-nocheck
'use client'

import { ReactLenis } from '@studio-freight/react-lenis'

export function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    // @ts-ignore - React 19 type mismatch with React 18 nodes
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      {children}
    </ReactLenis>
  )
}
