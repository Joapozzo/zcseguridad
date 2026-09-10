'use client'

import { useEffect, useRef, useState } from 'react'
import { LayoutGrid, Radio, GitBranch, Bell } from 'lucide-react'
import { Container, Section } from '../../ui/Layout'

const systems = [
  {
    number: '01',
    title: 'Sistemas convencionales',
    when: 'Edificios y comercios medianos',
    description:
      'Sectorización por zonas cuando la escala del proyecto se resuelve de forma eficiente sin identificación punto a punto.',
    icon: LayoutGrid,
  },
  {
    number: '02',
    title: 'Sistemas direccionables',
    when: 'Torres, industria y desarrollos de gran escala',
    description:
      'Identificación individual de cada dispositivo, mayor capacidad de programación e integración con otros sistemas del edificio.',
    icon: Radio,
  },
  {
    number: '03',
    title: 'Adecuaciones y ampliaciones',
    when: 'Instalaciones existentes',
    description:
      'Intervenimos sobre sistemas en operación para ampliar, modernizar o reemplazar sin interrumpir la protección.',
    icon: GitBranch,
  },
  {
    number: '04',
    title: 'Sistemas complementarios',
    when: 'Señalización, avisadores e integración',
    description:
      'Avisadores, señalización y vínculo con detección, control de acceso u otros sistemas según el proyecto.',
    icon: Bell,
  },
]

const HOVER_DELAY_MS = 100
const PREVIEW_FADE_MS = 280

/** Progress needed to advance INTO step 1/2/3 (holds step 0 longer). */
const STEP_ENTER = [0, 0.3, 0.55, 0.8] as const
/** Progress below which we retreat FROM step 1/2/3 (hysteresis band). */
const STEP_LEAVE = [0, 0.22, 0.47, 0.72] as const

