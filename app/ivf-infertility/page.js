'use client'

import { useState } from 'react'

const CFG = {
  phone: '7411722580',
  phoneDisplay: '+91 74117 22580',
  whatsapp: '917411722580',
  booking: 'https://meet-my-doctor.firebaseapp.com/#/?uid=47150&eid=38605',
}

const track = (e) => window.gtag?.('event', e)

const IMG = {
  logo: 'https://www.anjanidixit.com/image.webp',
  hero: 'https://www.anjanidixit.com/IMG-20251024-WA0023.jpg',
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

export default function IVFInfertilityPage() {
  const [openFaq, setOpenFaq] = useState(null)

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
          <div className="flex items-center gap-3">
            <a href={`tel:${CFG.phone}`} onClick={() => track('conversion_event_phone_call_lead_1')} className="hidden sm:flex items-center gap-1.5 text-sm font-medium" style={{ color: '#2C5249' }}>
              <IconPhone /> {CFG.phoneDisplay}
            </a>
            <a href={CFG.booking} onClick={() => track('ads_conversion_Contact_Us_1')} target="_blank" rel="noopener noreferrer"
              className="px-5 py-2 rounded-full text-sm font-semibold text-white"
              style={{ backgroundColor: '#2C5249' }}>
              Book Consultation
            </a>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #f5f0e8 0%, #fafaf8 55%, #eef4f1 100%)' }}>
        <div className="max-w-6xl mx-auto px-5 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
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
              Reproductive Medicine Certification · ICOG · 12+ years experience
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a href={CFG.booking} onClick={() => track('ads_conversion_Contact_Us_1')} target="_blank" rel="noopener noreferrer"
                className="px-8 py-4 rounded-full font-semibold text-white text-center hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#2C5249' }}>
                Book a Consultation
              </a>
              <a onClick={() => track('whatsapp_click')} href={`https://wa.me/${CFG.whatsapp}?text=Hi Dr. Anjani, I would like to discuss fertility treatment options.`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold border-2 hover:shadow-md transition-shadow"
                style={{ borderColor: '#25D366', color: '#25D366' }}>
                <IconWhatsApp /> WhatsApp Us
              </a>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">            {[
              { name: 'B. Naga', condition: 'IVF Treatment', img: '/reviewers/b-naga.jpg', review: 'We are immensely grateful to Dr. Anjani Dixit for her exceptional support and expertise throughout our IVF journey. Dr. Dixit is not only an outstanding IVF specialist with extensive experience, but she is also a compassionate and empathetic doctor who truly cares for her patients. Thanks to her unwavering dedication, our IVF treatment was successful, and we are now the proud parents of a healthy baby girl. Thank you, Dr. Dixit, for making our dream of becoming parents come true.' },
              { name: 'Akanksha Sachdeva', condition: 'Gynaecological Care', img: '/reviewers/akanksha-sachdeva.jpg', review: 'I am beyond grateful for the exceptional care I received from Dr. Anjani. From the moment I walked in, I felt welcomed and truly cared for. She took the time to listen to my concerns and thoroughly explained every aspect of my care. What sets Dr. Anjani apart is her holistic approach — she not only addressed my medical needs but also made sure I felt comfortable and supported throughout the entire process. I always felt like I was in the best possible hands.' },
              { name: 'Jaydeep H. Padariya', condition: 'Gynaecological Care', img: '/reviewers/jaydeep-padariya.jpg', review: 'Dr. Anjani Dixit is an exceptionally knowledgeable gynaecologist. She has always been thorough in her explanations and ensures that every question is answered with patience and clarity. Her calm and composed demeanour instantly puts you at ease, especially during moments that can be overwhelming. She takes the time to listen, provides thoughtful responses, and never rushes through appointments. I always leave her office feeling confident and reassured.' },
            ].map((_, i) => <IconStar key={i} />)}</div>
              <span className="text-sm font-semibold" style={{ color: '#1A2E28' }}>5.0 on Google</span>
              <span className="text-sm" style={{ color: '#7A9C90' }}>· 347 reviews</span>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: '4/5', maxHeight: '520px' }}>
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
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { name: 'Baidyanath Sinha', condition: 'Pregnancy Care', img: 'https://lh3.googleusercontent.com/a-/ALV-UjUUdzLFKPeVX2_bJ2jHhewapprBgjvVebSSDec=s120-c-rp-mo-br100', review: 'Dr. Anjani Dixit is truly exceptional. Her expertise, warmth, and genuine care made my wife\'s pregnancy journey smooth, safe, and beautiful. She listens patiently, explains everything clearly. What sets her apart is how she treats you as a person, not just a patient.' },
              { name: 'Riya Jati', condition: 'Endometriosis & Fibroids', img: 'https://lh3.googleusercontent.com/a/ACg8ocLTyhWPsfGLFr5GFNcONZ4lkvTb5AC5H-0aeV4z=s120-c-rp-mo-br100', review: 'Suffering from lower back pain due to endometriosis cyst and multiple fibroids, I am extremely thankful — Madam demonstrated everything very politely. She has very polished surgical hands and exceptional expertise in minimally invasive procedures.' },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6" style={{ border: '1px solid #E3EDE9' }}>
                <div className="flex items-center gap-3 mb-4">
                  <img src={t.img} alt={t.name} referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling.style.display = 'flex' }} />
                  <div className="w-10 h-10 rounded-full flex-shrink-0 items-center justify-center text-sm font-semibold"
                    style={{ display: 'none', backgroundColor: '#E3EDE9', color: '#2C5249' }}>{t.name.charAt(0)}</div>
                  <div>
                    <div className="font-semibold text-sm" style={{ color: '#1A2E28' }}>{t.name}</div>
                    <div className="text-xs" style={{ color: '#7A9C90' }}>{t.condition}</div>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">{[...Array(5)].map((_, j) => <IconStar key={j} />)}</div>
                <p className="text-sm leading-relaxed" style={{ color: '#4A6860' }}>"{t.review}"</p>
              </div>
            ))}
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
            <a href={CFG.booking} onClick={() => track('ads_conversion_Contact_Us_1')} target="_blank" rel="noopener noreferrer"
              className="px-8 py-4 rounded-full font-semibold text-center bg-white hover:bg-gray-50 transition-colors"
              style={{ color: '#2C5249' }}>
              Book a Consultation
            </a>
            <a href={`tel:${CFG.phone}`} onClick={() => track('conversion_event_phone_call_lead_1')}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold border-2 text-white hover:bg-white/10 transition-colors"
              style={{ borderColor: 'rgba(255,255,255,0.4)' }}>
              <IconPhone /> {CFG.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <footer className="py-8 px-5 text-center text-xs" style={{ backgroundColor: '#1A2E28', color: '#3D6A5C' }}>
        <p>© 2026 Dr. Anjani Dixit · Kasper Multi-Speciality Clinic · 31, 80 Feet Rd, Indiranagar, Bengaluru 560038</p>
        <a href="/" className="mt-2 inline-block hover:text-white transition-colors">← Back to main site</a>
      </footer>

      <a onClick={() => track('whatsapp_click')} href={`https://wa.me/${CFG.whatsapp}?text=Hi Dr. Anjani, I would like to discuss fertility treatment options.`}
        target="_blank" rel="noopener noreferrer"
        className="fixed z-50 flex items-center justify-center rounded-full shadow-xl"
        style={{ bottom: '5.5rem', right: '1.5rem', width: '56px', height: '56px', backgroundColor: '#25D366' }}>
        <IconWhatsApp />
      </a>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-4 py-3"
        style={{ backgroundColor: 'rgba(250,250,248,0.97)', backdropFilter: 'blur(10px)', borderTop: '1px solid #E3EDE9' }}>
        <a href={CFG.booking} onClick={() => track('ads_conversion_Contact_Us_1')} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center w-full py-3.5 rounded-full text-sm font-semibold text-white"
          style={{ backgroundColor: '#2C5249' }}>
          Book a Consultation
        </a>
      </div>
    </div>
  )
}
