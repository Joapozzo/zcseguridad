import React from 'react'

// Card
interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`
        bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-6 lg:p-8
        ${hover ? 'hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-elevated)] transition-all duration-300' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

// IconBlock
interface IconBlockProps {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
  accent?: boolean
}

export function IconBlock({ icon, title, description, className = '', accent = false }: IconBlockProps) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-[var(--radius-md)] ${
          accent
            ? 'bg-[var(--color-primary-accent-muted)] text-[var(--color-primary-accent)]'
            : 'bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)]'
        }`}
      >
        {icon}
      </div>
      <div>
        <h3 className="font-display font-semibold text-[var(--color-text-primary)] mb-1.5">{title}</h3>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
