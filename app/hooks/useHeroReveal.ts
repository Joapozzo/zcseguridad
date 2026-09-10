'use client'

import { useEffect, type RefObject } from 'react'

/** Fade + scale-down reveal for `.hero-reveal` children (home & incendio). */
export function useHeroReveal(contentRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    let mounted = true
    let ctx: { revert: () => void } | null = null

    const run = async () => {
      const { gsap } = await import('gsap')
      const content = contentRef.current
      if (!content || !mounted) return

      const els = content.querySelectorAll('.hero-reveal')
      if (!els.length) return

      ctx = gsap.context(() => {
        gsap.set(els, {
          opacity: 0,
          scale: 1.12,
          transformOrigin: 'center center',
        })
        gsap.to(els, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          delay: 0.15,
          ease: 'power3.out',
        })
      }, content)
    }

    run()
    return () => {
      mounted = false
      ctx?.revert()
    }
  }, [contentRef])
}
