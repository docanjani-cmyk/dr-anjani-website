'use client'

import { Children, cloneElement, isValidElement, useState } from 'react'

/**
 * A card grid that shows only its first few cards on a phone.
 *
 * Same bargain as ReviewGrid and PhotoGallery: cards past `limit` are hidden
 * with CSS rather than dropped, so every card is still in the HTML for
 * crawlers and one tap brings them back. From md up the whole grid shows and
 * this behaves like a plain wrapper.
 */
export default function MobileMore({ children, limit, label, className = '' }) {
  const [expanded, setExpanded] = useState(false)

  const cards = Children.toArray(children)
  const capped = !expanded && cards.length > limit

  return (
    <>
      <div className={className}>
        {cards.map((card, i) =>
          capped && i >= limit && isValidElement(card)
            ? cloneElement(card, { className: `${card.props.className || ''} hidden md:block`.trim() })
            : card
        )}
      </div>

      {cards.length > limit && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="md:hidden w-full mt-5 py-3.5 rounded-full text-sm font-semibold"
          style={{ border: '1px solid #2C5249', color: '#2C5249', backgroundColor: 'transparent' }}
          aria-expanded={expanded}
        >
          {expanded ? `Show fewer ${label}` : `Show all ${cards.length} ${label}`}
        </button>
      )}
    </>
  )
}
