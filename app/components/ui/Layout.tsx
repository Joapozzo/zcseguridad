import React from 'react'

// Container
interface ContainerProps {
  children: React.ReactNode
  className?: string
  ref?: React.RefObject<HTMLDivElement | null>
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className = '' }, ref) => (
    <div
      ref={ref}
      className={`w-full mx-auto px-6 py-16 lg:px-8 lg:py-20 ${className}`}
      style={{ maxWidth: 'var(--container-max)' }}
    >
      {children}
    </div>
  )
)
Container.displayName = 'Container'

// Section
type SectionVariant = 'dark' | 'light' | 'surface' | 'transparent' | 'gradient-dark' | 'gradient-light'

interface SectionProps {
  children: React.ReactNode
  variant?: SectionVariant
  className?: string
  id?: string
}

const sectionVariants: Record<SectionVariant, string> = {
  dark: 'bg-[var(--color-background)]',
  light: 'bg-[var(--color-surface-light)]',
  surface: 'bg-[var(--color-surface)]',
  transparent: 'bg-transparent',
  /** Degradé gris → negro minimalista, estilo iPhone dark */
  'gradient-dark':
    'bg-[var(--color-background)] bg-gradient-to-b from-[#0c0c0c] via-[#080808] to-[#000000]',
  /** Blanco con degradé sutil minimalista, estilo iPhone light */
  'gradient-light':
    'bg-gradient-to-b from-[#fafafa] via-[#f5f5f5] to-[#f0f0f0]',
}

export function Section({ children, variant = 'dark', className = '', id }: SectionProps) {
  return (
    <section
      id={id}
      className={`w-full ${sectionVariants[variant]} ${className}`}
    >
      {children}
    </section>
  )
}

// Badge
interface BadgeProps {
  children: React.ReactNode
  className?: string
}

export function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border border-[var(--color-primary-accent)] text-[var(--color-primary-accent)] bg-[var(--color-primary-accent-muted)] font-display tracking-widest uppercase ${className}`}
    >
      {children}
    </span>
  )
}
