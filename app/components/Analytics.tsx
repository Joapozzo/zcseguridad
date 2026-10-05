'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { GA_ID, trackEvent } from '@/app/lib/analytics'

function contactMethod(href: string) {
  if (href.includes('wa.me/') || href.includes('api.whatsapp.com')) return 'whatsapp'
  if (href.startsWith('tel:')) return 'phone'
  if (href.startsWith('mailto:')) return 'email'
  return null
}

export function Analytics() {
  useEffect(() => {
    if (!GA_ID) return
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href]')
      if (!link) return
      const href = link.getAttribute('href') ?? ''
      const method = contactMethod(href)
      if (method) trackEvent('contact_click', { method, page_path: window.location.pathname })
    }
    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])

  if (!GA_ID) return null

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  )
}
