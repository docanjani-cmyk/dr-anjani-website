import { CONTENT } from './content'

const URL = 'https://anjanidixit.com/ivf-infertility/second-opinion'
const OG_IMAGE = 'https://anjanidixit.com/IMG-20251024-WA0023.jpg'
const TITLE = 'IVF Second Opinion in Bangalore | Dr. Anjani Dixit'
const DESC = 'A failed IVF cycle with no explanation is worth a second look. Your full records reviewed in Bangalore before you commit to another cycle.'

// Built from the same CONTENT the page renders, so the markup always matches
// the visible questions and answers.
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: CONTENT.faqs.map(f => ({
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
    { '@type': 'ListItem', position: 2, name: 'IVF & Infertility', item: 'https://anjanidixit.com/ivf-infertility' },
    { '@type': 'ListItem', position: 3, name: 'Second Opinion', item: URL },
  ],
}

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: TITLE,
  description: DESC,
  url: URL,
  audience: { '@type': 'Patient' },
  about: { '@type': 'MedicalProcedure', name: 'In vitro fertilisation and fertility treatment' },
  lastReviewed: '2026-08-26',
  reviewedBy: {
    '@type': 'Physician',
    name: 'Dr. Anjani Dixit',
    url: 'https://anjanidixit.com',
    medicalSpecialty: ['ReproductiveMedicine', 'Obstetrics', 'Gynecology'],
  },
}

export const metadata = {
  title: TITLE,
  description: DESC,
  keywords: 'ivf second opinion bangalore, failed ivf cycle what next, fertility second opinion bangalore, ivf not working, do i really need ivf, ivf review consultation bangalore, endometriosis infertility second opinion',
  alternates: { canonical: URL },
  openGraph: {
    title: 'IVF & Fertility Second Opinion in Bangalore | Dr. Anjani Dixit',
    description: 'Before you start another cycle, have the whole file reviewed — cycle records, embryology reports, and the structural causes that get missed.',
    url: URL,
    type: 'article',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Dr. Anjani Dixit — fertility specialist and laparoscopic surgeon, Bangalore' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IVF & Fertility Second Opinion in Bangalore | Dr. Anjani Dixit',
    description: 'Before you start another cycle, have the whole file reviewed by a fertility specialist who is also a laparoscopic surgeon.',
    images: [OG_IMAGE],
  },
}

export default function Layout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      {children}
    </>
  )
}
