import type { Metadata } from 'next'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { CONTACT, META } from '../constants/contact'

const LAST_UPDATED = '5 de octubre de 2026'

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description: `Cómo ${META.brandName} recopila, usa y protege los datos personales que enviás a través de este sitio.`,
  alternates: { canonical: '/privacidad' },
  robots: { index: true, follow: true },
}

const SECTIONS: { title: string; body: React.ReactNode }[] = [
  {
    title: 'Responsable de los datos',
    body: (
      <p>
        {META.brandName}, con domicilio en {CONTACT.address}, Argentina, es responsable del
        tratamiento de los datos personales recopilados a través de{' '}
        {META.siteUrl.replace(/^https?:\/\//, '')}. Podés contactarnos en{' '}
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> o al {CONTACT.phone}.
      </p>
    ),
  },
  {
    title: 'Qué datos recopilamos',
    body: (
      <>
        <p>Solo los datos que vos decidís enviarnos al completar un formulario de contacto:</p>
        <ul>
          <li>Nombre y apellido, empresa, teléfono y email.</li>
          <li>Tipo de propiedad u obra, localidad y la descripción de tu proyecto.</li>
        </ul>
        <p>
          Además, si están habilitadas, herramientas de medición como Google Analytics registran
          datos de navegación anónimos o seudónimos (páginas visitadas, dispositivo, ubicación
          aproximada) mediante cookies.
        </p>
      </>
    ),
  },
  {
    title: 'Cómo se envían tus datos',
    body: (
      <p>
        Los formularios no almacenan información en este sitio: al enviarlos se abre WhatsApp con tu
        consulta ya redactada, y el mensaje solo llega a nosotros si vos lo enviás. Desde ese
        momento, el tratamiento también queda sujeto a las políticas de WhatsApp (Meta). Los
        archivos de planos no se transfieren automáticamente.
      </p>
    ),
  },
  {
    title: 'Para qué los usamos',
    body: (
      <ul>
        <li>Responder tu consulta, coordinar un diagnóstico y enviarte un presupuesto.</li>
        <li>Brindar soporte sobre instalaciones realizadas.</li>
        <li>Mejorar el sitio a partir de estadísticas de uso agregadas.</li>
      </ul>
    ),
  },
  {
    title: 'Con quién los compartimos',
    body: (
      <p>
        No vendemos ni cedemos tus datos. Solo intervienen los proveedores necesarios para operar el
        sitio y la comunicación (alojamiento web, WhatsApp y, si corresponde, herramientas de
        medición), o las autoridades cuando la ley lo exija.
      </p>
    ),
  },
  {
    title: 'Conservación',
    body: (
      <p>
        Conservamos los datos mientras sean necesarios para atender tu consulta o la relación
        comercial, y luego por los plazos que exija la normativa aplicable.
      </p>
    ),
  },
  {
    title: 'Tus derechos',
    body: (
      <>
        <p>
          Conforme a la Ley 25.326 de Protección de los Datos Personales, podés solicitar en forma
          gratuita el acceso, la rectificación, la actualización o la supresión de tus datos
          escribiendo a <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
        </p>
        <p>
          La Agencia de Acceso a la Información Pública, órgano de control de la Ley 25.326, atiende
          las denuncias y reclamos de quienes resulten afectados en sus derechos por incumplimiento
          de las normas vigentes en materia de protección de datos personales.
        </p>
      </>
    ),
  },
  {
    title: 'Cookies',
    body: (
      <p>
        Podés bloquear o eliminar las cookies desde la configuración de tu navegador. El sitio sigue
        funcionando sin ellas; solo dejamos de recibir estadísticas de tu visita.
      </p>
    ),
  },
  {
    title: 'Cambios en esta política',
    body: (
      <p>
        Podemos actualizar esta política. La versión vigente es siempre la publicada en esta página.
      </p>
    ),
  },
]

export default function PrivacidadPage() {
  return (
    <main className="flex flex-col w-full min-h-screen">
      <Navbar />
      <article className="mx-auto w-full max-w-3xl flex-1 px-6 pt-32 pb-20 lg:pt-40">
        <p className="mb-3 font-display text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-text-muted)]">
          Legal
        </p>
        <h1 className="mb-3 font-display font-extrabold text-[clamp(1.8rem,4vw,2.75rem)] leading-tight text-[var(--color-text-primary)]">
          Política de privacidad
        </h1>
        <p className="mb-12 text-sm text-[var(--color-text-muted)]">
          Última actualización: {LAST_UPDATED}
        </p>

        <div className="flex flex-col gap-10 text-[var(--color-text-secondary)] leading-relaxed [&_a]:text-[var(--color-text-primary)] [&_a]:underline [&_a]:underline-offset-4 [&_p+p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
          {SECTIONS.map(section => (
            <section key={section.title}>
              <h2 className="mb-3 font-display text-lg font-semibold text-[var(--color-text-primary)]">
                {section.title}
              </h2>
              {section.body}
            </section>
          ))}
        </div>

        <div
          id="contacto"
          className="mt-14 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-sm text-[var(--color-text-secondary)]"
        >
          ¿Dudas sobre tus datos? Escribinos a{' '}
          <a
            href={`mailto:${CONTACT.email}`}
            className="text-[var(--color-text-primary)] underline underline-offset-4"
          >
            {CONTACT.email}
          </a>{' '}
          o por{' '}
          <a
            href={CONTACT.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-text-primary)] underline underline-offset-4"
          >
            WhatsApp
          </a>
          .
        </div>
      </article>
      <Footer />
    </main>
  )
}
