import { CLINIC, hospitalsFor } from '../lib/practice'

const IconPin = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

/**
 * "Where Dr. Anjani practises" for a service page: the consulting clinic plus
 * the hospitals that admit that kind of care. `kind` is 'delivery',
 * 'surgery', 'fertility', or omitted for all of them — a reader on the
 * pregnancy page should not be sent to a fertility-only centre.
 *
 * Deliberately more compact than the homepage's version: on a service page
 * this is supporting detail, not a section of its own.
 *
 * `links={false}` renders the same block with no map links, for the
 * second-opinion Ads pages, where the footer is deliberately the only way off
 * the page.
 */
export default function PracticeLocations({ kind, intro, links = true }) {
  const hospitals = hospitalsFor(kind)
  const Hospital = links ? 'a' : 'div'

  return (
    <section id="locations" className="py-10 lg:py-16 px-5" style={{ backgroundColor: '#F5F0E8' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6 lg:mb-10">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7A9C90' }}>Locations</p>
          <h2 className="text-2xl lg:text-4xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>
            Where Dr. Anjani Practises
          </h2>
          <p className="text-sm lg:text-base max-w-2xl mx-auto" style={{ color: '#5A7870' }}>{intro}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 items-start">
          {/* A card, not a link: globals.css turns any maps.app.goo.gl anchor
              into a flex tap target below 1024px, which would lay the card out
              as a row. The directions link inside is the tap target. */}
          <div className="rounded-3xl p-6 text-white" style={{ backgroundColor: '#2C5249' }}>
            <div className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7AB8A8' }}>OPD · Consultations</div>
            <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{CLINIC.name}</h3>
            <p className="text-sm leading-relaxed" style={{ color: '#9ECEC0' }}>{CLINIC.address}</p>
            <p className="text-sm mt-1" style={{ color: '#9ECEC0' }}>{CLINIC.hours}</p>
            {links && (
              <a
                href={CLINIC.maps} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white mt-3 hover:opacity-80 transition-opacity"
              >
                <IconPin /> Get directions
              </a>
            )}
          </div>

          <div className="lg:col-span-2 rounded-3xl p-6 bg-white" style={{ border: '1px solid #E3EDE9' }}>
            <div className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#7A9C90' }}>
              IPD · {kind === 'delivery' ? 'Deliveries & admissions' : kind === 'fertility' ? 'Fertility procedures & admissions' : 'Surgeries & admissions'}
            </div>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {hospitals.map(h => (
                <Hospital
                  key={h.name}
                  {...(links ? { href: h.maps, target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={`flex items-start gap-3 p-3.5 rounded-2xl no-underline${links ? ' transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md' : ''}`}
                  style={{ backgroundColor: '#FAFAF8', border: '1px solid #E3EDE9' }}
                >
                  <span className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#E3EDE9', color: '#2C5249' }}>
                    <IconPin />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold leading-snug" style={{ color: '#1A2E28' }}>{h.name}</span>
                    <span className="block text-xs mt-0.5" style={{ color: '#7A9C90' }}>{h.area}, Bangalore</span>
                  </span>
                </Hospital>
              ))}
            </div>
            <p className="text-xs leading-relaxed mt-4" style={{ color: '#7A9C90' }}>
              The hospital is chosen together with you — based on your location, insurance coverage, budget, and the facilities your care needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
