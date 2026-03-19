import type { MetadataRoute } from 'next'
import { META } from './constants/contact'

export default function robots(): MetadataRoute.Robots {
  const base = META.siteUrl.replace(/\/$/, '')
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${base}/sitemap.xml`,
    host: base.replace(/^https?:\/\//, ''),
  }
}
