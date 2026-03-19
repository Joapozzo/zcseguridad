/** Origen del CDN de medios (MP4, etc.). Los paths son solo la parte `/…`. */
export const MEDIA_CDN_ORIGIN = 'https://media.zcseguridad.com'

export const VIDEO_PATHS = {
  hero: '/hero.mp4',
  mobile: '/mobile.mp4',
} as const

export function mediaVideoUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${MEDIA_CDN_ORIGIN}${normalized}`
}
