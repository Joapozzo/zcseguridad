import type { MetadataRoute } from 'next'
import { META } from './constants/contact'

/** Actualizar la fecha de cada página cuando cambie su contenido. */
const PAGES: { path: string; lastModified: string; changeFrequency: 'weekly' | 'monthly' | 'yearly'; priority: number }[] = [
  { path: '', lastModified: '2026-10-05', changeFrequency: 'monthly', priority: 1 },
  { path: '/incendios', lastModified: '2026-10-05', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/EN54', lastModified: '2026-10-05', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/privacidad', lastModified: '2026-10-05', changeFrequency: 'yearly', priority: 0.2 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const base = META.siteUrl.replace(/\/$/, '')
  return PAGES.map(({ path, lastModified, changeFrequency, priority }) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
