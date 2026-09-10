'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { Container, Section } from '../../ui/Layout'
import styles from './FireTechSection.module.css'

const brands = [
  { name: 'INIM Electronics', src: '/assets/brands/inim.svg' },
  { name: 'Autocall', src: '/assets/brands/autocall.svg' },
  { name: 'Simplex', src: '/assets/brands/simplex.svg' },
]

export function FireTechSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let disposed = false
    let media: { revert: () => void } | undefined

    const init = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      const track = trackRef.current
      const el = stickyRef.current
      if (disposed || !track || !el) return
      gsap.registerPlugin(ScrollTrigger)
      const matchMedia = gsap.matchMedia()
      media = matchMedia

      // Sticky track + scrub (no pin) so scroll stays continuous with the page.
      matchMedia.add('(prefers-reduced-motion: no-preference) and (min-height: 600px)', () => {
        const stage = el.querySelector<HTMLElement>('.tech-stage')
        const logos = Array.from(el.querySelectorAll<HTMLElement>('.tech-logo'))
        if (!stage || !logos.length) return

        const progress = { value: 0 }
        gsap.set(stage, { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', margin: 0, minHeight: 0 })
        let width = stage.clientWidth
        let height = stage.clientHeight
        gsap.set(logos, {
          position: 'absolute', left: 0, top: 0, opacity: 0,
          width: 'min(25%, 320px)', height: 'clamp(64px, 10vw, 120px)',
          xPercent: -50, yPercent: -50,
          transformPerspective: 1800, willChange: 'transform, opacity',
        })
        const setters = logos.map(logo => ({
          x: gsap.quickSetter(logo, 'x', 'px'),
          y: gsap.quickSetter(logo, 'y', 'px'),
          scale: gsap.quickSetter(logo, 'scale'),
          rotation: gsap.quickSetter(logo, 'rotationY', 'deg'),
          opacity: gsap.quickSetter(logo, 'opacity'),
        }))

        const header = el.querySelector('header')!
        let headerBottom = header.getBoundingClientRect().bottom - el.getBoundingClientRect().top
        const render = () => {
          const scroll = progress.value
          // Continuous travel: faster at the edges, slower through the center.
          // Its slope never reaches zero, so every scroll moves the group.
          const t = scroll + 0.55 * Math.sin(2 * Math.PI * scroll) / (2 * Math.PI)
          const depth = Math.sin(Math.PI * t)
          const fade = Math.min(1, depth / 0.65)
          const opacity = fade * fade * (3 - 2 * fade)
          const centerY = headerBottom + (height - headerBottom) * 0.5
          const groupX = width * (0.04 + 1.04 * (0.5 - 0.5 * Math.cos(Math.PI * t)))
          const spread = 0.55 + 0.45 * depth

          setters.forEach((set, index) => {
            // One group opens into three distinct slots; all face forward together.
            set.x(groupX - width * 0.06 * depth + (index - 1) * width * 0.3 * spread)
            set.y(height * 0.045 + (centerY - height * 0.045) * depth)
            set.scale(0.55 + 0.45 * depth)
            set.rotation(22 * Math.cos(Math.PI * t))
            set.opacity(scroll <= 0 || scroll >= 1 ? 0 : opacity)
          })
        }
        const measure = () => {
          width = stage.clientWidth
          height = stage.clientHeight
          headerBottom = header.getBoundingClientRect().bottom - el.getBoundingClientRect().top
          render()
        }

        render()
        const tween = gsap.to(progress, {
          value: 1,
          ease: 'none',
          onUpdate: render,
          scrollTrigger: {
            trigger: track,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.45,
            invalidateOnRefresh: true,
            onRefresh: measure,
          },
        })
        const resize = new ResizeObserver(measure)
        resize.observe(stage)
        return () => {
          resize.disconnect()
          tween.scrollTrigger?.kill()
          tween.kill()
          gsap.set(logos, { clearProps: 'all' })
          gsap.set(stage, { clearProps: 'all' })
        }
      }, track)
    }

    void init()
    return () => {
      disposed = true
      media?.revert()
    }
  }, [])

  return (
    <Section variant="dark" id="tecnologia" className="!bg-black p-0">
      <div
        ref={trackRef}
        className="relative min-h-[100svh] bg-black [@media(prefers-reduced-motion:no-preference)_and_(min-height:600px)]:min-h-[170vh]"
      >
        <div
          ref={stickyRef}
          className="relative flex min-h-[100svh] flex-col bg-black [@media(prefers-reduced-motion:no-preference)_and_(min-height:600px)]:sticky [@media(prefers-reduced-motion:no-preference)_and_(min-height:600px)]:top-0"
        >
          <Container className="flex flex-col !pt-28 !pb-8 sm:!pt-32">
            <header className="relative z-20 mx-auto max-w-xl shrink-0 bg-black text-center">
              <h2 className="section-title mb-4 font-display text-[clamp(1.5rem,2.8vw,2.25rem)] font-extrabold leading-tight text-[var(--color-text-primary)]">
                Tecnología INIM, Autocall<br />
                <span className="text-[var(--color-text-secondary)]">y Simplex</span>
              </h2>
              <p className="text-sm leading-relaxed text-[var(--color-text-secondary)] md:text-base">
                Seleccionamos la tecnología más adecuada según las características, la escala y los requerimientos de cada proyecto de detección de incendio.
              </p>
            </header>
          </Container>

          <div
            className="tech-stage relative isolate mt-6 flex min-h-[220px] w-full flex-1 flex-wrap items-center justify-center gap-6 overflow-hidden sm:min-h-[280px]"
            role="list"
            aria-label="Fabricantes"
          >
            {brands.map(brand => (
              <div key={brand.name} role="listitem" className={`${styles.logo} tech-logo flex h-24 w-[clamp(140px,25vw,320px)] items-center justify-center`}>
                <Image
                  src={brand.src}
                  alt={brand.name}
                  width={320}
                  height={120}
                  unoptimized
                  className="h-full w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
