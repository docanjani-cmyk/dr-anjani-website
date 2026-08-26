/**
 * Builds app/lib/reviews.js and public/reviewers/*.jpg from the Google Maps
 * review export documented in GOOGLE_REVIEWS_DATA_GUIDE.md.
 *
 *   node scripts/build-reviews.mjs [path-to-dr-anjani-website]
 *
 * Review text is copied verbatim — only whitespace is normalised and wrapping
 * quote characters are stripped. Nothing is paraphrased.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join, resolve } from 'node:path'

const SOURCE_REPO = resolve(process.argv[2] || '../dr-anjani-website')
const OUT_MODULE = 'app/lib/reviews.js'
const OUT_IMAGES = 'public/reviewers'
const AVATAR_PX = 160

/** order → { condition, pages }. `order` is the newest-first index in the export. */
const CURATED = [
  // ── newest, laparoscopy-heavy ────────────────────────────────────────────
  { order: 9,   condition: 'Stage IV Endometriosis & Ovarian Cyst', pages: ['home', 'laparoscopy', 'second-opinion-lap'] },
  { order: 11,  condition: 'Laparoscopic Hysterectomy',             pages: ['home', 'laparoscopy'] },
  { order: 12,  condition: 'Laparoscopic Myomectomy',               pages: ['home'] },
  { order: 5,   condition: 'Laparoscopic Ovarian Cystectomy',       pages: ['home', 'laparoscopy'] },
  { order: 6,   condition: 'Laparoscopic Endometriosis Surgery',    pages: ['home', 'laparoscopy'] },
  { order: 70,  condition: 'Laparoscopic Surgery · Second Opinion', pages: ['home', 'laparoscopy', 'second-opinion-lap'] },
  { order: 55,  condition: 'Laparoscopic Hysterectomy',             pages: ['home', 'laparoscopy'] },
  { order: 50,  condition: 'Hysteroscopy & Laparoscopic Myomectomy',pages: ['home', 'laparoscopy'] },
  { order: 63,  condition: 'Laparoscopic Myomectomy',               pages: ['home', 'laparoscopy', 'second-opinion-lap'] },
  { order: 92,  condition: 'Laparoscopic Surgery',                  pages: ['home'] },
  { order: 80,  condition: 'Laparoscopic Hysterectomy',             pages: ['home'] },
  { order: 151, condition: 'Ovarian Cyst Surgery',                  pages: ['laparoscopy', 'second-opinion-lap'] },
  { order: 189, condition: 'Endometriosis Surgery',                 pages: ['laparoscopy', 'second-opinion-lap'] },

  // ── fertility / IVF ──────────────────────────────────────────────────────
  { order: 1,   condition: 'Endometriosis, Laparoscopy & IVF',      pages: ['home', 'ivf', 'second-opinion-ivf'] },
  { order: 3,   condition: 'Fertility Consultation & Laparoscopy',  pages: ['home', 'ivf', 'second-opinion-ivf'] },
  { order: 240, condition: 'IVF Treatment',                         pages: ['ivf', 'second-opinion-ivf'] },
  { order: 419, condition: 'Egg Freezing',                          pages: ['ivf', 'second-opinion-ivf'] },

  // ── pregnancy ────────────────────────────────────────────────────────────
  { order: 72,  condition: 'Pregnancy Care & Delivery',             pages: ['home', 'pregnancy'] },
  { order: 84,  condition: 'Pregnancy Care',                        pages: ['home', 'pregnancy'] },
  { order: 73,  condition: 'Pregnancy Care & Delivery',             pages: ['pregnancy'] },
  { order: 56,  condition: 'Pregnancy & Delivery',                  pages: ['home', 'pregnancy'] },
  { order: 35,  condition: 'Pregnancy Care & Delivery',             pages: ['pregnancy'] },
  { order: 4,   condition: 'Second Pregnancy Care',                 pages: ['pregnancy'] },

  // ── PCOS / hormonal ──────────────────────────────────────────────────────
  { order: 71,  condition: 'PCOS, Fertility & Insulin Resistance',  pages: ['home', 'pcos'] },
  { order: 352, condition: 'PCOD & Irregular Periods',              pages: ['pcos'] },
  { order: 13,  condition: 'Ongoing Gynaecological Care',           pages: ['pcos'] },
  { order: 32,  condition: 'Gynaecological Care',                   pages: ['pcos'] },
  { order: 411, condition: 'Gynaecological Care',                   pages: ['pcos'] },

  // ── cosmetic / gynaecological wellness ───────────────────────────────────
  { order: 125, condition: 'Laser Vaginal Rejuvenation',            pages: ['home', 'cosmetic'] },
  { order: 396, condition: 'Gynaecological Care',                   pages: ['cosmetic'] },
  { order: 290, condition: 'Gynaecological Care',                   pages: ['cosmetic'] },
  { order: 34,  condition: 'Gynaecological Care',                   pages: ['cosmetic'] },
  { order: 211, condition: 'Fibroid Removal',                       pages: ['cosmetic', 'second-opinion-lap'] },
]

