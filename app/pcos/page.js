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

const IconPhone = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
)

const FAQS = [
  { q: 'What is PCOS / PCOD and how do I know if I have it?', a: 'PCOS (Polycystic Ovary Syndrome) is a hormonal condition affecting ovulation. It is diagnosed when at least two of three criteria are present: irregular or absent periods, elevated androgen hormones (causing acne, excess hair), and polycystic ovaries on ultrasound. A blood test and scan are all that is needed to confirm the diagnosis.' },
  { q: 'Can PCOS be cured?', a: 'PCOS cannot be cured but it can be very effectively managed. With the right combination of lifestyle changes, medication, and monitoring, most women with PCOS achieve regular cycles, improved hormonal balance, clear skin, healthy weight, and — when desired — successful pregnancy.' },
  { q: 'Does PCOS mean I cannot get pregnant?', a: 'No. PCOS is a leading cause of infertility but it is also one of the most treatable. Many women with PCOS conceive naturally with lifestyle modification alone. Others require ovulation induction or IVF. Dr. Anjani will assess your specific situation and recommend the most appropriate path.' },
  { q: 'What is the treatment for PCOS?', a: 'Treatment is tailored to your goals. For cycle regulation: lifestyle changes, metformin, or hormonal therapy. For acne/hair: anti-androgens and targeted skincare advice. For fertility: ovulation induction, IUI, or IVF. Dr. Anjani integrates all aspects of your health — not just one symptom.' },
  { q: 'How does weight affect PCOS?', a: 'Even a 5–10% reduction in body weight in women with overweight-related PCOS can significantly restore ovulation and improve hormonal balance. However, PCOS also exists in lean women — weight is not the only factor, and Dr. Anjani avoids a one-size-fits-all approach.' },
  { q: 'What tests will I need?', a: 'Typically: hormonal blood tests (LH, FSH, AMH, testosterone, insulin, thyroid), a pelvic ultrasound, and sometimes a glucose tolerance test. Dr. Anjani reviews all results with you at your follow-up and explains exactly what each finding means for your health and treatment.' },
]

