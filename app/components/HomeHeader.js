'use client'

import { useEffect, useState } from 'react'
import { trackWhatsApp } from '../lib/attribution'
import { waHref } from '../lib/whatsapp'
import { useBooking } from './Booking'

const LOGO = '/Photos/Anjani%20website/Anjani%20Prityn%20DP.png'

const LINKS = [
  ['About', '#about'],
  ['Services', '#services'],
  ['Hospitals', '#hospitals'],
  ['Testimonials', '#testimonials'],
  ['FAQ', '#faq'],
  ['Contact', '#contact'],
]

const IconWhatsApp = ({ size = 'w-4 h-4' }) => (
  <svg className={size} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

/**
 * The homepage's sticky header. Client-side because of the mobile menu and the
 * shadow that appears on scroll — the rest of the page around it is server
 * rendered and ships no JavaScript.
 */
export default function HomeHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const openBooking = useBooking()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onClickOutside = e => { if (!e.target.closest('header')) setMenuOpen(false) }
    const onKey = e => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('click', onClickOutside)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onClickOutside)
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(250,250,248,0.96)' : 'rgba(250,250,248,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid #E3EDE9' : '1px solid transparent',
        boxShadow: scrolled ? '0 1px 20px rgba(44,82,73,0.06)' : 'none',
      }}
    >
      <nav className="max-w-7xl mx-auto px-5 lg:px-8 py-4 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3">
          <img src={LOGO} alt="Dr. Anjani Dixit" width="44" height="44" className="w-11 h-11 rounded-full object-cover" style={{ border: '2px solid #C4D9D1' }} />
          <div>
            <div className="font-semibold text-sm" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>Dr. Anjani Dixit</div>
            <div className="text-xs" style={{ color: '#7A9C90' }}>MBBS · DNB · FMAS</div>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-7 text-sm font-medium" style={{ color: '#3D6358' }}>
          {LINKS.map(([label, href]) => (
            <a key={label} href={href} className="hover:opacity-60 transition-opacity">{label}</a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <a
            onClick={() => trackWhatsApp()} href={waHref('general', 'nav')}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all hover:shadow-sm"
            style={{ borderColor: '#25D366', color: '#25D366' }}
          >
            <IconWhatsApp /> WhatsApp
          </a>
          <button
            onClick={() => openBooking()}
            className="px-5 py-2 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg"
            style={{ backgroundColor: '#2C5249' }}
          >
            Book Consultation
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span className="block h-px w-full transition-all origin-center" style={{ backgroundColor: '#1A2E28', transform: menuOpen ? 'rotate(45deg) translateY(5px)' : 'none' }} />
            <span className="block h-px transition-all" style={{ backgroundColor: '#1A2E28', width: menuOpen ? 0 : '100%' }} />
            <span className="block h-px w-full transition-all origin-center" style={{ backgroundColor: '#1A2E28', transform: menuOpen ? 'rotate(-45deg) translateY(-5px)' : 'none' }} />
          </div>
        </button>
      </nav>

      {menuOpen && (
        <div className="lg:hidden px-5 pb-5 space-y-4" style={{ borderTop: '1px solid #E3EDE9', paddingTop: '1rem' }}>
          {LINKS.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)} className="block text-sm font-medium py-1" style={{ color: '#2C5249' }}>{label}</a>
          ))}
          <button onClick={() => { openBooking(); setMenuOpen(false) }}
            className="block w-full text-center text-white py-3 rounded-full text-sm font-semibold"
            style={{ backgroundColor: '#2C5249' }}>
            Book Consultation
          </button>
        </div>
      )}
    </header>
  )
}
