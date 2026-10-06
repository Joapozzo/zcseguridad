import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { CONTACT } from './constants/contact'

export const metadata: Metadata = {
  title: 'Página no encontrada',
  robots: { index: false, follow: true },
}

const SUGGESTIONS = [
  { label: 'Alarmas y seguridad AJAX', href: '/' },
  { label: 'Detección de incendios', href: '/incendios' },
  { label: 'Ajax EN54 inalámbrico', href: '/EN54' },
]

export default function NotFound() {
  return (
    <main className="flex flex-col w-full min-h-screen">
      <Navbar />
      <section id="contacto" className="flex flex-1 items-center justify-center px-6 pt-32 pb-20">
        <div className="mx-auto max-w-xl text-center">
          <p className="mb-4 font-display text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-text-muted)]">
            Error 404
          </p>
          <h1 className="mb-4 font-display font-extrabold text-[clamp(1.8rem,4vw,3rem)] leading-tight text-[var(--color-text-primary)]">
            No encontramos esta página
          </h1>
          <p className="mb-10 text-[var(--color-text-secondary)]">
            Puede que el enlace esté desactualizado o que la dirección tenga un error. Estas
            secciones te pueden servir:
          </p>
          <div className="mb-10 flex flex-col gap-2">
            {SUGGESTIONS.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4 text-left text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-border-strong)]"
              >
                {item.label}
                <ArrowRight
                  size={18}
                  className="text-[var(--color-text-muted)] transition-transform group-hover:translate-x-1"
                />
              </Link>
            ))}
          </div>
          <a
            href={CONTACT.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-[var(--radius-sm)] bg-[#25D366] px-8 font-medium text-white transition-colors hover:bg-[#1fba58]"
          >
            <FaWhatsapp size={20} />
            Escribinos por WhatsApp
          </a>
        </div>
      </section>
      <Footer />
    </main>
  )
}