export default function PCOSPage() {
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
              PCOS / PCOD Specialist · Indiranagar · Bangalore
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-5"
              style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28', lineHeight: 1.1 }}>
              PCOS Treatment<br />
              <em className="font-normal not-italic" style={{ color: '#2C5249' }}>in Bangalore</em>
            </h1>
            <p className="text-lg leading-relaxed mb-4" style={{ color: '#4A6860', maxWidth: '480px' }}>
              Comprehensive, personalised management for PCOS and PCOD — addressing irregular periods, hormonal imbalance, weight, acne, and fertility with a holistic, evidence-based approach.
            </p>
            <p className="text-sm font-medium mb-8" style={{ color: '#7A9C90' }}>
              12+ years experience · IVF & Fertility Certified · FOGSI Life Member
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a href={CFG.booking} onClick={() => track('ads_conversion_Contact_Us_1')} target="_blank" rel="noopener noreferrer"
                className="px-8 py-4 rounded-full font-semibold text-white text-center hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#2C5249' }}>
                Book a Consultation
              </a>
              <a onClick={() => track('whatsapp_click')} href={`https://wa.me/${CFG.whatsapp}?text=Hi Dr. Anjani, I would like to consult about PCOS treatment.`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold border-2 hover:shadow-md transition-shadow"
                style={{ borderColor: '#25D366', color: '#25D366' }}>
                <IconWhatsApp /> WhatsApp Us
              </a>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">            {[
              { name: 'Sandra Gerard', condition: 'PCOD Treatment', img: 'https://lh3.googleusercontent.com/a-/ALV-UjWPvR1UHnpPQDFkcQ9EQcHv0n3rPBE_P4kILflUfE2F4cP85vvd=s120-c-rp-mo-br100', review: 'Visited Dr. Anjani regarding PCOD and the doctor was very helpful in explaining every minute detail and helped me regulating my periods. I felt completely understood and supported throughout — would absolutely recommend to anyone dealing with hormonal issues.' },
              { name: 'Muneerah Khan', condition: 'Ongoing Gynaecological Care', img: '/reviewers/muneerah-khan.jpg', review: 'I have known Dr. Anjani for the past 5 years. Her consultation skills, knowledge, and expertise in her domain are excellent. I have consulted her multiple times and I am really happy to have found such a wonderful gynaecologist who I can be open about my health issues with and get the right guidance. Thank you Doctor for diagnosing and helping me.' },
              { name: 'AB Way', condition: 'Gynaecological Care', img: '/reviewers/ab-way.jpg', review: 'I had an exceptional experience with Dr. Anjani Dixit! She is truly an outstanding gynaecologist, with a warm and caring demeanour that immediately puts you at ease. Her expertise and knowledge in her field are evident in the way she listens attentively to your concerns, answers questions clearly, and provides personalised care. Her dedication to her patients\' well-being is genuinely inspiring.' },
            ].map((_, i) => <IconStar key={i} />)}</div>
              <span className="text-sm font-semibold" style={{ color: '#1A2E28' }}>5.0 on Google</span>
              <span className="text-sm" style={{ color: '#7A9C90' }}>· 347 reviews</span>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: '4/5', maxHeight: '520px' }}>
            <img src={IMG.hero} alt="Dr. Anjani Dixit – PCOS Specialist Bangalore"
              className="w-full h-full object-cover object-top" />
          </div>
        </div>
      </section>

      {/* SYMPTOMS */}
      <section className="py-16 px-5 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7A9C90' }}>Recognise PCOS</p>
            <h2 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>
              Common Signs & Symptoms
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { sym: 'Irregular or missed periods', icon: '🗓' },
              { sym: 'Difficulty getting pregnant', icon: '🌱' },
              { sym: 'Excess facial or body hair', icon: '✦' },
              { sym: 'Persistent acne or oily skin', icon: '✦' },
              { sym: 'Unexplained weight gain', icon: '✦' },
              { sym: 'Thinning hair or hair loss', icon: '✦' },
              { sym: 'Mood changes or anxiety', icon: '✦' },
              { sym: 'Pelvic pain or discomfort', icon: '✦' },
            ].map((s, i) => (
              <div key={i} className="p-4 rounded-2xl text-center" style={{ backgroundColor: '#F5F0E8' }}>
                <p className="text-sm font-medium" style={{ color: '#1A2E28' }}>{s.sym}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm mt-6" style={{ color: '#7A9C90' }}>
            You do not need all symptoms to have PCOS. A proper diagnosis requires only a consultation, blood tests, and an ultrasound.
          </p>
        </div>
      </section>

      {/* TREATMENT AREAS */}
      <section className="py-20 px-5" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7A9C90' }}>How We Help</p>
            <h2 className="text-3xl lg:text-4xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>
              A Complete PCOS Care Plan
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: 'Cycle Regulation', desc: 'Restoring regular menstrual cycles through hormonal therapy, metformin, or ovulation-inducing medications — tailored to whether you are seeking contraception, cycle control, or fertility.' },
              { title: 'Hormonal Balance', desc: 'Addressing elevated androgens that cause acne, excess hair (hirsutism), and hair loss through targeted medication, with regular monitoring to track improvement.' },
              { title: 'Metabolic Management', desc: 'Insulin resistance is a core driver of PCOS. Dr. Anjani integrates dietary guidance, metformin, and lifestyle coaching to address the root metabolic cause — not just the symptoms.' },
              { title: 'Fertility with PCOS', desc: 'For women trying to conceive, ovulation induction is often highly effective. Dr. Anjani manages the full journey from diagnosis through to IUI or IVF if required, with close monitoring.' },
              { title: 'Long-Term Monitoring', desc: 'PCOS raises long-term risks for diabetes, thyroid disorders, and endometrial changes. Regular monitoring and screening are built into the care plan.' },
              { title: 'Emotional Wellbeing', desc: 'PCOS affects more than hormones — it affects confidence, self-image, and mental health. Dr. Anjani creates a space where all of this is acknowledged and supported.' },
            ].map((c, i) => (
              <div key={i} className="bg-white rounded-2xl p-6">
                <h3 className="font-semibold text-base mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>{c.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#5A7870' }}>{c.desc}</p>
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
              PCOS — Frequently Asked Questions
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
            Take the First Step
          </h2>
          <p className="mb-8 text-base" style={{ color: '#9ECEC0' }}>
            A single consultation is all it takes to get clear answers about your PCOS and a plan tailored to you.
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

      <a onClick={() => track('whatsapp_click')} href={`https://wa.me/${CFG.whatsapp}?text=Hi Dr. Anjani, I would like to consult about PCOS treatment.`}
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
