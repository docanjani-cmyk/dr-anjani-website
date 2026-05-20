import './globals.css'
import Script from 'next/script'

export const metadata = {
  title: 'Dr. Anjani Dixit | Laparoscopic Surgeon & IVF Specialist, Bangalore',
  description: 'Dr. Anjani Dixit is a leading laparoscopic gynecologic surgeon and IVF fertility specialist in Indiranagar, Bangalore. Expert in endometriosis, fibroids, PCOS, and advanced fertility treatment. 12+ years experience. 5.0 Google rating.',
  keywords: 'best gynecologist bangalore, IVF specialist bangalore, laparoscopic surgeon bangalore, fertility specialist bangalore, endometriosis treatment bangalore, fibroid surgery bangalore, PCOS treatment bangalore, Dr Anjani Dixit, gynecologist indiranagar',
  metadataBase: new URL('https://www.anjanidixit.com'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Dr. Anjani Dixit | Laparoscopic Surgeon & IVF Specialist',
    description: 'Advanced laparoscopic surgery and compassionate fertility care in Bangalore. 12+ years experience. 5.0 Google rating. 347 verified reviews.',
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

const schemaMarkup = {
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
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '347',
    bestRating: '5',
  },
  openingHours: 'Mo-Sa 09:00-19:00',
  sameAs: [
    'https://www.linkedin.com/in/dr-anjani/',
    'https://www.facebook.com/anjani.dixit.5/',
    'https://www.practo.com/Bangalore/doctor/anjani-dixit-gynecologist-obstetrician',
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
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
