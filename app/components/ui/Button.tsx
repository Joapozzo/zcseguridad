import React from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  target?: string
  as?: 'button' | 'a'
  children: React.ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-[var(--color-primary-accent)] text-[var(--color-text-inverse)] hover:bg-[var(--color-primary-accent-hover)] shadow-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.12)]',
  secondary: 'bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)] border border-[var(--color-border-strong)] hover:border-[var(--color-text-muted)]',
  outline: 'border border-[var(--color-border-strong)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] hover:border-[var(--color-text-muted)]',
  ghost: 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]',
  whatsapp: 'bg-[#25D366] text-white hover:bg-[#1fba58] shadow-lg hover:shadow-[0_0_30px_rgba(37,211,102,0.3)]',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 min-h-9 px-4 text-sm',
  md: 'h-11 min-h-11 px-6 text-base',
  lg: 'h-12 min-h-12 px-8 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  target,
  as,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const base = `inline-flex items-center gap-2 font-medium rounded-[var(--radius-sm)] transition-all duration-200 cursor-pointer tracking-wide`
  const styles = `${base} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

  if (href || as === 'a') {
    return (
      <a href={href} target={target} className={styles}>
        {children}
      </a>
    )
  }

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  )
}
