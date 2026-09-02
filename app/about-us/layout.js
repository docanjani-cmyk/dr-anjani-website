const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Who is Dr. Anjani Dixit?',
      acceptedAnswer: { '@type': 'Answer', text: 'Dr. Anjani Dixit is a laparoscopic gynaecologic surgeon, IVF and fertility specialist, and obstetrician based in Indiranagar, Bangalore. She has over 14 years of experience and has performed 1500+ successful procedures, with a 5.0 Google rating across 420 reviews.' },
    },
    {
      '@type': 'Question',
      name: "What are Dr. Anjani Dixit's medical qualifications?",
      acceptedAnswer: { '@type': 'Answer', text: 'Dr. Anjani holds an MBBS from IPGME&R and SSKM Hospital, Kolkata, and a DNB in Obstetrics & Gynaecology from Holy Family Hospital, New Delhi. She is a Fellow in Minimal Access Surgery (FMAS) and holds a Reproductive Medicine certification from the Indian College of Obstetrics and Gynaecology (ICOG). She is a Life Member of FOGSI, AMASI, AOGD, and ASI.' },
    },
    {
      '@type': 'Question',
      name: 'How many years of experience does Dr. Anjani have?',
      acceptedAnswer: { '@type': 'Answer', text: 'Dr. Anjani has 14+ years of clinical and surgical experience in obstetrics, gynaecology, laparoscopic surgery, and fertility medicine, and has been practising in Indiranagar, Bangalore since 2013.' },
    },
    {
      '@type': 'Question',
      name: 'Where does Dr. Anjani Dixit practice in Bangalore?',
      acceptedAnswer: { '@type': 'Answer', text: 'Outpatient consultations take place at Kasper Multi-Speciality Clinic, 31, 80 Feet Rd, Indiranagar, Bengaluru, Monday to Saturday, 9 AM to 7 PM. Video consultations are also available.' },
    },
    {
      '@type': 'Question',
      name: 'Which hospitals is Dr. Anjani associated with?',
      acceptedAnswer: { '@type': 'Answer', text: 'Dr. Anjani is a visiting consultant for surgeries, deliveries, and hospital admissions at Motherhood Hospital, Cloudnine Hospital, Manipal Hospital, Milann Fertility Center, Revive Hospital, and Ayaansh Hospital across Bangalore. The hospital is chosen together with the patient based on location, insurance, budget, and procedure needs.' },
    },
    {
      '@type': 'Question',
      name: 'Does Dr. Anjani see international or NRI patients?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Dr. Anjani regularly consults with NRI and international patients seeking laparoscopic surgery or IVF treatment in Bangalore, and video consultations can be arranged for an initial evaluation.' },
    },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://anjanidixit.com' },
    { '@type': 'ListItem', position: 2, name: 'About Dr. Anjani Dixit', item: 'https://anjanidixit.com/about-us' },
  ],
}

export const metadata = {
  title: 'About Dr. Anjani Dixit | Gynaecologist, Bangalore',
  description: "Laparoscopic surgeon and IVF specialist in Indiranagar, Bangalore. 14+ years, 1500+ procedures, and the six hospitals where she operates.",
  keywords: 'about dr anjani dixit, dr anjani dixit qualifications, gynecologist bangalore biography, laparoscopic surgeon indiranagar, IVF specialist bangalore about, dr anjani dixit MBBS DNB FMAS',
  alternates: { canonical: 'https://anjanidixit.com/about-us' },
  openGraph: {
    title: 'About Dr. Anjani Dixit | Laparoscopic Surgeon & IVF Specialist',
    description: 'MBBS, DNB (OBG), FMAS. 14+ years experience, 1500+ procedures, FOGSI Life Member. Meet the surgeon behind the care.',
    url: 'https://anjanidixit.com/about-us',
    images: [{ url: 'https://anjanidixit.com/IMG-20251024-WA0023.jpg', width: 1200, height: 630, alt: 'Dr. Anjani Dixit - Laparoscopic Surgeon & IVF Specialist, Bangalore' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Dr. Anjani Dixit | Laparoscopic Surgeon & IVF Specialist',
    description: 'MBBS, DNB (OBG), FMAS. 14+ years experience, 1500+ procedures, FOGSI Life Member.',
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
