'use client'

import { useState, useEffect } from 'react'
import { trackBooking, trackWhatsApp, trackCall } from '../../lib/attribution'
import RelatedServices from '../../components/RelatedServices'
import { ReviewGrid } from '../../components/ReviewCard'
import { IVF_REVIEWS, REVIEW_STATS } from '../../lib/reviews'

const CFG = {
  phone: '7411722580',
  phoneDisplay: '+91 74117 22580',
  whatsapp: '917411722580',
  booking: 'https://meet-my-doctor.firebaseapp.com/#/?uid=47150&eid=38605',
  maps: 'https://maps.app.goo.gl/8MKPqCCGujp34cXe7',

}

const IMG = {
  logo: '/Photos/Anjani%20website/Anjani%20Prityn%20DP.png',
  hero: '/Gallery/About%20us%2010.jpg',
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

const IconCheck = () => (
  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
)

const IconPhone = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
)

const FAQS = [
  { q: 'When should I see a fertility specialist?', a: 'If you are under 35 and have been trying to conceive for 12 months without success, or over 35 and trying for 6 months, it is time to seek evaluation. You should see a specialist sooner if you have irregular periods, a known condition like PCOS or endometriosis, or a history of miscarriage.' },
  { q: 'What does a fertility evaluation involve?', a: 'A thorough evaluation includes a detailed history, hormonal blood tests (AMH, FSH, LH, thyroid), an ultrasound assessment of ovarian reserve and uterine anatomy, and a semen analysis for your partner. Dr. Anjani reviews all findings with you in plain language and recommends the most appropriate next step.' },
  { q: 'What is the difference between IUI and IVF?', a: 'IUI (intrauterine insemination) is a simpler procedure where washed sperm is placed directly into the uterus around ovulation. It is less invasive and less expensive, but has lower success rates than IVF. IVF (in vitro fertilisation) involves stimulating the ovaries, retrieving eggs, fertilising them in a lab, and transferring the resulting embryo. IVF is recommended when IUI has failed, tubes are blocked, or sperm parameters are significantly reduced.' },
  { q: 'What are the success rates for IVF?', a: 'IVF success depends on age, ovarian reserve, cause of infertility, and embryo quality. Success rates are highest under 35 and decline with age. Dr. Anjani provides an honest, personalised assessment of your prognosis based on your specific investigations — not generic statistics.' },
  { q: 'How many IVF cycles might I need?', a: 'Many couples conceive within 1–3 cycles. Dr. Anjani will review your response to the first cycle before recommending a plan for subsequent attempts. The decision is always collaborative, and emotional readiness is taken into account alongside medical factors.' },
  { q: 'Can structural problems like fibroids or blocked tubes be treated before IVF?', a: 'Yes. Conditions like submucous fibroids, polyps, blocked fallopian tubes, or a uterine septum can reduce IVF success and are often best corrected surgically before proceeding. Dr. Anjani\'s expertise in both laparoscopic surgery and fertility treatment means she can manage all aspects of your care in one place.' },
]

const NAV_LINKS = [
  ['Home', '/'],
  ['Laparoscopic Surgery', '/laparoscopic-surgery'],
  ['Pregnancy Care', '/pregnancy'],
  ['PCOS Treatment', '/pcos'],
  ['Cosmetic Gynaecology', '/cosmetic-gynecology'],
]

const GALLERY = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 15, 17, 18, 23].map(i => ({
  src: `/Gallery/About us ${i}.jpg`,
  alt: `Dr. Anjani Dixit with newborn — delivery moment ${i}`,
}))

