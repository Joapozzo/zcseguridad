'use client'
import { useEffect, useRef } from 'react'
import { Button } from '../ui/Button'
import {
  steps,
  STEP_ACTIVATE_FRACTIONS,
  OPACITY_COMPLETED,
  addStepActiveTweens,
  addStepCompletedTweens,
  addStepDotTweens,
} from './processSteps'

const DURATION = 1 // timeline duration for scrub (progress 0–1)

export function ProcessSectionMobile({ sectionRef }: { sectionRef: React.RefObject<HTMLDivElement | null> }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const container = containerRef.current
    if (!section || !container) return

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const lineMobile = container.querySelector<HTMLElement>('.process-line-mobile')
      const stepItems = container.querySelectorAll<HTMLElement>('.step-item')
      const stepIcons = container.querySelectorAll<HTMLElement>('.step-icon-wrap')
      const stepNumbers = container.querySelectorAll<HTMLElement>('.step-number')
      const stepTitles = container.querySelectorAll<HTMLElement>('.step-title')
      const stepDots = container.querySelectorAll<HTMLElement>('.step-dot')

      if (!lineMobile || stepItems.length !== 4 || stepDots.length !== 4) return

      gsap.set(lineMobile, { scaleY: 0, transformOrigin: 'top center' })
      stepItems.forEach((el) => gsap.set(el, { opacity: OPACITY_COMPLETED }))
      stepIcons.forEach((el) => gsap.set(el, { scale: 1, borderColor: 'var(--color-border)', boxShadow: 'none' }))
      stepDots.forEach((el) => gsap.set(el, { backgroundColor: 'transparent' }))

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 60%',
          scrub: 1,
        },
      })

      tl.to(lineMobile, { scaleY: 1, duration: DURATION, ease: 'none', transformOrigin: 'top center' }, 0)

      const [a, b, c, d] = STEP_ACTIVATE_FRACTIONS
      addStepActiveTweens(tl, stepItems[0], stepIcons[0], stepNumbers[0], stepTitles[0], a)
      addStepDotTweens(tl, stepDots[0], true, a)
      addStepCompletedTweens(tl, stepItems[0], stepIcons[0], stepNumbers[0], stepTitles[0], b)
      addStepDotTweens(tl, stepDots[0], false, b)
      addStepActiveTweens(tl, stepItems[1], stepIcons[1], stepNumbers[1], stepTitles[1], b)
      addStepDotTweens(tl, stepDots[1], true, b)
      addStepCompletedTweens(tl, stepItems[1], stepIcons[1], stepNumbers[1], stepTitles[1], c)
      addStepDotTweens(tl, stepDots[1], false, c)
      addStepActiveTweens(tl, stepItems[2], stepIcons[2], stepNumbers[2], stepTitles[2], c)
      addStepDotTweens(tl, stepDots[2], true, c)
      addStepCompletedTweens(tl, stepItems[2], stepIcons[2], stepNumbers[2], stepTitles[2], d)
      addStepDotTweens(tl, stepDots[2], false, d)
      addStepActiveTweens(tl, stepItems[3], stepIcons[3], stepNumbers[3], stepTitles[3], d)
      addStepDotTweens(tl, stepDots[3], true, d)
      addStepCompletedTweens(tl, stepItems[3], stepIcons[3], stepNumbers[3], stepTitles[3], 1)
      addStepDotTweens(tl, stepDots[3], false, 1)
    }
    init()
  }, [sectionRef])

  return (
    <div ref={containerRef} className="w-full px-6 lg:px-8">
      <div className="relative pt-2 pb-4">
        <div className="relative">
          <div
            className="process-line-mobile absolute left-1/2 top-0 bottom-0 w-px bg-[var(--color-border)] -translate-x-1/2"
            style={{ transformOrigin: 'top center' }}
          />
          <div className="flex flex-col gap-12">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0
              return (
                <div
                  key={step.number}
                  className="step-item flex flex-row w-full relative"
                >
                  {isLeft ? null : <div className="flex-1 min-w-0" aria-hidden />}
                  <div
                    className={`w-[45%] shrink-0 flex flex-col ${
                      isLeft ? 'items-end text-right' : 'items-start text-left'
                    }`}
                  >
                    <span className="step-number text-[10px] font-display font-medium tracking-widest uppercase mb-4 text-[var(--color-text-secondary)]">
                      {step.number}
                    </span>
                    <div
                      className={`step-icon-wrap w-14 h-14 rounded-full border flex items-center justify-center text-[var(--color-primary-accent)] mb-5 ${
                        isLeft ? 'self-end' : 'self-start'
                      }`}
                    >
                      {step.icon}
                    </div>
                    <h3 className="step-title section-title font-display font-bold text-base mb-3 tracking-widest text-[var(--color-text-primary)]">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{step.description}</p>
                  </div>
                  {isLeft ? <div className="flex-1 min-w-0" aria-hidden /> : null}
                  <div
                    className="step-dot absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-[var(--color-primary-accent)] bg-[var(--color-background)] z-10"
                    aria-hidden
                  />
                </div>
              )
            })}
          </div>
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
