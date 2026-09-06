'use client'

import { trackCall, trackWhatsApp } from '../lib/attribution'
import { waHref } from '../lib/whatsapp'

// Tiny client leaves so a phone number or a WhatsApp button can sit inside an
// otherwise server-rendered section: the only thing they need the browser for
// is firing the conversion event on click.

export function CallLink({ children, className, style, ...rest }) {
  return (
    <a href="tel:7411722580" onClick={() => trackCall()} className={className} style={style} {...rest}>
      {children}
    </a>
  )
}

export function WhatsAppLink({ service = 'general', placement, children, className, style, ...rest }) {
  return (
    <a
      href={waHref(service, placement)}
      onClick={() => trackWhatsApp()}
      target="_blank" rel="noopener noreferrer"
      className={className} style={style} {...rest}
    >
      {children}
    </a>
  )
}
