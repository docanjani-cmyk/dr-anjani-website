'use client'

import { useState, useEffect } from 'react'
import { trackBooking, trackWhatsApp, trackCall } from '../lib/attribution'
import StickyActionBar from '../components/StickyActionBar'
import { waHref } from '../lib/whatsapp'
import PracticeLocations from '../components/PracticeLocations'
import RelatedServices from '../components/RelatedServices'
import { ReviewGrid } from '../components/ReviewCard'
import { COSMETIC_REVIEWS, REVIEW_STATS } from '../lib/reviews'

const CFG = {
  phone: '7411722580',
  phoneDisplay: '+91 74117 22580',
  whatsapp: '917411722580',
  booking: 'https://meet-my-doctor.firebaseapp.com/#/?uid=47150&eid=38605',
  maps: 'https://maps.app.goo.gl/8MKPqCCGujp34cXe7',

}

const IMG = {
  logo: '/Photos/Anjani%20website/Anjani%20Prityn%20DP.png',
  hero: '/Photos/Anjani%20website/Informal%20photos/About%20me.jpg',
}

const IconStar = () => (
  <svg className="w-4 h-4" fill="#F59E0B" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

const IconWhatsApp = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const IconPhone = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
)

const IconLock = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
)

const FAQS = [
  { q: 'Are these procedures safe?', a: 'Yes. All gynecosmetic procedures performed by Dr. Anjani meet the highest standards of surgical safety. As a fellowship-trained gynaecological surgeon with 14+ years of experience, she brings the same precision and care to cosmetic procedures as she does to complex laparoscopic surgery.' },
  { q: 'Is my privacy completely protected?', a: 'Absolutely. All consultations and procedures are completely confidential. Dr. Anjani creates a safe, non-judgmental space where you can speak openly. Your records are never shared without your explicit consent.' },
  { q: 'What is the recovery like after cosmetic gynaecological procedures?', a: 'Recovery varies by procedure. Most patients resume normal activities within a few days to two weeks. Dr. Anjani provides detailed post-procedure care instructions and remains available for follow-up questions throughout your recovery.' },
  { q: 'Will I be judged for seeking these procedures?', a: 'Never. Dr. Anjani believes strongly in every woman\'s right to feel comfortable and confident in her body. These consultations are free of judgement — your reasons are your own, and they are always respected.' },
  { q: 'How do I know which procedure is right for me?', a: 'An initial consultation is the best first step. Dr. Anjani listens carefully to your concerns, explains all relevant options with their expected outcomes, and recommends only what she genuinely believes will benefit you. There is never any pressure.' },
  { q: 'Can these procedures be combined with other gynaecological treatments?', a: 'In many cases, yes. Perineal repair, for example, can be combined with prolapse correction. PRP therapy can be paired with hormonal management. Dr. Anjani discusses the full picture of your gynaecological health and identifies whether a combined approach is appropriate and beneficial.' },
]

const NAV_LINKS = [
  ['Home', '/'],
  ['Laparoscopic Surgery', '/laparoscopic-surgery'],
  ['IVF & Fertility', '/ivf-infertility'],
  ['Pregnancy Care', '/pregnancy'],
  ['PCOS Treatment', '/pcos'],
]

