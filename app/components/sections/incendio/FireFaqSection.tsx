'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Container, Section } from '../../ui/Layout'
import { INCENDIOS_FAQS } from '@/app/constants/seo-incendios'

export function FireFaqSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  useEffect(() => {
    let ctx: { revert: () => void } | undefined

    const init = async () => {
      const el = sectionRef.current
      if (!el) return
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.fromTo(
          el.querySelector('.faq-heading'),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: { trigger: el, start: 'top 78%' },
          }
        )
        gsap.fromTo(
          el.querySelectorAll('.faq-item'),
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.06,
            scrollTrigger: { trigger: el.querySelector('.faq-list'), start: 'top 82%' },
          }
        )
      }, el)
    }

    init()
    return () => ctx?.revert()
  }, [])

  return (
    <Section variant="dark" id="preguntas-frecuentes">
      <Container ref={sectionRef} className="py-20 lg:py-28">
        <div className="faq-heading mx-auto mb-10 max-w-2xl text-center opacity-0 md:mb-14">
          <h2 className="section-title mb-4 font-display text-[clamp(1.5rem,2.8vw,2.25rem)] font-extrabold leading-tight text-[var(--color-text-primary)]">
            Preguntas frecuentes sobre
            <br />
            <span className="text-[var(--color-text-secondary)]">detección de incendios</span>
          </h2>
          <p className="text-sm leading-relaxed text-[var(--color-text-secondary)] md:text-base">
            Respuestas claras sobre proyecto, tecnología y cobertura en Córdoba y provincia.
          </p>
        </div>

        <div className="faq-list mx-auto flex max-w-3xl flex-col gap-3">
          {INCENDIOS_FAQS.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={faq.question}
                className="faq-item overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] opacity-0"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.02] md:px-6"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="font-display text-sm font-semibold tracking-wide text-[var(--color-text-primary)] md:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-[var(--color-text-muted)] transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="border-t border-[var(--color-border)] px-5 py-4 text-sm leading-relaxed text-[var(--color-text-secondary)] md:px-6">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-[var(--color-text-muted)] md:mt-12">
          Zona de servicio: Córdoba capital y provincia. Proyectos para edificios, industrias, comercios y desarrollos
          que requieren detección y alarma de incendio con ingeniería, provisión e instalación profesional.
        </p>
      </Container>
    </Section>
  )
}
