'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Section } from '../../ui/Layout'

const projects = [
  {
    title: 'Edificio Pringles | General Paz',
    description:
      'Sistema convencional INIM SmartLine para detección y alarma de incendio, distribuido por niveles.',
    image: '/assets/fire.avif',
    href: '#contacto',
  },
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
]

const MOBILE_VISIBLE = 3

function ProjectCard({
  project,
  layout,
}: {
  project: (typeof projects)[number]
  layout: 'stack' | 'marquee'
}) {
  // Mobile: Capabilities-style card reversed (media first, text below)
  if (layout === 'stack') {
    return (
      <article className="grid min-h-[280px] grid-cols-1 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] transition-colors duration-300 hover:border-[var(--color-border-strong)]">
        <div className="relative aspect-[4/3] min-h-[200px] w-full">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="flex flex-col justify-center p-6">
          <h3 className="mb-2 font-display text-lg font-bold tracking-wide text-[var(--color-text-primary)]">
            {project.title}
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
            {project.description}
          </p>
          <Link
            href={project.href}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-primary)] transition-opacity hover:opacity-70"
          >
            Ver proyecto
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </article>
    )
  }

  return (
    <article className="flex w-[min(82vw,340px)] shrink-0 flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="340px"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-base font-bold tracking-wide text-[var(--color-text-primary)]">
          {project.title}
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">
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
    </article>
  )
}

export function FireProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [showAll, setShowAll] = useState(false)

  const visibleProjects = showAll ? projects : projects.slice(0, MOBILE_VISIBLE)
  const hasMore = projects.length > MOBILE_VISIBLE

  // Suficientes copias para llenar viewport; luego duplicar el set para loop seamless
  const reps = Math.max(2, Math.ceil(8 / Math.max(projects.length, 1)))
  const oneSet = Array.from({ length: reps }, () => projects).flat()
  const loopItems = [...oneSet, ...oneSet]

  useEffect(() => {
    const init = async () => {
      const el = sectionRef.current
      const track = trackRef.current
      if (!el || !track) return

      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        gsap.fromTo(
          el.querySelector('.proj-heading'),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            scrollTrigger: { trigger: el, start: 'top 78%' },
          }
        )

        const half = track.scrollWidth / 2
        if (half <= 0) return

        const tween = gsap.to(track, {
          x: -half,
          duration: Math.max(oneSet.length * 4, 24),
          ease: 'none',
          repeat: -1,
        })

        const pause = () => tween.pause()
        const play = () => tween.play()
        track.addEventListener('mouseenter', pause)
        track.addEventListener('mouseleave', play)

        return () => {
          tween.kill()
          track.removeEventListener('mouseenter', pause)
          track.removeEventListener('mouseleave', play)
          gsap.set(track, { clearProps: 'transform' })
        }
      })

      mm.add('(max-width: 767px)', () => {
        gsap.fromTo(
          el.querySelector('.proj-heading'),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            scrollTrigger: { trigger: el, start: 'top 78%' },
          }
        )
      })

      return () => mm.revert()
    }

    let cleanup: (() => void) | undefined
    init().then((fn) => {
      cleanup = fn
    })
    return () => cleanup?.()
  }, [oneSet.length])

  return (
    <Section variant="transparent" id="proyectos" className="flex min-h-dvh flex-col justify-center overflow-hidden">
      <div ref={sectionRef} className="w-full py-20 lg:py-28">
        <div className="proj-heading mx-auto mb-10 max-w-xl px-6 text-center opacity-0 md:mb-14">
          <h2 className="section-title mb-4 font-display text-[clamp(1.5rem,2.8vw,2.25rem)] font-extrabold leading-tight text-[var(--color-text-primary)]">
            Proyectos de detección
            <br />
            <span className="text-[var(--color-text-secondary)]">de incendios en Córdoba</span>
          </h2>
        </div>

        {/* Mobile: Capabilities-style cards (image first) */}
        <div
          className="mx-auto flex w-full flex-col gap-6 px-6 md:hidden"
          style={{ maxWidth: 'var(--container-max)' }}
        >
          {visibleProjects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              layout="stack"
            />
          ))}
          {hasMore && !showAll && (
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="mt-2 self-center text-sm font-medium text-[var(--color-text-primary)] transition-opacity hover:opacity-70"
            >
              Ver más
              <ArrowUpRight size={16} className="ml-1 inline-block" />
            </button>
          )}
        </div>

        {/* Desktop: marquee carousel */}
        <div
          className="relative mx-auto hidden w-full overflow-hidden px-6 md:block lg:px-8"
          style={{ maxWidth: 'var(--container-max)' }}
        >
          <div
            ref={trackRef}
            className="flex w-max gap-5 will-change-transform"
            style={{ touchAction: 'pan-y' }}
          >
            {loopItems.map((project, i) => (
              <ProjectCard key={`${project.title}-${i}`} project={project} layout="marquee" />
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
