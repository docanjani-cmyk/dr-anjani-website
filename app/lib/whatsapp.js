// Everything the /wa redirect needs to turn a tap into a traceable enquiry.
//
// The prefilled message text lives here, server-side, keyed by service — never
// in the link. A `?text=` a visitor can edit is a message any third party could
// put words into on Dr. Anjani's behalf, and the link is public.

export const WHATSAPP_NUMBER = '917411722580'

/** Prefilled openers, by `p` in /wa?p=… . Keys are stable: they end up in the database. */
export const WHATSAPP_MESSAGES = {
  general: 'Hi Dr. Anjani, I would like to book a consultation.',
  pcos: 'Hi Dr. Anjani, I would like to consult about PCOS treatment.',
  pregnancy: 'Hi Dr. Anjani, I would like to register for antenatal care.',
  ivf: 'Hi Dr. Anjani, I would like to consult about fertility treatment.',
  laparoscopy: 'Hi Dr. Anjani, I would like to consult about laparoscopic surgery.',
  cosmetic: 'Hi Dr. Anjani, I would like to consult about gynecosmetic treatment.',
  'ivf-second-opinion':
    'Hi Dr. Anjani, we are undergoing fertility treatment and would like a second opinion. I am sending our reports.',
  'laparoscopy-second-opinion':
    'Hi Dr. Anjani, I have been advised surgery by another doctor and would like a second opinion. I am sending my reports.',
}

export const DEFAULT_SERVICE = 'general'

/**
 * The link every WhatsApp control on the site points at. `service` picks the
 * opener, `placement` records which control was tapped (hero, sticky bar,
 * floating button…) so a low-performing placement is visible in the data.
 */
export function waHref(service = DEFAULT_SERVICE, placement) {
  const params = new URLSearchParams({ p: service })
  if (placement) params.set('s', placement)
  return `/wa?${params}`
}

// Ambiguous glyphs are left out: these codes get read off a phone screen and
// typed back into a spreadsheet, and 0/O and 1/I/L are where that goes wrong.
const ALPHABET = '23456789ABCDEFGHJKMNPQRSTVWXYZ'
const CODE_LENGTH = 5

/** A short reference code, e.g. A7K2Q. 30^5 ≈ 24M, so collisions are rare and handled. */
export function makeRefCode(randomBytes) {
  let code = ''
  for (let i = 0; i < CODE_LENGTH; i++) code += ALPHABET[randomBytes[i] % ALPHABET.length]
  return code
}

export const REF_CODE_PATTERN = new RegExp(`^[${ALPHABET}]{${CODE_LENGTH}}$`)
