'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import styles from './InimVisual.module.css'

const base = '/images/incendios/inim/'
const clientBase = '/images/incendios/cliente/'

type Visual = { src: string; alt: string; width: number; height: number; label: string; note: string; photo?: boolean }
const visuals = {
  engineering: { src: base + 'inim-ingenieria-planos.webp', alt: 'Planificación de una instalación sobre planos, fotografía del catálogo INIM', width: 1075, height: 1521, label: 'Ingeniería desde el plano', note: 'Imagen de referencia · INIM', photo: true },
  equipment: { src: base + 'inim-enea-detector.webp', alt: 'Detector de incendio de la serie Enea de INIM', width: 240, height: 240, label: 'Detección y activación manual', note: 'Enea · Pulsador EC0020' },
  installation: { src: '/images/obra/hero-equipo.jpg', alt: 'Equipo de ZC Seguridad realizando una instalación en obra', width: 1080, height: 810, label: 'Instalación y programación', note: 'Equipo ZC Seguridad en obra', photo: true },
  commissioning: { src: '/images/obra/prueba-detector.jpg', alt: 'Detector y avisador de alarma instalados en un edificio', width: 1080, height: 810, label: 'Detección y alarma en obra', note: 'Instalación ZC Seguridad', photo: true },
  smartline: { src: clientBase + 'smartline-roja.png', alt: 'Central convencional INIM SmartLine roja', width: 210, height: 210, label: 'INIM SmartLine', note: 'Detección convencional por zonas' },
  previdia: { src: clientBase + 'previdia-compact-roja.png', alt: 'Central direccionable INIM Previdia Compact roja', width: 290, height: 290, label: 'INIM Previdia Compact', note: 'Detección direccionable' },
  existing: { src: clientBase + 'instalaciones-existentes.webp', alt: 'Cañería a la vista, detector y avisadores de incendio en un edificio existente', width: 960, height: 1280, label: 'Instalaciones y adecuaciones', note: 'Detección en edificios existentes', photo: true },
} satisfies Record<string, Visual>

export type InimVisualKind = keyof typeof visuals

export function InimVisual({ kind, compact = false }: { kind: InimVisualKind; compact?: boolean }) {
  const item: Visual = visuals[kind]
  const stageRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (kind !== 'equipment') return
    let disposed = false
    let media: { revert: () => void } | undefined
    async function animate() {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      if (disposed || !stageRef.current) return
      gsap.registerPlugin(ScrollTrigger)
      const stage = stageRef.current
      const matchMedia = gsap.matchMedia()
      media = matchMedia
      matchMedia.add('(prefers-reduced-motion: no-preference)', () => {
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: stage, start: 'top 95%', end: 'center 55%', scrub: 0.7 },
        })
        timeline.fromTo(stage.querySelector(`.${styles.product}`), { y: 28 }, { y: 0, ease: 'none' }, 0)
        timeline.fromTo(stage.querySelector(`.${styles.backdrop}`), { y: -10 }, { y: 0, ease: 'none' }, 0)
      }, stage)
    }
    void animate()
    return () => { disposed = true; media?.revert() }
  }, [kind])

  return (
    <figure ref={stageRef} className={`${styles.stage} ${item.photo ? styles.photo : ''} ${styles[kind] || ''} ${kind === 'equipment' ? styles.equipment : ''} ${compact ? styles.compact : ''}`}>
      {item.photo ? (
        <Image src={item.src} alt={item.alt} fill sizes="(max-width: 767px) 85vw, 42vw" className="object-cover" />
      ) : (
        <div className={styles.product}>
          <Image src={item.src} alt={item.alt} width={item.width} height={item.height} sizes={`${item.width}px`} style={{ width: item.width, height: item.height }} />
        </div>
      )}
      {kind === 'equipment' && (
        <Image src={`${base}inim-ec0020-pulsador.webp`} alt="Pulsador manual de alarma direccionable INIM EC0020" width={120} height={120} sizes="(max-width: 767px) 90px, 120px" className={styles.callPoint} />
      )}
      {!item.photo && <div className={styles.backdrop} aria-hidden="true" />}
      <figcaption className={styles.caption}>
        <strong>{item.label}</strong>
        {item.note}
      </figcaption>
    </figure>
  )
}
