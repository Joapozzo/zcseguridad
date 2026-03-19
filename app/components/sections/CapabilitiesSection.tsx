'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { ShieldAlert, Cctv, Flame, Zap } from 'lucide-react'
import { VIDEO_PATHS, mediaVideoUrl } from '@/app/constants/media'
import { Container, Section } from '../ui/Layout'

function CapabilityVideo({ src, alt }: { src: string; alt: string }) {
  return (
    <video
      src={src}
      muted
      playsInline
      autoPlay
      loop
      className="absolute inset-0 w-full h-full object-cover"
      aria-label={alt}
    />
  )
}

const capabilities = [
  {
    icon: <ShieldAlert size={28} />,
    title: 'Protección contra intrusiones',
    description: 'Sensores de movimiento, apertura y vibración de alta precisión. Detección perimetral e interior con zonas configurables para máxima cobertura.',
    detail: 'Sensores inalámbricos · Cifrado AES-128 · Anti-jamming',
    image: '/assets/intrusion.png',
  },
  {
    icon: <Cctv size={28} />,
    title: 'Videovigilancia',
    description: 'Cámaras integradas con visión nocturna, detección de movimiento inteligente y almacenamiento en la nube o local. Acceso remoto desde la app.',
    detail: 'Full HD · Visión nocturna · Detección IA',
    image: '/assets/video.avif',
  },
  {
    icon: <Flame size={28} />,
    title: 'Detección de incendios',
    description: 'Detectores de humo y temperatura con alarma sonora y notificación inmediata. Integrados al panel principal para respuesta coordinada.',
    detail: 'Detector de humo · Sensor de temperatura',
    image: '/assets/fire.avif',
  },
  {
    icon: <Zap size={28} />,
    title: 'Automatización y control',
    description: 'Integración con dispositivos inteligentes para automatizar acciones ante eventos de seguridad. Luces, cerraduras y más desde la misma app.',
    detail: 'Smart home · Cerraduras · Iluminación',
    image: '/assets/mobile.jpg',
    video: { path: VIDEO_PATHS.mobile },
  },
]

export function CapabilitiesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const init = async () => {
      const el = sectionRef.current
      if (!el) return
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.fromTo(
        el.querySelector('.cap-heading'),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: el, start: 'top 78%' } }
      )
      el.querySelectorAll('.cap-card').forEach((card, i) => {
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
    <Section variant="transparent" id="capacidades">
      <Container ref={sectionRef}>
        <div className="mx-auto mb-12 max-w-xl text-center opacity-0 cap-heading md:mb-16">
          <h2 className="section-title font-display font-extrabold text-[clamp(1.5rem,2.8vw,2.25rem)] leading-tight text-[var(--color-text-primary)] mb-4">
            Todo lo que necesitás,
            <br />
            <span className="text-[var(--color-text-secondary)]">en un solo sistema</span>
          </h2>
        </div>

        <div className="flex flex-col gap-6 md:gap-8">
          {capabilities.map((cap, i) => {
            const textFirst = i % 2 === 0
            return (
              <article
                key={cap.title}
                className="cap-card opacity-0 grid grid-cols-1 md:grid-cols-2 min-h-[280px] md:min-h-[320px] border border-[var(--color-border)] rounded-[var(--radius-lg)] overflow-hidden hover:border-[var(--color-border-strong)] transition-colors duration-300"
              >
                {/* Text block — orden según alternancia */}
                <div
                  className={`flex flex-col justify-center p-6 md:p-8 ${
                    textFirst ? 'md:order-1' : 'md:order-2'
                  } order-1`}
                >
                  <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--color-primary-accent-muted)] text-[var(--color-primary-accent)] flex items-center justify-center mb-4">
                    {cap.icon}
                  </div>
                  <h3 className="font-display font-bold text-lg text-[var(--color-text-primary)] mb-2 tracking-wide">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">
                    {cap.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cap.detail.split(' · ').map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] font-display"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Image/Video block — orden según alternancia */}
                <div
                  className={`relative w-full aspect-[4/3] md:aspect-auto md:h-full min-h-[200px] ${
                    textFirst ? 'md:order-2' : 'md:order-1'
                  } order-2`}
                >
                  {'video' in cap && cap.video ? (
                    <CapabilityVideo src={mediaVideoUrl(cap.video.path)} alt={cap.title} />
                  ) : (
                    <Image
                      src={cap.image}
                      alt={cap.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