/** Practo reviews kept where Google has little topical coverage. Not verifiable, so no link. */
const PRACTO = [
  { pages: ['ivf', 'second-opinion-ivf'], name: 'Brijesh', condition: 'IVF After Fibroid Surgery', date: 'March 2026', review: 'We came to Dr. Anjani for difficulty in conceiving — fibroid and low egg reserve. She planned keyhole fibroid removal, then guided us through IVF. We had a successful delivery of a baby girl. She was supportive and explained everything in detail at every step. Really grateful for the entire experience. It was smooth and I am very thankful.' },
  { pages: ['ivf', 'second-opinion-ivf'], name: 'Kanti Nisha', condition: 'IVF Treatment', date: 'February 2026', review: 'My relative had ovarian cyst and fibroid and was not able to conceive for so long. We had laparoscopic surgery with Dr. Anjani, then the IVF procedure. Now they are proud parents of a healthy baby girl. Thank you for the great treatment and making their journey smooth. She explains very well and gives time to her patients.' },
  { pages: ['ivf'], name: 'Shakti Singh', condition: 'IVF & Laparoscopic Surgery', date: 'January 2026', review: 'Extremely experienced doctor. Had IVF treatment and laparoscopic treatment, and conceived finally. Had a caesarean delivery. Now we are parents of a healthy baby. Highly grateful to the doctor and her team. Highly recommended. Very happy.' },
  { pages: ['pcos'], name: 'Verified Patient', condition: 'PCOD/PCOS Treatment', date: 'April 2026', review: 'Consulted Dr. Anjani — very gentle and soft spoken, cleared all my doubts. The staff were equally helpful. What I really appreciated was that she advised only the necessary blood tests and scans — no unnecessary investigations. I had a really good experience. Highly recommended.' },
  { pages: ['cosmetic'], name: 'Ruchi Dubey', condition: 'Gynaecological Care', date: 'March 2026', review: 'She is empathetic, spends time explaining and ensures your well-being. She is warm, understanding, and very knowledgeable. Every visit felt personal and never rushed. I felt completely at ease discussing sensitive concerns — she creates a genuinely safe and supportive space. I would highly recommend her.' },
  { pages: ['pregnancy'], name: 'Rishu Kumari', condition: 'Pregnancy Care', date: 'May 2026', review: 'Finding Dr. Anjani was the best decision I made during my pregnancy! She is not just a brilliant gynecologist but a doctor with a golden heart. Her calm demeanor and ability to explain even complex things simply is remarkable. She made every appointment feel reassuring and never once made me feel rushed. I always left her clinic smiling and stress-free.' },
]

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December']

/** Google only exposes relative dates, so resolve them against the export date. */
function resolvePosted(posted, extractedAt) {
  const base = new Date(extractedAt + 'T00:00:00Z')
  const m = posted.match(/(?:^|\s)(a|an|\d+)\s+(day|week|month|year)s?\s+ago/i)
  if (!m) return null
  const n = /^\d+$/.test(m[1]) ? Number(m[1]) : 1
  const d = new Date(base)
  const unit = m[2].toLowerCase()
  if (unit === 'day') d.setUTCDate(d.getUTCDate() - n)
  else if (unit === 'week') d.setUTCDate(d.getUTCDate() - n * 7)
  else if (unit === 'month') d.setUTCMonth(d.getUTCMonth() - n)
  else d.setUTCFullYear(d.getUTCFullYear() - n)
  return {
    date: `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`,
    datePublished: d.toISOString().slice(0, 10),
    approximate: /year/i.test(unit) || /^Edited/i.test(posted),
  }
}

/** Verbatim, minus stray wrapping quotes, trailing Google "…" and blank-line runs. */
function cleanText(text) {
  let t = text.replace(/\r/g, '').trim()
  if (t.startsWith('"') && t.endsWith('"')) t = t.slice(1, -1).trim()
  t = t.replace(/\s*…\s*$/, '')
  return t.replace(/\n{2,}/g, '\n\n').split('\n').map(l => l.trim()).join('\n').trim()
}

