'use client'
import { useEffect, useRef } from 'react'
import { Search, PenTool, Wrench, CheckCircle } from 'lucide-react'
import { Container, Section } from '../ui/Layout'
import { Button } from '../ui/Button'

const steps = [
  {
    icon: <Search size={24} />,
    number: '01',
    title: 'Diagnóstico',
    description: 'Analizamos tu propiedad, tus necesidades y los puntos vulnerables. Sin costo y sin compromiso.',
  },
  {
    icon: <PenTool size={24} />,
    number: '02',
    title: 'Diseño del sistema',
    description: 'Diseñamos una solución a medida con los dispositivos AJAX más adecuados para tu caso.',
  },
  {
    icon: <Wrench size={24} />,
    number: '03',
    title: 'Instalación profesional',
    description: 'Nuestro equipo instala todo de forma ordenada, prolija y sin daños en tu propiedad.',
  },
  {
    icon: <CheckCircle size={24} />,
    number: '04',
    title: 'Configuración y entrega',
    description: 'Configuramos la app, te capacitamos y hacemos una prueba completa del sistema antes de retirarnos.',
  },
]

const LINE_DURATION = 8 // full line travel left→right
// Step activates when line leading edge reaches column center: 12.5%, 37.5%, 62.5%, 87.5%
const STEP_ACTIVATE_TIMES = [
  LINE_DURATION * 0.125,  // 1.0s
  LINE_DURATION * 0.375,  // 3.0s
  LINE_DURATION * 0.625,  // 5.0s
  LINE_DURATION * 0.875, // 7.0s
]
const STATE_DURATION = 0.2
const EASE = 'power2.inOut'
const INITIAL_DELAY = 1

const BORDER_DEFAULT = 'var(--color-border)'
const BORDER_ACCENT = 'var(--color-primary-accent)'
const TEXT_MUTED = 'var(--color-text-muted)'
const TEXT_PRIMARY = 'var(--color-text-primary)'
const ACCENT_GLOW = '0 0 10px 1px var(--color-primary-accent)'

const OPACITY_PENDING = 0.7   // readable when not active
const OPACITY_COMPLETED = 0.85
const OPACITY_ACTIVE = 1

function setStepPending(gsap: GSAP, item: HTMLElement, icon: HTMLElement, _number: HTMLElement, _title: HTMLElement) {
  gsap.set(item, { opacity: OPACITY_PENDING })
  gsap.set(icon, { scale: 0.85, borderColor: BORDER_DEFAULT, boxShadow: 'none' })
}

function addStepActiveTweens(
  tl: GSAPTimeline,
  item: HTMLElement,
  icon: HTMLElement,
  _number: HTMLElement,
  _title: HTMLElement,
  position: number
) {
  tl.to(item, { opacity: OPACITY_ACTIVE, duration: STATE_DURATION, ease: EASE }, position)
  tl.to(
    icon,
    { scale: 1, borderColor: BORDER_ACCENT, boxShadow: ACCENT_GLOW, duration: STATE_DURATION, ease: EASE },
    position
  )
}

function addStepCompletedTweens(
  tl: GSAPTimeline,
  item: HTMLElement,
  icon: HTMLElement,
  _number: HTMLElement,
  _title: HTMLElement,
  position: number
) {
  tl.to(item, { opacity: OPACITY_COMPLETED, duration: STATE_DURATION, ease: EASE }, position)
  tl.to(
    icon,
    { scale: 1, borderColor: BORDER_DEFAULT, boxShadow: 'none', duration: STATE_DURATION, ease: EASE },
    position
  )
}

