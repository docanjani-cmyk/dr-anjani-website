'use client'

import { useState, useEffect } from 'react'

const CFG = {
  name: 'Dr. Anjani Dixit',
  email: 'doc.anjani@gmail.com',
  phone: '7411722580',
  phoneDisplay: '+91 74117 22580',
  whatsapp: '917411722580',
  linkedin: 'https://www.linkedin.com/in/dr-anjani/',
  facebook: 'https://www.facebook.com/anjani.dixit.5/',
  youtube: 'https://www.youtube.com/@dr.anjanidixitsengar7299',
  practo: 'https://www.practo.com/Bangalore/doctor/anjani-dixit-gynecologist-obstetrician',
  booking: 'https://meet-my-doctor.firebaseapp.com/#/?uid=47150&eid=38605',
  maps: 'https://maps.google.com/maps/place//data=!4m2!3m1!1s0x3bae176f18b50aff:0xe91df7456f7f6c4b',
  clinic: 'Kasper Multi-Speciality Clinic',
  address: '31, 80 Feet Rd, Indiranagar, Bengaluru 560038',
  license: 'DLH 2013 0000613KTK',
}

const IMG = {
  logo: 'https://www.anjanidixit.com/image.webp',
  hero: 'https://www.anjanidixit.com/IMG-20251024-WA0023.jpg',
  about: 'https://www.anjanidixit.com/WhatsApp%20Image%202025-10-24%20at%2009.22.25_52f468ef.jpg',
}

const TESTIMONIALS = [
  { name: 'Harshit Kakkar', condition: 'Laparoscopic Hysterectomy', date: 'May 2026', img: '/reviewers/harshit-kakkar.jpg', review: 'We consulted Dr. Anjani for my mother\'s laparoscopic hysterectomy and had a great experience. She is very knowledgeable, explains everything clearly, and makes you feel comfortable and confident throughout. The surgery and recovery both went smoothly. What stands out is her calm, reassuring approach and genuine care.' },
  { name: 'Baidyanath Sinha', condition: 'Pregnancy Care', date: 'April 2026', img: 'https://lh3.googleusercontent.com/a-/ALV-UjUUdzLFKPeVX2_bJ2jHhewapprBgjvVebSSDec=s120-c-rp-mo-br100', review: 'Dr. Anjani Dixit is truly exceptional. Her expertise, warmth, and genuine care made my wife\'s pregnancy journey smooth, safe, and beautiful. She listens patiently, explains everything clearly. What sets her apart is how she treats you as a person, not just a patient.' },
  { name: 'Sneha John', condition: 'Consultation', date: 'April 2026', img: 'https://lh3.googleusercontent.com/a/ACg8ocKeei3HsSNWqUGdj9xG3vjotrzVJgqfPeRUF0Hl=s120-c-rp-mo-br100', review: 'I had a really good experience with Dr. Anjani. She was very patient, listened to all my concerns, and explained everything clearly without rushing. She made me feel comfortable and reassured throughout the consultation. I felt I was in safe and capable hands.' },
  { name: 'Rupa Ganamaneni', condition: 'Laparoscopic Surgery', date: 'April 2026', img: 'https://lh3.googleusercontent.com/a/ACg8ocJ_p7iQhbSEjIwoDfSOYf7LDU4N2DDn_A4Y_LUl=s120-c-rp-mo-br100', review: 'One of the best gyno surgeons I have met. She addressed all my concerns and doubts. She did laparoscopy surgery for my mom — all went fine without any issues. She gave all the tips, diet plan, and suggestions for post-surgery care.' },
  { name: 'Sai Tharun', condition: 'Laparoscopic Surgery', date: 'April 2026', img: 'https://lh3.googleusercontent.com/a/ACg8ocJQn1TlJrxRNDiHJGeklIeY6SODpfd0bNVvApAl=s120-c-rp-mo-br100', review: 'I had a laparoscopic surgery recently and I am extremely grateful for the care and expertise provided. From the very first consultation, the doctor explained everything clearly, addressed all my concerns, and made me feel comfortable and confident.' },
  { name: 'Riya Jati', condition: 'Endometriosis & Fibroids', date: 'February 2026', img: 'https://lh3.googleusercontent.com/a/ACg8ocLTyhWPsfGLFr5GFNcONZ4lkvTb5AC5H-0aeV4z=s120-c-rp-mo-br100', review: 'Suffering from lower back pain due to endometriosis cyst and multiple fibroids, I am extremely thankful — Madam demonstrated everything very politely. She has very polished surgical hands and exceptional expertise in minimally invasive procedures.' },
]

