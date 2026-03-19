import { CONTACT, META } from '@/app/constants/contact'

function absoluteUrl(path: string) {
  const base = META.siteUrl.replace(/\/$/, '')
  const p = path.startsWith('/') ? path : `/${path}`
  return `${base}${p}`
}

/** JSON-LD para rich results (LocalBusiness + WebSite). */
export function getStructuredDataGraph() {
  const businessId = `${META.siteUrl}/#localbusiness`
  const websiteId = `${META.siteUrl}/#website`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'ProfessionalService'],
        '@id': businessId,
        name: META.brandName,
        description: META.description,
        url: META.siteUrl,
        telephone: CONTACT.phone,
        email: CONTACT.email,
        image: absoluteUrl(META.ogImage),
        logo: absoluteUrl(META.ogImage),
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Maestro Vidal 998',
          addressLocality: 'Córdoba',
          addressRegion: 'Córdoba',
          addressCountry: 'AR',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: -31.4201,
          longitude: -64.1888,
        },
        areaServed: [
          { '@type': 'City', name: 'Córdoba', containedInPlace: { '@type': 'Country', name: 'Argentina' } },
          { '@type': 'AdministrativeArea', name: 'Provincia de Córdoba' },
        ],
        sameAs: [CONTACT.instagram],
        priceRange: '$$',
        knowsAbout: [
          'Sistemas de alarma AJAX',
          'Seguridad electrónica',
          'Videovigilancia',
          'Monitoreo de alarmas',
        ],
        serviceType: [
          'Diseño e instalación de sistemas de seguridad AJAX',
          'Diagnóstico de seguridad para viviendas y comercios',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: META.siteUrl,
        name: META.brandName,
        description: META.description,
        inLanguage: META.language,
        publisher: { '@id': businessId },
      },
    ],
  }
}
