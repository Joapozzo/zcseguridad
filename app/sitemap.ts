import type { MetadataRoute } from 'next'
import { META } from './constants/contact'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = META.siteUrl.replace(/\/$/, '')
  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${base}/incendios`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]
}
