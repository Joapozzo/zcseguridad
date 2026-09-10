'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Container, Section } from '../../ui/Layout'

const projects = [
  {
    title: 'P23 San Jerónimo',
    description:
      'Proyecto e implementación de un sistema direccionable INIM para detección y alarma de incendio.',
    image: '/assets/fire.avif',
    href: '#contacto',
  },
  {
    title: 'General Deheza',
    description:
      'Instalación y puesta en marcha de un sistema de detección de incendio en un edificio residencial.',
    image: '/assets/fire.avif',
    href: '#contacto',
  },
  {
    title: 'Edificio Pringles | General Paz',
    description:
      'Sistema convencional INIM SmartLine para detección y alarma de incendio, distribuido por niveles.',
    image: '/assets/fire.avif',
    href: '#contacto',
  },
]

export function FireProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const init = async () => {
      const el = sectionRef.current
      if (!el) return
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.fromTo(
        el.querySelector('.proj-heading'),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: el, start: 'top 78%' } }
      )
      el.querySelectorAll('.proj-card').forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            delay: i * 0.08,
            scrollTrigger: { trigger: card, start: 'top 85%' },
          }
        )
      })
    }
    init()
  }, [])

  return (
    <Section variant="transparent" id="proyectos">
      <Container ref={sectionRef}>
        <div className="proj-heading mx-auto mb-12 max-w-md text-center opacity-0 md:mb-16">
          <h2 className="section-title mb-4 font-display text-[clamp(1.35rem,2.5vw,1.85rem)] font-extrabold leading-[1.15] text-[var(--color-text-primary)]">
            Proyectos de
            <br />
            <span className="text-[clamp(1.65rem,3.2vw,2.5rem)]">detección</span>
            <br />
            <span className="text-[var(--color-text-secondary)]">
              de incendios en
              <br />
              Córdoba
            </span>
          </h2>
        </div>

        <div className="flex flex-col gap-6 md:gap-8">
          {projects.map((project, i) => {
            const textFirst = i % 2 === 0
            return (
              <article
                key={project.title}
                className="proj-card grid min-h-[280px] grid-cols-1 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] opacity-0 transition-colors duration-300 hover:border-[var(--color-border-strong)] md:min-h-[320px] md:grid-cols-2"
              >
                <div
                  className={`flex flex-col justify-center p-6 md:p-8 ${
                    textFirst ? 'md:order-1' : 'md:order-2'
                  } order-1`}
                >
                  <h3 className="mb-2 font-display text-lg font-bold tracking-wide text-[var(--color-text-primary)]">
                    {project.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {project.description}
                  </p>
                  <Link
                    href={project.href}
                    className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-primary)] transition-opacity hover:opacity-70"
                  >
                    Ver proyecto
                    <ArrowUpRight size={16} />
                  </Link>
                </div>

                <div
                  className={`relative aspect-[4/3] min-h-[200px] w-full md:aspect-auto md:h-full ${
                    textFirst ? 'md:order-2' : 'md:order-1'
                  } order-2`}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </article>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
