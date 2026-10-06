'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { CONTACT } from './constants/contact'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="flex min-h-screen w-full items-center justify-center px-6 py-20">
      <div className="mx-auto max-w-lg text-center">
        <p className="mb-4 font-display text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-text-muted)]">
          Algo salió mal
        </p>
        <h1 className="mb-4 font-display font-extrabold text-[clamp(1.6rem,3.5vw,2.5rem)] leading-tight text-[var(--color-text-primary)]">
          No pudimos cargar esta sección
        </h1>
        <p className="mb-10 text-[var(--color-text-secondary)]">
          Probá de nuevo en unos segundos. Si el problema sigue, contactanos al{' '}
          <a href={`tel:${CONTACT.phoneRaw}`} className="underline underline-offset-4">
            {CONTACT.phone}
          </a>
          .
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-12 items-center rounded-[var(--radius-sm)] bg-[var(--color-primary-accent)] px-8 font-medium text-[var(--color-text-inverse)] transition-colors hover:bg-[var(--color-primary-accent-hover)]"
          >
            Reintentar
          </button>
          <Link
            href="/"
            className="inline-flex h-12 items-center rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] px-8 font-medium text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-surface)]"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </main>
  )
}
