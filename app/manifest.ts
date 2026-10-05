import type { MetadataRoute } from 'next'
import { META } from './constants/contact'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: META.brandName,
    short_name: 'ZC Seguridad',
    description: META.description,
    start_url: '/',
    lang: META.language,
    display: 'standalone',
    theme_color: '#0a0a0a',
    background_color: '#000000',
    icons: [
      { src: '/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
