const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'When should I register for antenatal care?',
      acceptedAnswer: { '@type': 'Answer', text: 'Ideally within the first 8–10 weeks of pregnancy. Early booking allows Dr. Anjani to establish your baseline health, identify any risk factors, and guide you through first-trimester screening tests. If you have a high-risk condition (PCOS, thyroid disorder, prior loss), earlier consultation is strongly recommended.' },
    },
    {
      '@type': 'Question',
      name: 'What makes a pregnancy high-risk?',
      acceptedAnswer: { '@type': 'Answer', text: 'A pregnancy may be classified as high-risk if you have pre-existing conditions (diabetes, hypertension, thyroid disorders, heart disease), are over 35, have had prior pregnancy complications, are carrying twins, or have uterine abnormalities. High-risk pregnancies require more frequent monitoring — Dr. Anjani specialises in exactly this.' },
    },
    {
      '@type': 'Question',
      name: 'What antenatal visits and scans will I need?',
      acceptedAnswer: { '@type': 'Answer', text: 'Dr. Anjani follows evidence-based antenatal protocols: early viability scan, NT scan at 11–13 weeks, anomaly scan at 18–20 weeks, and growth scans in the third trimester. Blood tests including NIPT, glucose tolerance, thyroid, and blood count are scheduled appropriately throughout.' },
    },
    {
      '@type': 'Question',
      name: 'Can I have a normal delivery or will I need a caesarean?',
      acceptedAnswer: { '@type': 'Answer', text: 'The mode of delivery depends on many factors — baby position, placental position, your health, and progress of labour. Dr. Anjani supports informed, evidence-based decision-making and will discuss your birth preferences openly. She is experienced in both normal vaginal delivery and LSCS (caesarean section).' },
    },
    {
      '@type': 'Question',
      name: 'Where will my delivery take place?',
      acceptedAnswer: { '@type': 'Answer', text: 'Antenatal consultations happen at Kasper Multi-Speciality Clinic, Indiranagar. Deliveries are conducted at partner hospitals where Dr. Anjani is a visiting consultant — including Motherhood Hospital (Indiranagar), Cloudnine (Old Airport Road), Manipal Hospital (Old Airport Road), Ayaansh Hospital (Indiranagar), and others across Bangalore. The hospital is chosen together with you during your antenatal care, based on your location, insurance coverage, budget, and any special care your pregnancy needs (such as NICU facilities).' },
    },
    {
      '@type': 'Question',
      name: 'I have PCOS — does that affect my pregnancy?',
      acceptedAnswer: { '@type': 'Answer', text: 'Women with PCOS have a slightly higher risk of gestational diabetes, pregnancy-induced hypertension, and preterm birth. Dr. Anjani has extensive experience managing pregnancies in women with PCOS, with enhanced monitoring and early intervention to ensure the best possible outcome.' },
    },
    {
      '@type': 'Question',
      name: 'What postnatal support do you provide?',
      acceptedAnswer: { '@type': 'Answer', text: 'Postnatal care includes a 6-week check-up to assess your physical recovery, mental wellbeing, breastfeeding support, and contraception counselling. Dr. Anjani remains available after delivery for any concerns — the care does not end when the baby arrives.' },
    },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.anjanidixit.com' },
    { '@type': 'ListItem', position: 2, name: 'Pregnancy Care', item: 'https://www.anjanidixit.com/pregnancy' },
  ],
}

export const metadata = {
  title: 'Pregnancy Care & High-Risk Obstetrics in Bangalore | Dr. Anjani Dixit',
  description: 'Expert antenatal care and high-risk pregnancy management in Bangalore. Dr. Anjani Dixit, DNB Obstetrics & Gynaecology, FOGSI Life Member, 14+ years experience. In-person & video consultations. Book now.',
  keywords: 'pregnancy care bangalore, obstetrician bangalore, high risk pregnancy bangalore, antenatal care indiranagar, gynecologist for pregnancy bangalore',
  alternates: { canonical: 'https://www.anjanidixit.com/pregnancy' },
  openGraph: {
    title: 'Pregnancy Care & High-Risk Obstetrics in Bangalore | Dr. Anjani Dixit',
    description: 'Personalised antenatal care and high-risk pregnancy expertise in Bangalore. DNB Obs & Gynae, FOGSI Life Member. 14+ years.',
    url: 'https://www.anjanidixit.com/pregnancy',
    images: [{ url: 'https://www.anjanidixit.com/IMG-20251024-WA0023.jpg', width: 1200, height: 630, alt: 'Dr. Anjani Dixit - Pregnancy & High-Risk Obstetrics, Bangalore' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pregnancy Care & High-Risk Obstetrics in Bangalore | Dr. Anjani Dixit',
    description: 'Personalised antenatal care and high-risk pregnancy expertise in Bangalore. DNB Obs & Gynae, FOGSI Life Member. 14+ years.',
    images: ['https://www.anjanidixit.com/IMG-20251024-WA0023.jpg'],
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
