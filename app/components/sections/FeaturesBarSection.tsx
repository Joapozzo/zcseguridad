'use client'
import { ShieldCheck, Radio, Headphones, Award } from 'lucide-react'
import { Section } from '../ui/Layout'

const features = [
  {
    icon: ShieldCheck,
    title: 'Garantía incluida',
    subtitle: 'En todos los dispositivos',
  },
  {
    icon: Radio,
    title: 'Sin obra civil',
    subtitle: 'Instalación inalámbrica',
  },
  {
    icon: Headphones,
    title: 'Soporte post-venta',
    subtitle: 'Asistencia permanente',
  },
  {
    icon: Award,
    title: 'Partner oficial AJAX',
    subtitle: 'Técnicos certificados',
  },
]

export function FeaturesBarSection() {
  return (
    <Section variant="transparent" className="w-full bg-[#f7f7f7]">
      <div className="w-full px-6 lg:px-8 py-10 lg:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-y-0 md:divide-x divide-[var(--color-border)]">
          {features.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-primary-accent)] mb-4 shrink-0">
                  <Icon size={22} strokeWidth={1.8} />
                </div>
                <p className="section-title font-display font-semibold text-sm text-[var(--color-text-primary)] mb-1 tracking-widest">
                  {item.title}
                </p>
                <p className="text-xs text-[var(--color-text-muted)]">{item.subtitle}</p>
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
