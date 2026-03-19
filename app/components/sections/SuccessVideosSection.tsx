import { Suspense } from 'react'
import {
  SuccessVideosSectionClient,
  type ResolvedSuccessVideo,
} from './SuccessVideosSectionClient'

/** Solo IDs; título y miniatura vienen del proveedor vía oEmbed en el servidor. */
const SUCCESS_VIDEO_IDS: string[] = ['Jigutkpe19Y', 'XTg_ulHTP6k']

type OEmbedPayload = {
  title: string
  thumbnail_url: string
}

async function fetchVideoMeta(youtubeId: string): Promise<OEmbedPayload | null> {
  try {
    const watchUrl = `https://www.youtube.com/watch?v=${youtubeId}`
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(watchUrl)}&format=json`
    const res = await fetch(oembedUrl, { next: { revalidate: 86_400 } })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

async function resolveVideos(ids: string[]): Promise<ResolvedSuccessVideo[]> {
  const settled = await Promise.all(
    ids.map(async (youtubeId) => {
      const meta = await fetchVideoMeta(youtubeId)
      const thumbnailUrl =
        meta?.thumbnail_url ?? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`
      const title = meta?.title?.trim() || 'Video'
      return { youtubeId, title, thumbnailUrl }
    })
  )
  return settled
}

export function SuccessVideosSectionSkeleton() {
  const n = SUCCESS_VIDEO_IDS.length
  return (
    <section className="w-full bg-transparent" id="casos-exito" aria-busy="true" aria-label="Cargando videos">
      <div
        className="mx-auto w-full px-6 py-16 lg:px-8 lg:py-20"
        style={{ maxWidth: 'var(--container-max)' }}
      >
        <div className="mx-auto mb-10 max-w-xl space-y-3 text-center md:mb-14">
          <div className="mx-auto h-8 max-w-xs animate-pulse rounded-md bg-neutral-200/80" />
          <div className="mx-auto h-4 max-w-md animate-pulse rounded-md bg-neutral-200/60" />
        </div>
        <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:gap-6 lg:gap-8">
          {Array.from({ length: n }).map((_, i) => (
            <div key={i} className="min-w-0 flex-1 space-y-3">
              <div className="aspect-video w-full animate-pulse rounded-[var(--radius-lg)] bg-neutral-200/80" />
              <div className="h-4 w-4/5 max-w-full animate-pulse rounded-md bg-neutral-200/70" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

async function SuccessVideosSectionInner() {
  const videos = await resolveVideos(SUCCESS_VIDEO_IDS)
  return <SuccessVideosSectionClient videos={videos} />
}

export function SuccessVideosSection() {
  return (
    <Suspense fallback={<SuccessVideosSectionSkeleton />}>
      <SuccessVideosSectionInner />
    </Suspense>
  )
}
