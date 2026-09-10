'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Button } from '../ui/Button'
import { useContact } from '@/app/hooks/useContact'
import { MAIN_NAV, NAV_CTA } from '@/app/constants/nav'
import { FaWhatsapp } from 'react-icons/fa'

function resolveHref(href: string, pathname: string) {
  if (href.startsWith('#') && pathname !== '/') {
    return `${pathname}${href}`
  }
  return href
}

function isActive(href: string, pathname: string) {
  if (href === '/') return pathname === '/'
  if (href.startsWith('/#')) return false
  const path = href.split('#')[0]
  return path !== '/' && pathname.startsWith(path)
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const contact = useContact()
  const pathname = usePathname()

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

  const linkClass = (href: string) => {
    const active = isActive(href, pathname)
    const base = 'text-[15px] font-medium tracking-wide transition-colors font-display whitespace-nowrap'
    if (scrolled) {
      return `${base} ${active ? 'text-neutral-900' : 'text-neutral-600 hover:text-neutral-900'}`
    }
    return `${base} ${active ? 'text-(--color-text-primary)' : 'text-(--color-text-secondary) hover:text-(--color-text-primary)'}`
  }

  return (
    <>
      <header
        className="fixed top-0 right-0 left-0 z-50 px-4 pt-3 transition-all duration-300 pointer-events-none sm:pt-4 lg:px-6"
      >
        <div
          className={`pointer-events-auto mx-auto max-w-xl rounded-2xl transition-all duration-300 lg:max-w-7xl lg:px-5 ${scrolled
              ? 'border shadow-lg backdrop-blur-xl border-white/10 bg-white/10 lg:bg-white lg:border-neutral-200 lg:shadow-md'
              : 'border backdrop-blur-md border-white/5 bg-white/5 lg:border-transparent lg:bg-transparent'
            }`}
        >
          <div className="flex items-center gap-4 px-4 h-16 sm:h-[4.5rem] sm:px-5 lg:gap-6 lg:px-2">
            {/* Logo izquierda */}
            <Link href="/" className="flex items-center shrink-0" aria-label="ZC Seguridad">
              <Image
                src="/logo.png"
                alt="ZC Seguridad"
                width={120}
                height={32}
                className="h-8 w-auto max-h-8 transition-opacity sm:h-9 sm:max-h-9 lg:hidden"
                priority
              />
              <Image
                src={scrolled ? '/logo.png' : '/logo-positivo.png'}
                alt="ZC Seguridad"
                width={160}
                height={44}
                className="hidden w-auto h-11 transition-opacity lg:block"
                priority
              />
            </Link>

            {/* Nav centro — solo desktop ancho */}
            <nav className="hidden flex-1 justify-center items-center gap-7 xl:gap-9 lg:flex">
              {MAIN_NAV.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={resolveHref(link.href, pathname)}
                  className={linkClass(link.href)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA derecha + menú mobile */}
            <div className="flex items-center gap-2 ml-auto shrink-0">
              <span className="hidden lg:flex lg:items-center lg:gap-2">
                <Button
                  variant="primary"
                  size="md"
                  href={resolveHref(NAV_CTA.href, pathname)}
                  className={scrolled ? 'text-white bg-neutral-900 hover:bg-neutral-800' : ''}
                  as="a"
                >
                  {NAV_CTA.label}
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  href={contact.whatsappLink}
                  target="_blank"
                  className={scrolled ? 'border-neutral-300 text-neutral-700 hover:bg-neutral-100' : ''}
                >
                  <FaWhatsapp size={20} />
                </Button>
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="flex h-11 w-11 items-center justify-center rounded-xl text-(--color-text-primary) transition-colors hover:bg-white/10 active:bg-white/15 lg:hidden"
                aria-label="Abrir menú"
              >
                <Menu size={24} strokeWidth={1.8} />
              </button>
            </div>
          </div>
        </div>
      </header>

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

      <aside
        aria-hidden={!menuOpen}
        aria-modal="true"
        className={`fixed top-0 right-0 z-70 h-full w-[min(100vw,320px)] flex flex-col transition-[transform,opacity] duration-300 ease-out ${menuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
          }`}
      >
        <div className="flex h-full flex-col border-l border-white/10 bg-white/8 shadow-2xl backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between border-b border-white/5 px-4 sm:h-[4.5rem] sm:px-5">
            <Image
              src="/logo.png"
              alt=""
              width={120}
              height={32}
              className="h-8 w-auto max-h-8 opacity-95 sm:h-9 sm:max-h-9"
            />
            <button
              type="button"
              onClick={closeMenu}
              className="-mr-2 flex h-11 w-11 items-center justify-center rounded-xl text-(--color-text-primary) transition-colors hover:bg-white/10 active:bg-white/15"
              aria-label="Cerrar menú"
            >
              <X size={24} strokeWidth={1.8} />
            </button>
          </div>

          <nav className="flex flex-col flex-1 gap-1 px-4 py-6">
            {MAIN_NAV.map((link, i) => (
              <Link
                key={link.href + link.label}
                href={resolveHref(link.href, pathname)}
                onClick={closeMenu}
                className="py-3.5 px-3 rounded-xl text-(--color-text-secondary) hover:text-(--color-text-primary) hover:bg-white/5 font-display font-medium text-base transition-colors"
                style={{
                  transitionDelay: menuOpen ? `${40 * i}ms` : '0ms',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

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
            <Button
              variant="primary"
              size="md"
              href={resolveHref(NAV_CTA.href, pathname)}
              className="justify-center w-full"
              as="a"
            >
              {NAV_CTA.label}
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
