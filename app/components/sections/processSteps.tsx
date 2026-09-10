import React from 'react'
import { Search, PenTool, Wrench, CheckCircle } from 'lucide-react'

export const LINE_DURATION = 8
export const STEP_ACTIVATE_TIMES = [
  LINE_DURATION * 0.125,
  LINE_DURATION * 0.375,
  LINE_DURATION * 0.625,
  LINE_DURATION * 0.875,
]
// Scroll progress fractions for mobile (0–1)
export const STEP_ACTIVATE_FRACTIONS = [0.125, 0.375, 0.625, 0.875]
export const STATE_DURATION = 0.2
export const EASE = 'power2.inOut'
export const INITIAL_DELAY = 1

export const BORDER_DEFAULT = 'var(--color-border)'
export const BORDER_ACCENT = 'var(--color-primary-accent)'
export const TEXT_MUTED = 'var(--color-text-muted)'
export const TEXT_PRIMARY = 'var(--color-text-primary)'
export const ACCENT_GLOW = '0 0 10px 1px var(--color-primary-accent)'

export const OPACITY_PENDING = 0.7
export const OPACITY_COMPLETED = 0.85
export const OPACITY_ACTIVE = 1

export type ProcessStep = {
  icon: React.ReactNode
  number: string
  title: string
  description: string
}

export type ProcessContent = {
  title: React.ReactNode
  subtitle: string
  steps: ProcessStep[]
  ctaPrompt: string
  ctaLabel: string
  ctaHref?: string
}

export const securityProcessContent: ProcessContent = {
  title: (
    <>
      Simple, prolijo
      <br />
      <span className="text-[var(--color-text-secondary)]">y sin complicaciones</span>
    </>
  ),
  subtitle: 'De la consulta a la instalación, acompañamos cada paso del proceso.',
  steps: [
    {
      icon: <Search size={24} />,
      number: '01',
      title: 'Diagnóstico',
      description:
        'Analizamos tu propiedad, tus necesidades y los puntos vulnerables. Sin costo y sin compromiso.',
    },
    {
      icon: <PenTool size={24} />,
      number: '02',
      title: 'Diseño del sistema',
      description:
        'Diseñamos una solución a medida con los dispositivos AJAX más adecuados para tu caso.',
    },
    {
      icon: <Wrench size={24} />,
      number: '03',
      title: 'Instalación profesional',
      description:
        'Nuestro equipo instala todo de forma ordenada, prolija y sin daños en tu propiedad.',
    },
    {
      icon: <CheckCircle size={24} />,
      number: '04',
      title: 'Configuración y entrega',
      description:
        'Configuramos la app, te capacitamos y hacemos una prueba completa del sistema antes de retirarnos.',
    },
  ],
  ctaPrompt: '¿Tenés dudas sobre qué sistema necesitás?',
  ctaLabel: 'Consultá con un asesor',
  ctaHref: '#contacto',
}

export const fireProcessContent: ProcessContent = {
  title: (
    <>
      Instalación y puesta
      <br />
      <span className="text-[var(--color-text-secondary)]">en marcha</span>
    </>
  ),
  subtitle:
    'Metodología clara desde el análisis hasta la entrega: comunicación constante y acompañamiento en todas las etapas del sistema de incendio.',
  steps: [
    {
      icon: <Search size={24} />,
      number: '01',
      title: 'Análisis del proyecto',
      description: 'Relevamos las necesidades y la normativa aplicable.',
    },
    {
      icon: <PenTool size={24} />,
      number: '02',
      title: 'Ingeniería y diseño',
      description:
        'Definimos la tecnología y los dispositivos, y elaboramos la documentación técnica.',
    },
    {
      icon: <Wrench size={24} />,
      number: '03',
      title: 'Ejecución e instalación',
      description: 'Realizamos el montaje, el conexionado, la programación y las pruebas.',
    },
    {
      icon: <CheckCircle size={24} />,
      number: '04',
      title: 'Puesta en marcha',
      description: 'Completamos la verificación final, la entrega y la capacitación.',
    },
  ],
  ctaPrompt: '¿Tenés un proyecto de detección de incendio?',
  ctaLabel: 'Consultá con un asesor',
  ctaHref: '#contacto',
}

export function addStepActiveTweens(
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

export function addStepCompletedTweens(
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

export function addStepDotTweens(tl: GSAPTimeline, dot: HTMLElement, active: boolean, position: number) {
  tl.to(
    dot,
    {
      backgroundColor: active ? BORDER_ACCENT : 'transparent',
      duration: STATE_DURATION,
      ease: EASE,
    },
    position
  )
}
