import Image from 'next/image'
import { Instagram, Mail, Phone } from 'lucide-react'
import { CONTACT } from '@/app/constants/contact'

export function Footer() {
  return (
    <footer className="bg-[var(--color-background)] border-t border-[var(--color-border)] flex flex-col">
      {/* Top: logo grande + descripción, navegación, contacto */}
      <div
        className="flex-1 px-6 py-12 mx-auto w-full lg:px-8 lg:py-16"
        style={{ maxWidth: 'var(--container-max)' }}
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          {/* Brand: logo + descripción */}
          <div className="flex flex-col gap-4 items-start">
            <Image
              src="/logo-positivo.png"
              alt="ZC Seguridad"
              width={200}
              height={200}
              className="object-contain object-left w-auto h-12 sm:h-16 md:h-20"
            />
            <p className="text-[11px] text-[var(--color-text-muted)]">Córdoba, Argentina</p>

          </div>

          {/* Navegación */}
          <div>
            <p className="text-xs font-display font-semibold tracking-widest uppercase text-[var(--color-text-muted)] mb-4">Navegación</p>
            <div className="flex flex-col gap-3">
              {['Sistema', 'App', 'Proceso', 'Contacto'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Contacto */}
          <div>
            <p className="text-xs font-display font-semibold tracking-widest uppercase text-[var(--color-text-muted)] mb-4">Contacto</p>
            <div className="flex flex-col gap-3">
              <a href={`tel:${CONTACT.phoneRaw}`} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
                <Phone size={14} />
                {CONTACT.phone}
              </a>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
                <Mail size={14} />
                {CONTACT.email}
              </a>
              <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
                <Instagram size={14} />
                {CONTACT.instagramHandle}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: solo derechos reservados + hecho por */}
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
