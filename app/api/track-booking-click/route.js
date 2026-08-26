import { getSql, hasDatabase } from '../../lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const clean = (value, max = 512) =>
  typeof value === 'string' && value.trim() ? value.trim().slice(0, max) : null

export async function POST(request) {
  let data
  try {
    data = await request.json()
  } catch (e) {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const row = {
    event_name: clean(data.event_name, 128) || 'booking_click',
    page_path: clean(data.page_path, 256),
    gclid: clean(data.gclid),
    gbraid: clean(data.gbraid),
    wbraid: clean(data.wbraid),
    utm_source: clean(data.utm_source, 256),
    utm_medium: clean(data.utm_medium, 256),
    utm_campaign: clean(data.utm_campaign, 256),
    utm_term: clean(data.utm_term, 256),
    utm_content: clean(data.utm_content, 256),
    landing_page: clean(data.landing_page, 1024),
    referrer: clean(data.referrer, 1024),
    // Coarse geo from Vercel's edge headers rather than the raw IP: enough to
    // segment campaigns without storing a per-visitor identifier.
    country: clean(request.headers.get('x-vercel-ip-country'), 8),
    region: clean(request.headers.get('x-vercel-ip-country-region'), 16),
    user_agent: clean(request.headers.get('user-agent'), 512),
  }

  if (!hasDatabase()) {
    console.warn('[BOOKING_CLICK] DATABASE_URL not set — not stored', row)
    return Response.json({ success: true, stored: false })
  }

  try {
    const sql = getSql()
    const [inserted] = await sql`
      INSERT INTO booking_clicks (
        event_name, page_path,
        gclid, gbraid, wbraid,
        utm_source, utm_medium, utm_campaign, utm_term, utm_content,
        landing_page, referrer, country, region, user_agent
      ) VALUES (
        ${row.event_name}, ${row.page_path},
        ${row.gclid}, ${row.gbraid}, ${row.wbraid},
        ${row.utm_source}, ${row.utm_medium}, ${row.utm_campaign}, ${row.utm_term}, ${row.utm_content},
        ${row.landing_page}, ${row.referrer}, ${row.country}, ${row.region}, ${row.user_agent}
      )
      RETURNING id, clicked_at
    `
    return Response.json({ success: true, stored: true, id: inserted.id })
  } catch (error) {
    console.error('[BOOKING_CLICK_ERROR]', error)
    return Response.json({ success: false, error: 'Failed to record click' }, { status: 500 })
  }
}
