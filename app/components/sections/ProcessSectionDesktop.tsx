'use client'
import { useEffect, useRef } from 'react'
import { Button } from '../ui/Button'
import {
  steps,
  LINE_DURATION,
  STEP_ACTIVATE_TIMES,
  INITIAL_DELAY,
  OPACITY_COMPLETED,
  OPACITY_ACTIVE,
  BORDER_DEFAULT,
  BORDER_ACCENT,
  ACCENT_GLOW,
  EASE,
  addStepActiveTweens,
  addStepCompletedTweens,
} from './processSteps'

export function ProcessSectionDesktop() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const lineGlowRef = useRef<HTMLDivElement>(null)
  const gsapRef = useRef<typeof import('gsap').gsap | null>(null)

  const handleStepMouseEnter = (index: number) => {
    const g = gsapRef.current
    const container = containerRef.current
    if (!g || !container) return
    const items = container.querySelectorAll<HTMLElement>('.step-item')
    const icons = container.querySelectorAll<HTMLElement>('.step-icon-wrap')
    const item = items[index]
    const icon = icons[index]
    if (!item || !icon) return
    g.to(item, { opacity: OPACITY_ACTIVE, duration: 0.15, ease: EASE })
    g.to(icon, { borderColor: BORDER_ACCENT, boxShadow: ACCENT_GLOW, duration: 0.15, ease: EASE })
  }

  const handleStepMouseLeave = (index: number) => {
    const g = gsapRef.current
    const container = containerRef.current
    if (!g || !container) return
    const items = container.querySelectorAll<HTMLElement>('.step-item')
    const icons = container.querySelectorAll<HTMLElement>('.step-icon-wrap')
    const item = items[index]
    const icon = icons[index]
    if (!item || !icon) return
    g.to(item, { opacity: OPACITY_COMPLETED, duration: 0.15, ease: EASE })
    g.to(icon, { borderColor: BORDER_DEFAULT, boxShadow: 'none', duration: 0.15, ease: EASE })
  }

  useEffect(() => {
    const container = containerRef.current
    const line = lineRef.current
    const lineGlow = lineGlowRef.current
    if (!container) return

    const init = async () => {
      const { gsap } = await import('gsap')
      gsapRef.current = gsap

      const stepItems = container.querySelectorAll<HTMLElement>('.step-item')
      const stepIcons = container.querySelectorAll<HTMLElement>('.step-icon-wrap')
      const stepNumbers = container.querySelectorAll<HTMLElement>('.step-number')
      const stepTitles = container.querySelectorAll<HTMLElement>('.step-title')

      stepItems.forEach((_, i) => {
        gsap.set(stepItems[i], { opacity: OPACITY_COMPLETED })
        gsap.set(stepIcons[i], { scale: 1, borderColor: BORDER_DEFAULT, boxShadow: 'none' })
      })
      if (line) gsap.set(line, { scaleX: 0, transformOrigin: 'left center' })
      if (lineGlow) gsap.set(lineGlow, { scaleX: 0, transformOrigin: 'left center' })

      const runLoop = () => {
        const tl = gsap.timeline({ repeat: -1 })
        // Line grows over full duration
        tl.to(
          [line, lineGlow].filter(Boolean),
          { scaleX: 1, duration: LINE_DURATION, ease: 'none', transformOrigin: 'left center' },
          0
        )
        addStepActiveTweens(tl, stepItems[0], stepIcons[0], stepNumbers[0], stepTitles[0], STEP_ACTIVATE_TIMES[0])
        addStepCompletedTweens(tl, stepItems[0], stepIcons[0], stepNumbers[0], stepTitles[0], STEP_ACTIVATE_TIMES[1])
        addStepActiveTweens(tl, stepItems[1], stepIcons[1], stepNumbers[1], stepTitles[1], STEP_ACTIVATE_TIMES[1])
        addStepCompletedTweens(tl, stepItems[1], stepIcons[1], stepNumbers[1], stepTitles[1], STEP_ACTIVATE_TIMES[2])
        addStepActiveTweens(tl, stepItems[2], stepIcons[2], stepNumbers[2], stepTitles[2], STEP_ACTIVATE_TIMES[2])
        addStepCompletedTweens(tl, stepItems[2], stepIcons[2], stepNumbers[2], stepTitles[2], STEP_ACTIVATE_TIMES[3])
        addStepActiveTweens(tl, stepItems[3], stepIcons[3], stepNumbers[3], stepTitles[3], STEP_ACTIVATE_TIMES[3])
        addStepCompletedTweens(tl, stepItems[3], stepIcons[3], stepNumbers[3], stepTitles[3], LINE_DURATION)
        // Reset at very end of cycle (invisible) so repeat starts clean and step 0 at 0 is not overwritten
        tl.set([line, lineGlow].filter(Boolean), { scaleX: 0, transformOrigin: 'left center' }, '>-0.01')
        tl.set(stepItems, { opacity: OPACITY_COMPLETED }, '>-0.01')
        tl.set(stepIcons, { scale: 1, borderColor: BORDER_DEFAULT, boxShadow: 'none' }, '>-0.01')
      }

      gsap.delayedCall(INITIAL_DELAY, runLoop)
    }
    init()
  }, [])

  return (
    <div ref={containerRef} className="w-full px-6 lg:px-8">
      <div className="relative pt-2 pb-4">
        <div
          ref={lineRef}
          className="absolute top-8 left-0 w-full h-px bg-[var(--color-border)]"
          style={{ transformOrigin: 'left center' }}
        />
        <div
          ref={lineGlowRef}
          className="absolute top-8 left-0 w-full h-px pointer-events-none"
          style={{
            transformOrigin: 'left center',
            background: 'linear-gradient(to right, transparent 0%, transparent 85%, var(--color-primary-accent) 92%, var(--color-primary-accent) 100%)',
            opacity: 0.8,
          }}
        />
        <div className="grid grid-cols-4 gap-6">
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
        <div className="mt-16 flex flex-col items-center gap-4">
          <p className="text-sm text-[var(--color-text-muted)]">¿Tenés dudas sobre qué sistema necesitás?</p>
          <Button href="#contacto" variant="outline" size="sm">
            Consultá con un asesor
          </Button>
        </div>
      </div>
    </div>
  )
}
