'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Instagram, Mail, Phone } from 'lucide-react'
import { CONTACT } from '@/app/constants/contact'
import { FOOTER_SERVICES, MAIN_NAV } from '@/app/constants/nav'

export function Footer() {
  const pathname = usePathname()

  const resolveHref = (href: string) => {
    if (href === '#contacto') {
      return pathname === '/' ? '/#contacto' : `${pathname}#contacto`
    }
    return href
  }

  return (
    <footer className="bg-[var(--color-background)] border-t border-[var(--color-border)] flex flex-col">
      <div
        className="flex-1 px-6 py-12 mx-auto w-full lg:px-8 lg:py-16"
        style={{ maxWidth: 'var(--container-max)' }}
      >
        <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-6 md:gap-4 md:text-left lg:gap-6 xl:gap-10">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <Image
              src="/logo-positivo.png"
              alt="ZC Seguridad — seguridad electrónica y detección de incendios en Córdoba"
              width={200}
              height={200}
              className="h-12 w-auto shrink-0 object-contain object-center sm:h-16 md:h-20 md:object-left"
            />
            <p className="text-[11px] tracking-wide uppercase text-[var(--color-text-muted)]">
              Engineering, Security & Fire
            </p>
            <p className="text-[11px] text-[var(--color-text-muted)]">Córdoba, Argentina</p>
          </div>

          <div>
            <p className="mb-4 font-display text-xs font-semibold tracking-widest uppercase text-[var(--color-text-muted)]">Navegación</p>
            <div className="flex flex-col items-center gap-3 md:items-start">
              {MAIN_NAV.map((item) => (
                <Link
                  key={item.href + item.label}
                  href={resolveHref(item.href)}
                  className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 font-display text-xs font-semibold tracking-widest uppercase text-[var(--color-text-muted)]">Servicios</p>
            <div className="flex flex-col items-center gap-3 md:items-start">
              {FOOTER_SERVICES.map((item) => (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 font-display text-xs font-semibold tracking-widest uppercase text-[var(--color-text-muted)]">Contacto</p>
            <div className="flex flex-col items-center gap-3 md:items-start">
              <a href={`tel:${CONTACT.phoneRaw}`} className="flex items-center justify-center gap-2 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)] md:justify-start">
                <Phone size={14} />
                {CONTACT.phone}
              </a>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center justify-center gap-2 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)] md:justify-start">
                <Mail size={14} />
                {CONTACT.email}
              </a>
              <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)] md:justify-start">
                <Instagram size={14} />
                {CONTACT.instagramHandle}
              </a>
            </div>
          </div>

          <div className="flex min-w-0 flex-col items-center md:items-start">
            <Image
              src="/ajax_auth.png"
              alt="Autorización electrónica AJAX Systems"
              width={400}
              height={80}
              sizes="(max-width: 768px) 100vw, 15vw"
              className="h-12 w-full max-w-full shrink-0 object-contain object-center brightness-0 invert sm:h-16 md:h-20 md:object-left"
            />
          </div>

          <div className="flex min-w-0 flex-col items-center md:items-start">
            <Image
              src="/logo-cesec.png"
              alt="Logo CESEC — Cámara de Empresas de Seguridad Electrónica del Centro"
              width={360}
              height={140}
              sizes="(max-width: 768px) 100vw, 15vw"
              className="h-12 w-full max-w-full shrink-0 object-contain object-center brightness-0 invert sm:h-14 md:h-20 md:object-left"
            />
          </div>
        </div>
      </div>

      <div className="w-full border-t border-[var(--color-border)]">
        <div
          className="w-full mx-auto px-6 lg:px-8 py-3 flex flex-col md:flex-row flex-wrap justify-center md:justify-between items-center gap-x-4 gap-y-1 text-[11px] text-[var(--color-text-muted)] text-center md:text-left"
          style={{ maxWidth: 'var(--container-max)' }}
        >
          <span>© {new Date().getFullYear()} ZC Seguridad. Todos los derechos reservados.</span>
          <a
            href="https://gentiomkt.com"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 hover:text-[var(--color-primary-accent)] transition-colors"
          >
            Hecho por gentiomkt
          </a>
        </div>
      </div>
    </footer>
  )
}
