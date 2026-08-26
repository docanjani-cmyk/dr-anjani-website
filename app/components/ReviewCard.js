'use client'

const Star = () => (
  <svg className="w-4 h-4" fill="#F59E0B" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

/** Google "G", inlined so review cards never depend on an external asset. */
const GoogleG = () => (
  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 48 48" role="img" aria-label="Google review">
    <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
    <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
    <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
    <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
  </svg>
)

const Practo = () => (
  <span className="flex-shrink-0 font-bold px-1.5 py-0.5 rounded"
    style={{ backgroundColor: '#5B2D8E', color: 'white', fontSize: '10px', letterSpacing: '0.02em' }}>Practo</span>
)

/**
 * One review card. Google reviews link to the original review so anything shown
 * here can be checked at the source; Practo reviews render as a plain card.
 */
export default function ReviewCard({ review: t, className = '', avatarClass = 'w-11 h-11' }) {
  const Card = t.url ? 'a' : 'div'
  const linkProps = t.url
    ? { href: t.url, target: '_blank', rel: 'noopener noreferrer nofollow', 'aria-label': `Read ${t.name}'s review on Google` }
    : {}

  return (
    <Card
      {...linkProps}
      className={`rounded-2xl p-6 flex flex-col no-underline${t.url ? ' hover:shadow-md transition-shadow duration-200' : ''} ${className}`}
      style={{ backgroundColor: '#FAFAF8', border: '1px solid #E3EDE9' }}
    >
      <div className="flex items-center gap-3 mb-4">
        {t.img ? (
          <>
            <img src={t.img} alt="" loading="lazy" width="44" height="44"
              className={`${avatarClass} rounded-full object-cover flex-shrink-0`}
              onError={e => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.nextElementSibling.style.display = 'flex'
              }} />
            <div className={`${avatarClass} rounded-full flex-shrink-0 items-center justify-center text-sm font-semibold`}
              style={{ display: 'none', backgroundColor: '#E3EDE9', color: '#2C5249' }}>{t.name.charAt(0).toUpperCase()}</div>
          </>
        ) : (
          <div className={`${avatarClass} rounded-full flex-shrink-0 flex items-center justify-center text-sm font-semibold`}
            style={{ backgroundColor: '#E3EDE9', color: '#2C5249' }}>{t.name.charAt(0).toUpperCase()}</div>
        )}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm truncate" style={{ color: '#1A2E28' }}>{t.name}</div>
          <div className="text-xs truncate" style={{ color: '#7A9C90' }}>{t.condition}</div>
        </div>
        {t.source === 'practo' ? <Practo /> : <GoogleG />}
      </div>

      <div className="flex items-center gap-2 mb-3">
        <div className="flex gap-0.5" role="img" aria-label={`${t.rating} out of 5 stars`}>
          {[...Array(t.rating)].map((_, j) => <Star key={j} />)}
        </div>
        <span className="text-xs" style={{ color: '#7A9C90' }}>{t.date}</span>
      </div>

      <p className="text-sm leading-relaxed flex-1 whitespace-pre-line review-body" style={{ color: '#4A6860' }}>{t.review}</p>

      {t.url && (
        <span className="mt-4 text-xs font-medium inline-flex items-center gap-1" style={{ color: '#2C5249' }}>
          Read on Google
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5h5v5M19 5l-8 8M18 13v6H5V6h6" />
          </svg>
        </span>
      )}
    </Card>
  )
}

/** Grid of review cards. */
export function ReviewGrid({ reviews, columns = 'md:grid-cols-2 lg:grid-cols-3', reveal = false }) {
  return (
    <div className={`grid ${columns} gap-5`}>
      {reviews.map((t, i) => (
        <ReviewCard key={`${t.name}-${i}`} review={t} className={reveal ? `reveal reveal-delay-${(i % 3) + 1}` : ''} />
      ))}
    </div>
  )
}
