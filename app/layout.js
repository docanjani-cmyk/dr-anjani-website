import './globals.css'
import Script from 'next/script'

export const metadata = {
  title: 'Dr. Anjani Dixit | Laparoscopic Surgeon & IVF Specialist, Bangalore',
  description: 'Dr. Anjani Dixit is a leading laparoscopic gynaecologic surgeon and IVF fertility specialist in Indiranagar, Bangalore. Expert in endometriosis, fibroids, PCOS, and advanced fertility treatment. 14+ years experience. 5.0 Google rating.',
  keywords: 'best gynecologist bangalore, IVF specialist bangalore, laparoscopic surgeon bangalore, fertility specialist bangalore, endometriosis treatment bangalore, fibroid surgery bangalore, PCOS treatment bangalore, Dr Anjani Dixit, gynecologist indiranagar',
  metadataBase: new URL('https://www.anjanidixit.com'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Dr. Anjani Dixit | Laparoscopic Surgeon & IVF Specialist',
    description: 'Advanced laparoscopic surgery and compassionate fertility care in Bangalore. 14+ years experience. 5.0 Google rating. 405 verified reviews.',
    url: 'https://www.anjanidixit.com',
    siteName: 'Dr. Anjani Dixit',
    images: [{ url: 'https://www.anjanidixit.com/IMG-20251024-WA0023.jpg', width: 1200, height: 630, alt: 'Dr. Anjani Dixit - Laparoscopic Surgeon & IVF Specialist, Bangalore' }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr. Anjani Dixit | Laparoscopic Surgeon & IVF Specialist',
    description: 'Advanced laparoscopic surgery and compassionate fertility care in Bangalore.',
    images: ['https://www.anjanidixit.com/IMG-20251024-WA0023.jpg'],
  },
  robots: { index: true, follow: true },
}

const physicianSchema = {
  '@context': 'https://schema.org',
  '@type': 'Physician',
  name: 'Dr. Anjani Dixit',
  description: 'Laparoscopic Gynecologic Surgeon, IVF & Fertility Specialist, and Obstetrician based in Indiranagar, Bangalore, India.',
  url: 'https://www.anjanidixit.com',
  telephone: '+917411722580',
  email: 'doc.anjani@gmail.com',
  image: 'https://www.anjanidixit.com/image.webp',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '31, 80 Feet Rd, Indiranagar',
    addressLocality: 'Bangalore',
    addressRegion: 'Karnataka',
    postalCode: '560038',
    addressCountry: 'IN',
  },
  medicalSpecialty: ['Obstetrics', 'Gynecology', 'ReproductiveMedicine'],
  hasCredential: ['MBBS', 'DNB - Obstetrics & Gynecology', 'FMAS'],
  hospitalAffiliation: [
    { '@type': 'Hospital', name: 'Motherhood Hospital, Indiranagar', address: { '@type': 'PostalAddress', addressLocality: 'Bangalore', addressRegion: 'Karnataka', addressCountry: 'IN' } },
    { '@type': 'Hospital', name: 'Cloudnine Hospital, Old Airport Road', address: { '@type': 'PostalAddress', addressLocality: 'Bangalore', addressRegion: 'Karnataka', addressCountry: 'IN' } },
    { '@type': 'Hospital', name: 'Manipal Hospital, Old Airport Road', address: { '@type': 'PostalAddress', addressLocality: 'Bangalore', addressRegion: 'Karnataka', addressCountry: 'IN' } },
    { '@type': 'Hospital', name: 'NR Clinic, Cambridge Layout', address: { '@type': 'PostalAddress', addressLocality: 'Bangalore', addressRegion: 'Karnataka', addressCountry: 'IN' } },
    { '@type': 'Hospital', name: 'Revive Hospital, Indiranagar', address: { '@type': 'PostalAddress', addressLocality: 'Bangalore', addressRegion: 'Karnataka', addressCountry: 'IN' } },
    { '@type': 'Hospital', name: 'Ayaansh Hospital, Indiranagar', address: { '@type': 'PostalAddress', addressLocality: 'Bangalore', addressRegion: 'Karnataka', addressCountry: 'IN' } },
    { '@type': 'Hospital', name: 'Nelivigi Multispeciality Hospital, Bellandur', address: { '@type': 'PostalAddress', addressLocality: 'Bangalore', addressRegion: 'Karnataka', addressCountry: 'IN' } },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '405',
    bestRating: '5',
  },
  openingHours: 'Mo-Sa 09:00-19:00',
  sameAs: [
    'https://www.linkedin.com/in/dr-anjani/',
    'https://www.facebook.com/anjani.dixit.5/',
    'https://www.practo.com/Bangalore/doctor/anjani-dixit-gynecologist-obstetrician',
  ],
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalClinic',
  name: 'Dr. Anjani Dixit – Kasper Multi-Speciality Clinic',
  url: 'https://www.anjanidixit.com',
  telephone: '+917411722580',
  email: 'doc.anjani@gmail.com',
  image: 'https://www.anjanidixit.com/IMG-20251024-WA0023.jpg',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '31, 80 Feet Rd, Indiranagar',
    addressLocality: 'Bangalore',
    addressRegion: 'Karnataka',
    postalCode: '560038',
    addressCountry: 'IN',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '405',
    bestRating: '5',
  },
  priceRange: '₹₹',
  sameAs: [
    'https://www.linkedin.com/in/dr-anjani/',
    'https://www.facebook.com/anjani.dixit.5/',
    'https://www.practo.com/Bangalore/doctor/anjani-dixit-gynecologist-obstetrician',
  ],
}

const homeFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What conditions do you specialise in?',
      acceptedAnswer: { '@type': 'Answer', text: 'Dr. Anjani specialises in advanced laparoscopic surgery (fibroids, endometriosis, ovarian cysts, hysterectomy), IVF and fertility treatment, high-risk obstetrics, PCOS management, and gynecosmetic procedures. She offers comprehensive care across all aspects of women\'s reproductive and gynaecological health.' },
    },
    {
      '@type': 'Question',
      name: 'How do I book a consultation?',
      acceptedAnswer: { '@type': 'Answer', text: 'You can book through our online Zoho appointment form, through Practo, by calling directly, or by messaging on WhatsApp. Dr. Anjani consults at Kasper Multi-Speciality Clinic, Indiranagar, Bangalore. Video consultations are available for initial evaluations and international patients.' },
    },
    {
      '@type': 'Question',
      name: 'Where are surgeries and deliveries performed?',
      acceptedAnswer: { '@type': 'Answer', text: 'OPD consultations happen at Kasper Multi-Speciality Clinic, Indiranagar. Surgeries, deliveries, and hospital admissions (IPD) are performed at partner hospitals where Dr. Anjani is a visiting consultant: Motherhood Hospital (Indiranagar), Cloudnine Hospital (Old Airport Road), Manipal Hospital (Old Airport Road), NR Clinic (Cambridge Layout), Revive Hospital (Indiranagar), Ayaansh Hospital (Indiranagar), and Nelivigi Multispeciality Hospital (Bellandur). The hospital is chosen together with you based on your location, insurance coverage, budget, and the facilities your procedure needs.' },
    },
    {
      '@type': 'Question',
      name: 'What are the consultation charges?',
      acceptedAnswer: { '@type': 'Answer', text: 'The consultation fee is ₹1000, and it stays valid for a full seven days from your visit. This means that if you return within the week — to discuss test results, clarify a prescription, or ask anything that came up after your appointment — no additional fee is charged. The idea is straightforward: once you have consulted, the cost should never be a barrier to coming back with questions.' },
    },
    {
      '@type': 'Question',
      name: 'Do you treat international or NRI patients?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Dr. Anjani regularly consults with patients from outside India, including NRIs and international patients seeking advanced laparoscopic surgery or IVF treatment in Bangalore. Video consultations for initial assessment can be arranged easily.' },
    },
    {
      '@type': 'Question',
      name: 'What is the recovery like after laparoscopic surgery?',
      acceptedAnswer: { '@type': 'Answer', text: 'Laparoscopic (keyhole) surgery is minimally invasive — most patients return home the same day or the next, with a recovery period of 1–2 weeks for most procedures. Dr. Anjani has performed over 300 such procedures and provides detailed post-operative guidance and monitoring.' },
    },
    {
      '@type': 'Question',
      name: 'What are the success rates for IVF?',
      acceptedAnswer: { '@type': 'Answer', text: 'IVF success depends on individual factors including age, diagnosis, ovarian reserve, and overall health. Dr. Anjani provides a thorough personal evaluation and honest, evidence-based guidance on your prognosis and the best treatment pathway for your specific situation.' },
    },
    {
      '@type': 'Question',
      name: 'Do you manage high-risk pregnancies?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Dr. Anjani has extensive experience managing high-risk pregnancies including those complicated by PCOS, thyroid disorders, fibroids, prior surgical history, advanced maternal age, and other conditions. She provides close, personalised antenatal monitoring.' },
    },
    {
      '@type': 'Question',
      name: 'What makes Dr. Anjani\'s approach different?',
      acceptedAnswer: { '@type': 'Answer', text: 'Dr. Anjani combines advanced surgical precision with deep emotional attentiveness. She takes time to truly understand your situation — medical, emotional, and personal. Patients consistently describe feeling seen, heard, and genuinely cared for, not processed through a system. She approaches women\'s health holistically, including emotional and psychological wellbeing.' },
    },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/uterus-favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/uterus-favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }}
        />
      </head>
      <body>
        {children}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-TKCQJPPP68" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-TKCQJPPP68');
          gtag('config', 'AW-1796712782');
        `}</Script>
      </body>
    </html>
  )
}