export function FireSystemsSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const activeStepRef = useRef(0)
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)
  const [display, setDisplay] = useState(0)
  const [previewVisible, setPreviewVisible] = useState(true)

  const spotlight = hovered ?? active
  const preview = systems[display]
  const PreviewIcon = preview.icon

  useEffect(() => {
    if (spotlight === display) {
      setPreviewVisible(true)
      return
    }

    setPreviewVisible(false)
    const t = setTimeout(() => {
      setDisplay(spotlight)
      setPreviewVisible(true)
    }, PREVIEW_FADE_MS)

    return () => clearTimeout(t)
  }, [spotlight, display])

  useEffect(() => {
    return () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current)
    }
  }, [])

  const scheduleHover = (next: number | null) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current)
    hoverTimer.current = setTimeout(() => setHovered(next), HOVER_DELAY_MS)
  }

  useEffect(() => {
    let disposed = false
    let media: { revert: () => void } | undefined

    const init = async () => {
      const track = trackRef.current
      const sticky = stickyRef.current
      if (!track || !sticky) return
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      if (disposed) return
      gsap.registerPlugin(ScrollTrigger)

      const matchMedia = gsap.matchMedia()
      media = matchMedia

      const playIntro = () => {
        gsap.fromTo(
          sticky.querySelector('.sys-heading'),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            scrollTrigger: { trigger: track, start: 'top 78%' },
          }
        )

        sticky.querySelectorAll('.sys-panel').forEach((panel, i) => {
          gsap.fromTo(
            panel,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              delay: i * 0.05,
              ease: 'power2.out',
              scrollTrigger: { trigger: track, start: 'top 78%' },
            }
          )
        })
      }

      const setStepFromProgress = (progress: number) => {
        let next = activeStepRef.current
        while (next < systems.length - 1 && progress >= STEP_ENTER[next + 1]) next += 1
        while (next > 0 && progress < STEP_LEAVE[next]) next -= 1
        if (next === activeStepRef.current) return
        activeStepRef.current = next
        setActive(next)
      }

      // Natural scroll: tall track + sticky panel (no GSAP pin / no brake).
      matchMedia.add(
        '(prefers-reduced-motion: no-preference) and (min-height: 600px)',
        () => {
          playIntro()

          ScrollTrigger.create({
            trigger: track,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.55,
            invalidateOnRefresh: true,
            onUpdate: (self) => setStepFromProgress(self.progress),
            onRefresh: (self) => setStepFromProgress(self.progress),
          })
        }
      )

      matchMedia.add(
        '(prefers-reduced-motion: reduce), (max-height: 599px)',
        () => {
          playIntro()

          sticky.querySelectorAll('.sys-panel').forEach((panel, i) => {
            ScrollTrigger.create({
              trigger: panel,
              start: 'top 60%',
              end: 'bottom 40%',
              onEnter: () => setActive(i),
              onEnterBack: () => setActive(i),
            })
          })
        }
      )
    }

    void init()
    return () => {
      disposed = true
      media?.revert()
    }
  }, [])

  return (
    <Section variant="dark" id="sistemas" className="p-0">
      {/* Tall track = scroll distance; sticky keeps UI in view without pin spacer jumps. */}
      <div
        ref={trackRef}
        className="relative min-h-dvh [@media(prefers-reduced-motion:no-preference)_and_(min-height:600px)]:min-h-[340vh]"
      >
        <div
          ref={stickyRef}
          className="flex min-h-dvh flex-col justify-center [@media(prefers-reduced-motion:no-preference)_and_(min-height:600px)]:sticky [@media(prefers-reduced-motion:no-preference)_and_(min-height:600px)]:top-0"
        >
          <Container className="py-20 lg:py-28">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)] lg:gap-14 xl:gap-20 lg:items-stretch">
              <div className="sys-heading opacity-0 lg:flex lg:flex-col lg:h-full lg:min-h-0">
                <div>
                  <h2 className="section-title font-display font-extrabold text-[clamp(1.5rem,2.8vw,2.25rem)] leading-tight text-[var(--color-text-primary)] mb-4">
                    Sistemas de detección
                    <br />
                    <span className="text-[var(--color-text-secondary)]">convencional y direccionable</span>
                  </h2>
                  <p className="text-sm md:text-base text-[var(--color-text-secondary)] leading-relaxed max-w-md mb-8 lg:mb-0">
                    Definimos la tecnología según el tipo de proyecto, la normativa aplicable y los requerimientos de cada cliente.
                  </p>
                </div>

                <div
                  className={`hidden lg:flex lg:flex-col lg:mt-auto lg:border-t lg:border-[var(--color-border)] lg:pt-8 transition-opacity duration-500 ease-in-out ${
                    previewVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <span className="font-display text-6xl xl:text-7xl font-semibold tracking-tight text-[var(--color-text-primary)]/15 tabular-nums block leading-none mb-4">
                    {preview.number}
                  </span>
                  <PreviewIcon
                    size={40}
                    strokeWidth={1.25}
                    className="text-[var(--color-text-primary)] mb-4 transition-transform duration-500 ease-in-out"
                  />
                  <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-text-muted)] font-display mb-2">
                    {preview.when}
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-sm">
                    {preview.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-col border-t border-[var(--color-border)] lg:h-full">
                {systems.map((item, i) => {
                  const Icon = item.icon
                  const isOn = spotlight === i
                  return (
                    <article
                      key={item.number}
                      className={`sys-panel opacity-0 group border-b border-[var(--color-border)] transition-[padding,min-height,background-color,border-color] duration-500 ease-in-out cursor-default flex flex-col justify-center ${
                        isOn
                          ? 'min-h-[9.5rem] md:min-h-[11rem] py-12 md:py-14 bg-[var(--color-surface)]/40 border-[var(--color-border-strong)]'
                          : 'min-h-[6.5rem] md:min-h-[7.5rem] py-8 md:py-10 hover:bg-[var(--color-surface)]/20'
                      }`}
                      onMouseEnter={() => scheduleHover(i)}
                      onMouseLeave={() => scheduleHover(null)}
                    >
                      <div className="flex gap-6 md:gap-8 items-start">
                        <div
                          className={`shrink-0 pt-0.5 transition-transform duration-500 ease-in-out ${
                            isOn ? 'scale-110 text-[var(--color-text-primary)]' : 'text-[var(--color-text-muted)]'
                          }`}
                        >
                          <Icon size={isOn ? 40 : 30} strokeWidth={1.35} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                            <span
                              className={`font-display text-xs tracking-[0.2em] tabular-nums transition-colors duration-500 ease-in-out ${
                                isOn ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-muted)]'
                              }`}
                            >
                              {item.number}
                            </span>
                            <h3
                              className={`font-display font-bold tracking-wide transition-all duration-500 ease-in-out ${
                                isOn
                                  ? 'text-xl md:text-2xl text-[var(--color-text-primary)]'
                                  : 'text-lg md:text-xl text-[var(--color-text-secondary)]'
                              }`}
                            >
                              {item.title}
                            </h3>
                          </div>

                          <p
                            className={`text-[10px] md:text-xs uppercase tracking-[0.12em] font-display transition-colors duration-500 ease-in-out ${
                              isOn ? 'text-[var(--color-text-muted)]' : 'text-[var(--color-text-muted)]/70'
                            }`}
                          >
                            {item.when}
                          </p>

                          <div
                            className={`grid transition-[grid-template-rows,opacity,margin] duration-500 ease-in-out ${
                              isOn ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'
                            }`}
                          >
                            <div className="overflow-hidden">
                              <p className="text-sm md:text-base text-[var(--color-text-secondary)] leading-relaxed max-w-xl pb-1">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </Container>
        </div>
      </div>
    </Section>
  )
}
