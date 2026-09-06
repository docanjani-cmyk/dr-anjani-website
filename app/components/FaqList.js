// A server component: <details> gives an accordion with no JavaScript at all,
// so the FAQ costs nothing beyond its own markup. The answers stay in the DOM
// when collapsed, as they did with the old max-height version, so they remain
// indexable and match the FAQPage schema.
export default function FaqList({ faqs }) {
  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => (
        <details key={i} className="faq rounded-2xl overflow-hidden bg-white" style={{ border: '1px solid #E3EDE9' }}>
          <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer">
            <span className="font-medium text-sm" style={{ color: '#1A2E28' }}>{faq.q}</span>
            <span
              className="faq-icon flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300"
              style={{ backgroundColor: '#E3EDE9', color: '#2C5249' }}
              aria-hidden="true"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </span>
          </summary>
          <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: '#5A7870' }}>{faq.a}</p>
        </details>
      ))}
    </div>
  )
}
