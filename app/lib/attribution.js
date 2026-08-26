'use client'

// Google Ads click identifiers. `gclid` covers standard web clicks; `gbraid`
// and `wbraid` are what Google sends instead for iOS app-to-web clicks, where
// no gclid is available.
const CLICK_IDS = ['gclid', 'gbraid', 'wbraid']
const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']

const STORE_KEY = 'ad_attribution'

// sessionStorage throws outright in some privacy modes, so every access is
// guarded — tracking must never be able to break the page.
const readStore = () => {
  try {
    return JSON.parse(window.sessionStorage.getItem(STORE_KEY) || 'null')
  } catch (e) {
    return null
  }
}

const writeStore = (value) => {
  try {
    window.sessionStorage.setItem(STORE_KEY, JSON.stringify(value))
  } catch (e) {
    // Nothing to do — the click just goes unattributed.
  }
}

// Reads the ad parameters off the current URL and keeps them for the rest of
// the browser session, so a Book click made three pages later still knows
// which ad paid for the visit. Call once per page mount.
export function captureAttribution() {
  if (typeof window === 'undefined') return null

  const params = new URLSearchParams(window.location.search)
  const found = {}
  for (const key of [...CLICK_IDS, ...UTM_PARAMS]) {
    const value = params.get(key)
    if (value) found[key] = value.slice(0, 512)
  }

  const existing = readStore()
  if (Object.keys(found).length === 0) return existing

  // A later page view carrying only stray utm params must not clobber the paid
  // click that actually started the session.
  const foundClickId = CLICK_IDS.some(k => found[k])
  const haveClickId = existing && CLICK_IDS.some(k => existing[k])
  if (haveClickId && !foundClickId) return existing

  const record = {
    ...found,
    landing_page: window.location.pathname + window.location.search,
    referrer: document.referrer || null,
    captured_at: new Date().toISOString(),
  }
  writeStore(record)
  return record
}

export function getAttribution() {
  if (typeof window === 'undefined') return null
  return readStore()
}

// The canonical conversion event names. Every page imports these rather than
// repeating string literals, so Google Ads and GA4 see one consistently named
// conversion per action no matter which page the click came from.
export const EVENTS = {
  book: 'ads_conversion_Contact_Us_1',
  whatsapp: 'whatsapp_click',
  call: 'conversion_event_phone_call_lead_1',
}

// Fires the Google Analytics / Ads event for a conversion action and records
// the click — along with whatever ad attribution this session is carrying — to
// our own database, so the click can later be reconciled against a booking for
// offline conversion import.
export function trackConversion(eventName, extra = {}) {
  if (typeof window === 'undefined') return

  window.gtag?.('event', eventName)

  const a = getAttribution() || {}
  const payload = {
    event_name: eventName,
    page_path: window.location.pathname,
    gclid: a.gclid || null,
    gbraid: a.gbraid || null,
    wbraid: a.wbraid || null,
    utm_source: a.utm_source || null,
    utm_medium: a.utm_medium || null,
    utm_campaign: a.utm_campaign || null,
    utm_term: a.utm_term || null,
    utm_content: a.utm_content || null,
    landing_page: a.landing_page || null,
    referrer: a.referrer || document.referrer || null,
    ...extra,
  }

  // keepalive so the request still completes when the click immediately opens
  // the booking form in this tab or navigates away.
  try {
    fetch('/api/track-booking-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {})
  } catch (e) {
    // Never let a tracking failure block the booking itself.
  }
}

// Named helpers for the three conversion actions. Using these keeps the event
// name, the gtag call and the attribution log in one place per action.
export const trackBooking = (eventName = EVENTS.book, extra = {}) => trackConversion(eventName, extra)
export const trackWhatsApp = (extra = {}) => trackConversion(EVENTS.whatsapp, extra)
export const trackCall = (extra = {}) => trackConversion(EVENTS.call, extra)
