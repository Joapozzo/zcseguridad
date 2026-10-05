'use client'

import { useEffect, type RefObject } from 'react'

/** Reversible reveals, scoped to their owner and disabled for reduced motion. */
export function useScrollReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    let disposed = false
    let context: { revert: () => void } | undefined
    async function init() {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      if (disposed || !ref.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.registerPlugin(ScrollTrigger)
      context = gsap.context(() => {
        ref.current!.querySelectorAll('[data-reveal]').forEach((element) => {
          gsap.fromTo(element, { autoAlpha: 0, y: 30 }, {
            autoAlpha: 1, y: 0, duration: 0.65, ease: 'power2.out',
            scrollTrigger: { trigger: element, start: 'top 94%', end: 'bottom top', toggleActions: 'play reverse play reverse' },
          })
        })
        ref.current!.querySelectorAll('[data-parallax]').forEach((element) => {
          gsap.fromTo(element, { yPercent: -4 }, { yPercent: 4, ease: 'none',
            scrollTrigger: { trigger: element.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
          })
        })
      }, ref.current)
    }
    void init()
    return () => { disposed = true; context?.revert() }
  }, [ref])
}
