'use client'

import { useEffect, useRef } from 'react'

export function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    let disposed = false
    let context: { revert: () => void } | undefined
    const element = ref.current
    async function init() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      if (disposed || !element) return
      gsap.registerPlugin(ScrollTrigger)
      context = gsap.context(() => {
        const counter = { number: 0 }
        gsap.fromTo(
          counter,
          { number: 0 },
          {
            number: value,
            duration: 1.4,
            ease: 'power2.out',
            onUpdate: () => {
              element!.textContent = `${Math.round(counter.number)}${suffix}`
            },
            scrollTrigger: {
              trigger: element,
              start: 'top 92%',
              end: 'bottom top',
              toggleActions: 'restart none restart none',
            },
          },
        )
      }, element)
    }
    void init()
    return () => {
      disposed = true
      context?.revert()
      if (element) element.textContent = `${value}${suffix}`
    }
  }, [value, suffix])
  return (
    <>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
      <span ref={ref} aria-hidden="true" style={{ fontVariantNumeric: 'tabular-nums' }}>
        {value}
        {suffix}
      </span>
    </>
  )
}