export default function CosmeticGynecologyPage() {
  const [openFaq, setOpenFaq] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    const onClick = (e) => { if (!e.target.closest('header')) setMenuOpen(false) }
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('click', onClick)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('click', onClick); document.removeEventListener('keydown', onKey) }
  }, [menuOpen])

  return (
    <div style={{ backgroundColor: '#FAFAF8', color: '#1A2E28' }}>

      {/* NAV */}
      <header className="sticky top-0 z-50" style={{ backgroundColor: 'rgba(250,250,248,0.96)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E3EDE9' }}>
        <nav className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img src={IMG.logo} alt="Dr. Anjani Dixit" className="w-10 h-10 rounded-full object-cover" style={{ border: '2px solid #C4D9D1' }} />
            <div>
              <div className="font-semibold text-sm" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>Dr. Anjani Dixit</div>
              <div className="text-xs" style={{ color: '#7A9C90' }}>MBBS · DNB · FMAS</div>
            </div>
          </a>
          <div className="hidden lg:flex items-center gap-5">
            {NAV_LINKS.map(([label, href]) => (
              <a key={href} href={href} className="text-sm font-medium whitespace-nowrap transition-opacity hover:opacity-70" style={{ color: '#2C5249' }}>{label}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href={`tel:${CFG.phone}`} onClick={() => trackCall()} className="hidden sm:flex items-center gap-1.5 text-sm font-medium" style={{ color: '#2C5249' }}>
              <IconPhone /> {CFG.phoneDisplay}
            </a>
            <a href={CFG.booking} onClick={() => trackBooking('ads_conversion_Contact_Us_1')} target="_blank" rel="noopener noreferrer"
              className="hidden lg:inline-block px-5 py-2 rounded-full text-sm font-semibold text-white"
              style={{ backgroundColor: '#2C5249' }}>
              Book Consultation
            </a>
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
          </div>
        </nav>

        {menuOpen && (
          <div className="lg:hidden px-5 pb-5 space-y-3" style={{ borderTop: '1px solid #E3EDE9', paddingTop: '1rem' }}>
            {NAV_LINKS.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} className="block text-sm font-medium py-1" style={{ color: '#2C5249' }}>{label}</a>
            ))}
            <a href={CFG.booking} target="_blank" rel="noopener noreferrer"
              onClick={() => { trackBooking('ads_conversion_Contact_Us_1'); setMenuOpen(false) }}
              className="block w-full text-center text-white py-3 rounded-full text-sm font-semibold mt-3"
              style={{ backgroundColor: '#2C5249' }}>
              Book Consultation
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #f5f0e8 0%, #fafaf8 55%, #eef4f1 100%)' }}>
        <div className="max-w-6xl mx-auto px-5 py-12 lg:py-24 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
              style={{ backgroundColor: '#E3EDE9', color: '#2C5249' }}>
              Cosmetic Gynaecologist · Indiranagar · Bangalore
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-5"
              style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28', lineHeight: 1.1 }}>
              Cosmetic Gynaecology<br />
              <em className="font-normal not-italic" style={{ color: '#2C5249' }}>in Bangalore</em>
            </h1>
            <p className="text-lg leading-relaxed mb-4" style={{ color: '#4A6860', maxWidth: '480px' }}>
              Private, compassionate aesthetic and functional procedures for feminine wellbeing — performed with the highest standards of safety, dignity, and complete confidentiality.
            </p>
            <div className="flex items-center gap-2 mb-8 px-4 py-3 rounded-2xl" style={{ backgroundColor: '#E3EDE9' }}>
              <IconLock />
              <span className="text-sm font-medium" style={{ color: '#2C5249' }}>All consultations are completely private and confidential</span>
            </div>
            <div data-hero-cta className="flex flex-col sm:flex-row gap-3 mb-8">
              <a href={CFG.booking} onClick={() => trackBooking('ads_conversion_Contact_Us_1')} target="_blank" rel="noopener noreferrer"
                className="px-8 py-4 rounded-full font-semibold text-white text-center hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#2C5249' }}>
                Book a Private Consultation
              </a>
              <a onClick={() => trackWhatsApp()} href={waHref('cosmetic', 'hero')}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold border-2 hover:shadow-md transition-shadow"
                style={{ borderColor: '#25D366', color: '#25D366' }}>
                <IconWhatsApp /> Private WhatsApp
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <IconStar key={i} />)}</div>
              <a href={CFG.maps} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold hover:underline" style={{ color: '#1A2E28' }}>5.0 on Google</a>
              <span className="text-sm" style={{ color: '#7A9C90' }}>· {REVIEW_STATS.total} reviews</span>
              <span className="text-sm" style={{ color: '#C4D9D1' }}>|</span>
            </div>
          </div>
          <div className="order-1 lg:order-2 rounded-3xl overflow-hidden shadow-2xl mx-auto w-full" style={{ aspectRatio: '4/5', maxHeight: '520px' }}>
            <img src={IMG.hero} alt="Dr. Anjani Dixit – Cosmetic Gynaecologist Bangalore"
              className="w-full h-full object-cover object-top" />
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-10 lg:py-16 px-5 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg leading-relaxed" style={{ color: '#4A6860' }}>
            Every woman deserves to feel comfortable, confident, and whole in her body. Dr. Anjani approaches gynecosmetic procedures with the same surgical precision she brings to complex laparoscopic surgery — and the same deep respect for the person she is treating. These are medical procedures, and they are performed in a safe, clinical environment with complete privacy.
          </p>
        </div>
      </section>

      {/* PROCEDURES */}
      <section className="py-10 lg:py-20 px-5" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 lg:mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7A9C90' }}>Procedures</p>
            <h2 className="text-3xl lg:text-4xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>
              Cosmetic Gynaecology Services
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: 'Vaginal Rejuvenation', sub: 'Functional & Aesthetic', desc: 'Surgical and non-surgical procedures to restore vaginal tone and function — addressing concerns related to childbirth, ageing, or personal comfort.' },
              { title: 'Labiaplasty', sub: 'Labial Correction', desc: 'Surgical reduction or reshaping of the labia minora or majora for comfort, aesthetics, or both. Performed with precision and full respect for your anatomy and goals.' },
              { title: 'Hymenoplasty', sub: 'Hymen Repair', desc: 'A safe, private surgical procedure to restore the hymen. Dr. Anjani performs this with complete sensitivity and zero judgement.' },
              { title: 'Perineal Repair', sub: 'Perineoplasty', desc: 'Surgical correction of perineal tears, episiotomy scarring, or laxity — addressing both functional concerns (comfort, continence) and aesthetic goals.' },
              { title: 'PRP Therapy', sub: 'Non-Surgical', desc: 'Platelet-rich plasma treatment to address dryness, sensitivity, and tissue health — a non-surgical option with no downtime and natural results.' },
              { title: 'Vaginal Tightening', sub: 'Vaginoplasty', desc: 'Surgical correction of vaginal laxity following childbirth or ageing, to restore function and improve intimate wellbeing.' },
            ].map((c, i) => (
              <div key={i} className="bg-white rounded-2xl p-6">
                <span className="text-xs font-semibold px-3 py-1 rounded-full mb-4 inline-block"
                  style={{ backgroundColor: '#E3EDE9', color: '#2C5249' }}>{c.sub}</span>
                <h3 className="font-semibold text-base mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>{c.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#5A7870' }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST SIGNALS */}
      <section className="py-10 lg:py-16 px-5 bg-white">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 text-center">
          {[
            { title: 'Complete Privacy', desc: 'All consultations and procedures are 100% confidential. Your records are never shared.' },
            { title: 'Surgical Expertise', desc: 'Fellowship-trained surgeon with 1000+ gynaecological procedures. Same precision, applied to cosmetic care.' },
            { title: 'No Judgement', desc: 'A safe space where your reasons are respected and your questions are welcomed without hesitation.' },
          ].map((t, i) => (
            <div key={i} className="p-6 rounded-2xl" style={{ backgroundColor: '#F5F0E8' }}>
              <h3 className="font-semibold mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>{t.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#5A7870' }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-10 lg:py-20 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 lg:mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7A9C90' }}>Patient Stories</p>
            <h2 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>What Patients Say</h2>
            <p className="text-sm mt-3" style={{ color: '#7A9C90' }}>
              Unedited patient reviews · Google cards link to the original review
            </p>
          </div>
          <div>
            <ReviewGrid reviews={COSMETIC_REVIEWS} columns="md:grid-cols-2 lg:grid-cols-3" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 lg:py-20 px-5" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 lg:mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7A9C90' }}>Questions</p>
            <h2 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #E3EDE9' }}>
                <button className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-medium text-sm pr-4" style={{ color: '#1A2E28' }}>{faq.q}</span>
                  <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300"
                    style={{ backgroundColor: '#E3EDE9', color: '#2C5249', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>
                {openFaq === i && (
                  <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: '#5A7870' }}>{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHERE SHE PRACTISES */}
      <PracticeLocations kind="surgery"
        intro="Consultations happen privately at her Indiranagar clinic. Procedures requiring theatre or admission are performed at these partner hospitals."
      />

      {/* FINAL CTA */}
      <section className="py-10 lg:py-20 px-5" style={{ backgroundColor: '#2C5249' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Book a Private Consultation
          </h2>
          <p className="mb-8 text-base" style={{ color: '#9ECEC0' }}>
            Speak confidentially with Dr. Anjani Dixit. In-person and video consultations available at Kasper Multi-Speciality Clinic, Indiranagar.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={CFG.booking} onClick={() => trackBooking('ads_conversion_Contact_Us_1')} target="_blank" rel="noopener noreferrer"
              className="px-8 py-4 rounded-full font-semibold text-center bg-white hover:bg-gray-50 transition-colors"
              style={{ color: '#2C5249' }}>
              Book Consultation
            </a>
            <a href={`tel:${CFG.phone}`} onClick={() => trackCall()}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold border-2 text-white hover:bg-white/10 transition-colors"
              style={{ borderColor: 'rgba(255,255,255,0.4)' }}>
              <IconPhone /> {CFG.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* RELATED — contextual internal links */}
      <RelatedServices links={NAV_LINKS} />

      <footer className="py-8 px-5 text-center text-xs" style={{ backgroundColor: '#1A2E28', color: '#3D6A5C' }}>
        <p>© 2026 Dr. Anjani Dixit · Kasper Multi-Speciality Clinic · 31, 80 Feet Rd, Indiranagar, Bengaluru 560038</p>
        <a href="/" className="mt-2 inline-block hover:text-white transition-colors">← Back to main site</a>
      </footer>

      <a onClick={() => trackWhatsApp()} href={waHref('cosmetic', 'float')}
        target="_blank" rel="noopener noreferrer"
        className="hidden lg:flex fixed z-50 items-center justify-center rounded-full shadow-xl"
        style={{ bottom: '5.5rem', right: '1.5rem', width: '56px', height: '56px', backgroundColor: '#25D366' }}>
        <IconWhatsApp />
      </a>

      <StickyActionBar waHref={waHref('cosmetic', 'sticky')} bookHref={CFG.booking} />
    </div>
  )
}