export function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const lineGlowRef = useRef<HTMLDivElement>(null)
  const gsapRef = useRef<typeof import('gsap').gsap | null>(null)

  const handleStepMouseEnter = (index: number) => {
    const g = gsapRef.current
    const section = sectionRef.current
    if (!g || !section) return
    const items = section.querySelectorAll<HTMLElement>('.step-item')
    const icons = section.querySelectorAll<HTMLElement>('.step-icon-wrap')
    const item = items[index]
    const icon = icons[index]
    if (!item || !icon) return
    g.to(item, { opacity: OPACITY_ACTIVE, duration: 0.15, ease: EASE })
    g.to(icon, { borderColor: BORDER_ACCENT, boxShadow: ACCENT_GLOW, duration: 0.15, ease: EASE })
  }

  const handleStepMouseLeave = (index: number) => {
    const g = gsapRef.current
    const section = sectionRef.current
    if (!g || !section) return
    const items = section.querySelectorAll<HTMLElement>('.step-item')
    const icons = section.querySelectorAll<HTMLElement>('.step-icon-wrap')
    const item = items[index]
    const icon = icons[index]
    if (!item || !icon) return
    g.to(item, { opacity: OPACITY_COMPLETED, duration: 0.15, ease: EASE })
    g.to(icon, { borderColor: BORDER_DEFAULT, boxShadow: 'none', duration: 0.15, ease: EASE })
  }

  useEffect(() => {
    const section = sectionRef.current
    const line = lineRef.current
    const lineGlow = lineGlowRef.current
    if (!section) return

    const init = async () => {
      const { gsap } = await import('gsap')
      gsapRef.current = gsap

      const stepItems = section.querySelectorAll<HTMLElement>('.step-item')
      const stepIcons = section.querySelectorAll<HTMLElement>('.step-icon-wrap')
      const stepNumbers = section.querySelectorAll<HTMLElement>('.step-number')
      const stepTitles = section.querySelectorAll<HTMLElement>('.step-title')
      const heading = section.querySelector<HTMLElement>('.process-heading')

      if (heading) {
        gsap.fromTo(
          heading,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        )
      }

      stepItems.forEach((_, i) => {
        gsap.set(stepItems[i], { opacity: OPACITY_COMPLETED })
        gsap.set(stepIcons[i], { scale: 1, borderColor: BORDER_DEFAULT, boxShadow: 'none' })
      })
      if (line) gsap.set(line, { scaleX: 0, transformOrigin: 'left center' })
      if (lineGlow) gsap.set(lineGlow, { scaleX: 0, transformOrigin: 'left center' })

      const runLoop = () => {
        const tl = gsap.timeline({ repeat: -1 })
        // Reset at start of each cycle: all steps stay completed (readable), icons stay scale 1
        tl.set([line, lineGlow].filter(Boolean), { scaleX: 0, transformOrigin: 'left center' }, 0)
        tl.set(stepItems, { opacity: OPACITY_COMPLETED }, 0)
        tl.set(stepIcons, { scale: 1, borderColor: BORDER_DEFAULT, boxShadow: 'none' }, 0)
        // Line grows over full duration
        tl.to(
          [line, lineGlow].filter(Boolean),
          { scaleX: 1, duration: LINE_DURATION, ease: 'none', transformOrigin: 'left center' },
          0
        )
        // Steps activate when line leading edge reaches column center; complete when next activates (last at LINE_DURATION)
        addStepActiveTweens(tl, stepItems[0], stepIcons[0], stepNumbers[0], stepTitles[0], STEP_ACTIVATE_TIMES[0])
        addStepCompletedTweens(tl, stepItems[0], stepIcons[0], stepNumbers[0], stepTitles[0], STEP_ACTIVATE_TIMES[1])
        addStepActiveTweens(tl, stepItems[1], stepIcons[1], stepNumbers[1], stepTitles[1], STEP_ACTIVATE_TIMES[1])
        addStepCompletedTweens(tl, stepItems[1], stepIcons[1], stepNumbers[1], stepTitles[1], STEP_ACTIVATE_TIMES[2])
        addStepActiveTweens(tl, stepItems[2], stepIcons[2], stepNumbers[2], stepTitles[2], STEP_ACTIVATE_TIMES[2])
        addStepCompletedTweens(tl, stepItems[2], stepIcons[2], stepNumbers[2], stepTitles[2], STEP_ACTIVATE_TIMES[3])
        addStepActiveTweens(tl, stepItems[3], stepIcons[3], stepNumbers[3], stepTitles[3], STEP_ACTIVATE_TIMES[3])
        addStepCompletedTweens(tl, stepItems[3], stepIcons[3], stepNumbers[3], stepTitles[3], LINE_DURATION)
      }

      gsap.delayedCall(INITIAL_DELAY, runLoop)
    }
    init()
  }, [])

  return (
    <Section variant="transparent" id="proceso">
      <div ref={sectionRef} className="w-full pb-24 lg:pb-32">
        <Container className="pb-8">
          <div className="process-heading text-center mb-8 max-w-xl mx-auto">
            <h2 className="section-title font-display font-extrabold text-[clamp(1.5rem,2.8vw,2.25rem)] leading-tight text-[var(--color-text-primary)] mb-4">
              Simple, prolijo
              <br />
              <span className="text-[var(--color-text-secondary)]">y sin complicaciones</span>
            </h2>
            <p className="text-[var(--color-text-secondary)]">
              De la consulta a la instalación, acompañamos cada paso del proceso.
            </p>
          </div>
        </Container>

        <div className="w-full px-6 lg:px-8">
          <div className="relative pt-2 pb-4">
            {/* Base line */}
            <div
              ref={lineRef}
              className="process-line hidden md:block absolute top-8 left-0 w-full h-px bg-[var(--color-border)]"
              style={{ transformOrigin: 'left center' }}
            />
            {/* Glow at leading edge: gradient overlay, scaleX in sync with line */}
            <div
              ref={lineGlowRef}
              className="process-line hidden md:block absolute top-8 left-0 w-full h-px pointer-events-none"
              style={{
                transformOrigin: 'left center',
                background: 'linear-gradient(to right, transparent 0%, transparent 85%, var(--color-primary-accent) 92%, var(--color-primary-accent) 100%)',
                opacity: 0.8,
              }}
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
              {steps.map((step, i) => (
                <div
                  key={step.number}
                  className="step-item flex flex-col items-center text-center max-w-[180px] mx-auto cursor-default"
                  onMouseEnter={() => handleStepMouseEnter(i)}
                  onMouseLeave={() => handleStepMouseLeave(i)}
                >
                  <span className="step-number text-[10px] font-display font-medium tracking-widest uppercase mb-4 text-[var(--color-text-secondary)]">
                    {step.number}
                  </span>
                  <div className="step-icon-wrap w-14 h-14 rounded-full border flex items-center justify-center text-[var(--color-primary-accent)] mb-5">
                    {step.icon}
                  </div>
                  <h3 className="step-title section-title font-display font-bold text-base mb-3 tracking-widest text-[var(--color-text-primary)]">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>

            {/* Minimal CTA: consult with advisor */}
            <div className="mt-16 flex flex-col items-center gap-4">
              <p className="text-sm text-[var(--color-text-muted)]">
                ¿Tenés dudas sobre qué sistema necesitás?
              </p>
              <Button href="#contacto" variant="outline" size="sm">
                Consultá con un asesor
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
