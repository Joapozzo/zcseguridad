import { CONTACT, META } from '@/app/constants/contact'
import { INCENDIOS_FAQS, INCENDIOS_SEO } from '@/app/constants/seo-incendios'

function absoluteUrl(path: string) {
  const base = META.siteUrl.replace(/\/$/, '')
  const p = path.startsWith('/') ? path : `/${path}`
  return `${base}${p}`
}

const businessId = `${META.siteUrl}/#localbusiness`
const websiteId = `${META.siteUrl}/#website`

/** JSON-LD global (LocalBusiness + WebSite). */
export function getStructuredDataGraph() {
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
        logo: absoluteUrl(META.logo),
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
          {
            '@type': 'City',
            name: 'Córdoba',
            containedInPlace: { '@type': 'Country', name: 'Argentina' },
          },
          { '@type': 'AdministrativeArea', name: 'Provincia de Córdoba' },
        ],
        sameAs: [CONTACT.instagram],
        priceRange: '$$',
        knowsAbout: [
          'Sistemas de alarma AJAX',
          'Seguridad electrónica',
          'Videovigilancia',
          'Monitoreo de alarmas',
          'Detección de incendios',
          'Sistemas de alarma de incendio',
          'Sistemas direccionables de incendio',
          'INIM',
          'Autocall',
          'Simplex',
        ],
        serviceType: [
          'Diseño e instalación de sistemas de seguridad AJAX',
          'Diagnóstico de seguridad para viviendas y comercios',
          'Proyecto e instalación de detección y alarma de incendio',
          'Ingeniería de sistemas contra incendio',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Servicios ZC Seguridad',
          itemListElement: [
            {
              '@type': 'OfferCatalog',
              name: 'Intrusión y seguridad electrónica',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Instalación de alarmas AJAX',
                    url: META.siteUrl,
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Videovigilancia',
                    url: META.siteUrl,
                  },
                },
              ],
            },
            {
              '@type': 'OfferCatalog',
              name: 'Detección de incendios',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Detección y alarma de incendio',
                    url: absoluteUrl(INCENDIOS_SEO.canonicalPath),
                  },
                },
              ],
            },
          ],
        },
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

/** JSON-LD de /incendios: Service + Breadcrumb + FAQ. */
export function getIncendiosStructuredData() {
  const pageUrl = absoluteUrl(INCENDIOS_SEO.canonicalPath)
  const serviceId = `${pageUrl}#service`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': serviceId,
        name: 'Detección y alarma de incendio',
        description: INCENDIOS_SEO.description,
        url: pageUrl,
        provider: { '@id': businessId },
        areaServed: [
          { '@type': 'City', name: 'Córdoba' },
          { '@type': 'AdministrativeArea', name: 'Provincia de Córdoba' },
        ],
        serviceType: [
          'Sistemas convencionales de detección de incendio',
          'Sistemas direccionables de detección de incendio',
          'Adecuaciones y ampliaciones',
          'Proyecto, provisión, instalación y puesta en marcha',
        ],
        brand: [{ '@type': 'Brand', name: 'INIM' }, { '@type': 'Brand', name: 'Autocall' }, { '@type': 'Brand', name: 'Simplex' }],
        image: absoluteUrl(INCENDIOS_SEO.ogImage),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: META.siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Detección de incendios',
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: INCENDIOS_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'WebPage',
        '@id': pageUrl,
        url: pageUrl,
        name: INCENDIOS_SEO.ogTitle,
        description: INCENDIOS_SEO.description,
        isPartOf: { '@id': websiteId },
        about: { '@id': serviceId },
        inLanguage: META.language,
      },
    ],
  }
}
