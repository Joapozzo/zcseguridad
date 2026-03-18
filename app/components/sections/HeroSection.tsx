'use client'

import { useEffect, useRef, useState } from 'react'
import { Home, Clock, Star } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { Button } from '../ui/Button'
import { useContact } from '@/app/hooks/useContact'

type StatConfig = {
  end: number
  prefix?: string
  suffix?: string
  label: string
  icon: typeof Home
}

const heroStats: StatConfig[] = [
  { end: 200, prefix: '+', label: 'instalaciones', icon: Home },
  { end: 24, suffix: '/7', label: 'monitoreo', icon: Clock },
  { end: 5, label: 'calificación', icon: Star },
]

export function HeroSection() {
  const contact = useContact()
  const contentRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const [displayValues, setDisplayValues] = useState<number[]>(heroStats.map(() => 0))

  useEffect(() => {
    let mounted = true
    const run = async () => {
      const { gsap } = await import('gsap')

      const content = contentRef.current
      const statsWrap = statsRef.current
      if (!content || !statsWrap || !mounted) return

      const title = content.querySelector('h1')
      const subtitle = content.querySelector('p')
      const buttons = content.querySelector('div:last-child')

      gsap.set([title, subtitle, buttons], { opacity: 0, y: 24 })
      gsap.to(title, { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: 'power2.out' })
      gsap.to(subtitle, { opacity: 1, y: 0, duration: 0.6, delay: 0.35, ease: 'power2.out' })
      gsap.to(buttons, { opacity: 1, y: 0, duration: 0.6, delay: 0.5, ease: 'power2.out' })

      const startDelay = 0.7
      const countDuration = 1.4
      heroStats.forEach((stat, i) => {
        const obj = { val: 0 }
        gsap.to(obj, {
          val: stat.end,
          duration: countDuration,
          delay: startDelay + i * 0.15,
          ease: 'power2.out',
          onUpdate: () => {
            if (!mounted) return
            setDisplayValues((prev) => {
              const next = [...prev]
              next[i] = Math.round(obj.val)
              return next
            })
          },
        })
      })
    }
    run()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <section className="flex overflow-hidden relative flex-col justify-center items-center w-full h-screen min-h-dvh">
      {/* Video de fondo */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-cover absolute inset-0 w-full h-full"
          aria-hidden
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/55" aria-hidden />

      {/* Contenido centrado — minimalista, el video es protagonista */}
      <div ref={contentRef} className="flex relative z-10 flex-col justify-center items-center px-4 pt-16 pb-20 text-center">
        <h1 className="font-display font-semibold text-[clamp(1.25rem,3.5vw,1.75rem)] tracking-[0.25em] uppercase text-white mb-4 max-w-xl">
          Seguridad inteligente para tu casa empresa o negocio
        </h1>
        <p className="mb-8 max-w-md text-sm font-light tracking-wide md:text-base text-white/80">
          Tecnología AJAX instalada por especialistas en Córdoba
        </p>
        <div className="flex flex-col gap-3 items-center w-full max-w-sm sm:flex-row sm:w-auto sm:max-w-none">
          <Button
            variant="primary"
            size="md"
            href="#contacto"
            className="justify-center w-full text-xs font-medium tracking-widest uppercase sm:w-auto"
          >
            Solicitar diagnóstico de seguridad
          </Button>
          <Button
            variant="outline"
            size="md"
            href={contact.whatsappLink}
            target="_blank"
            className="justify-center w-full text-sm tracking-wide sm:w-auto border-white/30 text-white/90 hover:bg-white/10 hover:border-white/50"
          >
            <FaWhatsapp size={18} />
            WhatsApp
          </Button>
        </div>
      </div>

      {/* Stats — pie del hero con count-up */}
      <div ref={statsRef} className="flex absolute right-0 left-0 bottom-6 z-10 flex-row gap-4 justify-center items-center text-center md:gap-16">
        {heroStats.map((stat, i) => {
          const Icon = stat.icon
          const value =
            (stat.prefix ?? '') + displayValues[i] + (stat.suffix ?? '')
          return (
            <div key={stat.label} className="flex flex-col gap-1 items-center text-center">
              <Icon strokeWidth={1.5} className="w-4 h-4 shrink-0 text-white/50 md:w-5 md:h-5" aria-hidden />
              <div className="flex flex-col items-center text-center">
                <span data-stat-value className="text-xs font-medium tracking-wide font-display text-white/90 md:text-sm min-w-[2ch] tabular-nums">
                  {value}
                </span>
                <span className="text-[9px] text-white/50 uppercase tracking-[0.12em] md:text-[10px] md:tracking-[0.15em]">
                  {stat.label}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
