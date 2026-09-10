'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, CheckCircle, Paperclip } from 'lucide-react'
import { Container, Section } from '../../ui/Layout'
import { Button } from '../../ui/Button'
import { Input, Select, Textarea } from '../../ui/Form'
import { useContact } from '@/app/hooks/useContact'

const obraOptions = [
  { value: 'edificio', label: 'Edificio' },
  { value: 'industria', label: 'Industria' },
  { value: 'comercio', label: 'Comercio' },
  { value: 'adecuacion', label: 'Adecuación / ampliación' },
  { value: 'residencial', label: 'Residencial' },
  { value: 'otro', label: 'Otro' },
]

export function FireCTASection() {
  const contact = useContact()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    nombre: '',
    empresa: '',
    telefono: '',
    email: '',
    tipoObra: '',
    localidad: '',
    descripcion: '',
    planos: '',
  })

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(contact.addressForMap)}&output=embed`

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.fromTo(
        sectionRef.current!.querySelectorAll('.cta-reveal'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      )
    }
    init()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const planosLine = form.planos
      ? `\nPlanos adjuntos (enviar por WhatsApp): ${form.planos}`
      : ''
    const message = encodeURIComponent(
      `Hola, quiero solicitar asesoramiento sobre detección de incendios.\n\n` +
        `Nombre: ${form.nombre}\n` +
        `Empresa: ${form.empresa}\n` +
        `Teléfono: ${form.telefono}\n` +
        `Email: ${form.email}\n` +
        `Tipo de obra: ${form.tipoObra}\n` +
        `Localidad: ${form.localidad}\n` +
        `Descripción: ${form.descripcion}` +
        planosLine
    )
    window.open(`https://wa.me/${contact.whatsappNumber}?text=${message}`, '_blank')
    setSubmitted(true)
  }

  return (
    <Section variant="surface" id="contacto" className="min-h-dvh flex flex-col justify-center">
      <Container ref={sectionRef} className="py-20 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12 opacity-0 cta-reveal">
            <h2 className="font-display font-extrabold text-[clamp(1.5rem,3.2vw,2.5rem)] leading-tight tracking-tight text-[var(--color-text-primary)] mb-4">
              ¿Necesitás un sistema de detección de incendio o actualizar el existente?
            </h2>
            <p className="max-w-2xl mx-auto text-sm md:text-base text-[var(--color-text-secondary)]">
              Contanos brevemente sobre tu proyecto en Córdoba. Nuestro equipo técnico se pondrá en contacto para analizar la solución más adecuada.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 items-start lg:grid-cols-2 lg:gap-12 mb-12">
            <div className="opacity-0 cta-reveal order-2 lg:order-1">
              {submitted ? (
                <div className="flex w-full flex-col items-center justify-center gap-4 text-center bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-6 min-h-[280px]">
                  <div className="w-14 h-14 shrink-0 rounded-full bg-[var(--color-primary-accent-muted)] border border-[var(--color-primary-accent)] flex items-center justify-center">
                    <CheckCircle size={24} className="text-[var(--color-primary-accent)]" />
                  </div>
                  <div className="min-w-0 px-1">
                    <h3 className="font-display font-bold text-lg text-[var(--color-text-primary)] mb-2">¡Listo!</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      Tu consulta fue enviada por WhatsApp. Si tenés planos, podés adjuntarlos en la conversación.
                    </p>
                  </div>
                  <Button type="button" variant="outline" size="md" onClick={() => setSubmitted(false)}>
                    Enviar otra consulta
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-6 flex flex-col gap-4"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Input
                      id="fire-nombre"
                      label="Nombre y apellido"
                      placeholder="Ej: Juan Pérez"
                      required
                      value={form.nombre}
                      onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    />
                    <Input
                      id="fire-empresa"
                      label="Empresa"
                      placeholder="Ej: Constructora Norte"
                      required
                      value={form.empresa}
                      onChange={(e) => setForm({ ...form, empresa: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Input
                      id="fire-telefono"
                      label="Teléfono"
                      placeholder="Ej: 351 326-8219"
                      type="tel"
                      required
                      value={form.telefono}
                      onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                    />
                    <Input
                      id="fire-email"
                      label="Email"
                      placeholder="Ej: juan@empresa.com"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Select
                      id="fire-obra"
                      label="Tipo de obra"
                      options={obraOptions}
                      required
                      value={form.tipoObra}
                      onChange={(e) => setForm({ ...form, tipoObra: e.target.value })}
                    />
                    <Input
                      id="fire-localidad"
                      label="Localidad"
                      placeholder="Ej: Córdoba Capital"
                      value={form.localidad}
                      onChange={(e) => setForm({ ...form, localidad: e.target.value })}
                    />
                  </div>
                  <Textarea
                    id="fire-descripcion"
                    label="Breve descripción del proyecto"
                    placeholder="Contanos superficie, uso del edificio, si hay sistema existente..."
                    value={form.descripcion}
                    onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                  />
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="fire-planos"
                      className="text-sm font-medium text-[var(--color-text-secondary)] font-display"
                    >
                      Adjuntar planos <span className="text-[var(--color-text-muted)]">(opcional)</span>
                    </label>
                    <label
                      htmlFor="fire-planos"
                      className="flex items-center gap-3 px-4 py-3 rounded-[var(--radius-sm)] border border-dashed border-[var(--color-border)] bg-[var(--color-surface-elevated)] cursor-pointer hover:border-[var(--color-text-muted)] transition-colors"
                    >
                      <Paperclip size={16} className="text-[var(--color-text-muted)] shrink-0" />
                      <span className="text-sm text-[var(--color-text-muted)] truncate">
                        {form.planos || 'PDF, DWG o imagen — se enviará por WhatsApp'}
                      </span>
                      <input
                        id="fire-planos"
                        type="file"
                        accept=".pdf,.dwg,.dxf,image/*"
                        className="sr-only"
                        onChange={(e) =>
                          setForm({ ...form, planos: e.target.files?.[0]?.name ?? '' })
                        }
                      />
                    </label>
                  </div>
                  <Button type="submit" variant="primary" size="lg" className="justify-center w-full group">
                    Enviar consulta
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
                  title="Ubicación ZC Seguridad"
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
        </div>
      </Container>
    </Section>
  )
}
