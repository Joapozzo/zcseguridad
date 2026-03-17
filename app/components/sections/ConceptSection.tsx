'use client'
import { useEffect, useRef } from 'react'
import { Smartphone } from 'lucide-react'
import { Section } from '../ui/Layout'

const pillars = [
  {
    image: '/assets/alarma.jpg',
    title: 'Alarmas',
    subtitle: 'Sensores inalámbricos de última generación.',
  },
  {
    image: '/assets/camaras.png',
    title: 'Cámaras',
    subtitle: 'Videovigilancia HD integrada al sistema.',
  },
  {
    image: '/assets/app.jpg',
    title: 'Control desde la app',
    subtitle: 'Gestión total desde tu celular.',
  },
]

export function ConceptSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const init = async () => {
      const el = sectionRef.current
      if (!el) return
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const titleEl = el.querySelector('.concept-title')
      const items = el.querySelectorAll('.pillar-item')
      if (!items.length) return

      if (titleEl) {
        gsap.fromTo(
          titleEl,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            scrollTrigger: { trigger: el, start: 'top 75%' },
          }
        )
      }

      gsap.fromTo(
        items,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          scrollTrigger: { trigger: el, start: 'top 65%' },
        }
      )
    }
    init()
  }, [])

  return (
    <Section variant="light" id="sistema" className="flex flex-col p-0 min-h-screen bg-white">
      <div ref={sectionRef} className="w-full bg-white flex flex-col min-h-[100vh]">
        {/* Título full width, fondo blanco — minimalista */}
        <div className="py-20 w-full bg-white opacity-0 concept-title shrink-0 lg:py-20">
          <div className="flex gap-3 justify-center items-center mb-2">
            <h2
              className="font-display font-semibold text-[clamp(1.125rem,2.5vw,1.5rem)] text-black text-center tracking-[0.2em] uppercase"
              style={{ letterSpacing: '0.2em' }}
            >
              Un sistema. Una app. Protección total.
            </h2>
          </div>
          <p className="mx-auto max-w-xl font-medium tracking-wide text-center text-md text-black/50">
            AJAX es el sistema de seguridad inalámbrico más avanzado. Instalamos, configuramos y monitoreamos todo por vos.
          </p>
        </div>

        {/* 3 columnas: row desktop, col mobile — ocupa el resto del 100vh */}
        <div className="flex flex-col flex-1 w-full min-h-0 md:flex-row">
          {pillars.map((pillar) => (
            <a
              key={pillar.title}
              href="#sistema"
              className="pillar-item opacity-0 flex-1 min-h-[240px] md:min-h-0 relative overflow-hidden group block"
            >
              {/* Fondo: foto ocupando todo el contenedor */}
              <div
                className="absolute inset-0 bg-center bg-cover transition-transform duration-500 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url(${encodeURI(pillar.image)})` }}
              />
              {/* Overlay sutil para legibilidad */}
              <div className="absolute inset-0 bg-gradient-to-t to-transparent opacity-80 transition-opacity duration-300 from-black/70 via-black/20 group-hover:opacity-90" />

              {/* Título y subtítulo minimalista abajo */}
              <div className="absolute right-0 bottom-0 left-0 p-6 text-white lg:p-8">
                <h3 className="mb-1 text-xl font-bold tracking-tight font-display lg:text-2xl">
                  {pillar.title}
                </h3>
                <p className="text-sm font-medium lg:text-base text-white/80">
                  {pillar.subtitle}
                </p>
              </div>

              {/* Efecto hover: borde/brillo sutil */}
              <div className="absolute inset-0 border-2 transition-colors duration-300 pointer-events-none border-white/0 group-hover:border-white/20" />
            </a>
          ))}
        </div>
      </div>
    </Section>
  )
}
