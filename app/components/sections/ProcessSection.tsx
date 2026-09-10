'use client'
import { useEffect, useRef } from 'react'
import { Container, Section } from '../ui/Layout'
import { ProcessSectionDesktop } from './ProcessSectionDesktop'
import { ProcessSectionMobile } from './ProcessSectionMobile'
import { type ProcessContent, securityProcessContent } from './processSteps'

export function ProcessSection({ content = securityProcessContent }: { content?: ProcessContent }) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const heading = section.querySelector<HTMLElement>('.process-heading')
    if (!heading) return
    const init = async () => {
      const { gsap } = await import('gsap')
      gsap.fromTo(
        heading,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      )
    }
    init()
  }, [])

  return (
    <Section variant="transparent" id="proceso">
      <div ref={sectionRef} className="w-full pb-24 lg:pb-32">
        <Container className="pb-8">
          <div className="process-heading text-center mb-8 max-w-xl mx-auto">
            <h2 className="section-title font-display font-extrabold text-[clamp(1.5rem,2.8vw,2.25rem)] leading-tight text-[var(--color-text-primary)] mb-4">
              {content.title}
            </h2>
            <p className="text-[var(--color-text-secondary)]">{content.subtitle}</p>
          </div>
        </Container>

        <div className="hidden md:block">
          <ProcessSectionDesktop content={content} />
        </div>
        <div className="md:hidden">
          <ProcessSectionMobile sectionRef={sectionRef} content={content} />
        </div>
      </div>
    </Section>
  )
}
