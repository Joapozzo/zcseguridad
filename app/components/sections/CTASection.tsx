'use client'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, CheckCircle, Paperclip } from 'lucide-react'
import { Container, Section } from '../ui/Layout'
import { Button } from '../ui/Button'
import { Input, Select, Textarea } from '../ui/Form'
import { useContact } from '@/app/hooks/useContact'

const propertyOptions = [
  { value: 'casa', label: 'Casa' },
  { value: 'depto', label: 'Departamento' },
  { value: 'comercio', label: 'Comercio' },
  { value: 'oficina', label: 'Oficina' },
  { value: 'industria', label: 'Local industrial' },
  { value: 'otro', label: 'Otro' },
]

const obraOptions = [
  { value: 'edificio', label: 'Edificio' },
  { value: 'industria', label: 'Industria' },
  { value: 'comercio', label: 'Comercio' },
  { value: 'adecuacion', label: 'Adecuación / ampliación' },
  { value: 'residencial', label: 'Residencial' },
  { value: 'otro', label: 'Otro' },
]

const SECURITY_BADGES = [
  'Diagnóstico sin costo',
  'Propuesta personalizada',
  'Técnicos certificados AJAX',
  'Garantía en todos los equipos',
  'Soporte post-instalación',
]

type CTAVariant = 'security' | 'fire'

