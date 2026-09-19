'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Instagram } from 'lucide-react'
import { CONTACT } from '@/app/constants/contact'
import { Container, Section } from '../../ui/Layout'

const projects = [
  {
    title: 'P23 San Jerónimo',
    description:
      'Proyecto e implementación de un sistema direccionable INIM para detección y alarma de incendio.',
    image: '/images/incendios/inim/inim-previdia-max-central.webp',
    imageAlt: 'Central direccionable INIM Previdia Max',
    href: '#contacto',
    cta: 'Solicitar asesoramiento',
    external: false,
  },
  {
    title: 'General Deheza',
    description:
      'Instalación y puesta en marcha de un sistema de detección de incendio en un edificio residencial.',
    image: '/images/incendios/inim/inim-enea-detector.webp',
    imageAlt: 'Detector de incendio INIM serie Enea',
    href: '#contacto',
    cta: 'Solicitar asesoramiento',
    external: false,
  },
  {
    title: 'Edificio Pringles | General Paz',
    description:
      'Sistema convencional INIM SmartLine para detección y alarma de incendio, distribuido por niveles.',
    image: '/images/incendios/inim/inim-smartline-central.webp',
    imageAlt: 'Central convencional INIM SmartLine',
    href: CONTACT.instagram,
    cta: 'Ver en Instagram',
    external: true,
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
            const linkClass =
              'mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-primary)] transition-opacity hover:opacity-70'
            return (
              <article
                key={project.title}
                className="proj-card grid min-h-[280px] grid-cols-1 items-stretch overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] opacity-0 transition-colors duration-300 hover:border-[var(--color-border-strong)] md:min-h-[340px] md:grid-cols-2"
              >
                <div
                  className={`flex flex-col justify-center p-6 md:p-10 ${
                    textFirst ? 'md:order-1' : 'md:order-2'
                  } order-1`}
                >
                  <h3 className="mb-2 font-display text-lg font-bold tracking-wide text-[var(--color-text-primary)]">
                    {project.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {project.description}
                  </p>
                  {project.external ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      <Instagram size={16} />
                      {project.cta}
                      <ArrowUpRight size={16} />
                    </a>
                  ) : (
                    <Link href={project.href} className={linkClass}>
                      {project.cta}
                      <ArrowUpRight size={16} />
                    </Link>
                  )}
                </div>

                <div
                  className={`relative aspect-[4/3] min-h-[220px] w-full self-stretch bg-[#f0f0f0] md:aspect-auto md:min-h-0 md:h-full ${
                    textFirst ? 'md:order-2' : 'md:order-1'
                  } order-2`}
                >
                  <div className="absolute inset-6 md:inset-10">
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      quality={90}
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
