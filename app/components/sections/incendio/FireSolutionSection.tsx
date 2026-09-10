'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { Container, Section } from '../../ui/Layout'

const pillars = [
  {
    number: '01',
    title: 'Proyecto e ingeniería',
    description:
      'Analizamos la obra, definimos la tecnología y la ubicación de los dispositivos, y elaboramos la documentación técnica.',
    image: '/assets/outdoor.jpg',
    imageAlt: 'Relevamiento y proyecto de detección de incendio',
  },
  {
    number: '02',
    title: 'Provisión de equipamiento',
    description:
      'Seleccionamos y proveemos centrales, detectores, módulos, avisadores y accesorios adecuados para cada proyecto.',
    image: '/assets/fire.avif',
    imageAlt: 'Equipamiento de detección de incendio',
  },
  {
    number: '03',
    title: 'Instalación y programación',
    description:
      'Realizamos la instalación, el conexionado, la configuración y la programación del sistema.',
    image: '/assets/alarma.jpg',
    imageAlt: 'Instalación de sistema de alarma e incendio',
  },
  {
    number: '04',
    title: 'Puesta en marcha',
    description:
      'Verificamos el funcionamiento eléctrico y operativo, capacitamos al equipo y entregamos el sistema listo para operar.',
    image: '/assets/camaras.png',
    imageAlt: 'Puesta en marcha y entrega del sistema',
  },
]

export function FireSolutionSection() {
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
        gsap.fromTo(
          el.querySelector('.sol-heading'),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            scrollTrigger: { trigger: el, start: 'top 75%' },
          }
        )

        const timeline = el.querySelector('.sol-timeline')
        const lineFill = el.querySelector('.sol-line-fill')
        if (timeline && lineFill) {
          gsap.fromTo(
            lineFill,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: 'none',
              transformOrigin: 'top center',
              scrollTrigger: {
                trigger: timeline,
                start: 'top 70%',
                end: 'bottom 30%',
                scrub: 0.6,
              },
            }
          )
        }

        el.querySelectorAll('.sol-step').forEach((step) => {
          const media = step.querySelector('.sol-media')
          const copy = step.querySelector('.sol-copy')
          const node = step.querySelector('.sol-node')
          const fromLeft = step.classList.contains('sol-step--left')

          if (media) {
            gsap.fromTo(
              media,
              { opacity: 0, x: fromLeft ? -40 : 40, y: 20 },
              {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 0.75,
                ease: 'power2.out',
                scrollTrigger: { trigger: step, start: 'top 82%' },
              }
            )
          }

          if (copy) {
            gsap.fromTo(
              copy,
              { opacity: 0, x: fromLeft ? 36 : -36, y: 16 },
              {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 0.7,
                delay: 0.08,
                ease: 'power2.out',
                scrollTrigger: { trigger: step, start: 'top 82%' },
              }
            )
          }

          if (node) {
            gsap.fromTo(
              node,
              { scale: 0.5, opacity: 0.4 },
              {
                scale: 1,
                opacity: 1,
                duration: 0.45,
                ease: 'back.out(1.6)',
                scrollTrigger: { trigger: step, start: 'top 78%' },
              }
            )
          }
        })
      }, el)
    }

    init()
    return () => ctx?.revert()
  }, [])

  return (
    <Section variant="dark" id="solucion" className="min-h-dvh flex flex-col justify-center">
      <Container ref={sectionRef} className="py-20 lg:py-28">
        <div className="sol-heading opacity-0 mx-auto mb-14 max-w-2xl text-center md:mb-20">
          <h2 className="section-title font-display font-extrabold text-[clamp(1.5rem,2.8vw,2.25rem)] leading-tight text-[var(--color-text-primary)] mb-4">
            Proyecto e ingeniería
            <br />
            <span className="text-[var(--color-text-secondary)]">contra incendios</span>
          </h2>
          <p className="text-sm md:text-base text-[var(--color-text-secondary)] leading-relaxed">
            Te acompañamos desde el proyecto técnico hasta la puesta en marcha: provisión, instalación y programación adaptadas a cada obra.
          </p>
        </div>

        <div className="sol-timeline relative">
          {/* Línea vertical: mobile a la izq / desktop al centro — detrás del contenido */}
          <div
            className="pointer-events-none absolute top-0 bottom-0 left-3 z-0 w-px bg-[var(--color-border)] md:left-1/2 md:-translate-x-1/2"
            aria-hidden
          >
            <div className="sol-line-fill absolute inset-0 origin-top scale-y-0 bg-[var(--color-primary-accent)]" />
          </div>

          <ol className="relative z-10 flex flex-col gap-14 md:gap-24">
            {pillars.map((item, i) => {
              const imageLeft = i % 2 === 0
              return (
                <li
                  key={item.number}
                  className={`sol-step relative grid grid-cols-1 gap-5 pl-10 md:pl-0 md:grid-cols-2 md:gap-x-16 md:gap-y-0 md:items-center ${
                    imageLeft ? 'sol-step--left' : 'sol-step--right'
                  }`}
                >
                  {/* Nodo sobre la línea */}
                  <span
                    className="sol-node absolute z-20 top-5 left-3 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2 flex h-6 w-6 items-center justify-center"
                    aria-hidden
                  >
                    <span className="absolute inset-0 rounded-full border border-[var(--color-primary-accent)]/40 bg-[var(--color-background)]" />
                    <span className="relative h-2 w-2 rounded-full bg-[var(--color-primary-accent)] shadow-[0_0_12px_2px_rgba(255,255,255,0.35)]" />
                  </span>

                  {/* Media */}
                  <div
                    className={`sol-media relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] aspect-[16/10] md:aspect-[4/3] ${
                      imageLeft ? 'md:order-1' : 'md:order-2'
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 42vw"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"
                      aria-hidden
                    />
                  </div>

                  {/* Copy */}
                  <div
                    className={`sol-copy ${
                      imageLeft ? 'md:order-2 md:pl-2' : 'md:order-1 md:pr-2 md:text-right'
                    }`}
                  >
                    <span className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-[var(--color-text-primary)] tabular-nums block mb-3">
                      {item.number}
                    </span>
                    <h3 className="font-display font-bold text-lg md:text-xl text-[var(--color-text-primary)] mb-3 tracking-wide">
                      {item.title}
                    </h3>
                    <p
                      className={`text-sm md:text-base text-[var(--color-text-secondary)] leading-relaxed ${
                        imageLeft ? 'md:max-w-md' : 'md:max-w-md md:ml-auto'
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </Container>
    </Section>
  )
}
