import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { META } from './constants/contact'

const poppins = Poppins({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: META.title,
  description: META.description,
  keywords: META.keywords,
  openGraph: {
    title: META.title,
    description: META.description,
    url: META.siteUrl,
    siteName: 'ZC Seguridad',
    images: [{ url: META.ogImage, width: 1200, height: 630 }],
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: META.title,
    description: META.description,
    images: [META.ogImage],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL(META.siteUrl),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`scroll-smooth ${poppins.variable} ${poppins.className}`}>
      <body
        className="min-h-screen w-full antialiased"
        style={{
          backgroundColor: 'var(--color-background)',
          color: 'var(--color-text-primary)',
        }}
      >
        {children}
      </body>
    </html>
  )
}
