'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { Bell, Video, Wifi, Globe, Lock, Activity } from 'lucide-react'
import { Container, Section, Badge } from '../ui/Layout'

const benefits = [
  { icon: <Bell size={18} />, title: 'Alertas instantáneas', desc: 'Notificaciones en tiempo real ante cualquier evento de seguridad.' },
  { icon: <Video size={18} />, title: 'Cámaras en vivo', desc: 'Acceso a video en tiempo real desde donde estés.' },
  { icon: <Lock size={18} />, title: 'Control remoto', desc: 'Activá y desactivá tu sistema con un toque.' },
  { icon: <Globe size={18} />, title: 'Desde cualquier lugar', desc: 'La app funciona en cualquier lugar del mundo.' },
  { icon: <Activity size={18} />, title: 'Historial completo', desc: 'Registro detallado de todos los eventos del sistema.' },
  { icon: <Wifi size={18} />, title: 'Siempre conectado', desc: 'Comunicación redundante: WiFi, GSM y Ethernet.' },
]

const APP_STORE_URL = '#'
const PLAY_STORE_URL = '#'

export function AppSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.fromTo(
        sectionRef.current!.querySelector('.app-text'),
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.9, scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      )
      gsap.fromTo(
        sectionRef.current!.querySelector('.app-visual'),
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.9, scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      )
      gsap.fromTo(
        sectionRef.current!.querySelectorAll('.benefit-item'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' } }
      )
    }
    init()
  }, [])

  return (
    <Section variant="gradient-dark" id="app" className="relative min-h-screen overflow-hidden">
      {/* Asset de fondo + overlay en degradado para que no se corte de golpe — solo desktop */}
      <div className="absolute inset-0 z-0 pointer-events-none hidden md:block">
        <Image
          src="/assets/1.png"
          alt=""
          fill
          className="object-cover object-right"
          sizes="100vw"
        />
        {/* Degradados en borde superior e inferior: el asset se funde con el fondo */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, #000000 0%, transparent 20%, transparent 80%, #000000 100%)',
          }}
          aria-hidden
        />
      </div>

      <Container ref={sectionRef} className="flex relative z-10 flex-col justify-center min-h-screen pb-8 lg:pb-20">
        <div className="grid grid-cols-1 grid-rows-1 items-center gap-y-8 gap-x-6 sm:grid-cols-2 sm:gap-10">
          {/* Bloque 1: texto + badges + features — 50% */}
          <div className="min-w-0 opacity-0 app-text">
            {/* <Badge className="mb-6">Control total</Badge> */}
            <h2 className="font-display font-extrabold text-[clamp(1.4rem,2.5vw,2.75rem)] leading-tight text-[var(--color-text-primary)] mb-6 uppercase tracking-[0.18em]">
              Tu seguridad,
              <br />
              <span className="text-[var(--color-text-secondary)] tracking-[0.18em]">en la palma de tu mano</span>
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed text-sm">
              La app Ajax Security System te da control completo sobre tu sistema.
              Accedé al estado de cada sensor, cámaras en vivo y recibí alertas instantáneas.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface)] text-[var(--color-text-primary)] text-[11px] font-display font-medium uppercase tracking-[0.12em] hover:border-[var(--color-text-muted)] hover:bg-[var(--color-surface-elevated)] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0" aria-hidden>
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                App Store
              </a>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface)] text-[var(--color-text-primary)] text-[11px] font-display font-medium uppercase tracking-[0.12em] hover:border-[var(--color-text-muted)] hover:bg-[var(--color-surface-elevated)] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0" aria-hidden>
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.302 2.302-8.636-8.636z" />
                </svg>
                Google Play
              </a>
            </div>

            {/* Features: 2 cols en mobile sin subtitle; desktop con desc */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {benefits.map((b) => (
                <div key={b.title} className="benefit-item opacity-0 flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] transition-colors">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-[var(--color-primary-accent-muted)] text-[var(--color-primary-accent)] flex items-center justify-center shrink-0">
                    {b.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-display font-normal text-[var(--color-text-primary)] mb-0.5">{b.title}</p>
                    <p className="hidden sm:block text-xs text-[var(--color-text-muted)] leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bloque 2: celular PEGADO al info, casi el mismo alto que la sección */}
          <div className="flex justify-center min-w-0 opacity-0 app-visual sm:justify-start">
            <div className="relative aspect-[9/16] h-[62vh] min-h-[280px] sm:h-[68vh] sm:min-h-[360px]">
              <Image
                src="/assets/app2.png"
                alt="App Ajax Security System en smartphone"
                fill
                className="object-contain object-center"
                sizes="(max-width: 640px) 200px, 260px"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
