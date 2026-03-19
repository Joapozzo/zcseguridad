'use client'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { Container, Section } from '../ui/Layout'
import { Button } from '../ui/Button'
import { Input, Select } from '../ui/Form'
import { useContact } from '@/app/hooks/useContact'

const propertyOptions = [
  { value: 'casa', label: 'Casa' },
  { value: 'depto', label: 'Departamento' },
  { value: 'comercio', label: 'Comercio' },
  { value: 'oficina', label: 'Oficina' },
  { value: 'industria', label: 'Local industrial' },
  { value: 'otro', label: 'Otro' },
]

const BADGES = [
  'Diagnóstico sin costo',
  'Propuesta personalizada',
  'Técnicos certificados AJAX',
  'Garantía en todos los equipos',
  'Soporte post-instalación',
]

export function CTASection() {
  const contact = useContact()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ nombre: '', telefono: '', propiedad: '', ubicacion: '' })

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(contact.addressForMap)}&output=embed`

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.fromTo(
        sectionRef.current!.querySelectorAll('.cta-reveal'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      )
    }
    init()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = encodeURIComponent(
      `Hola, quiero solicitar un diagnóstico de seguridad.\n\n` +
      `Nombre: ${form.nombre}\n` +
      `Teléfono: ${form.telefono}\n` +
      `Tipo de propiedad: ${form.propiedad}\n` +
      `Ubicación: ${form.ubicacion}`
    )
    window.open(`https://wa.me/${contact.whatsappNumber}?text=${message}`, '_blank')
    setSubmitted(true)
  }

  return (
    <Section variant="surface" id="contacto">
      <Container ref={sectionRef}>
        <div className="mx-auto max-w-5xl">
          {/* Título arriba de todo */}
          <div className="text-center mb-12 opacity-0 cta-reveal">
            <h2 className="font-display font-extrabold text-[clamp(1.8rem,3.5vw,3rem)] leading-tight tracking-tight text-[var(--color-text-primary)]">
              Solicitá tu diagnóstico{' '}
              <span className="text-cta-security">de seguridad</span>
            </h2>
          </div>

          {/* Form (izq) + Mapa (der) */}
          <div className="grid grid-cols-1 gap-8 items-start lg:grid-cols-2 lg:gap-12 mb-12">
            <div className="opacity-0 cta-reveal order-2 lg:order-1">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-12 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-6">
                  <div className="w-14 h-14 rounded-full bg-[var(--color-primary-accent-muted)] border border-[var(--color-primary-accent)] flex items-center justify-center mb-4">
                    <CheckCircle size={24} className="text-[var(--color-primary-accent)]" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-[var(--color-text-primary)] mb-2">¡Listo!</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    Tu solicitud fue enviada por WhatsApp. Te responderemos a la brevedad.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-6 flex flex-col gap-4"
                >
                  <Input
                    id="nombre"
                    label="Nombre completo"
                    placeholder="Ej: Juan Pérez"
                    required
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  />
                  <Input
                    id="telefono"
                    label="Teléfono de contacto"
                    placeholder="Ej: 351 326-8219"
                    type="tel"
                    required
                    value={form.telefono}
                    onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                  />
                  <Select
                    id="propiedad"
                    label="Tipo de propiedad"
                    options={propertyOptions}
                    required
                    value={form.propiedad}
                    onChange={(e) => setForm({ ...form, propiedad: e.target.value })}
                  />
                  <Input
                    id="ubicacion"
                    label="Barrio / Localidad"
                    placeholder="Ej: Nueva Córdoba, Córdoba"
                    required
                    value={form.ubicacion}
                    onChange={(e) => setForm({ ...form, ubicacion: e.target.value })}
                  />
                  <Button type="submit" variant="primary" size="lg" className="justify-center w-full group">
                    Solicitar diagnóstico
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </Button>
                  <p className="text-xs text-center text-[var(--color-text-muted)]">
                    Al enviar, serás redirigido a WhatsApp con tu consulta.
                  </p>
                </form>
              )}
            </div>

            <div className="opacity-0 cta-reveal order-1 lg:order-2">
              <div className="rounded-[var(--radius-lg)] overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] aspect-[4/3] min-h-[240px]">
                <iframe
                  title="Ubicación ZC Ingeniería"
                  src={mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full min-h-[240px]"
                />
              </div>
              <p className="mt-3 text-xs text-[var(--color-text-muted)]">
                {contact.address} · Tel: {contact.phone} · {contact.email}
              </p>
            </div>
          </div>

          {/* Badges debajo, minimalista */}
          <div className="flex flex-wrap justify-center gap-2 opacity-0 cta-reveal">
            {BADGES.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[var(--color-text-secondary)] border border-[var(--color-border)] rounded-full bg-[var(--color-surface)]"
              >
                <CheckCircle size={12} className="text-[var(--color-primary-accent)] shrink-0" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
