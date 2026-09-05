// Contextual internal links before the footer. Service pages previously had a
// single crawlable link (the logo), because the nav only rendered inside the
// mobile menu's open state — so nothing connected them to each other.
const BLURBS = {
  '/': {
    title: 'Dr. Anjani Dixit',
    desc: 'Credentials, hospital affiliations, and the full range of gynaecological care offered in Indiranagar.',
  },
  '/laparoscopic-surgery': {
    title: 'Laparoscopic Surgery',
    desc: 'Keyhole surgery for fibroids, endometriosis, ovarian cysts and hysterectomy — smaller incisions and a shorter recovery.',
  },
  '/ivf-infertility': {
    title: 'IVF & Fertility',
    desc: 'Fertility evaluation, IUI and IVF, including the surgical causes of infertility that cycles alone will not resolve.',
  },
  '/pregnancy': {
    title: 'Pregnancy Care',
    desc: 'Antenatal care and high-risk obstetrics, from the first scan through delivery and the weeks after.',
  },
  '/pcos': {
    title: 'PCOS Treatment',
    desc: 'Cycle regulation, insulin resistance and long-term metabolic health — treating the cause rather than the symptoms.',
  },
  '/cosmetic-gynecology': {
    title: 'Cosmetic Gynaecology',
    desc: 'Laser and surgical procedures for intimate wellness, discussed without awkwardness.',
  },
  '/about-us': {
    title: 'About Dr. Anjani',
    desc: 'Fourteen years, 1500+ procedures, and the training behind them.',
  },
  '/laparoscopic-surgery/second-opinion': {
    title: 'Surgery Second Opinion',
    desc: 'Been advised a hysterectomy or open surgery? Have the scans reviewed before you agree.',
  },
  '/ivf-infertility/second-opinion': {
    title: 'Fertility Second Opinion',
    desc: 'A failed cycle with no explanation is worth a fresh read of the whole file.',
  },
}

/**
 * @param links  [label, href] pairs — pass the page's own NAV_LINKS, which
 *               already excludes the current page.
 * @param extra  additional hrefs to surface beyond the nav set.
 */
export default function RelatedServices({ links = [], extra = [], heading = 'Explore more', bg = '#FAFAF8' }) {
  const hrefs = [...links.map(([, href]) => href), ...extra].filter(h => h !== '/' && BLURBS[h])
  const seen = new Set()
  const items = hrefs.filter(h => !seen.has(h) && seen.add(h)).map(h => ({ href: h, ...BLURBS[h] }))
  if (!items.length) return null

  return (
    <section className="py-10 lg:py-16 px-5" style={{ backgroundColor: bg, borderTop: '1px solid #E3EDE9' }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>
          {heading}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(item => (
            <a key={item.href} href={item.href}
              className="block rounded-2xl p-5 no-underline transition-shadow hover:shadow-md"
              style={{ backgroundColor: '#FFFFFF', border: '1px solid #E3EDE9' }}>
              <h3 className="font-semibold text-base mb-1.5" style={{ fontFamily: 'Playfair Display, serif', color: '#2C5249' }}>
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#5A7870' }}>{item.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