export default function IVFInfertilityPage() {
  const [openFaq, setOpenFaq] = useState(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [lightbox, setLightbox] = useState(null)

  const openBooking = (eventName = 'ads_conversion_Contact_Us_1') => {
    trackBooking(eventName)
    setIsBookingOpen(true)
  }

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setIsBookingOpen(false); setMenuOpen(false) } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onClick = (e) => { if (!e.target.closest('header')) setMenuOpen(false) }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
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
            <button onClick={() => openBooking()}
              className="hidden lg:inline-block px-5 py-2 rounded-full text-sm font-semibold text-white"
              style={{ backgroundColor: '#2C5249' }}>
              Book Consultation
            </button>
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
            <button
              onClick={() => { openBooking(); setMenuOpen(false) }}
              className="block w-full text-center text-white py-3 rounded-full text-sm font-semibold mt-3"
              style={{ backgroundColor: '#2C5249' }}>
              Book Consultation
            </button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #f5f0e8 0%, #fafaf8 55%, #eef4f1 100%)' }}>
        <div className="max-w-6xl mx-auto px-5 py-12 lg:py-24 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
              style={{ backgroundColor: '#E3EDE9', color: '#2C5249' }}>
              IVF & Fertility Specialist · Indiranagar · Bangalore
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-5 leading-tight"
              style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28', lineHeight: 1.1 }}>
              IVF & Fertility<br />
              <em className="font-normal not-italic" style={{ color: '#2C5249' }}>Treatment in Bangalore</em>
            </h1>
            <p className="text-lg leading-relaxed mb-4" style={{ color: '#4A6860', maxWidth: '480px' }}>
              Compassionate, evidence-based fertility care — from thorough evaluation through IVF, IUI, and surgical treatment. Honest guidance and emotional support at every step.
            </p>
            <p className="text-sm font-medium mb-8" style={{ color: '#7A9C90' }}>
              Reproductive Medicine Certification · ICOG · 14+ years experience
            </p>
            <div className="hidden lg:flex gap-3 mb-8">
              <button onClick={() => openBooking()}
                className="px-8 py-4 rounded-full font-semibold text-white text-center hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#2C5249' }}>
                Book a Consultation
              </button>
              <a onClick={() => trackWhatsApp()} href={`https://wa.me/${CFG.whatsapp}?text=Hi Dr. Anjani, I would like to discuss fertility treatment options.`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold border-2 hover:shadow-md transition-shadow"
                style={{ borderColor: '#25D366', color: '#25D366' }}>
                <IconWhatsApp /> WhatsApp Us
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
            <img src={IMG.hero} alt="Dr. Anjani Dixit – IVF Specialist Bangalore"
              className="w-full h-full object-cover object-top" />
          </div>
        </div>
      </section>

      {/* PATIENT PROMISE */}
      <section className="py-16 px-5 bg-white">
        <div className="max-w-4xl mx-auto">
          <blockquote className="text-center">
            <p className="text-xl lg:text-2xl font-medium italic leading-relaxed mb-4"
              style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>
              "Fertility treatment is not just a medical process — it is one of the most emotionally demanding journeys a couple can undertake. I approach every patient with complete honesty, deep patience, and the understanding that your story is unique."
            </p>
            <footer className="text-sm font-semibold" style={{ color: '#7A9C90' }}>— Dr. Anjani Dixit</footer>
          </blockquote>
        </div>
      </section>

      {/* TREATMENTS */}
      <section className="py-20 px-5" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7A9C90' }}>What We Offer</p>
            <h2 className="text-3xl lg:text-4xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>
              Fertility Treatments & Services
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: 'IVF', sub: 'In Vitro Fertilisation', desc: 'Controlled ovarian stimulation, egg retrieval, fertilisation, and embryo transfer — supported by close monitoring and transparent communication at every stage.' },
              { title: 'IUI', sub: 'Intrauterine Insemination', desc: 'A less invasive first-line option for couples with unexplained infertility or mild male factor. Timed with your natural or stimulated cycle.' },
              { title: 'Fertility Evaluation', sub: 'Diagnosis First', desc: 'Comprehensive workup including hormone panel, AMH, antral follicle count, uterine assessment, and semen analysis to identify the exact cause of infertility.' },
              { title: 'Ovulation Induction', sub: 'Cycle Regulation', desc: 'Medication-based stimulation of ovulation for women with irregular cycles or anovulation, including careful monitoring to minimise risk of hyperstimulation.' },
              { title: 'Surgical Fertility Treatment', sub: 'Structural Correction', desc: 'Laparoscopic correction of blocked tubes, fibroids, endometriosis, polyps, or uterine abnormalities before or alongside fertility treatment.' },
              { title: 'Recurrent Pregnancy Loss', sub: 'Miscarriage Workup', desc: 'Thorough investigation and management of repeated miscarriage — including thrombophilia screening, chromosomal analysis, and uterine evaluation.' },
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

      {/* JOURNEY STEPS */}
      <section className="py-20 px-5 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7A9C90' }}>Your Path Forward</p>
            <h2 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>
              What to Expect
            </h2>
          </div>
          <div className="space-y-0">
            {[
              { step: '01', title: 'Initial Consultation', desc: 'An unhurried conversation about your history, previous investigations, lifestyle, and goals. No judgement — just listening.' },
              { step: '02', title: 'Thorough Investigation', desc: 'A targeted workup for both partners. Dr. Anjani reviews every result with you clearly and honestly.' },
              { step: '03', title: 'Your Treatment Plan', desc: 'A personalised recommendation — whether IUI, IVF, surgery first, or combined — with clear reasoning and realistic expectations.' },
              { step: '04', title: 'Treatment & Monitoring', desc: 'Close monitoring throughout your cycle with timely adjustments. You are never left without answers.' },
              { step: '05', title: 'Ongoing Support', desc: 'Whatever the outcome, Dr. Anjani remains with you — celebrating success or helping you plan next steps with compassion.' },
            ].map((s, i, arr) => (
              <div key={i} className="flex gap-8 py-7" style={{ borderBottom: i < arr.length - 1 ? '1px solid #E3EDE9' : 'none' }}>
                <div className="text-2xl font-bold w-10 flex-shrink-0 text-right" style={{ fontFamily: 'Playfair Display, serif', color: '#C4D9D1' }}>{s.step}</div>
                <div>
                  <h3 className="font-semibold mb-1.5" style={{ color: '#1A2E28' }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#5A7870' }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-20 px-5" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7A9C90' }}>Patient Stories</p>
            <h2 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>What Patients Say</h2>
            <p className="text-sm mt-3" style={{ color: '#7A9C90' }}>
              Unedited patient reviews · Google cards link to the original review
            </p>
          </div>
          <div>
            <ReviewGrid reviews={IVF_REVIEWS} columns="md:grid-cols-2 lg:grid-cols-3" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-5 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7A9C90' }}>Questions</p>
            <h2 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <div key={i} className="rounded-2xl overflow-hidden" style={{ border: '1px solid #E3EDE9' }}>
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

      {/* GALLERY */}
      <section className="py-20 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7A9C90' }}>Moments of Joy</p>
            <h2 className="text-3xl lg:text-4xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>
              Deliveries With Dr. Anjani
            </h2>
          </div>
          <div style={{ columnCount: 'var(--cols)', columnGap: '1rem', '--cols': 2 }} className="gallery-grid">
            {GALLERY.map((photo, i) => (
              <div
                key={i}
                className="mb-4 rounded-2xl overflow-hidden cursor-pointer group"
                style={{ breakInside: 'avoid' }}
                onClick={() => setLightbox(i)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
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
          <style>{`
            @media (min-width: 640px) { .gallery-grid { --cols: 3 !important; } }
            @media (min-width: 1024px) { .gallery-grid { --cols: 4 !important; } }
          `}</style>
        </div>
      </section>

      {/* LIGHTBOX */}
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
            onClick={e => { e.stopPropagation(); setLightbox((lightbox + GALLERY.length - 1) % GALLERY.length) }}
            aria-label="Previous"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <img
            src={GALLERY[lightbox].src}
            alt={GALLERY[lightbox].alt}
            className="max-h-[90vh] max-w-full rounded-2xl object-contain"
            onClick={e => e.stopPropagation()}
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            onClick={e => { e.stopPropagation(); setLightbox((lightbox + 1) % GALLERY.length) }}
            aria-label="Next"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white text-sm" style={{ opacity: 0.6 }}>
            {lightbox + 1} / {GALLERY.length}
          </div>
        </div>
      )}

      {/* FINAL CTA */}
      <section className="py-20 px-5" style={{ backgroundColor: '#2C5249' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Begin Your Fertility Journey
          </h2>
          <p className="mb-8 text-base" style={{ color: '#9ECEC0' }}>
            Book a consultation with Dr. Anjani Dixit at Kasper Multi-Speciality Clinic, Indiranagar. Video consultations available for initial assessment.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => openBooking()}
              className="px-8 py-4 rounded-full font-semibold text-center bg-white hover:bg-gray-50 transition-colors"
              style={{ color: '#2C5249' }}>
              Book a Consultation
            </button>
            <a href={`tel:${CFG.phone}`} onClick={() => trackCall()}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold border-2 text-white hover:bg-white/10 transition-colors"
              style={{ borderColor: 'rgba(255,255,255,0.4)' }}>
              <IconPhone /> {CFG.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* RELATED — contextual internal links */}
      <RelatedServices links={NAV_LINKS} extra={['/ivf-infertility/second-opinion']} />

      <footer className="py-8 px-5 text-center text-xs" style={{ backgroundColor: '#1A2E28', color: '#3D6A5C' }}>
        <p>© 2026 Dr. Anjani Dixit · Kasper Multi-Speciality Clinic · 31, 80 Feet Rd, Indiranagar, Bengaluru 560038</p>
        <a href="/" className="mt-2 inline-block hover:text-white transition-colors">← Back to main site</a>
      </footer>

      <a onClick={() => trackWhatsApp()} href={`https://wa.me/${CFG.whatsapp}?text=Hi Dr. Anjani, I would like to discuss fertility treatment options.`}
        target="_blank" rel="noopener noreferrer"
        className="fixed z-50 flex items-center justify-center rounded-full shadow-xl"
        style={{ bottom: '5.5rem', right: '1.5rem', width: '56px', height: '56px', backgroundColor: '#25D366' }}>
        <IconWhatsApp />
      </a>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-4 py-3"
        style={{ backgroundColor: 'rgba(250,250,248,0.97)', backdropFilter: 'blur(10px)', borderTop: '1px solid #E3EDE9' }}>
        <button onClick={() => openBooking()}
          className="flex items-center justify-center w-full py-3.5 rounded-full text-sm font-semibold text-white"
          style={{ backgroundColor: '#2C5249' }}>
          Book a Consultation
        </button>
      </div>

      {/* BOOKING MODAL */}
      {isBookingOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
          onClick={() => setIsBookingOpen(false)}
        >
          <div
            className="relative bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-2xl flex flex-col"
            style={{ height: '85vh', maxHeight: '700px' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 flex-shrink-0" style={{ borderBottom: '1px solid #E3EDE9' }}>
              <span className="font-semibold text-sm" style={{ color: '#1A2E28' }}>Book a Consultation</span>
              <button
                onClick={() => setIsBookingOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
                style={{ color: '#7A9C90' }}
                aria-label="Close"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <iframe
              src={CFG.booking}
              className="w-full flex-1 border-0"
              title="Book a Consultation with Dr. Anjani Dixit"
            />
          </div>
        </div>
      )}
    </div>
  )
}
