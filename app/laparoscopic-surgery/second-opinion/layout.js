import { CONTENT } from './content'

const URL = 'https://anjanidixit.com/laparoscopic-surgery/second-opinion'
const OG_IMAGE = 'https://anjanidixit.com/IMG-20251024-WA0023.jpg'
const TITLE = 'Second Opinion Before Gynaecological Surgery | Bangalore'
const DESC = 'Been advised a hysterectomy or open surgery? Dr. Anjani Dixit reviews your scans and tells you whether the operation is needed and whether it can be done laparoscopically. FMAS, 300+ keyhole procedures, Indiranagar, Bangalore.'

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
    { '@type': 'ListItem', position: 2, name: 'Laparoscopic Surgery', item: 'https://anjanidixit.com/laparoscopic-surgery' },
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
  about: { '@type': 'MedicalProcedure', name: 'Laparoscopic gynaecological surgery', procedureType: 'https://schema.org/SurgicalProcedure' },
  lastReviewed: '2026-08-26',
  reviewedBy: {
    '@type': 'Physician',
    name: 'Dr. Anjani Dixit',
    url: 'https://anjanidixit.com',
    medicalSpecialty: ['Obstetrics', 'Gynecology'],
  },
}

export const metadata = {
  title: TITLE,
  description: DESC,
  keywords: 'second opinion gynaecologist bangalore, hysterectomy second opinion, fibroid surgery second opinion bangalore, avoid hysterectomy fibroids, do i need a hysterectomy, myomectomy instead of hysterectomy bangalore, endometriosis second opinion bangalore',
  alternates: { canonical: URL },
  openGraph: {
    title: 'Second Opinion Before Gynaecological Surgery | Dr. Anjani Dixit',
    description: 'Advised a hysterectomy or open surgery? Have your scans reviewed before you agree. FMAS surgeon, 300+ laparoscopic procedures, Bangalore.',
    url: URL,
    type: 'article',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Dr. Anjani Dixit — laparoscopic gynaecological surgeon, Bangalore' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Second Opinion Before Gynaecological Surgery | Dr. Anjani Dixit',
    description: 'Advised a hysterectomy or open surgery? Have your scans reviewed before you agree.',
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