const FAQS = [
  { q: 'What conditions do you specialise in?', a: 'Dr. Anjani specialises in advanced laparoscopic surgery (fibroids, endometriosis, ovarian cysts, hysterectomy), IVF and fertility treatment, high-risk obstetrics, PCOS management, and gynecosmetic procedures. She offers comprehensive care across all aspects of women\'s reproductive and gynaecological health.' },
  { q: 'How do I book a consultation?', a: 'You can book through our online Zoho appointment form, through Practo, by calling directly, or by messaging on WhatsApp. Dr. Anjani consults at Kasper Multi-Speciality Clinic, Indiranagar, Bangalore. Video consultations are available for initial evaluations and international patients.' },
  { q: 'Do you treat international or NRI patients?', a: 'Yes. Dr. Anjani regularly consults with patients from outside India, including NRIs and international patients seeking advanced laparoscopic surgery or IVF treatment in Bangalore. Video consultations for initial assessment can be arranged easily.' },
  { q: 'What is the recovery like after laparoscopic surgery?', a: 'Laparoscopic (keyhole) surgery is minimally invasive — most patients return home the same day or the next, with a recovery period of 1–2 weeks for most procedures. Dr. Anjani has performed over 1000 such procedures and provides detailed post-operative guidance and monitoring.' },
  { q: 'What are the success rates for IVF?', a: 'IVF success depends on individual factors including age, diagnosis, ovarian reserve, and overall health. Dr. Anjani provides a thorough personal evaluation and honest, evidence-based guidance on your prognosis and the best treatment pathway for your specific situation.' },
  { q: 'Do you manage high-risk pregnancies?', a: 'Yes. Dr. Anjani has extensive experience managing high-risk pregnancies including those complicated by PCOS, thyroid disorders, fibroids, prior surgical history, advanced maternal age, and other conditions. She provides close, personalised antenatal monitoring.' },
  { q: 'What makes Dr. Anjani\'s approach different?', a: 'Dr. Anjani combines advanced surgical precision with deep emotional attentiveness. She takes time to truly understand your situation — medical, emotional, and personal. Patients consistently describe feeling seen, heard, and genuinely cared for, not processed through a system. She approaches women\'s health holistically, including emotional and psychological wellbeing.' },
]

// SVG Icons
const IconScalpel = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
  </svg>
)
const IconHeart = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
)
const IconSun = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>
)
const IconArrow = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
)
const IconPin = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
)
const IconPhone = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
)
const IconMail = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
)
const IconWhatsApp = ({ size = 'w-5 h-5' }) => (
  <svg className={size} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)