export function CTASection({ variant = 'security' }: { variant?: CTAVariant }) {
  const contact = useContact()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const isFire = variant === 'fire'

  const [securityForm, setSecurityForm] = useState({
    nombre: '',
    telefono: '',
    propiedad: '',
    ubicacion: '',
  })
  const [fireForm, setFireForm] = useState({
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
    const message = isFire
      ? encodeURIComponent(
          `Hola, quiero solicitar asesoramiento sobre detección de incendios.\n\n` +
            `Nombre: ${fireForm.nombre}\n` +
            `Empresa: ${fireForm.empresa}\n` +
            `Teléfono: ${fireForm.telefono}\n` +
            `Email: ${fireForm.email}\n` +
            `Tipo de obra: ${fireForm.tipoObra}\n` +
            `Localidad: ${fireForm.localidad}\n` +
            `Descripción: ${fireForm.descripcion}` +
            (fireForm.planos ? `\nPlanos adjuntos (enviar por WhatsApp): ${fireForm.planos}` : '')
        )
      : encodeURIComponent(
          `Hola, quiero solicitar un diagnóstico de seguridad.\n\n` +
            `Nombre: ${securityForm.nombre}\n` +
            `Teléfono: ${securityForm.telefono}\n` +
            `Tipo de propiedad: ${securityForm.propiedad}\n` +
            `Ubicación: ${securityForm.ubicacion}`
        )
    window.open(`https://wa.me/${contact.whatsappNumber}?text=${message}`, '_blank')
    setSubmitted(true)
  }

  return (
    <Section
      variant="surface"
      id="contacto"
      className={isFire ? 'min-h-dvh flex flex-col justify-center' : undefined}
    >
      <Container ref={sectionRef} className={isFire ? 'py-20 lg:py-28' : undefined}>
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12 opacity-0 cta-reveal">
            {isFire ? (
              <>
                <h2 className="font-display font-extrabold text-[clamp(1.5rem,3.2vw,2.5rem)] leading-tight tracking-tight text-[var(--color-text-primary)] mb-4">
                  ¿Necesitás un sistema de detección de incendio o actualizar el existente?
                </h2>
                <p className="max-w-2xl mx-auto text-sm md:text-base text-[var(--color-text-secondary)]">
                  Contanos brevemente sobre tu proyecto en Córdoba. Nuestro equipo técnico se pondrá
                  en contacto para analizar la solución más adecuada.
                </p>
              </>
            ) : (
              <h2 className="font-display font-extrabold text-[clamp(1.8rem,3.5vw,3rem)] leading-tight tracking-tight text-[var(--color-text-primary)]">
                Solicitá tu diagnóstico{' '}
                <span className="text-cta-security">de seguridad</span>
              </h2>
            )}
          </div>

          <div className="grid grid-cols-1 gap-8 items-start lg:grid-cols-2 lg:gap-12 mb-12">
            <div className="opacity-0 cta-reveal order-2 lg:order-1">
              {submitted ? (
                <div
                  className={`flex w-full flex-col items-center justify-center gap-4 text-center bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-6 ${
                    isFire ? 'min-h-[280px]' : 'aspect-[4/3] min-h-[240px]'
                  }`}
                >
                  <div className="w-14 h-14 shrink-0 rounded-full bg-[var(--color-primary-accent-muted)] border border-[var(--color-primary-accent)] flex items-center justify-center">
                    <CheckCircle size={24} className="text-[var(--color-primary-accent)]" />
                  </div>
                  <div className="min-w-0 px-1">
                    <h3 className="font-display font-bold text-lg text-[var(--color-text-primary)] mb-2">
                      ¡Listo!
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      {isFire
                        ? 'Tu consulta fue enviada por WhatsApp. Si tenés planos, podés adjuntarlos en la conversación.'
                        : 'Tu solicitud fue enviada por WhatsApp. Te responderemos a la brevedad.'}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="md"
                    className="shrink-0"
                    onClick={() => setSubmitted(false)}
                  >
                    {isFire ? 'Enviar otra consulta' : 'Volver a enviar otro mensaje'}
                  </Button>
                </div>
              ) : isFire ? (
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
                      value={fireForm.nombre}
                      onChange={(e) => setFireForm({ ...fireForm, nombre: e.target.value })}
                    />
                    <Input
                      id="fire-empresa"
                      label="Empresa"
                      placeholder="Ej: Constructora Norte"
                      required
                      value={fireForm.empresa}
                      onChange={(e) => setFireForm({ ...fireForm, empresa: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Input
                      id="fire-telefono"
                      label="Teléfono"
                      placeholder="Ej: 351 326-8219"
                      type="tel"
                      required
                      value={fireForm.telefono}
                      onChange={(e) => setFireForm({ ...fireForm, telefono: e.target.value })}
                    />
                    <Input
                      id="fire-email"
                      label="Email"
                      placeholder="Ej: juan@empresa.com"
                      type="email"
                      required
                      value={fireForm.email}
                      onChange={(e) => setFireForm({ ...fireForm, email: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Select
                      id="fire-obra"
                      label="Tipo de obra"
                      options={obraOptions}
                      required
                      value={fireForm.tipoObra}
                      onChange={(e) => setFireForm({ ...fireForm, tipoObra: e.target.value })}
                    />
                    <Input
                      id="fire-localidad"
                      label="Localidad"
                      placeholder="Ej: Córdoba Capital"
                      value={fireForm.localidad}
                      onChange={(e) => setFireForm({ ...fireForm, localidad: e.target.value })}
                    />
                  </div>
                  <Textarea
                    id="fire-descripcion"
                    label="Breve descripción del proyecto"
                    placeholder="Contanos superficie, uso del edificio, si hay sistema existente..."
                    value={fireForm.descripcion}
                    onChange={(e) => setFireForm({ ...fireForm, descripcion: e.target.value })}
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
                        {fireForm.planos || 'PDF, DWG o imagen — se enviará por WhatsApp'}
                      </span>
                      <input
                        id="fire-planos"
                        type="file"
                        accept=".pdf,.dwg,.dxf,image/*"
                        className="sr-only"
                        onChange={(e) =>
                          setFireForm({ ...fireForm, planos: e.target.files?.[0]?.name ?? '' })
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
                    value={securityForm.nombre}
                    onChange={(e) => setSecurityForm({ ...securityForm, nombre: e.target.value })}
                  />
                  <Input
                    id="telefono"
                    label="Teléfono de contacto"
                    placeholder="Ej: 351 326-8219"
                    type="tel"
                    required
                    value={securityForm.telefono}
                    onChange={(e) => setSecurityForm({ ...securityForm, telefono: e.target.value })}
                  />
                  <Select
                    id="propiedad"
                    label="Tipo de propiedad"
                    options={propertyOptions}
                    required
                    value={securityForm.propiedad}
                    onChange={(e) => setSecurityForm({ ...securityForm, propiedad: e.target.value })}
                  />
                  <Input
                    id="ubicacion"
                    label="Barrio / Localidad"
                    placeholder="Ej: Nueva Córdoba, Córdoba"
                    required
                    value={securityForm.ubicacion}
                    onChange={(e) => setSecurityForm({ ...securityForm, ubicacion: e.target.value })}
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

          {!isFire && (
            <div className="flex flex-wrap justify-center gap-2 opacity-0 cta-reveal">
              {SECURITY_BADGES.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[var(--color-text-secondary)] border border-[var(--color-border)] rounded-full bg-[var(--color-surface)]"
                >
                  <CheckCircle size={12} className="text-[var(--color-primary-accent)] shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      </Container>
    </Section>
  )
}
