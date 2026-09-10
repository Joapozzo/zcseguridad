'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { FaWhatsapp } from 'react-icons/fa'
import { Button } from '../../ui/Button'
import { useContact } from '@/app/hooks/useContact'
import { useHeroReveal } from '@/app/hooks/useHeroReveal'

export function FireHeroSection() {
  const contact = useContact()
  const contentRef = useRef<HTMLDivElement>(null)
  useHeroReveal(contentRef)

  return (
    <section className="flex overflow-hidden relative flex-col justify-center items-center w-full h-screen min-h-dvh">
      <div className="absolute inset-0">
        <Image
          src="/assets/fire.avif"
          alt="Sistema de detección y alarma de incendio — ZC Seguridad Córdoba"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-black/65" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/50" aria-hidden />

      <div
        ref={contentRef}
        className="flex relative z-10 flex-col justify-center items-center px-4 pt-20 pb-20 mx-auto max-w-3xl text-center"
      >
        <p className="hero-reveal mb-4 text-xs font-display font-medium tracking-[0.2em] uppercase text-white/70">
          ZC Seguridad · Córdoba
        </p>
        <h1 className="hero-reveal font-display font-semibold text-[clamp(1.5rem,4vw,2.75rem)] leading-tight tracking-tight text-white mb-5">
          Detección de incendios en Córdoba para proyectos que perduran
        </h1>
        <p className="hero-reveal mb-8 max-w-xl text-sm font-light tracking-wide md:text-base text-white/80">
          Proyecto, provisión, instalación y puesta en marcha de sistemas de detección y alarma de incendio para edificios, industrias y desarrollos en Córdoba y provincia.
        </p>
        <div className="hero-reveal flex flex-col gap-3 items-center w-full max-w-sm sm:flex-row sm:w-auto sm:max-w-none">
          <Button
            variant="primary"
            size="md"
            href="#contacto"
            className="justify-center w-full text-xs font-medium tracking-widest uppercase sm:w-auto"
          >
            Solicitar asesoramiento
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
    </section>
  )
}