const IconLinkedIn = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
)
const IconFacebook = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
  </svg>
)
const IconYouTube = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
  </svg>
)
const IconStar = () => (
  <svg className="w-4 h-4" fill="#F59E0B" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

const MARQUEE_ITEMS = [
  '12+ Years Experience', 'FOGSI Life Member', 'AMASI Life Member', 'AOGD Member',
  'ASI Member', '5.0 Google Rating', '1000+ Procedures', 'Fellowship in MAS',
  'DNB — Obstetrics & Gynaecology', 'IVF & Fertility Expert', 'Laparoscopic Surgeon', 'Indiranagar, Bangalore',
]

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => { observer.disconnect(); window.removeEventListener('scroll', onScroll) }
  }, [])

  return (
    <div style={{ backgroundColor: '#FAFAF8', color: '#1A2E28' }}>

      {/* ── NAV ── */}
      <header
        className="sticky top-0 z-50 transition-all duration-300"
        style={{ backgroundColor: scrolled ? 'rgba(250,250,248,0.96)' : 'rgba(250,250,248,0.92)', backdropFilter: 'blur(12px)', borderBottom: scrolled ? '1px solid #E3EDE9' : '1px solid transparent', boxShadow: scrolled ? '0 1px 20px rgba(44,82,73,0.06)' : 'none' }}
      >
        <nav className="max-w-7xl mx-auto px-5 lg:px-8 py-4 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3">
            <img src={IMG.logo} alt="Dr. Anjani Dixit" className="w-11 h-11 rounded-full object-cover" style={{ border: '2px solid #C4D9D1' }} />
            <div>
              <div className="font-semibold text-sm" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>Dr. Anjani Dixit</div>
              <div className="text-xs" style={{ color: '#7A9C90' }}>MBBS · DNB · FMAS</div>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-7 text-sm font-medium" style={{ color: '#3D6358' }}>
            {[['About', '#about'], ['Services', '#services'], ['Testimonials', '#testimonials'], ['FAQ', '#faq'], ['Contact', '#contact']].map(([label, href]) => (
              <a key={label} href={href} className="hover:opacity-60 transition-opacity">{label}</a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`https://wa.me/${CFG.whatsapp}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all hover:shadow-sm"
              style={{ borderColor: '#25D366', color: '#25D366' }}
            >
              <IconWhatsApp size="w-4 h-4" /> WhatsApp
            </a>
            <a
              href={CFG.booking}
              target="_blank" rel="noopener noreferrer"
              className="px-5 py-2 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg"
              style={{ backgroundColor: '#2C5249' }}
            >
              Book Consultation
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2"
            aria-label="Toggle menu"
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
            {[['About', '#about'], ['Services', '#services'], ['Testimonials', '#testimonials'], ['FAQ', '#faq'], ['Contact', '#contact']].map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)} className="block text-sm font-medium py-1" style={{ color: '#2C5249' }}>{label}</a>
            ))}
            <a href={CFG.booking} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}
              className="block w-full text-center text-white py-3 rounded-full text-sm font-semibold"
              style={{ backgroundColor: '#2C5249' }}>
              Book Consultation
            </a>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section id="home" style={{ background: 'linear-gradient(135deg, #f5f0e8 0%, #fafaf8 55%, #eef4f1 100%)' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-7"
                style={{ backgroundColor: '#E3EDE9', color: '#2C5249' }}
              >
                Indiranagar · Bangalore · Est. 2013
              </div>
              <h1
                className="text-4xl lg:text-[3.5rem] font-bold leading-none mb-5"
                style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28', lineHeight: 1.08 }}
              >
                Advanced Care.<br />
                <em className="font-normal not-italic" style={{ color: '#2C5249' }}>Deep Compassion.</em>
              </h1>
              <p className="text-lg leading-relaxed mb-3" style={{ color: '#4A6860', maxWidth: '440px' }}>
                Precision laparoscopic surgery and transformative fertility care — delivered by a doctor who truly sees you.
              </p>
              <p className="text-sm font-medium mb-8" style={{ color: '#7A9C90' }}>
                Dr. Anjani Dixit · MBBS · DNB (OBG) · FMAS · 12+ Years Experience
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <a
                  href={CFG.booking}
                  target="_blank" rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full font-semibold text-white text-center transition-all hover:shadow-xl hover:-translate-y-0.5 duration-200"
                  style={{ backgroundColor: '#2C5249' }}
                >
                  Book a Consultation
                </a>
                <a
                  href={`https://wa.me/${CFG.whatsapp}?text=Hi Dr. Anjani, I would like to book a consultation.`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-center transition-all hover:shadow-md duration-200 border-2"
                  style={{ borderColor: '#2C5249', color: '#2C5249' }}
                >
                  <IconWhatsApp size="w-5 h-5" /> Chat on WhatsApp
                </a>
              </div>

              <div className="flex items-center gap-3 pt-5" style={{ borderTop: '1px solid #D5E5DF' }}>
                <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <IconStar key={i} />)}</div>
                <span className="text-sm font-semibold" style={{ color: '#1A2E28' }}>5.0 on Google</span>
                <span className="text-sm" style={{ color: '#7A9C90' }}>· 347 verified reviews</span>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: '4/5', maxHeight: '580px' }}>
                <img
                  src={IMG.hero}
                  alt="Dr. Anjani Dixit — Laparoscopic Surgeon and IVF Specialist, Bangalore"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(26,46,40,0.18) 0%, transparent 50%)' }} />
              </div>
              <div
                className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl p-4"
                style={{ border: '1px solid #E3EDE9' }}
              >
                <div className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#2C5249' }}>1000+</div>
                <div className="text-xs font-medium mt-0.5" style={{ color: '#5A7870' }}>Successful procedures</div>
              </div>
              <div
                className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 text-right"
                style={{ border: '1px solid #E3EDE9' }}
              >
                <div className="text-xs font-semibold mb-1" style={{ color: '#7A9C90' }}>Member</div>
                <div className="text-xs font-bold" style={{ color: '#1A2E28' }}>FOGSI · AMASI · ASI</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="py-3.5 overflow-hidden" style={{ backgroundColor: '#2C5249', borderTop: '1px solid #1E3D34', borderBottom: '1px solid #1E3D34' }}>
        <div className="marquee-track">
          {[...Array(2)].map((_, outer) => (
            <span key={outer} className="flex items-center">
              {MARQUEE_ITEMS.map((item, i) => (
                <span key={i} className="flex items-center gap-6 text-xs font-medium whitespace-nowrap px-6" style={{ color: '#9ECEC0' }}>
                  {item}
                  <span style={{ color: '#3D6A5C' }}>✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS ── */}
      <section className="py-16 px-5 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { value: '12+', label: 'Years of Experience' },
            { value: '1000+', label: 'Procedures Performed' },
            { value: '5.0 ★', label: 'Google Rating' },
            { value: '347', label: 'Verified Reviews' },
          ].map((s, i) => (
            <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="text-3xl lg:text-4xl font-bold mb-1.5" style={{ fontFamily: 'Playfair Display, serif', color: '#2C5249' }}>{s.value}</div>
              <div className="text-sm" style={{ color: '#7A9C90' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY DR. ANJANI ── */}
      <section id="services" className="py-24 px-5 lg:px-8" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7A9C90' }}>The Difference</p>
            <h2 className="text-3xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>
              Why Patients Trust<br />Dr. Anjani
            </h2>
            <p className="text-base max-w-lg mx-auto" style={{ color: '#5A7870' }}>
              Surgical precision and compassionate presence — in equal measure.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <IconScalpel />,
                title: 'Surgical Excellence',
                body: 'Fellowship-trained in Minimal Access Surgery, Dr. Anjani performs complex laparoscopic procedures with precision and care — from hysterectomies to advanced endometriosis excision. Over 1000 successful procedures across 12+ years.',
              },
              {
                icon: <IconHeart />,
                title: 'Emotionally Present',
                body: 'Every consultation is unhurried, attentive, and deeply human. Dr. Anjani understands that behind every medical question is a woman navigating fear, hope, and vulnerability. You are heard here — always.',
              },
              {
                icon: <IconSun />,
                title: 'Holistically Minded',
                body: 'Dr. Anjani integrates her passion for meditation, emotional healing, and feminine wellbeing into her practice. She treats the whole woman — not just the diagnosis — supporting physical and emotional recovery together.',
              },
            ].map((p, i) => (
              <div key={i} className={`bg-white rounded-3xl p-8 reveal reveal-delay-${i + 1}`}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: '#E3EDE9', color: '#2C5249' }}>
                  {p.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>{p.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#5A7870' }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 px-5 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative reveal">
            <div className="rounded-3xl overflow-hidden shadow-xl" style={{ aspectRatio: '3/4', maxHeight: '580px' }}>
              <img src={IMG.about} alt="Dr. Anjani Dixit in consultation" className="w-full h-full object-cover" />
            </div>
            <blockquote
              className="absolute bottom-6 left-6 right-6 rounded-2xl p-5"
              style={{ backgroundColor: 'rgba(250,250,248,0.96)', backdropFilter: 'blur(10px)', boxShadow: '0 8px 32px rgba(44,82,73,0.12)' }}
            >
              <p className="text-sm font-medium italic leading-relaxed" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>
                "I became a doctor to understand women's health at its deepest — not just to treat symptoms, but to restore wholeness."
              </p>
              <footer className="mt-2 text-xs font-semibold" style={{ color: '#7A9C90' }}>— Dr. Anjani Dixit</footer>
            </blockquote>
          </div>

          <div className="reveal reveal-delay-2">
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#7A9C90' }}>About</p>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>
              A Surgeon Who Listens.<br />
              <em className="font-normal not-italic" style={{ color: '#2C5249' }}>A Doctor Who Cares.</em>
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: '#4A6860' }}>
              Dr. Anjani Dixit brings over 12 years of expertise as a laparoscopic gynecologic surgeon, IVF specialist, and obstetrician. Trained at IPGME&amp;R and SSKM Hospital, Kolkata, and Holy Family Hospital, New Delhi, she has dedicated her career to advancing women's reproductive health with both technical excellence and genuine compassion.
            </p>
            <p className="text-base leading-relaxed mb-8" style={{ color: '#4A6860' }}>
              A Fellowship in Minimal Access Surgery and a Reproductive Medicine certification from the Indian College of Obstetrics and Gynaecology underpin her surgical expertise. As a mother of two daughters who practises meditation and values emotional healing, she brings a profoundly personal understanding to every consultation.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { label: 'Qualification', value: 'MBBS · DNB · FMAS' },
                { label: 'Languages', value: 'English · Hindi · Kannada · Bengali' },
                { label: 'Memberships', value: 'FOGSI · AMASI · AOGD · ASI' },
                { label: 'Registration', value: CFG.license },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-2xl" style={{ backgroundColor: '#F5F0E8' }}>
                  <div className="text-xs font-semibold mb-1" style={{ color: '#7A9C90' }}>{item.label}</div>
                  <div className="text-sm font-medium" style={{ color: '#1A2E28' }}>{item.value}</div>
                </div>
              ))}
            </div>

            <a
              href={CFG.booking}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white transition-all hover:shadow-lg hover:-translate-y-0.5 duration-200"
              style={{ backgroundColor: '#2C5249' }}
            >
              Book a Consultation <IconArrow />
            </a>
          </div>
        </div>
      </section>

      {/* ── SPECIALTIES ── */}
      <section className="py-24 px-5 lg:px-8" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7A9C90' }}>Expertise</p>
            <h2 className="text-3xl lg:text-5xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>
              Areas of Specialisation
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Advanced Laparoscopic Surgery',
                tag: 'Laparoscopic Surgeon · Bangalore',
                desc: 'Minimally invasive surgical expertise for fibroids, endometriosis, ovarian cysts, hysterectomy, and complex pelvic pathology. Faster recovery, smaller incisions, and precision results from over 1000 procedures.',
                points: ['Laparoscopic Hysterectomy', 'Endometriosis Excision', 'Fibroid Removal (Myomectomy)', 'Ovarian Cyst Surgery', 'Diagnostic Laparoscopy'],
              },
              {
                title: 'IVF & Fertility Treatment',
                tag: 'IVF Specialist · Fertility Expert',
                desc: 'A compassionate, evidence-based approach to infertility — from thorough initial evaluation through IVF, IUI, and surgical fertility procedures. Honest guidance and emotional support at every step.',
                points: ['IVF & Embryo Transfer', 'IUI (Intrauterine Insemination)', 'Fertility Evaluation', 'Ovulation Induction', 'Surgical Fertility Treatment'],
              },
              {
                title: 'Obstetrics & Pregnancy Care',
                tag: 'Obstetrician · Bangalore',
                desc: 'Comprehensive antenatal and postnatal care with special expertise in high-risk pregnancies. Attentive, personalised monitoring for a safe, supported, and beautiful pregnancy journey.',
                points: ['High-Risk Pregnancy Management', 'Antenatal & Postnatal Care', 'PCOS & Pregnancy', 'Thyroid in Pregnancy', 'Normal & LSCS Delivery'],
              },
              {
                title: 'Gynecosmetic Procedures',
                tag: 'Gynecosmetic Expert · Bangalore',
                desc: 'Aesthetic and functional procedures for intimate feminine wellbeing — performed with the highest standards of safety, privacy, and compassionate care.',
                points: ['Vaginal Rejuvenation', 'Labial Corrections', 'Hymenoplasty', 'Perineal Repair', 'PRP Therapy'],
              },
            ].map((spec, i) => (
              <div key={i} className={`bg-white rounded-3xl p-8 reveal reveal-delay-${(i % 2) + 1}`}>
                <span
                  className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-5"
                  style={{ backgroundColor: '#E3EDE9', color: '#2C5249' }}
                >
                  {spec.tag}
                </span>
                <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>{spec.title}</h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: '#5A7870' }}>{spec.desc}</p>
                <ul className="space-y-2">
                  {spec.points.map((pt, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm" style={{ color: '#3D6358' }}>
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#2C5249' }} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONDITIONS ── */}
      <section className="py-24 px-5 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7A9C90' }}>Conditions Treated</p>
            <h2 className="text-3xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>
              Comprehensive Women's Health
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: '#5A7870' }}>
              From diagnosis to recovery, expert care across the full spectrum of women's reproductive health.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Endometriosis', tag: 'Surgery · Medical', desc: 'Advanced excision and pain management including deeply infiltrating endometriosis — with fertility preservation wherever possible.' },
              { title: 'Uterine Fibroids', tag: 'Surgery · Fertility', desc: 'Laparoscopic myomectomy and hysterectomy for symptomatic fibroids, tailored to your fertility and lifestyle goals.' },
              { title: 'PCOS', tag: 'Medical · Fertility', desc: 'Comprehensive PCOS management including hormonal regulation, metabolic support, and fertility-focused treatment plans.' },
              { title: 'Ovarian Cysts', tag: 'Surgery · Diagnosis', desc: 'Diagnostic and surgical management of simple, complex, and endometriotic ovarian cysts.' },
              { title: 'Infertility', tag: 'IVF · Fertility', desc: 'Complete fertility workup and treatment including IVF, IUI, and surgical correction of structural causes.' },
              { title: 'Abnormal Bleeding', tag: 'Medical · Surgery', desc: 'Thorough evaluation and targeted treatment of heavy, irregular, or absent menstrual bleeding.' },
              { title: 'Chronic Pelvic Pain', tag: 'Diagnosis · Surgery', desc: 'Investigation and laparoscopic relief of chronic pelvic pain — finding the root cause, not just managing symptoms.' },
              { title: 'Cervical Conditions', tag: 'Screening · Surgery', desc: 'Colposcopy, cervical polyp removal, and management of abnormal Pap smears and cervical pathology.' },
            ].map((c, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-md reveal"
                style={{ borderColor: '#E3EDE9', transitionDelay: `${(i % 4) * 0.06}s` }}
              >
                <div
                  className="text-xs font-medium mb-3 px-2.5 py-1 rounded-md inline-block"
                  style={{ backgroundColor: '#F5F0E8', color: '#7A9C90' }}
                >
                  {c.tag}
                </div>
                <h3 className="font-semibold mb-2 text-sm" style={{ color: '#1A2E28' }}>{c.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#6A8E82' }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PATIENT JOURNEY ── */}
      <section className="py-24 px-5 lg:px-8" style={{ backgroundColor: '#2C5249' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7AB8A8' }}>Your Journey</p>
            <h2 className="text-3xl lg:text-5xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
              From First Consultation<br />
              <em className="font-normal not-italic" style={{ color: '#9ECEC0' }}>to Full Recovery</em>
            </h2>
          </div>

          <div>
            {[
              { step: '01', title: 'Your First Consultation', desc: 'An unhurried, attentive conversation about your health history, concerns, and goals. Dr. Anjani listens completely before offering any diagnosis or recommendation.' },
              { step: '02', title: 'Personalised Diagnosis', desc: 'A tailored diagnostic workup — investigations, imaging, and specialist review — with clear, honest explanation of every finding in language you understand.' },
              { step: '03', title: 'Your Treatment Plan', desc: 'A collaborative plan that considers your medical needs, lifestyle, fertility goals, and emotional readiness. You are always involved in the decision — never a passive recipient.' },
              { step: '04', title: 'Expert Treatment', desc: 'Whether surgical or medical, your treatment is delivered with technical excellence, the latest minimally invasive techniques, and meticulous attention to safety and comfort.' },
              { step: '05', title: 'Recovery & Ongoing Support', desc: 'Dr. Anjani remains closely involved post-treatment — monitoring recovery, adjusting care as needed, and supporting your return to full health and wellbeing.' },
            ].map((s, i) => (
              <div
                key={i}
                className={`flex gap-8 items-start py-8 reveal reveal-delay-${(i % 3) + 1}`}
                style={{ borderBottom: i < 4 ? '1px solid #3D6A5C' : 'none' }}
              >
                <div className="text-3xl font-bold w-12 flex-shrink-0 text-right" style={{ fontFamily: 'Playfair Display, serif', color: '#4A7A6A' }}>{s.step}</div>
                <div>
                  <h3 className="font-semibold text-white mb-1.5">{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#9ECEC0' }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section className="py-24 px-5 lg:px-8" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="max-w-4xl mx-auto text-center reveal">
          <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#7A9C90' }}>Philosophy</p>
          <h2 className="text-3xl lg:text-5xl font-bold mb-8" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>
            Medicine That Honours<br />
            <em className="font-normal not-italic" style={{ color: '#2C5249' }}>The Whole Woman</em>
          </h2>
          <p className="text-lg leading-relaxed mb-6" style={{ color: '#4A6860' }}>
            Dr. Anjani's practice is grounded in a belief that women's health is inseparable from women's wellbeing — emotional, psychological, and spiritual, not just physical. Inspired by her personal interest in meditation and feminine healing, she creates a consultation space where patients feel genuinely safe.
          </p>
          <p className="text-base leading-relaxed" style={{ color: '#6A8E82', maxWidth: '600px', margin: '0 auto' }}>
            As a mother of two daughters, she brings both clinical precision and the lived experience of womanhood to every conversation. Her patients are not cases — they are whole human beings on deeply personal journeys, and she treats them accordingly.
          </p>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="py-24 px-5 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7A9C90' }}>Patient Stories</p>
            <h2 className="text-3xl lg:text-5xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>
              In Their Own Words
            </h2>
            <p className="text-sm" style={{ color: '#7A9C90' }}>Verified Google reviews · Last updated May 2026</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className={`rounded-3xl p-6 flex flex-col reveal reveal-delay-${(i % 3) + 1}`}
                style={{ backgroundColor: '#FAFAF8', border: '1px solid #E3EDE9' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={t.img}
                    alt={t.name}
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-full object-cover flex-shrink-0"
                    onError={e => {
                      e.currentTarget.style.display = 'none'
                      e.currentTarget.nextElementSibling.style.display = 'flex'
                    }}
                  />
                  <div
                    className="w-11 h-11 rounded-full flex-shrink-0 items-center justify-center text-sm font-semibold"
                    style={{ display: 'none', backgroundColor: '#E3EDE9', color: '#2C5249' }}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate" style={{ color: '#1A2E28' }}>{t.name}</div>
                    <div className="text-xs truncate" style={{ color: '#7A9C90' }}>{t.condition}</div>
                  </div>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-4 h-4 flex-shrink-0" />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-0.5">{[...Array(5)].map((_, j) => <IconStar key={j} />)}</div>
                  <span className="text-xs" style={{ color: '#7A9C90' }}>{t.date}</span>
                </div>
                <p className="text-sm leading-relaxed flex-1" style={{ color: '#4A6860' }}>"{t.review}"</p>
              </div>
            ))}
          </div>

          <div className="text-center reveal">
            <a
              href={CFG.maps}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm border transition-all hover:shadow-md duration-200"
              style={{ borderColor: '#2C5249', color: '#2C5249' }}
            >
              View All 347 Google Reviews <IconArrow />
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 px-5 lg:px-8" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7A9C90' }}>Common Questions</p>
            <h2 className="text-3xl lg:text-4xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden reveal"
                style={{ transitionDelay: `${i * 0.04}s` }}
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="font-medium text-sm pr-4 leading-snug" style={{ color: '#1A2E28' }}>{faq.q}</span>
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300"
                    style={{ backgroundColor: '#E3EDE9', color: '#2C5249', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>
                <div className={`faq-answer ${openFaq === i ? 'open' : ''}`}>
                  <p className="px-6 pb-6 text-sm leading-relaxed" style={{ color: '#5A7870' }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 px-5 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7A9C90' }}>Connect</p>
            <h2 className="text-3xl lg:text-4xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>
              Begin Your Journey to Wellbeing
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="reveal">
              <div className="space-y-5 mb-8">
                {[
                  { icon: <IconPin />, label: 'Clinic', content: <a href={CFG.maps} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline" style={{ color: '#1A2E28' }}>{CFG.clinic}<br />{CFG.address}</a> },
                  { icon: <IconPhone />, label: 'Phone', content: <a href={`tel:${CFG.phone}`} className="text-sm font-semibold hover:underline" style={{ color: '#2C5249' }}>{CFG.phoneDisplay}</a> },
                  { icon: <IconMail />, label: 'Email', content: <a href={`mailto:${CFG.email}`} className="text-sm font-semibold hover:underline" style={{ color: '#2C5249' }}>{CFG.email}</a> },
                ].map(({ icon, label, content }, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#E3EDE9', color: '#2C5249' }}>{icon}</div>
                    <div>
                      <div className="text-xs font-semibold mb-1" style={{ color: '#7A9C90' }}>{label}</div>
                      {content}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                {[
                  { href: CFG.linkedin, label: 'LinkedIn', icon: <IconLinkedIn /> },
                  { href: CFG.facebook, label: 'Facebook', icon: <IconFacebook /> },
                  { href: CFG.youtube, label: 'YouTube', icon: <IconYouTube /> },
                ].map(({ href, label, icon }) => (
                  <a
                    key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:-translate-y-0.5 hover:shadow-md duration-200"
                    style={{ backgroundColor: '#E3EDE9', color: '#2C5249' }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-3xl p-8 reveal reveal-delay-2" style={{ border: '1px solid #E3EDE9', backgroundColor: '#FAFAF8' }}>
              <h3 className="text-xl font-semibold mb-1" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>Book a Consultation</h3>
              <p className="text-sm mb-6" style={{ color: '#7A9C90' }}>In-person and video consultations available · Mon–Sat, 9 AM – 7 PM</p>

              <a
                href={CFG.booking} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center w-full py-4 rounded-2xl text-sm font-semibold text-white mb-3 transition-all hover:shadow-lg hover:opacity-95 duration-200"
                style={{ backgroundColor: '#2C5249' }}
              >
                Book via Appointment Form
              </a>
              <a
                href={CFG.practo} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center w-full py-4 rounded-2xl text-sm font-medium mb-3 border transition-all hover:shadow-sm duration-200"
                style={{ borderColor: '#C4D9D1', color: '#2C5249' }}
              >
                Book on Practo
              </a>
              <a
                href={`https://wa.me/${CFG.whatsapp}?text=Hi Dr. Anjani, I would like to book a consultation.`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-sm font-medium border transition-all hover:shadow-sm duration-200"
                style={{ borderColor: '#25D366', color: '#25D366' }}
              >
                <IconWhatsApp size="w-4 h-4" /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-16 px-5 lg:px-8" style={{ backgroundColor: '#1A2E28' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={IMG.logo} alt="Dr. Anjani Dixit" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-white text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>Dr. Anjani Dixit</div>
                  <div className="text-xs" style={{ color: '#5A8070' }}>MBBS · DNB · FMAS</div>
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#5A8070' }}>
                Advanced laparoscopic surgery and compassionate fertility care in Indiranagar, Bangalore. Twelve years of excellence in women's health.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Specialities</h4>
              <ul className="space-y-2 text-sm" style={{ color: '#5A8070' }}>
                {['Laparoscopic Surgery', 'IVF & Fertility Treatment', 'Obstetrics & Pregnancy Care', 'PCOS Management', 'Endometriosis Treatment', 'Gynecosmetic Procedures'].map(s => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
              <address className="not-italic space-y-2 text-sm" style={{ color: '#5A8070' }}>
                <p>{CFG.clinic}</p>
                <p>{CFG.address}</p>
                <a href={`tel:${CFG.phone}`} className="block transition-colors hover:text-white">{CFG.phoneDisplay}</a>
                <a href={`mailto:${CFG.email}`} className="block transition-colors hover:text-white">{CFG.email}</a>
              </address>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs" style={{ borderTop: '1px solid #243D35', color: '#3D6A5C' }}>
            <p>© 2026 Dr. Anjani Dixit · All rights reserved · Reg. {CFG.license}</p>
            <div className="flex gap-5">
              {[['LinkedIn', CFG.linkedin], ['Facebook', CFG.facebook], ['YouTube', CFG.youtube], ['Practo', CFG.practo]].map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">{label}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── FLOATING WHATSAPP ── */}
      <a
        href={`https://wa.me/${CFG.whatsapp}?text=Hi Dr. Anjani, I would like to book a consultation.`}
        target="_blank" rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed z-50 flex items-center justify-center rounded-full shadow-xl transition-transform hover:scale-110 duration-200"
        style={{ bottom: '5.5rem', right: '1.5rem', width: '56px', height: '56px', backgroundColor: '#25D366' }}
      >
        <IconWhatsApp size="w-7 h-7" />
      </a>

      {/* ── MOBILE STICKY CTA ── */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-4 py-3"
        style={{ backgroundColor: 'rgba(250,250,248,0.97)', backdropFilter: 'blur(10px)', borderTop: '1px solid #E3EDE9' }}
      >
        <a
          href={CFG.booking} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center w-full py-3.5 rounded-full text-sm font-semibold text-white"
          style={{ backgroundColor: '#2C5249' }}
        >
          Book a Consultation
        </a>
      </div>

    </div>
  )
}
