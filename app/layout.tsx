import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { CONTACT, META } from './constants/contact'
import { getStructuredDataGraph } from './lib/structured-data'

const poppins = Poppins({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

const structuredData = getStructuredDataGraph()

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
    { media: '(prefers-color-scheme: light)', color: '#f4f4f5' },
  ],
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  metadataBase: new URL(META.siteUrl),
  title: {
    default: META.titleDefault,
    template: META.titleTemplate,
  },
  description: META.description,
  keywords: [...META.keywords],
  applicationName: META.brandName,
  authors: [{ name: META.brandName, url: META.siteUrl }],
  creator: META.brandName,
  publisher: META.brandName,
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: '/',
    languages: {
      'es-AR': '/',
    },
  },
  openGraph: {
    title: META.titleDefault,
    description: META.ogDescription,
    url: META.siteUrl,
    siteName: META.brandName,
    images: [
      {
        url: META.ogImage,
        width: 1200,
        height: 630,
        alt: META.ogImageAlt,
        type: 'image/jpeg',
      },
    ],
    locale: META.locale,
    alternateLocale: ['es'],
    type: 'website',
    emails: [CONTACT.email],
    phoneNumbers: [CONTACT.phone],
  },
  twitter: {
    card: 'summary_large_image',
    site: META.twitterSite,
    creator: META.twitterCreator,
    title: META.titleDefault,
    description: META.ogDescription,
    images: [META.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={META.language} className={`scroll-smooth ${poppins.variable} ${poppins.className}`}>
      <body
        className="min-h-screen w-full antialiased"
        style={{
          backgroundColor: 'var(--color-background)',
          color: 'var(--color-text-primary)',
        }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        {children}
      </body>
    </html>
  )
}
