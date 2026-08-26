'use client'

import { useState, useEffect } from 'react'
import { trackBooking, trackWhatsApp, trackCall, trackConversion, EVENTS } from '../lib/attribution'
import { ReviewGrid } from './ReviewCard'
import { REVIEW_STATS } from '../lib/reviews'

export const CFG = {
  phone: '7411722580',
  phoneDisplay: '+91 74117 22580',
  whatsapp: '917411722580',
  booking: 'https://meet-my-doctor.firebaseapp.com/#/?uid=47150&eid=38605',
  maps: 'https://maps.app.goo.gl/8MKPqCCGujp34cXe7',
  clinic: 'Kasper Multi-Speciality Clinic',
  address: '31, 80 Feet Rd, Indiranagar, Bengaluru 560038',
  logo: '/Photos/Anjani%20website/Anjani%20Prityn%20DP.png',
}

const IconStar = () => (
  <svg className="w-4 h-4" fill="#F59E0B" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

const IconWhatsApp = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const IconPhone = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
)

const IconCheck = () => (
  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
)

/**
 * Shared shell for the two second-opinion ad landing pages. All copy lives in
 * the `content` object passed by each page, so the two pages differ only in
 * words — never in structure or tracking.
 */
export default function SecondOpinionLanding({ content: c }) {
  const [openFaq, setOpenFaq] = useState(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [bookingLoaded, setBookingLoaded] = useState(false)
  const waHref = `https://wa.me/${CFG.whatsapp}?text=${encodeURIComponent(c.whatsappText)}`

  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('revealed')),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Same behaviour as the homepage: the booking form opens in an overlay so an
  // ad visitor is never pushed off the landing page mid-conversion.
  const openBooking = () => {
    trackBooking(EVENTS.book)
    setBookingLoaded(false)
    setIsBookingOpen(true)
  }

  const BookBtn = ({ className, style, children }) => (
    <button type="button" onClick={openBooking} className={className} style={style}>
      {children}
    </button>
  )

  return (
    <div style={{ backgroundColor: '#FAFAF8', color: '#1A2E28' }}>

      {/* MINIMAL HEADER — no nav links, so the only clicks above the fold convert */}
      <header className="sticky top-0 z-50" style={{ backgroundColor: 'rgba(250,250,248,0.96)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E3EDE9' }}>
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img src={CFG.logo} alt="" className="w-10 h-10 rounded-full object-cover" style={{ border: '2px solid #C4D9D1' }} />
            <div>
              <div className="font-semibold text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>Dr. Anjani Dixit</div>
              <div className="text-xs" style={{ color: '#7A9C90' }}>MBBS · DNB · FMAS</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href={`tel:${CFG.phone}`} onClick={() => trackCall()}
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium" style={{ color: '#2C5249' }}>
              <IconPhone /> {CFG.phoneDisplay}
            </a>
            <BookBtn className="px-4 py-2 rounded-full text-sm font-semibold text-white whitespace-nowrap" style={{ backgroundColor: '#2C5249' }}>
              Book Now
            </BookBtn>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #f5f0e8 0%, #fafaf8 55%, #eef4f1 100%)' }}>
        <div className="max-w-6xl mx-auto px-5 py-12 lg:py-20 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
              style={{ backgroundColor: '#E3EDE9', color: '#2C5249' }}>
              {c.eyebrow}
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold mb-5" style={{ fontFamily: 'Playfair Display, serif', lineHeight: 1.12 }}>
              {c.h1.lead}<br />
              <em className="font-normal not-italic" style={{ color: '#2C5249' }}>{c.h1.em}</em>
            </h1>
            {c.sub.map((p, i) => (
              <p key={i} className="text-base lg:text-lg leading-relaxed mb-4" style={{ color: '#4A6860', maxWidth: '520px' }}>{p}</p>
            ))}
            <p className="text-sm font-medium mb-7" style={{ color: '#7A9C90' }}>{c.credLine}</p>

            <div className="flex flex-col sm:flex-row gap-3 mb-7">
              <a onClick={() => trackWhatsApp()} href={waHref} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-7 py-4 rounded-full font-semibold text-white text-center"
                style={{ backgroundColor: '#25D366' }}>
                <IconWhatsApp /> {c.waCta}
              </a>
              <BookBtn className="px-7 py-4 rounded-full font-semibold text-center border-2 hover:shadow-md transition-shadow"
                style={{ borderColor: '#2C5249', color: '#2C5249' }}>
                Book a Consultation
              </BookBtn>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <IconStar key={i} />)}</div>
              <a href={CFG.maps} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold hover:underline">5.0 on Google</a>
              <span className="text-sm" style={{ color: '#7A9C90' }}>· {REVIEW_STATS.total} reviews</span>
            </div>
          </div>
          {/* Short, wide crop on phones so the hero does not eat the screen before
              any copy is read; the portrait framing returns from lg up. */}
          <div className="order-1 lg:order-2 rounded-3xl overflow-hidden shadow-2xl mx-auto w-full aspect-[3/2] sm:aspect-[16/9] lg:aspect-[4/5] lg:max-h-[500px]">
            <img src={c.heroImg} alt={c.heroAlt} style={{ '--hero-pos': c.heroPos }}
              className="w-full h-full object-cover hero-crop" />
          </div>
        </div>
      </section>

      {/* TRUST STRIP — early credibility without spending attention on long quotes */}
      <section className="py-8 lg:py-10 bg-white" style={{ borderBottom: '1px solid #E3EDE9' }}>
        <div className="max-w-5xl mx-auto px-5 grid grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 text-center">
          {c.stats.map((s, i) => (
            <div key={i}>
              {s.href ? (
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-2xl lg:text-3xl font-bold mb-1 hover:underline block"
                  style={{ fontFamily: 'Playfair Display, serif', color: '#2C5249' }}>{s.value}</a>
              ) : (
                <div className="text-2xl lg:text-3xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif', color: '#2C5249' }}>{s.value}</div>
              )}
              <div className="text-xs leading-snug" style={{ color: '#7A9C90' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile puts proof first: the stacked cards below push the reviews far
          down a phone screen. From lg up the original order is restored. */}
      <div className="flex flex-col">
        {/* REASSURANCE */}
        <section className="order-2 lg:order-1 py-14 lg:py-20 px-5 bg-white">
          <div className="max-w-3xl mx-auto text-center reveal">
            <h2 className="text-2xl lg:text-3xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>{c.reassure.title}</h2>
            {c.reassure.body.map((p, i) => (
              <p key={i} className="text-base leading-relaxed mb-4" style={{ color: '#4A6860' }}>{p}</p>
            ))}
          </div>
        </section>

        {/* REASONS PEOPLE COME */}
        <section className="order-3 lg:order-2 py-16 lg:py-20 px-5" style={{ backgroundColor: '#F5F0E8' }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 reveal">
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7A9C90' }}>Why people come</p>
              <h2 className="text-2xl lg:text-4xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>{c.reasons.title}</h2>
              <p className="text-sm mt-4 max-w-2xl mx-auto" style={{ color: '#5A7870' }}>{c.reasons.intro}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {c.reasons.items.map((r, i) => (
                <div key={i} className={`bg-white rounded-2xl p-6 reveal reveal-delay-${(i % 3) + 1}`}>
                  <p className="text-sm font-semibold mb-2 leading-snug" style={{ color: '#1A2E28' }}>“{r.said}”</p>
                  <p className="text-sm leading-relaxed" style={{ color: '#5A7870' }}>{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="order-1 lg:order-3 py-16 lg:py-20 px-5 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 reveal">
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7A9C90' }}>Patient stories</p>
              <h2 className="text-2xl lg:text-4xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>{c.reviewsTitle}</h2>
              <p className="text-sm mt-3" style={{ color: '#7A9C90' }}>
                Unedited patient reviews · Google cards link to the original review
              </p>
            </div>
            <ReviewGrid reviews={c.reviews} reveal />
          </div>
        </section>
      </div>

      {/* WHAT THE REVIEW COVERS */}
      <section className="py-16 lg:py-20 px-5 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 reveal">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7A9C90' }}>What happens</p>
            <h2 className="text-2xl lg:text-4xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>{c.process.title}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {c.process.steps.map((s, i) => (
              <div key={i} className={`rounded-2xl p-6 flex gap-4 reveal reveal-delay-${(i % 3) + 1}`} style={{ backgroundColor: '#FAFAF8', border: '1px solid #E3EDE9' }}>
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ backgroundColor: '#E3EDE9', color: '#2C5249' }}>{i + 1}</div>
                <div>
                  <h3 className="font-semibold text-base mb-1.5" style={{ fontFamily: 'Playfair Display, serif' }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#5A7870' }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HONEST EXPECTATIONS — the trust section */}
      <section className="py-16 lg:py-20 px-5" style={{ backgroundColor: '#2C5249' }}>
        <div className="max-w-3xl mx-auto text-center reveal">
          <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#9ECEC0' }}>Being straight with you</p>
          <h2 className="text-2xl lg:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>{c.honesty.title}</h2>
          {c.honesty.body.map((p, i) => (
            <p key={i} className="text-base leading-relaxed mb-4" style={{ color: '#C4E3D9' }}>{p}</p>
          ))}
        </div>
      </section>

      {/* CONSIDERED / OFTEN MISSED */}
      <section className="py-16 lg:py-20 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 reveal">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7A9C90' }}>{c.considered.eyebrow}</p>
            <h2 className="text-2xl lg:text-4xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>{c.considered.title}</h2>
            <p className="text-sm mt-4 max-w-2xl mx-auto" style={{ color: '#5A7870' }}>{c.considered.intro}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.considered.items.map((x, i) => (
              <div key={i} className={`rounded-2xl p-6 reveal reveal-delay-${(i % 3) + 1}`} style={{ backgroundColor: '#F5F0E8' }}>
                <span className="text-xs font-semibold px-3 py-1 rounded-full mb-4 inline-block"
                  style={{ backgroundColor: '#E3EDE9', color: '#2C5249' }}>{x.tag}</span>
                <h3 className="font-semibold text-base mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{x.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#5A7870' }}>{x.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY HER + WHAT TO SEND */}
      <section className="py-16 lg:py-20 px-5" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
          <div className="reveal">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7A9C90' }}>Who you would be seeing</p>
            <h2 className="text-2xl lg:text-3xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>{c.whyHer.title}</h2>
            {c.whyHer.paras.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed mb-4" style={{ color: '#4A6860' }}>{p}</p>
            ))}
            <div className="space-y-3 mt-6">
              {c.whyHer.points.map((b, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="mt-0.5" style={{ color: '#2C5249' }}><IconCheck /></span>
                  <div>
                    <span className="font-semibold text-sm">{b.title} — </span>
                    <span className="text-sm" style={{ color: '#5A7870' }}>{b.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 reveal reveal-delay-2">
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#7A9C90' }}>Before you come</p>
            <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>{c.bring.title}</h3>
            <p className="text-sm leading-relaxed mb-5" style={{ color: '#4A6860' }}>{c.bring.intro}</p>
            <ul className="space-y-2.5 mb-6">
              {c.bring.items.map((b, i) => (
                <li key={i} className="flex gap-2.5 items-start text-sm" style={{ color: '#4A6860' }}>
                  <span className="mt-0.5 flex-shrink-0" style={{ color: '#2C5249' }}><IconCheck /></span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs leading-relaxed mb-5" style={{ color: '#7A9C90' }}>{c.bring.note}</p>
            <a onClick={() => trackWhatsApp()} href={waHref} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-semibold text-white"
              style={{ backgroundColor: '#25D366' }}>
              <IconWhatsApp /> {c.waCta}
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-20 px-5" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 reveal">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7A9C90' }}>Common questions</p>
            <h2 className="text-2xl lg:text-4xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>Questions people ask before coming</h2>
          </div>
          <div className="space-y-3">
            {c.faqs.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #E3EDE9' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-semibold text-sm lg:text-base">{f.q}</span>
                  <span className="flex-shrink-0 transition-transform duration-300" style={{ transform: openFaq === i ? 'rotate(45deg)' : 'none', color: '#7A9C90' }}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>
                <div className={`faq-answer${openFaq === i ? ' open' : ''}`}>
                  <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: '#4A6860' }}>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 lg:py-20 px-5" style={{ backgroundColor: '#2C5249' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl lg:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>{c.finalCta.title}</h2>
          <p className="mb-8 text-base" style={{ color: '#9ECEC0' }}>{c.finalCta.sub}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <BookBtn className="px-8 py-4 rounded-full font-semibold text-center bg-white hover:bg-gray-50 transition-colors" style={{ color: '#2C5249' }}>
              Book a Consultation
            </BookBtn>
            <a href={`tel:${CFG.phone}`} onClick={() => trackCall()}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold border-2 text-white hover:bg-white/10 transition-colors"
              style={{ borderColor: 'rgba(255,255,255,0.4)' }}>
              <IconPhone /> {CFG.phoneDisplay}
            </a>
          </div>
          <p className="text-xs mt-6" style={{ color: '#7FB3A3' }}>
            {CFG.clinic} · {CFG.address} · Video consultations available
          </p>
        </div>
      </section>

      {/* FOOTER — the only links off the page */}
      <footer className="py-8 px-5 text-center text-xs" style={{ backgroundColor: '#1A2E28', color: '#3D6A5C' }}>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-4">
          {c.footerLinks.map(([label, href]) => (
            <a key={href} href={href} className="hover:text-white transition-colors">{label}</a>
          ))}
        </div>
        <p>© 2026 Dr. Anjani Dixit · {CFG.clinic} · {CFG.address}</p>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a onClick={() => trackWhatsApp()} href={waHref} target="_blank" rel="noopener noreferrer"
        className="fixed z-50 flex items-center justify-center rounded-full shadow-xl text-white"
        style={{ bottom: '5.5rem', right: '1.5rem', width: '56px', height: '56px', backgroundColor: '#25D366' }}
        aria-label="Send your reports on WhatsApp">
        <IconWhatsApp />
      </a>


      {/* BOOKING MODAL — mirrors the homepage overlay, including the call /
          WhatsApp fallbacks if the embedded form gives trouble. */}
      {isBookingOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center sm:p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
          onClick={() => setIsBookingOpen(false)}
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
                onClick={() => setIsBookingOpen(false)}
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
              {!bookingLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none" style={{ backgroundColor: '#FAFAF8' }}>
                  <div className="w-8 h-8 rounded-full border-2 animate-spin" style={{ borderColor: '#E3EDE9', borderTopColor: '#2C5249' }} />
                  <p className="text-xs" style={{ color: '#7A9C90' }}>Loading secure booking form…</p>
                </div>
              )}
              <iframe
                src={CFG.booking}
                onLoad={() => setBookingLoaded(true)}
                className="w-full h-full border-0"
                style={{ opacity: bookingLoaded ? 1 : 0, transition: 'opacity 250ms ease' }}
                title="Book a Consultation with Dr. Anjani Dixit"
              />
            </div>

            <div className="flex-shrink-0 px-5 py-3 flex items-center justify-between gap-3 flex-wrap" style={{ borderTop: '1px solid #E3EDE9', backgroundColor: '#FAFAF8' }}>
              <p className="text-xs font-medium" style={{ color: '#7A9C90' }}>Trouble? We&apos;re here:</p>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${CFG.phone}`}
                  onClick={() => trackConversion('booking_fallback_call')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors hover:opacity-90"
                  style={{ backgroundColor: '#E3EDE9', color: '#2C5249' }}
                >
                  <IconPhone /> Call
                </a>
                <a
                  href={waHref}
                  target="_blank" rel="noopener noreferrer"
                  onClick={() => trackConversion('booking_fallback_whatsapp')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white transition-colors hover:opacity-90"
                  style={{ backgroundColor: '#25D366' }}
                >
                  <IconWhatsApp /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE STICKY CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-4 py-3"
        style={{ backgroundColor: 'rgba(250,250,248,0.97)', backdropFilter: 'blur(10px)', borderTop: '1px solid #E3EDE9' }}>
        <BookBtn className="flex items-center justify-center w-full py-3.5 rounded-full text-sm font-semibold text-white"
          style={{ backgroundColor: '#2C5249' }}>
          Book a Consultation
        </BookBtn>
      </div>
    </div>
  )
}
