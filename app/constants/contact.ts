/** Números, email y redes: única fuente de verdad para todo el sitio */
export const CONTACT = {
  address: 'Maestro Vidal 998, Córdoba',
  addressForMap: 'Maestro Vidal 998, Córdoba, Argentina',
  phone: '+54 9 351 326-8219',
  /** Sin espacios ni + para wa.me y tel: */
  phoneRaw: '5493513268219',
  whatsappNumber: '5493513268219',
  whatsappLink:
    'https://wa.me/5493513268219?text=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20un%20diagn%C3%B3stico%20de%20seguridad.',
  email: 'info@zcingenieria.com',
  instagram: 'https://instagram.com/zcseguridad',
  instagramHandle: '@zcseguridad',
  // facebook: 'https://facebook.com/...',
}

/** SEO, Open Graph, Twitter y una sola fuente para metadata del sitio */
export const META = {
  brandName: 'ZC Seguridad',
  /** Título por defecto (~50–60 caracteres; incluye marca + intención + geo) */
  titleDefault:
    'ZC Seguridad | Alarmas y seguridad AJAX en Córdoba — instalación profesional',
  /** Subpáginas futuras: "Servicios | ZC Seguridad" */
  titleTemplate: '%s | ZC Seguridad',
  /**
   * Meta description (~150–160 caracteres): beneficio + qué hacen + CTA.
   * Google suele mostrar ~150–160; WhatsApp/Facebook pueden truncar menos.
   */
  description:
    'Seguridad inteligente AJAX en Córdoba: alarmas, cámaras y control por app. Diseño e instalación profesional para casas y comercios. Solicitá tu diagnóstico.',
  /** OG puede ser un poco más largo en algunas plataformas */
  ogDescription:
    'Especialistas en seguridad electrónica con tecnología AJAX en Córdoba y provincia. Intrusiones, video, incendio y automatización desde una sola app. Diagnóstico y presupuesto.',
  keywords: [
    'ZC Seguridad',
    'seguridad electrónica Córdoba',
    'sistema de alarma AJAX',
    'instalación alarmas AJAX',
    'alarmas inteligentes Córdoba',
    'videovigilancia AJAX',
    'seguridad hogar Córdoba',
    'alarmas para comercios',
    'monitoreo alarmas',
    'AJAX Systems Argentina',
    'barrios privados Córdoba',
    'empresa instaladora alarmas',
  ] as const,
  /** 1200×630 JPG/PNG en /public (previews en WhatsApp, Meta, LinkedIn) */
  ogImage: '/og-image.jpg',
  ogImageAlt:
    'ZC Seguridad — sistemas de alarma y videovigilancia AJAX en Córdoba',
  siteUrl: 'https://zcseguridad.com',
  locale: 'es_AR',
  language: 'es-AR',
  /** Sin @ para meta twitter:site (Next acepta con @ también en la práctica) */
  twitterSite: '@zcseguridad',
  twitterCreator: '@zcseguridad',
}
