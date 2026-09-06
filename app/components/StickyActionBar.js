'use client'

import { useEffect, useState } from 'react'
import { trackWhatsApp, trackBooking } from '../lib/attribution'
import { useBooking } from './Booking'

const IconWhatsApp = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

/**
 * Mobile action bar. It stays out of the way while the hero's own buttons are
 * on screen — otherwise the same two actions appear twice at the top of the
 * page — and slides in once they scroll away.
 *
 * Pair with `data-hero-cta` on the hero's button container. With no such
 * element (or no IntersectionObserver) the bar simply shows, which is the safe
 * fallback: a visitor always has a way to act.
 */
export default function StickyActionBar({ waHref, bookHref, onBook, useBookingModal = false, bookLabel = 'Book a Consultation' }) {
  const [visible, setVisible] = useState(false)
  // `useBookingModal` opts into the page's booking modal instead of a link or a
  // callback, so a server-rendered page can still put the modal behind this bar.
  const openBooking = useBooking()

  useEffect(() => {
    const hero = document.querySelector('[data-hero-cta]')
    if (!hero) {
      setVisible(true)
      return
    }

    // Scroll position rather than IntersectionObserver, and no requestAnimation-
    // Frame indirection: both are suspended in throttled or embedded contexts,
    // and the failure mode is the bar never appearing — losing the only
    // persistent CTA. A single getBoundingClientRect per scroll is cheap.
    const update = () => {
      const r = hero.getBoundingClientRect()
      const onScreen = r.bottom > 0 && r.top < window.innerHeight
      setVisible(!onScreen)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const onBookClick = onBook || (useBookingModal ? () => openBooking() : null)
  const book = onBookClick
    ? <button type="button" onClick={onBookClick}
        className="flex items-center justify-center flex-1 py-3.5 rounded-full text-sm font-semibold text-white"
        style={{ backgroundColor: '#2C5249' }}>{bookLabel}</button>
    : <a href={bookHref} onClick={() => trackBooking()} target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center flex-1 py-3.5 rounded-full text-sm font-semibold text-white"
        style={{ backgroundColor: '#2C5249' }}>{bookLabel}</a>

  return (
    <div
      aria-hidden={!visible}
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-4 py-3 flex items-center gap-2.5"
      style={{
        backgroundColor: 'rgba(250,250,248,0.97)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid #E3EDE9',
        transform: visible ? 'translateY(0)' : 'translateY(110%)',
        transition: 'transform 260ms cubic-bezier(0.16, 1, 0.3, 1)',
        visibility: visible ? 'visible' : 'hidden',
      }}
    >
      <a onClick={() => trackWhatsApp()} href={waHref}
        target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
        tabIndex={visible ? 0 : -1}
        className="flex items-center justify-center rounded-full flex-shrink-0 text-white"
        style={{ width: '52px', height: '52px', backgroundColor: '#25D366' }}>
        <IconWhatsApp />
      </a>
      {book}
    </div>
  )
}
