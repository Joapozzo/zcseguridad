'use client'

import { useEffect, useRef } from 'react'
import { Search, PenTool, Wrench, CheckCircle } from 'lucide-react'
import { Container, Section } from '../../ui/Layout'

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Análisis del proyecto',
    description: 'Relevamos las necesidades y la normativa aplicable.',
  },
  {
    icon: PenTool,
    number: '02',
    title: 'Ingeniería y diseño',
    description: 'Definimos la tecnología y los dispositivos, y elaboramos la documentación técnica.',
  },
  {
    icon: Wrench,
    number: '03',
    title: 'Ejecución e instalación',
    description: 'Realizamos el montaje, el conexionado, la programación y las pruebas.',
  },
  {
    icon: CheckCircle,
    number: '04',
    title: 'Puesta en marcha',
    description: 'Completamos la verificación final, la entrega y la capacitación.',
  },
]

const ACTIVATE_AT = [0.1, 0.35, 0.6, 0.85]
const STATE_DUR = 0.1

export function FireProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } | undefined

    const init = async () => {
      const el = sectionRef.current
      if (!el) return
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const icons = gsap.utils.toArray<HTMLElement>(el.querySelectorAll('.fire-step-icon'))
        const dotDesktop = el.querySelector<HTMLElement>('.fire-process-dot-desktop')
        const dotMobile = el.querySelector<HTMLElement>('.fire-process-dot-mobile')
        const lineFillDesktop = el.querySelector<HTMLElement>('.fire-process-line-fill-desktop')
        const lineFillMobile = el.querySelector<HTMLElement>('.fire-process-line-fill-mobile')

        if (icons.length !== 4) return

        const idleIcon = {
          borderColor: 'var(--color-border-strong)',
          backgroundColor: '#ffffff',
          color: 'var(--color-text-primary)',
        }
        const activeIcon = {
          borderColor: 'var(--color-text-primary)',
          backgroundColor: 'var(--color-text-primary)',
          color: '#ffffff',
        }

        icons.forEach((icon) => gsap.set(icon, idleIcon))
        if (dotDesktop) gsap.set(dotDesktop, { left: '0%', top: '50%', xPercent: -50, yPercent: -50 })
        if (dotMobile) gsap.set(dotMobile, { top: '0%', left: '50%', xPercent: -50, yPercent: -50 })
        if (lineFillDesktop) gsap.set(lineFillDesktop, { scaleX: 0, transformOrigin: 'left center' })
        if (lineFillMobile) gsap.set(lineFillMobile, { scaleY: 0, transformOrigin: 'top center' })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 65%',
            end: 'bottom 40%',
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        })

        if (dotDesktop) tl.to(dotDesktop, { left: '100%', ease: 'none', duration: 1 }, 0)
        if (lineFillDesktop) tl.to(lineFillDesktop, { scaleX: 1, ease: 'none', duration: 1 }, 0)
        if (dotMobile) tl.to(dotMobile, { top: '100%', ease: 'none', duration: 1 }, 0)
        if (lineFillMobile) tl.to(lineFillMobile, { scaleY: 1, ease: 'none', duration: 1 }, 0)

        ACTIVATE_AT.forEach((at, i) => {
          const icon = icons[i]
          const nextAt = ACTIVATE_AT[i + 1] ?? 1

          tl.to(icon, { ...activeIcon, duration: STATE_DUR, ease: 'none' }, at)

          if (i < ACTIVATE_AT.length - 1) {
            tl.to(icon, { ...idleIcon, duration: STATE_DUR, ease: 'none' }, nextAt)
          }
        })

        requestAnimationFrame(() => ScrollTrigger.refresh())
      }, el)
    }

    init()
    return () => ctx?.revert()
  }, [])

  return (
    <Section variant="transparent" id="proceso" className="p-0">
      <div
        ref={sectionRef}
        className="section-light-block flex flex-col justify-start bg-[#f5f5f5] py-16 md:py-24"
      >
        <Container className="!py-0">
          <div className="fire-process-heading mx-auto mb-10 max-w-xl text-center md:mb-12">
            <h2 className="section-title mb-3 font-display text-[clamp(1.5rem,2.8vw,2.25rem)] font-extrabold leading-tight text-[var(--color-text-primary)]">
              Instalación y puesta
              <br />
              <span className="text-[var(--color-text-secondary)]">en marcha</span>
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)] md:text-base">
              Metodología clara desde el análisis hasta la entrega: comunicación constante y acompañamiento en todas las etapas del sistema de incendio.
            </p>
          </div>

          <div className="fire-process-track relative">
            {/* Línea detrás de los círculos */}
            <div
              className="pointer-events-none absolute top-7 right-[12.5%] left-[12.5%] z-0 hidden h-px md:block"
              aria-hidden
            >
              <div className="absolute inset-0 bg-[var(--color-border)]" />
              <div className="fire-process-line-fill-desktop absolute inset-0 origin-left bg-[var(--color-text-primary)]" />
              <div className="fire-process-dot-desktop absolute top-1/2 left-0 z-0 h-2 w-2 rounded-full bg-[var(--color-text-primary)]" />
            </div>

            <div
              className="pointer-events-none absolute top-7 bottom-7 left-1/2 z-0 w-px -translate-x-1/2 md:hidden"
              aria-hidden
            >
              <div className="absolute inset-0 bg-[var(--color-border)]" />
              <div className="fire-process-line-fill-mobile absolute inset-0 origin-top bg-[var(--color-text-primary)]" />
              <div className="fire-process-dot-mobile absolute top-0 left-1/2 z-0 h-2 w-2 rounded-full bg-[var(--color-text-primary)]" />
            </div>

            <div className="relative z-10 grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6">
              {steps.map((step) => {
                const Icon = step.icon
                return (
                  <div
                    key={step.number}
                    className="fire-step flex flex-col items-center text-center"
                  >
                    <div className="fire-step-icon relative z-10 mb-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-white text-[var(--color-text-primary)]">
                      <Icon size={22} strokeWidth={1.5} />
                    </div>
                    <div className="relative z-10 bg-[#f5f5f5] px-4 py-1">
                      <span className="mb-2 block font-display text-xs tracking-[0.2em] text-[var(--color-text-muted)]">
                        {step.number}
                      </span>
                      <h3 className="mb-2 font-display text-base font-bold tracking-wide text-[var(--color-text-primary)]">
                        {step.title}
                      </h3>
                      <p className="mx-auto max-w-[220px] text-sm leading-relaxed text-[var(--color-text-secondary)]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </Container>
      </div>
    </Section>
  )
}
