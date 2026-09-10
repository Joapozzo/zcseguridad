import { META } from './contact'

/** Metadata y copy SEO específicos de /incendios */
export const INCENDIOS_SEO = {
  title: 'Detección de incendios en Córdoba',
  description:
    'Proyecto, provisión, instalación y puesta en marcha de sistemas de detección y alarma de incendio en Córdoba. Ingeniería con tecnología INIM, Autocall y Simplex.',
  ogTitle: `Detección de incendios en Córdoba | ${META.brandName}`,
  ogDescription:
    'Sistemas de detección y alarma de incendio para edificios, industrias y desarrollos. Proyecto llave en mano en Córdoba y provincia.',
  ogImage: '/og-incendios.jpg',
  ogImageAlt:
    'ZC Seguridad — detección y alarma de incendio en Córdoba: proyecto, instalación y puesta en marcha',
  keywords: [
    'detección de incendios Córdoba',
    'sistema de detección y alarma de incendio',
    'instalación detección incendio edificios',
    'sistema direccionable incendio',
    'proyecto ingeniería contra incendios',
    'alarma de incendio Córdoba',
    'INIM Córdoba',
    'Autocall Simplex Córdoba',
    'detección incendio industria',
    'ZC Seguridad incendio',
  ] as const,
  canonicalPath: '/incendios',
} as const

export const INCENDIOS_FAQS = [
  {
    question: '¿Qué incluye un proyecto de detección de incendios?',
    answer:
      'Incluye relevamiento de la obra, ingeniería y documentación técnica, provisión de centrales y dispositivos, instalación, programación, pruebas y puesta en marcha con capacitación al equipo responsable.',
  },
  {
    question: '¿Cuándo conviene un sistema convencional y cuándo uno direccionable?',
    answer:
      'Los sistemas convencionales suelen resolverse por zonas en edificios y comercios de escala media. Los direccionables identifican cada dispositivo e integran mejor torres, industria y desarrollos de gran escala.',
  },
  {
    question: '¿Trabajan en Córdoba capital y en la provincia?',
    answer:
      'Sí. Atendemos proyectos en Córdoba capital y en la provincia: edificios, industrias, comercios y desarrollos que requieren detección y alarma de incendio con criterio técnico y normativo.',
  },
  {
    question: '¿Con qué marcas de detección de incendio trabajan?',
    answer:
      'Seleccionamos la tecnología según escala y requerimientos del proyecto. Trabajamos con fabricantes de primer nivel como INIM, Autocall y Simplex.',
  },
  {
    question: '¿Pueden adecuar o ampliar un sistema existente?',
    answer:
      'Sí. Intervenimos sobre instalaciones en operación para ampliar, modernizar o reemplazar, manteniendo la continuidad de la protección siempre que el estado del sistema lo permita.',
  },
  {
    question: '¿Cómo solicito un asesoramiento técnico?',
    answer:
      'Podés completar el formulario en esta página o escribirnos por WhatsApp. Si tenés planos o memoria descriptiva, adjuntarlos agiliza el análisis de la solución más adecuada.',
  },
] as const
