import { FAQS } from './faqs'

// The rendered FAQ and the schema are the same eight answers, from ./faqs.js.
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://anjanidixit.com' },
    { '@type': 'ListItem', position: 2, name: 'Laparoscopic Surgery', item: 'https://anjanidixit.com/laparoscopic-surgery' },
    { '@type': 'ListItem', position: 3, name: 'Hysterectomy', item: 'https://anjanidixit.com/hysterectomy' },
  ],
}

export const metadata = {
  title: 'Hysterectomy in Bangalore | Dr. Anjani Dixit',
  description: 'When a hysterectomy is genuinely needed, what is worth trying first, and what recovery actually takes — from a laparoscopic surgeon in Indiranagar.',
  keywords: 'hysterectomy bangalore, laparoscopic hysterectomy bangalore, uterus removal surgery bangalore, hysterectomy surgeon indiranagar, hysterectomy recovery, alternatives to hysterectomy',
  alternates: { canonical: 'https://anjanidixit.com/hysterectomy' },
  openGraph: {
    title: 'Hysterectomy in Bangalore | Dr. Anjani Dixit',
    description: 'When it is genuinely needed, what to try first, and what recovery really looks like. Keyhole hysterectomy by a laparoscopic surgeon in Indiranagar.',
    url: 'https://anjanidixit.com/hysterectomy',
    images: [{ url: 'https://anjanidixit.com/IMG-20251024-WA0023.jpg', width: 1200, height: 630, alt: 'Dr. Anjani Dixit operating — laparoscopic surgeon, Bangalore' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hysterectomy in Bangalore | Dr. Anjani Dixit',
    description: 'When it is genuinely needed, what to try first, and what recovery really looks like. Keyhole hysterectomy in Indiranagar, Bangalore.',
    images: ['https://anjanidixit.com/IMG-20251024-WA0023.jpg'],
  },
}

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  )
}