const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const esc = s => "'" + s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n') + "'"

// ── build ────────────────────────────────────────────────────────────────────
const data = JSON.parse(readFileSync(join(SOURCE_REPO, 'data/google-reviews.json'), 'utf8'))
const byOrder = new Map(data.reviews.map(r => [r.order, r]))
if (!existsSync(OUT_IMAGES)) mkdirSync(OUT_IMAGES, { recursive: true })

const dist = data.reviews.reduce((a, r) => (a[r.rating] = (a[r.rating] || 0) + 1, a), {})
const mean = data.reviews.reduce((a, r) => a + r.rating, 0) / data.reviews.length

const google = CURATED.map(({ order, condition, pages }) => {
  const r = byOrder.get(order)
  if (!r) throw new Error(`No review with order ${order}`)
  const when = resolvePosted(r.posted, data.source.extractedAt)
  if (!when) throw new Error(`Cannot resolve posted date "${r.posted}" (order ${order})`)
  if (!r.text?.trim()) throw new Error(`Review ${order} has no text`)

  // Only real uploaded photos are copied. Google's generated-initial avatars use
  // arbitrary brand colours, so those fall back to the site's own initial chip.
  let photo = null
  if (r.reviewerPhotoType === 'uploaded-photo') {
    photo = `${slug(r.reviewer)}.jpg`
    const src = join(SOURCE_REPO, 'public', r.reviewerPhoto)
    if (!existsSync(src)) throw new Error(`Missing avatar ${src}`)
    execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '82',
      '-Z', String(AVATAR_PX), src, '--out', join(OUT_IMAGES, photo)], { stdio: 'ignore' })
  }

  return {
    pages,
    fields: {
      name: r.reviewer,
      condition,
      date: when.date,
      datePublished: when.datePublished,
      dateApprox: when.approximate,
      rating: r.rating,
      img: photo ? `/reviewers/${photo}` : null,
      meta: r.reviewerDetails,
      review: cleanText(r.text),
      url: r.reviewUrl,
      source: 'google',
    },
  }
})

const practo = PRACTO.map(p => ({
  pages: p.pages,
  fields: { name: p.name, condition: p.condition, date: p.date, rating: 5, img: null, meta: null, review: p.review, url: null, source: 'practo' },
}))

const all = [...google, ...practo]
const PAGES = ['home', 'laparoscopy', 'pregnancy', 'ivf', 'pcos', 'cosmetic',
  'second-opinion-lap', 'second-opinion-ivf']

const render = f => '  {\n' + Object.entries(f)
  .map(([k, v]) => `    ${k}: ${v === null ? 'null' : typeof v === 'string' ? esc(v) : String(v)},`)
  .join('\n') + '\n  }'

const body = `// GENERATED by scripts/build-reviews.mjs — do not edit by hand.
// Source: Google Maps export of ${data.source.extractedAt} (${data.source.displayedReviewCount} reviews).
// Review text is verbatim; see GOOGLE_REVIEWS_DATA_GUIDE.md in the data repo.

export const REVIEW_STATS = {
  total: ${data.source.displayedReviewCount},
  displayRating: '5.0',
  meanRating: ${mean.toFixed(2)},
  fiveStar: ${dist[5] || 0},
  extractedAt: ${esc(data.source.extractedAt)},
  mapsUrl: ${esc(data.source.listingUrl)},
}

${PAGES.map(p => {
  const rows = all.filter(r => r.pages.includes(p))
  return `export const ${p.toUpperCase().replace(/-/g, '_')}_REVIEWS = [\n${rows.map(r => render(r.fields)).join(',\n')},\n]`
}).join('\n\n')}

/** Top reviews used for schema.org Review markup. */
export const SCHEMA_REVIEWS = HOME_REVIEWS.filter(r => r.source === 'google' && !r.dateApprox).slice(0, 6)
`

writeFileSync(OUT_MODULE, body)
console.log(`wrote ${OUT_MODULE}`)
console.log(`avatars: ${google.filter(g => g.fields.img).length}/${google.length} -> ${OUT_IMAGES}/`)
for (const p of PAGES) console.log(`  ${p}: ${all.filter(r => r.pages.includes(p)).length}`)
console.log(`stats: ${data.source.displayedReviewCount} reviews, mean ${mean.toFixed(3)}, 5★ ${dist[5]}`)
