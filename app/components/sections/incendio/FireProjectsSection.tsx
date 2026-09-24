'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Container, Section } from '../../ui/Layout'

type Project = { title: string; description: string; status: string; image?: string; alt?: string; position?: string; contain?: boolean; zoom?: number }
const projects: Project[] = [
  { title: 'P23 · PILAY', description: 'Sistema convencional INIM instalado desde cero.', status: 'Finalizado', image: '/images/incendios/cliente/p23.webp', alt: 'Vista aérea del edificio P23 de PILAY', position: '50% 50%' },
  { title: 'Colegio PROA · La Carlota', description: 'Sistema direccionable SIMPLEX instalado desde cero.', status: 'Finalizado', image: '/images/incendios/cliente/proa-la-carlota.webp', alt: 'Vista aérea del Colegio PROA de La Carlota', position: '50% 50%' },
  { title: 'Crisol 65', description: 'Sistema direccionable INIM incorporado en un edificio existente de más de 30 años.', status: 'Finalizado', image: '/images/incendios/cliente/crisol-65.webp', alt: 'Avisador manual nuevo junto a la escalera y terminaciones originales de Crisol 65', position: '45% 50%' },
  { title: 'Edificio General Deheza', description: 'Sistema direccionable INIM instalado desde cero en obra nueva.', status: 'En ejecución', image: '/images/incendios/cliente/general-deheza.webp', alt: 'Fachada del edificio General Deheza en construcción', position: '50% 50%', contain: true },
  { title: 'Edificio Revello · Barrio General Paz', description: 'Instalación de sistema de detección y alarma en edificio existente.', status: 'En ejecución', image: '/images/incendios/cliente/revello.webp', alt: 'Ejecución de cañerías en el edificio Revello de barrio General Paz', position: '50% 22%' },
  { title: 'Edificio P24', description: 'Sistema direccionable INIM instalado desde cero, actualmente en etapa de cableado.', status: 'En ejecución', image: '/images/incendios/cliente/p24-cableado.webp', alt: 'Equipo de ZC realizando trabajos de instalación y cableado en el edificio P24', position: '50% 50%', zoom: 1.06 },
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
        <div className="proj-heading mb-12 max-w-3xl text-left opacity-0 md:mb-16">
          <h2 className="section-title mb-4 font-display text-[clamp(1.35rem,2.5vw,1.85rem)] font-extrabold leading-tight text-[var(--color-text-primary)]">
            Proyectos de detección de incendios en Córdoba
          </h2>
          <p className="font-display text-sm uppercase tracking-wide text-[var(--color-text-secondary)]">
            Ingeniería que se ve en obra
          </p>
        </div>

        {['Finalizado', 'En ejecución'].map(status => (
          <div key={status} className="mb-10">
            <h3 className="mb-5 font-display text-lg font-bold text-[var(--color-text-primary)]">
              {status === 'Finalizado' ? 'Obras terminadas' : 'Trabajos en curso'}
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {projects.filter(project => project.status === status).map(project => (
                <article key={project.title} className="proj-card overflow-hidden rounded-[var(--radius-lg)] border border-[#dce1e6] bg-white opacity-0">
                  {project.image ? (
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#e3e7eb]">
                      <Image src={project.image} alt={project.alt!} fill sizes="(max-width: 767px) 100vw, 33vw" className={project.contain ? 'object-contain' : 'object-cover'} style={{ objectPosition: project.position, transform: project.zoom ? `scale(${project.zoom})` : undefined }} />
                    </div>
                  ) : (
                    <div className="flex aspect-[4/3] items-end bg-[#e3e7eb] p-6" aria-hidden="true">
                      <span className="font-display text-5xl font-semibold text-[#b0b9c2]">P24</span>
                    </div>
                  )}
                  <div className="p-6">
                  <p className="mb-3 text-xs uppercase tracking-wide text-[var(--color-text-muted)]">{project.status}</p>
                  <h4 className="mb-2 font-display text-lg font-bold tracking-wide text-[var(--color-text-primary)]">{project.title}</h4>
                  <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">{project.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
        <Link href="#contacto" className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-primary)] transition-opacity hover:opacity-70">
          Solicitar asesoramiento
          <ArrowUpRight size={16} />
        </Link>
      </Container>
    </Section>
  )
}
