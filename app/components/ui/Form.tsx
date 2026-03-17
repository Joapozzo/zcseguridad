import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Input({ label, className = '', id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-[var(--color-text-secondary)] font-display">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`
          w-full px-4 py-3 rounded-[var(--radius-sm)] text-sm
          bg-[var(--color-surface-elevated)] border border-[var(--color-border)]
          text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)]
          focus:outline-none focus:border-[var(--color-text-muted)] focus:ring-1 focus:ring-[var(--color-border-strong)]
          transition-all duration-200
          ${className}
        `}
        {...props}
      />
    </div>
  )
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: { value: string; label: string }[]
}

export function Select({ label, options, className = '', id, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-[var(--color-text-secondary)] font-display">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`
          w-full px-4 py-3 rounded-[var(--radius-sm)] text-sm appearance-none
          bg-[var(--color-surface-elevated)] border border-[var(--color-border)]
          text-[var(--color-text-primary)]
          focus:outline-none focus:border-[var(--color-text-muted)]
          transition-all duration-200 cursor-pointer
          ${className}
        `}
        {...props}
      >
        <option value="">Seleccionar...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
