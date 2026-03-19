'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { Container, Section } from '../ui/Layout'

export type ResolvedSuccessVideo = {
  youtubeId: string
  title: string
  thumbnailUrl: string
}

/** Borde luminoso: capa inferior gira; el contenido queda encima con recorte. */
function LuminousVideoFrame({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-[var(--radius-lg)] p-[3px] shadow-[0_0_8px_1px_rgba(255,255,255,0.45),0_0_16px_3px_rgba(147,197,253,0.22)] md:shadow-[0_0_16px_3px_rgba(255,255,255,0.55),0_0_32px_6px_rgba(186,230,253,0.5),0_0_48px_10px_rgba(56,189,248,0.35),0_0_72px_16px_rgba(253,224,71,0.28)]"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]" aria-hidden>
        {/* Halo difuso: contenido en desktop; en mobile más chico para que no “mancha” alrededor */}
        <div
          className="absolute left-1/2 top-1/2 aspect-square w-[200%] max-w-none -translate-x-1/2 -translate-y-1/2 animate-success-video-border-spin bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(255,255,255,0.55)_25deg,transparent_65deg,rgba(96,165,250,0.45)_120deg,transparent_175deg,rgba(253,224,71,0.4)_235deg,transparent_300deg,transparent_360deg)] opacity-50 blur-sm md:w-[260%] md:opacity-80 md:blur-md"
        />
        <div
          className="absolute left-1/2 top-1/2 aspect-square w-[210%] max-w-none -translate-x-1/2 -translate-y-1/2 animate-success-video-border-spin bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(255,255,255,1)_22deg,rgba(224,242,254,1)_38deg,transparent_62deg,rgba(56,189,248,0.95)_108deg,rgba(37,99,235,0.85)_138deg,transparent_168deg,rgba(254,252,232,1)_218deg,rgba(250,204,21,1)_248deg,rgba(253,224,71,0.95)_268deg,transparent_298deg,transparent_360deg)] brightness-110 saturate-150 contrast-[1.06] blur-[0.5px] md:w-[240%]"
        />
      </div>
      {children}
    </div>
  )
}

function VideoCard({ youtubeId, title, thumbnailUrl }: ResolvedSuccessVideo) {
  const [playing, setPlaying] = useState(false)

  const innerRadius = 'rounded-[calc(var(--radius-lg)-3px)]'

  if (playing) {
    return (
      <LuminousVideoFrame>
        <div
          className={`relative z-10 aspect-video w-full overflow-hidden ${innerRadius} bg-black ring-1 ring-white/10`}
        >
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </LuminousVideoFrame>
    )
  }

  return (
    <LuminousVideoFrame>
      <button
        type="button"
        onClick={() => setPlaying(true)}
        className={`group relative z-10 block w-full overflow-hidden ${innerRadius} bg-neutral-200/80 text-left ring-1 ring-black/5 transition-[box-shadow] duration-300 hover:ring-white/25 focus-visible:ring-2 focus-visible:ring-[var(--color-primary-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface-light)]`}
        aria-label={`Reproducir: ${title}`}
      >
        <div className="relative aspect-video w-full">
          <Image
            src={thumbnailUrl}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 42vw"
          />
          <span
            className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent transition-opacity group-hover:from-black/45"
            aria-hidden
          />
          <span className="absolute inset-0 flex items-center justify-center" aria-hidden>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-neutral-900 shadow-lg transition-transform duration-300 group-hover:scale-105 md:h-14 md:w-14">
              <Play className="ml-0.5 h-5 w-5 md:h-6 md:w-6" strokeWidth={2.25} />
            </span>
          </span>
        </div>
      </button>
    </LuminousVideoFrame>
  )
}

export function SuccessVideosSectionClient({ videos }: { videos: ResolvedSuccessVideo[] }) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const init = async () => {
      const el = sectionRef.current
      if (!el) return
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.fromTo(
        el.querySelector('.success-heading'),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: el, start: 'top 78%' } }
      )
      el.querySelectorAll('.success-card').forEach((card, i) => {
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
    <Section variant="transparent" id="casos-exito">
      <Container ref={sectionRef}>
        <div className="success-heading mx-auto mb-10 max-w-xl text-center opacity-0 md:mb-14">
          <h2 className="section-title font-display font-extrabold text-[clamp(1.5rem,2.8vw,2.25rem)] leading-tight text-[var(--color-text-primary)] mb-3">
            Casos de éxito
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed md:text-base">
            Trabajos reales con nuestro sistema de seguridad.
          </p>
        </div>

        <ul className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:gap-6 lg:gap-8">
          {videos.map((item) => (
            <li key={item.youtubeId} className="min-w-0 flex-1">
              <article className="success-card opacity-0">
                <VideoCard {...item} />
                <h3 className="mt-3 font-display text-sm font-semibold tracking-wide text-[var(--color-text-primary)] md:text-base line-clamp-2">
                  {item.title}
                </h3>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
