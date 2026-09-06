'use client'

import { useState } from 'react'
import Image from 'next/image'

/**
 * Masonry photo gallery with a lightbox, shared by every page that shows the
 * patient photos.
 *
 * `initial` caps how many thumbnails are visible, with `mobileInitial` capping
 * a phone tighter — the grid drops to two columns below 640px, so the same
 * count is twice as many rows there. A full set runs to several screens and
 * crowds out whatever follows it. The rest stay in the DOM — hidden with CSS,
 * not removed — so they cost nothing to load (a display:none image is never
 * fetched), still exist for crawlers, and the lightbox can page through the
 * whole set from any thumbnail.
 */
export default function PhotoGallery({ photos, initial = 8, mobileInitial = 4 }) {
  const [lightbox, setLightbox] = useState(null)
  const [expanded, setExpanded] = useState(false)

  const hiddenCount = photos.length - initial
  const mobileHiddenCount = photos.length - mobileInitial

  // Which thumbnails a viewport hides is a CSS question, not a JS one: the
  // component renders once and both breakpoints read the same markup.
  const capClass = i => {
    if (expanded) return ''
    if (i >= initial) return ' hidden'
    if (i >= mobileInitial) return ' hidden sm:block'
    return ''
  }

  return (
    <>
      <div style={{ columnCount: 'var(--cols)', columnGap: '1rem', '--cols': 2 }} className="photo-gallery-grid">
        {photos.map((photo, i) => (
          <div
            key={i}
            className={`mb-4 rounded-2xl overflow-hidden cursor-pointer group${capClass(i)}`}
            style={{ breakInside: 'avoid' }}
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

      {photos.length > mobileInitial && (
        // Below the sm breakpoint every gallery long enough to cap on a phone
        // gets the button; above it, only the ones still holding photos back.
        <div className={`text-center mt-2${photos.length > initial ? '' : ' sm:hidden'}`}>
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-colors hover:bg-cream-100"
            style={{ border: '1px solid #2C5249', color: '#2C5249', backgroundColor: 'transparent' }}
            aria-expanded={expanded}
          >
            {expanded ? 'Show fewer photos' : (
              <>
                <span className="sm:hidden">View {mobileHiddenCount} more photos</span>
                {hiddenCount > 0 && <span className="hidden sm:inline">View {hiddenCount} more photos</span>}
              </>
            )}
            <svg
              className={`w-4 h-4 transition-transform duration-300${expanded ? ' rotate-180' : ''}`}
              fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}

      <style>{`
        @media (min-width: 640px) { .photo-gallery-grid { --cols: 3 !important; } }
        @media (min-width: 1024px) { .photo-gallery-grid { --cols: 4 !important; } }
      `}</style>

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
