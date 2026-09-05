'use client'

import { useState, useEffect } from 'react'
import { trackBooking, trackWhatsApp, trackCall } from '../lib/attribution'
import StickyActionBar from '../components/StickyActionBar'
import { waHref } from '../lib/whatsapp'
import PracticeLocations from '../components/PracticeLocations'
import RelatedServices from '../components/RelatedServices'
import MobileMore from '../components/MobileMore'
import PhotoGallery from '../components/PhotoGallery'
import { ReviewGrid } from '../components/ReviewCard'
import { SURGERY_GALLERY } from '../lib/gallery'
import { HYSTERECTOMY_REVIEWS, REVIEW_STATS } from '../lib/reviews'
import { FAQS } from './faqs'

const CFG = {
  phone: '7411722580',
  phoneDisplay: '+91 74117 22580',
  booking: 'https://meet-my-doctor.firebaseapp.com/#/?uid=47150&eid=38605',
  maps: 'https://maps.app.goo.gl/8MKPqCCGujp34cXe7',
}

const IMG = {
  logo: '/Photos/Anjani%20website/Anjani%20Prityn%20DP.png',
  hero: '/IMG-20251024-WA0023.jpg',
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

const NAV_LINKS = [
  ['Home', '/'],
  ['Laparoscopic Surgery', '/laparoscopic-surgery'],
  ['IVF & Fertility', '/ivf-infertility'],
  ['Pregnancy Care', '/pregnancy'],
  ['PCOS Treatment', '/pcos'],
]

// The conditions that genuinely lead to a hysterectomy, in the words women
// arrive with rather than the words on the operation note.
const REASONS = [
  {
    title: 'Fibroids that have outgrown the alternatives',
    desc: 'Bleeding through pads in an hour, a stomach that looks pregnant, pressure on the bladder. When fibroids are very large or too numerous to shell out one by one, and your family is complete, removing the uterus solves the problem in one operation instead of several.',
  },
  {
    title: 'Adenomyosis',
    desc: 'The lining grows into the muscle of the uterus, which becomes boggy, heavy and painful. It rarely shows on a scan as clearly as fibroids do, it does not respond well to surgery that keeps the uterus, and hysterectomy is the only definitive cure.',
  },
  {
    title: 'Bleeding that will not settle',
    desc: 'Periods lasting ten days, flooding, clots, an iron level that will not come up whatever you take. If medication, a hormonal IUD and an ablation have been tried honestly and failed, continuing to bleed is not a neutral option — anaemia has its own cost.',
  },
  {
    title: 'Severe endometriosis',
    desc: 'Where disease has scarred the pelvis and pain has not been controlled by excision surgery or medical treatment. Worth knowing: removing the uterus alone does not cure endometriosis — the disease sits outside it, and the operation has to address that too.',
  },
  {
    title: 'Prolapse',
    desc: 'A uterus that has descended, with dragging, a visible bulge, or difficulty emptying the bladder or bowel. Physiotherapy and a pessary come first; when they are not enough, prolapse surgery — sometimes with hysterectomy, sometimes without — is the repair.',
  },
  {
    title: 'Precancer or cancer',
    desc: 'Complex hyperplasia with atypia in the lining, or a confirmed cancer of the uterus, cervix or ovary. Here the operation is not a choice among options — it is the treatment, and the conversation moves to how and how quickly rather than whether.',
  },
]

// The uterus-preserving options that should have been discussed before anyone
// offers surgery. This section is the reason the page exists.
const ALTERNATIVES = [
  {
    title: 'A hormonal IUD',
    desc: 'The small coil that releases progestogen inside the uterus. It cuts heavy bleeding substantially for most women, often to spotting or nothing, and it treats adenomyosis pain. Fitted in the clinic in a few minutes, reversible, and lasts around five years.',
  },
  {
    title: 'Medication',
    desc: 'Tranexamic acid taken during periods, anti-inflammatories, or hormonal treatment. Unglamorous, cheap, and enough on its own for a good number of women — particularly when the uterus itself is structurally normal.',
  },
  {
    title: 'Endometrial ablation',
    desc: 'A day-care procedure that removes the lining of the uterus so it can no longer build up and bleed heavily. Suitable when the uterus is close to normal size and your family is complete. No incisions, back to normal within days.',
  },
  {
    title: 'Myomectomy',
    desc: 'The fibroids come out, the uterus stays. Done by keyhole surgery, or hysteroscopically through the cervix with no incision at all when the fibroid sits in the cavity. This is the operation to ask about if you may still want a pregnancy.',
  },
  {
    title: 'Uterine artery embolisation',
    desc: 'An interventional radiologist blocks the fibroids’ blood supply so they shrink. No surgery, but not for everyone — and not the first choice if fertility matters, which is exactly the sort of nuance that should be talked through rather than glossed over.',
  },
  {
    title: 'Prolapse repair without removal',
    desc: 'A prolapsed uterus can often be supported and repaired rather than removed, and a pessary is a genuine long-term option for women who would rather avoid surgery altogether.',
  },
]

const RECOVERY = [
  {
    when: 'Day of surgery',
    what: 'You will be walked to the bathroom the same evening. The catheter comes out the next morning. Pain is usually managed with ordinary painkillers rather than anything dramatic; the strangest part for most women is trapped gas from the keyhole surgery, felt as an ache in the shoulder tip.',
  },
  {
    when: 'Day 1–2',
    what: 'Home, after one or two nights. You will be eating normally and walking around the house. Someone should be with you for the first few days — not for emergencies, but so you are not carrying anything or standing at a stove.',
  },
  {
    when: 'Week 1',
    what: 'Tired in a way that surprises people who have had other surgery. Short, frequent walks, several a day. Light vaginal bleeding or brown discharge is expected and can come and go for a few weeks.',
  },
  {
    when: 'Weeks 2–3',
    what: 'Desk work becomes realistic, from home first if you can. Driving once you can brake hard without hesitating and are off strong painkillers. Stitches, if any, have dissolved or been removed.',
  },
  {
    when: 'Weeks 4–6',
    what: 'Energy is largely back. Still no heavy lifting, no gym, no intercourse — the top of the vagina is healing internally and that is the one thing that cannot be rushed. Review at six weeks, and this is the appointment where restrictions get lifted.',
  },
  {
    when: '3 months',
    what: 'Full internal healing, though you will have felt normal long before. Exercise, travel, lifting, everything back on the table.',
  },
]

export default function HysterectomyPage() {
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
        <div className="max-w-6xl mx-auto px-5 py-10 lg:py-20 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
              style={{ backgroundColor: '#E3EDE9', color: '#2C5249' }}>
              Hysterectomy · Indiranagar · Bangalore
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-5"
              style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28', lineHeight: 1.1 }}>
              Hysterectomy<br />
              <em className="font-normal not-italic" style={{ color: '#2C5249' }}>in Bangalore</em>
            </h1>
            <p className="text-lg leading-relaxed mb-4" style={{ color: '#4A6860', maxWidth: '500px' }}>
              For some women a hysterectomy ends years of bleeding and pain in a single operation. For others it is offered before anything simpler has been properly tried. The first job of a consultation is to work out which of the two you are.
            </p>
            <p className="text-sm font-medium mb-8" style={{ color: '#7A9C90' }}>
              Dr. Anjani Dixit · MBBS, DNB, FMAS · Laparoscopic surgeon · 14+ years
            </p>
            <div data-hero-cta className="flex flex-col sm:flex-row gap-3 mb-8">
              <a href={CFG.booking} onClick={() => trackBooking('ads_conversion_Contact_Us_1')} target="_blank" rel="noopener noreferrer"
                className="px-8 py-4 rounded-full font-semibold text-white text-center hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#2C5249' }}>
                Book a Consultation
              </a>
              <a onClick={() => trackWhatsApp()} href={waHref('hysterectomy', 'hero')}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold border-2 hover:shadow-md transition-shadow"
                style={{ borderColor: '#25D366', color: '#25D366' }}>
                <IconWhatsApp /> Send Your Reports
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <IconStar key={i} />)}</div>
              <a href={CFG.maps} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold hover:underline" style={{ color: '#1A2E28' }}>5.0 on Google</a>
              <span className="text-sm" style={{ color: '#7A9C90' }}>· {REVIEW_STATS.total} reviews</span>
            </div>
          </div>
          <div className="order-1 lg:order-2 rounded-3xl overflow-hidden shadow-2xl mx-auto w-full" style={{ aspectRatio: '4/5', maxHeight: '520px' }}>
            <img src={IMG.hero} alt="Dr. Anjani Dixit operating in theatre"
              className="w-full h-full object-cover object-center" />
          </div>
        </div>
      </section>

      {/* WHAT IT IS */}
      <section className="py-10 lg:py-16 px-5 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold mb-5" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>
            What a hysterectomy actually is
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: '#4A6860' }}>
            It is the removal of the uterus — the womb. Once it is done, periods stop permanently and pregnancy is no longer possible. Everything else people fear about it depends on decisions that are made separately: whether the cervix comes out, whether the tubes come out, and above all whether the ovaries stay.
          </p>
          <p className="text-base leading-relaxed" style={{ color: '#4A6860' }}>
            It is one of the most common operations in gynaecology, and one that a good number of women turn out not to need. Both of those things are true at once, which is why the honest version of this conversation starts with the alternatives rather than the date.
          </p>
        </div>
      </section>

      {/* WHEN IT IS THE ANSWER */}
      <section className="py-10 lg:py-20 px-5" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 lg:mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7A9C90' }}>When it is needed</p>
            <h2 className="text-3xl lg:text-4xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>
              When it is genuinely the right answer
            </h2>
            <p className="text-sm lg:text-base max-w-2xl mx-auto" style={{ color: '#5A7870' }}>
              These are the situations where removing the uterus solves the problem properly rather than postponing it.
            </p>
          </div>
          <MobileMore className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" limit={3} label="reasons">
            {REASONS.map((c, i) => (
              <div key={i} className="bg-white rounded-2xl p-6">
                <h3 className="font-semibold text-base mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>{c.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#5A7870' }}>{c.desc}</p>
              </div>
            ))}
          </MobileMore>
        </div>
      </section>

      {/* WHAT TO TRY FIRST */}
      <section className="py-10 lg:py-20 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 lg:mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7A9C90' }}>Before you agree</p>
            <h2 className="text-3xl lg:text-4xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>
              What is worth trying first
            </h2>
            <p className="text-sm lg:text-base max-w-2xl mx-auto" style={{ color: '#5A7870' }}>
              Every one of these keeps the uterus. Not all of them will suit your case — but you should know which were considered, and why they were ruled out.
            </p>
          </div>
          <MobileMore className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" limit={3} label="options">
            {ALTERNATIVES.map((c, i) => (
              <div key={i} className="rounded-2xl p-6" style={{ backgroundColor: '#FAFAF8', border: '1px solid #E3EDE9' }}>
                <h3 className="font-semibold text-base mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>{c.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#5A7870' }}>{c.desc}</p>
              </div>
            ))}
          </MobileMore>

          <div className="mt-8 rounded-3xl p-6 lg:p-8 text-center" style={{ backgroundColor: '#E3EDE9' }}>
            <p className="text-base leading-relaxed mb-4" style={{ color: '#2C5249' }}>
              If a hysterectomy has been recommended to you and none of the above came up in the conversation, that is not a reason to panic. It is a reason to have the scans read again.
            </p>
            <a href="/laparoscopic-surgery/second-opinion"
              className="inline-block px-7 py-3.5 rounded-full text-sm font-semibold text-white"
              style={{ backgroundColor: '#2C5249' }}>
              Get a second opinion on surgery
            </a>
          </div>
        </div>
      </section>

      {/* THE OPERATION */}
      <section className="py-10 lg:py-20 px-5" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 lg:mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7A9C90' }}>The operation</p>
            <h2 className="text-3xl lg:text-4xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>
              What is removed, and how
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-5">
            <div className="bg-white rounded-3xl p-6 lg:p-8">
              <h3 className="font-semibold text-lg mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>What comes out</h3>
              <dl className="space-y-4">
                {[
                  ['Total hysterectomy', 'The uterus and the cervix. The commonest version, and the default unless there is a reason to do otherwise.'],
                  ['Subtotal (supracervical)', 'The uterus, with the cervix left in place. Occasionally chosen for surgical reasons; it means smear tests continue.'],
                  ['With the fallopian tubes', 'Usually removed at the same time. They serve no purpose once the uterus is gone, and removing them lowers the risk of ovarian cancer later.'],
                  ['With or without the ovaries', 'A separate decision, and the one that matters most for how you will feel afterwards. See below.'],
                ].map(([term, def]) => (
                  <div key={term}>
                    <dt className="text-sm font-semibold mb-1" style={{ color: '#2C5249' }}>{term}</dt>
                    <dd className="text-sm leading-relaxed" style={{ color: '#5A7870' }}>{def}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="bg-white rounded-3xl p-6 lg:p-8">
              <h3 className="font-semibold text-lg mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>How it is done</h3>
              <dl className="space-y-4">
                {[
                  ['Laparoscopic (keyhole)', 'Three or four incisions under a centimetre. One to two nights in hospital, least pain, quickest return to normal life. Dr. Anjani’s default where it is safe.'],
                  ['Vaginal', 'No abdominal incisions at all — the uterus is removed through the vagina. Often the best route when the reason for surgery is prolapse.'],
                  ['Open (abdominal)', 'A single larger incision. Needed for a very large uterus, dense scarring from earlier surgery, or some cancers. Longer stay, longer recovery, and sometimes the safer operation.'],
                ].map(([term, def]) => (
                  <div key={term}>
                    <dt className="text-sm font-semibold mb-1" style={{ color: '#2C5249' }}>{term}</dt>
                    <dd className="text-sm leading-relaxed" style={{ color: '#5A7870' }}>{def}</dd>
                  </div>
                ))}
              </dl>
              <p className="text-xs leading-relaxed mt-5" style={{ color: '#7A9C90' }}>
                The route is chosen from your scans and history before the day, and explained to you. Occasionally a keyhole operation is converted to open during surgery — that is a safety decision, not a complication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OVARIES */}
      <section className="py-10 lg:py-20 px-5" style={{ backgroundColor: '#2C5249' }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7AB8A8' }}>The question everyone asks</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>
            “Will this put me into menopause?”
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: '#C9E4DB' }}>
            Only if both ovaries are removed. The uterus does not make hormones — the ovaries do. In a standard hysterectomy before menopause the ovaries are left in place, and they carry on exactly as before. No hot flushes, no HRT, no surgical menopause. What changes is that periods stop and pregnancy is no longer possible.
          </p>
          <p className="text-base leading-relaxed mb-4" style={{ color: '#C9E4DB' }}>
            Ovaries are removed when there is a reason to remove them: a cancer diagnosis, severe endometriosis involving them, a strong family history, or when you are already past menopause. Taking them out before natural menopause causes it immediately, which is a serious decision with consequences for bone and heart health — it deserves its own discussion, and hormone replacement is part of that discussion.
          </p>
          <p className="text-base leading-relaxed" style={{ color: '#C9E4DB' }}>
            If nobody has told you whether your ovaries are staying, ask before you sign the consent form. It is the single most important detail of the operation for how you will feel afterwards.
          </p>
        </div>
      </section>

      {/* RECOVERY */}
      <section className="py-10 lg:py-20 px-5 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 lg:mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7A9C90' }}>Recovery</p>
            <h2 className="text-3xl lg:text-4xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>
              What the weeks afterwards look like
            </h2>
            <p className="text-sm lg:text-base max-w-2xl mx-auto" style={{ color: '#5A7870' }}>
              This is the timeline for keyhole surgery. Open surgery adds roughly two to four weeks at every stage.
            </p>
          </div>
          <ol className="space-y-4">
            {RECOVERY.map((r, i) => (
              <li key={i} className="rounded-2xl p-5 lg:p-6 flex flex-col sm:flex-row gap-2 sm:gap-6"
                style={{ backgroundColor: '#FAFAF8', border: '1px solid #E3EDE9' }}>
                <span className="text-sm font-semibold flex-shrink-0 sm:w-32" style={{ color: '#2C5249' }}>{r.when}</span>
                <span className="text-sm leading-relaxed" style={{ color: '#5A7870' }}>{r.what}</span>
              </li>
            ))}
          </ol>
          <p className="text-sm leading-relaxed mt-6" style={{ color: '#7A9C90' }}>
            These are typical ranges, not promises — age, the reason for surgery, the size of the uterus and what else had to be done all move them. Your own plan is set at your follow-up.
          </p>
        </div>
      </section>

      {/* RISKS */}
      <section className="py-10 lg:py-20 px-5" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 lg:mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7A9C90' }}>Straight answers</p>
            <h2 className="text-3xl lg:text-4xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>
              Risks, and what to watch for
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white rounded-3xl p-6 lg:p-8">
              <h3 className="font-semibold text-lg mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>Worth knowing before you consent</h3>
              <ul className="space-y-2.5">
                {[
                  'Bleeding, occasionally enough to need a transfusion',
                  'Infection of the wound or the vaginal vault',
                  'Injury to the bladder, ureter or bowel — uncommon, and repaired at the time if it happens',
                  'Blood clots in the leg or lung, which is why you are walked early',
                  'Conversion from keyhole to open surgery for safety',
                  'Ovarian function can decline somewhat earlier even when the ovaries are kept',
                ].map(item => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed" style={{ color: '#5A7870' }}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#2C5249' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-3xl p-6 lg:p-8">
              <h3 className="font-semibold text-lg mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>Call straight away if</h3>
              <ul className="space-y-2.5">
                {[
                  'Fever, or a wound that becomes red, hot or starts discharging',
                  'Heavy vaginal bleeding, or clots, rather than light spotting',
                  'Pain that is getting worse rather than better, or is not touched by your painkillers',
                  'Pain, swelling or redness in a calf, or sudden breathlessness',
                  'Difficulty passing urine, or burning that does not settle',
                  'Vomiting, or no bowel movement with a swollen, tight abdomen',
                ].map(item => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed" style={{ color: '#5A7870' }}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#C2543F' }} />
                    {item}
                  </li>
                ))}
              </ul>
              <a href={`tel:${CFG.phone}`} onClick={() => trackCall()}
                className="inline-flex items-center gap-2 text-sm font-semibold mt-5" style={{ color: '#2C5249' }}>
                <IconPhone /> {CFG.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* THE CONSULTATION */}
      <section className="py-10 lg:py-20 px-5 bg-white">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7A9C90' }}>Your consultation</p>
            <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>
              What the appointment covers
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: '#4A6860' }}>
              Dr. Anjani reads your scans and reports herself before recommending anything. The conversation covers what is causing your symptoms, which of the uterus-preserving options are realistic in your case, and — if surgery is the answer — which route, what is removed, what is kept, and how long you will be off work.
            </p>
            <p className="text-base leading-relaxed" style={{ color: '#4A6860' }}>
              You are not expected to decide in the room. Most women take the plan home and come back, and that is the normal way to do this.
            </p>
          </div>
          <div className="rounded-3xl p-6" style={{ backgroundColor: '#F5F0E8' }}>
            <h3 className="font-semibold text-base mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>What to bring</h3>
            <ul className="space-y-2.5">
              {[
                'Ultrasound or MRI reports, and the images if you have them',
                'Any biopsy or pathology reports',
                'Recent blood tests, particularly haemoglobin',
                'A list of the medicines you take',
                'What has already been tried, and for how long',
                'Someone with you, if you would rather not hear it alone',
              ].map(item => (
                <li key={item} className="flex gap-2.5 text-sm leading-relaxed" style={{ color: '#5A7870' }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#2C5249' }} />
                  {item}
                </li>
              ))}
            </ul>
            <a onClick={() => trackWhatsApp()} href={waHref('hysterectomy', 'consultation')}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full mt-5 py-3.5 rounded-full text-sm font-semibold text-white"
              style={{ backgroundColor: '#25D366' }}>
              <IconWhatsApp /> Send your reports on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-10 lg:py-20 px-5" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 lg:mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7A9C90' }}>In the operating theatre</p>
            <h2 className="text-3xl lg:text-4xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>
              Who will be operating
            </h2>
          </div>
          {/* Two on a phone rather than four: this page is long enough already,
              and the photos are supporting evidence, not the point of it. */}
          <PhotoGallery photos={SURGERY_GALLERY} mobileInitial={2} />
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-10 lg:py-20 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 lg:mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7A9C90' }}>Patient stories</p>
            <h2 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>
              Women who have had this surgery
            </h2>
            <p className="text-sm mt-3" style={{ color: '#7A9C90' }}>
              Unedited patient reviews · Google cards link to the original review
            </p>
          </div>
          <ReviewGrid reviews={HYSTERECTOMY_REVIEWS} columns="md:grid-cols-2 lg:grid-cols-3" mobileLimit={3} />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 lg:py-20 px-5" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 lg:mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7A9C90' }}>Questions</p>
            <h2 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>
              Hysterectomy — your questions
            </h2>
          </div>
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <div key={i} className="rounded-2xl overflow-hidden bg-white" style={{ border: '1px solid #E3EDE9' }}>
                <button className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}>
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
        intro="Consultations and pre-surgical evaluation happen at her Indiranagar clinic. The surgery and your stay are at one of these partner hospitals, where Dr. Anjani operates herself."
      />

      {/* FINAL CTA */}
      <section className="py-10 lg:py-20 px-5" style={{ backgroundColor: '#2C5249' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Find out where you actually stand
          </h2>
          <p className="mb-8 text-base" style={{ color: '#9ECEC0' }}>
            One consultation is enough to know whether you need this operation, whether something smaller would do, and what either would mean for your next few months.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={CFG.booking} onClick={() => trackBooking('ads_conversion_Contact_Us_1')} target="_blank" rel="noopener noreferrer"
              className="px-8 py-4 rounded-full font-semibold text-center bg-white hover:bg-gray-50 transition-colors"
              style={{ color: '#2C5249' }}>
              Book a Consultation
            </a>
            <a href={`tel:${CFG.phone}`} onClick={() => trackCall()}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold border-2 text-white hover:bg-white/10 transition-colors"
              style={{ borderColor: 'rgba(255,255,255,0.4)' }}>
              <IconPhone /> {CFG.phoneDisplay}
            </a>
          </div>
          <p className="text-xs mt-6" style={{ color: '#7FB3A3' }}>
            Kasper Multi-Speciality Clinic · 31, 80 Feet Rd, Indiranagar, Bengaluru 560038 · Video consultations available
          </p>
        </div>
      </section>

      {/* RELATED — contextual internal links */}
      <RelatedServices links={NAV_LINKS} extra={['/laparoscopic-surgery/second-opinion', '/about-us']} />

      <footer className="py-8 px-5 text-center text-xs" style={{ backgroundColor: '#1A2E28', color: '#3D6A5C' }}>
        <p>© 2026 Dr. Anjani Dixit · Kasper Multi-Speciality Clinic · 31, 80 Feet Rd, Indiranagar, Bengaluru 560038</p>
        <a href="/" className="mt-2 inline-block hover:text-white transition-colors">← Back to main site</a>
      </footer>

      <a onClick={() => trackWhatsApp()} href={waHref('hysterectomy', 'float')}
        target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
        className="hidden lg:flex fixed z-50 items-center justify-center rounded-full shadow-xl"
        style={{ bottom: '5.5rem', right: '1.5rem', width: '56px', height: '56px', backgroundColor: '#25D366' }}>
        <IconWhatsApp />
      </a>

      <StickyActionBar waHref={waHref('hysterectomy', 'sticky')} bookHref={CFG.booking} />
    </div>
  )
}
