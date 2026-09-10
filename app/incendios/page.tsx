import type { Metadata } from 'next'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { FireHeroSection } from '../components/sections/incendio/FireHeroSection'
import { FireSolutionSection } from '../components/sections/incendio/FireSolutionSection'
import { FireSystemsSection } from '../components/sections/incendio/FireSystemsSection'
import { FireProjectsSection } from '../components/sections/incendio/FireProjectsSection'
import { FireTechSection } from '../components/sections/incendio/FireTechSection'
import { FireProcessSection } from '../components/sections/incendio/FireProcessSection'
import { FireFaqSection } from '../components/sections/incendio/FireFaqSection'
import { FireCTASection } from '../components/sections/incendio/FireCTASection'
import { META } from '../constants/contact'
import { INCENDIOS_SEO } from '../constants/seo-incendios'
import { getIncendiosStructuredData } from '../lib/structured-data'

const incendiosLd = getIncendiosStructuredData()

export const metadata: Metadata = {
  title: INCENDIOS_SEO.title,
  description: INCENDIOS_SEO.description,
  keywords: [...INCENDIOS_SEO.keywords],
  alternates: {
    canonical: INCENDIOS_SEO.canonicalPath,
    languages: {
      'es-AR': INCENDIOS_SEO.canonicalPath,
    },
  },
  openGraph: {
    title: INCENDIOS_SEO.ogTitle,
    description: INCENDIOS_SEO.ogDescription,
    url: `${META.siteUrl}${INCENDIOS_SEO.canonicalPath}`,
    siteName: META.brandName,
    images: [
      {
        url: INCENDIOS_SEO.ogImage,
        width: 1200,
        height: 630,
        alt: INCENDIOS_SEO.ogImageAlt,
        type: 'image/jpeg',
      },
    ],
    locale: META.locale,
    alternateLocale: ['es'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: META.twitterSite,
    creator: META.twitterCreator,
    title: INCENDIOS_SEO.ogTitle,
    description: INCENDIOS_SEO.ogDescription,
    images: [INCENDIOS_SEO.ogImage],
  },
}

export default function IncendiosPage() {
  return (
    <main className="flex flex-col w-full min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(incendiosLd),
        }}
      />
      <Navbar />
      <div className="flex-1">
        <FireHeroSection />
        <FireSolutionSection />
        <FireSystemsSection />
        <div className="w-full bg-[#f5f5f5] section-light-block">
          <FireProjectsSection />
        </div>
        <FireTechSection />
        <div className="w-full bg-[#f5f5f5] section-light-block">
          <FireProcessSection />
        </div>
        <FireFaqSection />
        <FireCTASection />
      </div>
      <Footer />
    </main>
  )
}
