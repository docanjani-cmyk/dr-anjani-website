'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { trackBooking, trackWhatsApp, trackConversion } from '../lib/attribution'
import { waHref } from '../lib/whatsapp'

const BOOKING_URL = 'https://meet-my-doctor.firebaseapp.com/#/?uid=47150&eid=38605'
const PHONE = '7411722580'
const PHONE_DISPLAY = '+91 74117 22580'

const BookingContext = createContext(() => {})

/** Opens the booking modal. Safe to call from any client component under the provider. */
export const useBooking = () => useContext(BookingContext)

/**
 * The booking modal, and the only piece of the page that has to know it exists.
 *
 * Wrapping the page in this provider lets the rest of it stay server-rendered:
 * server components pass straight through `children`, and only the buttons that
 * actually open the modal ship as client code.
 */
export function BookingProvider({ children, initialOpen = false }) {
  const [isOpen, setIsOpen] = useState(initialOpen)
  const [loaded, setLoaded] = useState(false)

  const open = useCallback((eventName = 'ads_conversion_Contact_Us_1') => {
    trackBooking(eventName)
    setIsOpen(true)
  }, [])

  useEffect(() => {
    if (initialOpen) trackBooking('gbp_book_appointment_visit')
  }, [initialOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKey = e => { if (e.key === 'Escape') setIsOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  return (
    <BookingContext.Provider value={open}>
      {children}

      {isOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center sm:p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative bg-white rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl w-full max-w-2xl flex flex-col"
            style={{ height: '95vh', maxHeight: '760px' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between px-5 py-4 flex-shrink-0" style={{ borderBottom: '1px solid #E3EDE9' }}>
              <div>
                <h3 className="font-semibold text-base" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>
                  Book a Consultation
                </h3>
                <p className="text-xs mt-0.5" style={{ color: '#7A9C90' }}>
                  Takes about a minute · Instant confirmation
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 -mr-1 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100 flex-shrink-0"
                style={{ color: '#7A9C90' }}
                aria-label="Close"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 relative">
              {!loaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none" style={{ backgroundColor: '#FAFAF8' }}>
                  <div className="w-8 h-8 rounded-full border-2 animate-spin" style={{ borderColor: '#E3EDE9', borderTopColor: '#2C5249' }} />
                  <p className="text-xs" style={{ color: '#7A9C90' }}>Loading secure booking form…</p>
                </div>
              )}
              <iframe
                src={BOOKING_URL}
                onLoad={() => setLoaded(true)}
                className="w-full h-full border-0"
                style={{ opacity: loaded ? 1 : 0, transition: 'opacity 250ms ease' }}
                title="Book a Consultation with Dr. Anjani Dixit"
              />
            </div>

            <div className="px-5 py-3 flex items-center justify-between gap-3 flex-shrink-0" style={{ borderTop: '1px solid #E3EDE9', backgroundColor: '#FAFAF8' }}>
              <p className="text-xs" style={{ color: '#7A9C90' }}>Form not loading?</p>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${PHONE}`}
                  onClick={() => trackConversion('booking_fallback_call')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors hover:opacity-90"
                  style={{ backgroundColor: '#E3EDE9', color: '#2C5249' }}
                >
                  Call
                </a>
                <a
                  href={waHref('general', 'booking-fallback')}
                  target="_blank" rel="noopener noreferrer"
                  onClick={() => trackWhatsApp()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white transition-colors hover:opacity-90"
                  style={{ backgroundColor: '#25D366' }}
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </BookingContext.Provider>
  )
}

/** A button that opens the booking modal. The one client leaf inside otherwise static sections. */
export function BookButton({ children, className, style, eventName, onClick }) {
  const open = useBooking()
  return (
    <button
      type="button"
      onClick={() => { open(eventName); onClick?.() }}
      className={className}
      style={style}
    >
      {children}
    </button>
  )
}

export { BOOKING_URL, PHONE, PHONE_DISPLAY }
