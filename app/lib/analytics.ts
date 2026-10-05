export const GA_ID = process.env.NEXT_PUBLIC_GA_ID

type GtagParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    gtag?: (command: 'event' | 'config' | 'js', target: string | Date, params?: GtagParams) => void
  }
}

export function trackEvent(name: string, params?: GtagParams) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', name, params)
}
