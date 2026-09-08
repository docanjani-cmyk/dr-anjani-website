'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

/**
 * Masonry photo gallery with a lightbox, shared by every page that shows the
 * patient photos.
 *
 * `initial` caps how many thumbnails are visible, with `mobileInitial` capping
 * a phone tighter — two columns below 640px means the same count is twice as
 * many rows. The photos past the cap stay in the DOM, hidden, so they cost
 * nothing to load (a display:none image is never fetched), still exist for
 * crawlers, and the lightbox can page through the whole set.
 */

/** Columns at each breakpoint, matching the Tailwind sm/lg widths. */
const columnsFor = width => (width >= 1024 ? 4 : width >= 640 ? 3 : 2)

/**
 * Deal the photos into columns so that every column holds the same number of
 * them, give or take one, and the columns still end at roughly the same depth.
 *
 * CSS multi-column gives you the second half of that and not the first: it
 * balances by height alone, so a column of short photos ends up holding two or
 * three more than its neighbour.
 *
 * The first row is filled left to right, so the strongest photos — the list is
 * curated — stay at the top in order. The rest are placed tallest-first into
 * whichever column is shortest and still has room, which is the standard
 * greedy fix for this and gets the depths close. Intrinsic sizes are known
 * here, so nothing has to be measured in the browser.
 */
function dealIntoColumns(items, columns) {
  const perColumn = Math.ceil(items.length / columns)
  const buckets = Array.from({ length: columns }, () => [])
  const depths = new Array(columns).fill(0)
  // Height at a column's width, in units of that width.
  const depthOf = item => item.photo.height / item.photo.width

  const firstRow = items.slice(0, columns)
  firstRow.forEach((item, c) => {
    buckets[c].push(item)
    depths[c] += depthOf(item)
  })

  const rest = items.slice(columns).sort((a, b) => depthOf(b) - depthOf(a))
  for (const item of rest) {
    let target = -1
    for (let c = 0; c < columns; c++) {
      if (buckets[c].length >= perColumn) continue
      if (target === -1 || depths[c] < depths[target]) target = c
    }
    buckets[target].push(item)
    depths[target] += depthOf(item)
  }
  return buckets
}

export default function PhotoGallery({ photos, initial = 8, mobileInitial = 4 }) {
  const [lightbox, setLightbox] = useState(null)
  const [expanded, setExpanded] = useState(false)
  // Two until the browser tells us otherwise: the server has no viewport, and
  // mobile is both the common case and the narrower layout to correct from.
  const [columns, setColumns] = useState(2)

  useEffect(() => {
    const update = () => setColumns(columnsFor(window.innerWidth))
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const collapsedCap = columns === 2 ? mobileInitial : initial
  const cap = expanded ? photos.length : collapsedCap
  const hiddenCount = photos.length - collapsedCap
  const indexed = photos.map((photo, i) => ({ photo, i }))
  const shown = indexed.slice(0, cap)
  const rest = indexed.slice(cap)
  const buckets = dealIntoColumns(shown, columns)

  return (
    <>
      <div className="photo-gallery-grid flex gap-4 items-start">
        {buckets.map((bucket, c) => (
          <div key={c} className="flex flex-col gap-4 flex-1 min-w-0">
            {bucket.map(({ photo, i }) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => setLightbox(i)}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: 'rgba(44,82,73,0.35)' }}
                  >
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Past the cap: kept in the DOM for crawlers, never painted, never
          fetched. They join the columns when the gallery is expanded. */}
      {rest.length > 0 && (
        <div hidden>
          {rest.map(({ photo, i }) => (
            <Image key={i} src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="25vw" />
          ))}
        </div>
      )}

      {hiddenCount > 0 && (
        <div className="text-center mt-2">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-colors hover:bg-cream-100"
            style={{ border: '1px solid #2C5249', color: '#2C5249', backgroundColor: 'transparent' }}
            aria-expanded={expanded}
          >
            {expanded ? 'Show fewer photos' : `View ${hiddenCount} more photo${hiddenCount === 1 ? '' : 's'}`}
            <svg
              className={`w-4 h-4 transition-transform duration-300${expanded ? ' rotate-180' : ''}`}
              fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            onClick={e => { e.stopPropagation(); setLightbox((lightbox + photos.length - 1) % photos.length) }}
            aria-label="Previous"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <Image
            src={photos[lightbox].src}
            alt={photos[lightbox].alt}
            width={photos[lightbox].width}
            height={photos[lightbox].height}
            sizes="100vw"
            className="max-h-[90vh] w-auto max-w-full rounded-2xl object-contain"
            onClick={e => e.stopPropagation()}
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            onClick={e => { e.stopPropagation(); setLightbox((lightbox + 1) % photos.length) }}
            aria-label="Next"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white text-sm" style={{ opacity: 0.6 }}>
            {lightbox + 1} / {photos.length}
          </div>
        </div>
      )}
    </>
  )
}
