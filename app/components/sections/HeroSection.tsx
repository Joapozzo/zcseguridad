'use client'

import { Home, Clock, Star } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { Button } from '../ui/Button'
import { useContact } from '@/app/hooks/useContact'

const heroStats = [
  { value: '+200', label: 'instalaciones', icon: Home },
  { value: '24/7', label: 'monitoreo', icon: Clock },
  { value: '5', label: 'calificación', icon: Star },
] as const

export function HeroSection() {
  const contact = useContact()

  return (
    <section className="flex overflow-hidden relative flex-col justify-center items-center w-full h-screen min-h-dvh">
      {/* Video de fondo */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-cover absolute inset-0 w-full h-full"
          aria-hidden
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/55" aria-hidden />

      {/* Contenido centrado — minimalista, el video es protagonista */}
      <div className="flex relative z-10 flex-col justify-center items-center px-4 pt-16 pb-20 text-center">
        <h1 className="font-display font-semibold text-[clamp(1.25rem,3.5vw,1.75rem)] tracking-[0.25em] uppercase text-white mb-4 max-w-xl">
          Seguridad inteligente para tu empresa o negocio
        </h1>
        <p className="mb-8 max-w-md text-sm font-light tracking-wide md:text-base text-white/80">
          Tecnología AJAX instalada por especialistas en Córdoba
        </p>
        <div className="flex flex-col gap-3 items-center w-full max-w-sm sm:flex-row sm:w-auto sm:max-w-none">
          <Button
            variant="primary"
            size="md"
            href="#contacto"
            className="justify-center w-full text-xs font-medium tracking-widest uppercase sm:w-auto"
          >
            Solicitar diagnóstico de seguridad
          </Button>
          <Button
            variant="outline"
            size="md"
            href={contact.whatsappLink}
            target="_blank"
            className="justify-center w-full text-sm tracking-wide sm:w-auto border-white/30 text-white/90 hover:bg-white/10 hover:border-white/50"
          >
            <FaWhatsapp size={18} />
            WhatsApp
          </Button>
        </div>
      </div>

      {/* Stats — pie del hero, minimalista con iconos. Mobile: columna y más chicas; desktop: fila */}
      <div className="flex flex-col gap-3 absolute right-0 left-0 bottom-6 z-10 justify-center items-center text-center md:flex-row md:gap-16">
        {heroStats.map(({ value, label, icon: Icon }) => (
          <div key={label} className="flex flex-row gap-1.5 items-center md:gap-2">
            <Icon strokeWidth={1.5} className="w-4 h-4 shrink-0 text-white/50 md:w-5 md:h-5" aria-hidden />
            <div className="flex flex-col items-start text-left">
              <span className="text-xs font-medium tracking-wide font-display text-white/90 md:text-sm">{value}</span>
              <span className="text-[9px] text-white/50 uppercase tracking-[0.12em] md:text-[10px] md:tracking-[0.15em]">{label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
