'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { Button } from '../ui/Button'
import { useContact } from '@/app/hooks/useContact'
import { FaWhatsapp } from 'react-icons/fa'

const navLinks = [
  { label: 'Sistema', href: '#sistema' },
  { label: 'App', href: '#app' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Contacto', href: '#contacto' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const contact = useContact()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      {/* Barra flotante — mobile: glass; desktop: sin scroll = sin fondo, con scroll = blanco */}
      <header
        className="fixed top-0 right-0 left-0 z-50 px-4 pt-3 transition-all duration-300 pointer-events-none sm:pt-4 md:px-6"
      >
        <div
          className={`pointer-events-auto mx-auto max-w-xl rounded-2xl transition-all duration-300 md:max-w-5xl md:px-6 ${scrolled
              ? 'border shadow-lg backdrop-blur-xl border-white/10 bg-white/10 md:bg-white md:border-neutral-200 md:shadow-md'
              : 'border backdrop-blur-md border-white/5 bg-white/5 md:border-transparent md:bg-transparent'
            }`}
        >
          <div className="flex relative justify-between items-center px-4 h-14 sm:h-16 sm:px-5 md:justify-between md:px-0">
            {/* Mobile: bars | Desktop: nav */}
            <div className="flex gap-1 items-center md:gap-8">
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="flex h-10 w-10 -ml-2 items-center justify-center rounded-xl text-(--color-text-primary) transition-colors hover:bg-white/10 active:bg-white/15 md:hidden"
                aria-label="Abrir menú"
              >
                <Menu size={22} strokeWidth={1.8} />
              </button>
              <nav className="hidden md:flex md:items-center md:gap-8">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium tracking-wide transition-colors font-display ${scrolled
                        ? 'text-neutral-600 hover:text-neutral-900'
                        : 'text-(--color-text-secondary) hover:text-(--color-text-primary)'
                      }`}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Logo centrado — mobile: siempre positivo; desktop: positivo sin scroll, normal con scroll */}
            <a
              href="#"
              className="flex absolute top-1/2 left-1/2 items-center -translate-x-1/2 -translate-y-1/2"
              aria-label="ZC Seguridad"
            >
              <Image
                src="/logo-positivo.png"
                alt="ZC Seguridad"
                width={120}
                height={32}
                className="w-auto h-7 transition-opacity sm:h-8 md:h-8 md:hidden"
                priority
              />
              <Image
                src={scrolled ? '/logo.png' : '/logo-positivo.png'}
                alt="ZC Seguridad"
                width={120}
                height={32}
                className="hidden w-auto h-8 transition-opacity md:block"
                priority
              />
            </a>

            {/* Mobile: espaciador | Desktop: CTA */}
            <div className="flex items-center w-10 h-10 shrink-0 md:w-auto md:gap-2">
              <span className="hidden md:flex md:items-center md:gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  href="#contacto"
                  className={scrolled ? 'text-white bg-neutral-900 hover:bg-neutral-800' : ''}
                  as="a"
                >
                  Solicitar diagnóstico
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  href={contact.whatsappLink}
                  target="_blank"
                  className={scrolled ? 'border-neutral-300 text-neutral-700 hover:bg-neutral-100' : ''}
                >
                  <FaWhatsapp size={20} />
                </Button>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay — cierre al tocar fuera */}
      <div
        role="button"
        tabIndex={-1}
        aria-label="Cerrar menú"
        onClick={closeMenu}
        onKeyDown={(e) => e.key === 'Escape' && closeMenu()}
        className={`fixed inset-0 z-60 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        style={{ touchAction: 'none' }}
      />

      {/* Menú tipo glass — animado */}
      <aside
        aria-hidden={!menuOpen}
        aria-modal="true"
        className={`fixed top-0 left-0 z-70 h-full w-[min(100vw,320px)] flex flex-col transition-[transform,opacity] duration-300 ease-out ${menuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full pointer-events-none'
          }`}
      >
        <div className="flex flex-col h-full border-r shadow-2xl backdrop-blur-xl bg-white/8 border-white/10">
          {/* Cabecera del menú */}
          <div className="flex justify-between items-center px-4 h-14 border-b border-white/5 sm:h-16 sm:px-5">
            <Image
              src="/logo-positivo.png"
              alt=""
              width={100}
              height={28}
              className="w-auto h-6 opacity-90"
            />
            <button
              type="button"
              onClick={closeMenu}
              className="flex items-center justify-center w-10 h-10 -mr-2 rounded-xl text-(--color-text-primary) hover:bg-white/10 active:bg-white/15 transition-colors"
              aria-label="Cerrar menú"
            >
              <X size={22} strokeWidth={1.8} />
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col flex-1 gap-1 px-4 py-6">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="py-3 px-3 rounded-xl text-(--color-text-secondary) hover:text-(--color-text-primary) hover:bg-white/5 font-display font-medium text-base transition-colors"
                style={{
                  transitionDelay: menuOpen ? `${40 * i}ms` : '0ms',
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTAs */}
          <div className="p-4 pt-2 space-y-2 border-t border-white/5">
            <Button
              variant="outline"
              size="md"
              href={contact.whatsappLink}
              target="_blank"
              className="justify-center w-full"
            >
              WhatsApp
            </Button>
            <Button variant="primary" size="md" href="#contacto" className="justify-center w-full" as="a">
              Solicitar diagnóstico
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
