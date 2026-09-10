export type NavLink = {
  label: string
  href: string
}

/** Navegación principal del sitio (multi-página) */
export const MAIN_NAV: NavLink[] = [
  { label: 'Intrusión', href: '/' },
  { label: 'Incendio', href: '/incendios' },
  { label: 'Nosotros', href: '/#capacidades' },
  { label: 'Proyectos', href: '/incendios#proyectos' },
  { label: 'Contacto', href: '#contacto' },
]

/** Enlaces de servicios para footer (texto ancla SEO) */
export const FOOTER_SERVICES: NavLink[] = [
  { label: 'Alarmas AJAX Córdoba', href: '/' },
  { label: 'Detección de incendios Córdoba', href: '/incendios' },
  { label: 'Sistemas direccionables', href: '/incendios#sistemas' },
  { label: 'Proyectos de incendio', href: '/incendios#proyectos' },
]

export const NAV_CTA = {
  label: 'Solicitar asesoramiento',
  href: '#contacto',
}
