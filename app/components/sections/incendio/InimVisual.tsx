'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import styles from './InimVisual.module.css'

const base = '/images/incendios/inim/'

const visuals = {
  engineering: { file: 'inim-ingenieria-planos', alt: 'Planificación de una instalación sobre planos, fotografía del catálogo INIM', width: 1075, height: 1521, label: 'Ingeniería desde el plano', note: 'Imagen de referencia · INIM', photo: true },
  equipment: { file: 'inim-enea-detector', alt: 'Detector de incendio de la serie Enea de INIM', width: 240, height: 240, label: 'Detección y activación manual', note: 'Enea · Pulsador EC0020' },
  studio: { file: 'inim-previdia-studio', alt: 'Interfaz real del software Previdia/STUDIO en una computadora portátil', width: 370, height: 243, label: 'Previdia/STUDIO', note: 'Configuración de centrales Previdia' },
  app: { file: 'inim-fire-app', alt: 'Menú de herramientas de instalación de la aplicación Inim Fire', width: 140, height: 284, label: 'Inim Fire', note: 'Para Previdia conectada a Inim Cloud Fire' },
  smartline: { file: 'inim-smartline-central', alt: 'Central convencional de detección de incendio INIM SmartLine', width: 179, height: 180, label: 'INIM SmartLine', note: 'Detección convencional por zonas' },
  previdia: { file: 'inim-previdia-max-central', alt: 'Central modular direccionable INIM Previdia Max', width: 137, height: 180, label: 'INIM Previdia Max', note: 'Detección analógica direccionable' },
  module: { file: 'inim-em411r-modulo', alt: 'Módulo INIM EM411R de interfaz de zona convencional', width: 160, height: 88, label: 'INIM EM411R', note: 'Interfaz de zona convencional para lazo direccionable' },
  sounder: { file: 'inim-senalizador-convencional', alt: 'Señalizador de alarma convencional INIM de pared, color blanco', width: 160, height: 160, label: 'Señalización INIM', note: 'Avisador convencional de pared' },
} as const

export type InimVisualKind = keyof typeof visuals

export function InimVisual({ kind, compact = false }: { kind: InimVisualKind; compact?: boolean }) {
  const item = visuals[kind]
  const stageRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (kind === 'engineering') return
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
    <figure ref={stageRef} className={`${styles.stage} ${kind === 'engineering' ? styles.photo : ''} ${kind === 'equipment' ? styles.equipment : ''} ${compact ? styles.compact : ''}`}>
      {kind === 'engineering' ? (
        <Image src={`${base}${item.file}.webp`} alt={item.alt} fill sizes="(max-width: 767px) 85vw, 42vw" className="object-cover" />
      ) : (
        <div className={styles.product}>
          <Image src={`${base}${item.file}.webp`} alt={item.alt} width={item.width} height={item.height} sizes={`${item.width}px`} style={{ width: item.width, height: item.height }} />
        </div>
      )}
      {kind === 'equipment' && (
        <Image src={`${base}inim-ec0020-pulsador.webp`} alt="Pulsador manual de alarma direccionable INIM EC0020" width={67} height={67} sizes="67px" className={styles.callPoint} />
      )}
      {kind !== 'engineering' && <div className={styles.backdrop} aria-hidden="true" />}
      <figcaption className={styles.caption}>
        <strong>{item.label}</strong>
        {item.note}
      </figcaption>
    </figure>
  )
}
