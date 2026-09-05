import { randomBytes } from 'node:crypto'
import { getSql, hasDatabase } from '../lib/db'
import {
  WHATSAPP_NUMBER,
  WHATSAPP_MESSAGES,
  DEFAULT_SERVICE,
  makeRefCode,
} from '../lib/whatsapp'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * /wa?p=<service>&s=<placement> — the single door to WhatsApp.
 *
 * Every tap is recorded here and then redirected to wa.me with a short
 * reference code appended to the prefilled message ("… (Ref: A7K2Q)"). The code
 * arriving in WhatsApp is what ties a real conversation back to the campaign,
 * keyword, page and gclid that produced it — which is what makes offline
 * conversion import possible, and what finally gives tap→conversation a
 * denominator.
 *
 * Redirecting server-side rather than firing a keepalive fetch on click: once
 * the browser hands off to the WhatsApp app the page can be frozen mid-request,
 * and the tap is lost. Here the record is written before the redirect is sent.
 */

const clean = (value, max = 512) =>
  typeof value === 'string' && value.trim() ? value.trim().slice(0, max) : null

const ATTRIBUTION_COOKIE = 'ad_attr'

// The ad attribution the visitor arrived with, written as a first-party cookie
// by AttributionTracker. A cookie rather than sessionStorage because this
// request is server-side, and because Google Ads attributes on a 90-day window
// — a tab-scoped store loses every visitor who comes back tomorrow.
function readAttribution(request) {
  try {
    const raw = request.cookies.get(ATTRIBUTION_COOKIE)?.value
    if (!raw) return {}
    const parsed = JSON.parse(decodeURIComponent(raw))
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch (e) {
    return {}
  }
}

function refererPath(request) {
  try {
    return new URL(request.headers.get('referer')).pathname
  } catch (e) {
    return null
  }
}

async function recordTap(request, service, placement) {
  if (!hasDatabase()) {
    console.warn('[WA_TAP] DATABASE_URL not set — tap not stored', { service, placement })
    return null
  }

  const a = readAttribution(request)
  const row = {
    page_path: refererPath(request),
    gclid: clean(a.gclid),
    gbraid: clean(a.gbraid),
    wbraid: clean(a.wbraid),
    utm_source: clean(a.utm_source, 256),
    utm_medium: clean(a.utm_medium, 256),
    utm_campaign: clean(a.utm_campaign, 256),
    utm_term: clean(a.utm_term, 256),
    utm_content: clean(a.utm_content, 256),
    landing_page: clean(a.landing_page, 1024),
    referrer: clean(a.referrer, 1024),
    country: clean(request.headers.get('x-vercel-ip-country'), 8),
    region: clean(request.headers.get('x-vercel-ip-country-region'), 16),
    user_agent: clean(request.headers.get('user-agent'), 512),
  }

  const sql = getSql()

  // A duplicate code is a unique-violation, not a corrupted row: mint another.
  for (let attempt = 0; attempt < 3; attempt++) {
    const refCode = makeRefCode(randomBytes(16))
    try {
      const [inserted] = await sql`
        INSERT INTO booking_clicks (
          event_name, page_path, ref_code, service, placement,
          gclid, gbraid, wbraid,
          utm_source, utm_medium, utm_campaign, utm_term, utm_content,
          landing_page, referrer, country, region, user_agent
        ) VALUES (
          'whatsapp_click', ${row.page_path}, ${refCode}, ${service}, ${placement},
          ${row.gclid}, ${row.gbraid}, ${row.wbraid},
          ${row.utm_source}, ${row.utm_medium}, ${row.utm_campaign}, ${row.utm_term}, ${row.utm_content},
          ${row.landing_page}, ${row.referrer}, ${row.country}, ${row.region}, ${row.user_agent}
        )
        RETURNING ref_code
      `
      return inserted?.ref_code || null
    } catch (error) {
      if (error?.code === '23505') continue
      console.error('[WA_TAP_ERROR]', error)
      return null
    }
  }

  console.error('[WA_TAP_ERROR] could not mint a unique ref code in 3 attempts')
  return null
}

export async function GET(request) {
  const params = request.nextUrl.searchParams
  const requested = params.get('p')
  // Whitelisted: the message is chosen from the table, never taken from the URL.
  const service = WHATSAPP_MESSAGES[requested] ? requested : DEFAULT_SERVICE
  const placement = (params.get('s') || '').replace(/[^a-z0-9-]/gi, '').slice(0, 32) || null

  const refCode = await recordTap(request, service, placement)

  // No code means the tap was not recorded, and a reference nobody can look up
  // is worse than none — send the plain message instead.
  const message = refCode
    ? `${WHATSAPP_MESSAGES[service]}\n\n(Ref: ${refCode})`
    : WHATSAPP_MESSAGES[service]

  return new Response(null, {
    status: 302,
    headers: {
      Location: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      // Every request must mint its own code: nothing here may be cached, by
      // the CDN or by the browser's back button.
      'Cache-Control': 'no-store, max-age=0',
      'Referrer-Policy': 'no-referrer',
    },
  })
}
