import type { Metadata } from 'next'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { CTASection } from '../components/sections/CTASection'
import { En54Content } from '../components/sections/en54/En54Content'
import { META } from '../constants/contact'

const title = 'Ajax EN54 en Córdoba | Detección de incendios inalámbrica'
const description = 'Conocé Ajax EN54 Line: detección y alarma de incendios inalámbrica para edificios comerciales y municipales. Próximamente en ZC Seguridad, Córdoba.'
export const metadata: Metadata = {
  title, description, alternates: { canonical: '/EN54', languages: { 'es-AR': '/EN54' } },
  openGraph: { title, description, url: `${META.siteUrl}/EN54`, locale: META.locale, type: 'website', images: [{ url: '/images/en54/line.webp', width: 1920, height: 1080, alt: 'Ajax EN54 Line' }] },
  twitter: { card: 'summary_large_image', title, description, images: ['/images/en54/line.webp'] },
}

export default function En54Page() {
  const url = `${META.siteUrl}/EN54`
  const structuredData = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: title, description, inLanguage: 'es-AR', isPartOf: { '@id': `${META.siteUrl}/#website` }, about: { '@type': 'Thing', name: 'Ajax EN54 Line, detección y alarma de incendios inalámbrica' }, breadcrumb: { '@id': `${url}#breadcrumb` } },
    { '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Inicio', item: META.siteUrl }, { '@type': 'ListItem', position: 2, name: 'Incendios', item: `${META.siteUrl}/incendios` }, { '@type': 'ListItem', position: 3, name: 'Ajax EN54', item: url }] },
  ] }
  return <main className="page-incendios flex min-h-screen w-full flex-col"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} /><Navbar transparentAtTop /><div className="flex-1"><En54Content /><CTASection variant="fire" reversibleAnimations /></div><Footer /></main>
}
