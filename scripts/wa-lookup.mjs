// Look up a WhatsApp enquiry by the reference code in the message, or print the
// standing report on WhatsApp taps.
//
//   node --env-file=.env.local scripts/wa-lookup.mjs A7K2Q   # who is this?
//   node --env-file=.env.local scripts/wa-lookup.mjs         # last 30 days
//
// The code in "(Ref: A7K2Q)" is the join key: it turns a WhatsApp message from
// an anonymous enquiry into a row carrying the campaign, keyword, page and
// gclid that produced it. The gclid is what Google Ads needs for an offline
// conversion import, within its 90-day click window.
import { neon } from '@neondatabase/serverless'

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set. Run `vercel env pull .env.local --yes` first.')
  process.exit(1)
}

const sql = neon(process.env.DATABASE_URL)
const code = (process.argv[2] || '').trim().toUpperCase().replace(/^\(?REF:?\s*/i, '').replace(/\)$/, '')

if (code) {
  const [row] = await sql`
    SELECT ref_code, clicked_at, service, placement, page_path, landing_page,
           gclid, gbraid, wbraid, utm_source, utm_medium, utm_campaign, utm_term, utm_content,
           country, region
    FROM booking_clicks
    WHERE ref_code = ${code}
  `

  if (!row) {
    console.log(`No tap recorded for ${code}. Either the code was mistyped, or the message`)
    console.log('was sent without the prefilled text (expect 15-30% of enquiries to arrive bare).')
    process.exit(0)
  }

  const age = Math.floor((Date.now() - new Date(row.clicked_at)) / 86400000)
  console.log(`\n  ${row.ref_code} — ${row.service}${row.placement ? ` · ${row.placement}` : ''}`)
  console.log(`  tapped ${row.clicked_at.toISOString().replace('T', ' ').slice(0, 16)} (${age} days ago)`)
  console.log(`  page   ${row.page_path || '—'}`)
  console.log(`  landed ${row.landing_page || '—'}`)
  console.log(`  source ${[row.utm_source, row.utm_medium, row.utm_campaign].filter(Boolean).join(' / ') || 'direct or organic'}`)
  if (row.utm_term) console.log(`  term   ${row.utm_term}`)
  console.log(`  gclid  ${row.gclid || row.gbraid || row.wbraid || '— not from an ad click'}`)
  if (row.gclid && age <= 90) {
    console.log(`\n  Offline conversion import: usable for another ${90 - age} days.`)
  } else if (row.gclid) {
    console.log('\n  Past the 90-day window — Google Ads will reject this gclid.')
  }
  console.log()
  process.exit(0)
}

const [totals] = await sql`
  SELECT COUNT(*)::int AS taps,
         COUNT(gclid)::int AS from_ads,
         COUNT(DISTINCT service)::int AS services
  FROM booking_clicks
  WHERE ref_code IS NOT NULL AND clicked_at > now() - interval '30 days'
`

console.log(`\nWhatsApp taps, last 30 days: ${totals.taps} (${totals.from_ads} carrying a gclid)\n`)

const byService = await sql`
  SELECT service, COUNT(*)::int AS taps, COUNT(gclid)::int AS from_ads
  FROM booking_clicks
  WHERE ref_code IS NOT NULL AND clicked_at > now() - interval '30 days'
  GROUP BY service ORDER BY taps DESC
`
console.table(byService)

const byCampaign = await sql`
  SELECT COALESCE(utm_campaign, '(none)') AS campaign, service, COUNT(*)::int AS taps
  FROM booking_clicks
  WHERE ref_code IS NOT NULL AND clicked_at > now() - interval '30 days'
  GROUP BY campaign, service ORDER BY taps DESC LIMIT 15
`
console.table(byCampaign)

console.log('Tap→conversation rate = messages that arrived carrying a code ÷ taps above.')
console.log('Count the codes you actually received in WhatsApp; there is no way to see')
console.log('them from this side.\n')
