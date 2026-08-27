const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is PCOS / PCOD and how do I know if I have it?',
      acceptedAnswer: { '@type': 'Answer', text: 'PCOS (Polycystic Ovary Syndrome) is a hormonal condition affecting ovulation. It is diagnosed when at least two of three criteria are present: irregular or absent periods, elevated androgen hormones (causing acne, excess hair), and polycystic ovaries on ultrasound. A blood test and scan are all that is needed to confirm the diagnosis.' },
    },
    {
      '@type': 'Question',
      name: 'Can PCOS be cured?',
      acceptedAnswer: { '@type': 'Answer', text: 'PCOS cannot be cured but it can be very effectively managed. With the right combination of lifestyle changes, medication, and monitoring, most women with PCOS achieve regular cycles, improved hormonal balance, clear skin, healthy weight, and — when desired — successful pregnancy.' },
    },
    {
      '@type': 'Question',
      name: 'Does PCOS mean I cannot get pregnant?',
      acceptedAnswer: { '@type': 'Answer', text: 'No. PCOS is a leading cause of infertility but it is also one of the most treatable. Many women with PCOS conceive naturally with lifestyle modification alone. Others require ovulation induction or IVF. Dr. Anjani will assess your specific situation and recommend the most appropriate path.' },
    },
    {
      '@type': 'Question',
      name: 'What is the treatment for PCOS?',
      acceptedAnswer: { '@type': 'Answer', text: 'Treatment is tailored to your goals. For cycle regulation: lifestyle changes, metformin, or hormonal therapy. For acne/hair: anti-androgens and targeted skincare advice. For fertility: ovulation induction, IUI, or IVF. Dr. Anjani integrates all aspects of your health — not just one symptom.' },
    },
    {
      '@type': 'Question',
      name: 'How does weight affect PCOS?',
      acceptedAnswer: { '@type': 'Answer', text: 'Even a 5–10% reduction in body weight in women with overweight-related PCOS can significantly restore ovulation and improve hormonal balance. However, PCOS also exists in lean women — weight is not the only factor, and Dr. Anjani avoids a one-size-fits-all approach.' },
    },
    {
      '@type': 'Question',
      name: 'What tests will I need for PCOS?',
      acceptedAnswer: { '@type': 'Answer', text: 'Typically: hormonal blood tests (LH, FSH, AMH, testosterone, insulin, thyroid), a pelvic ultrasound, and sometimes a glucose tolerance test. Dr. Anjani reviews all results with you at your follow-up and explains exactly what each finding means for your health and treatment.' },
    },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://anjanidixit.com' },
    { '@type': 'ListItem', position: 2, name: 'PCOS & PCOD Treatment', item: 'https://anjanidixit.com/pcos' },
  ],
}

export const metadata = {
  title: 'PCOS & PCOD Treatment in Bangalore | Dr. Anjani Dixit – Gynaecologist',
  description: 'Comprehensive PCOS and PCOD management in Bangalore — irregular periods, hormonal imbalance, fertility, weight and acne. Dr. Anjani Dixit, 14+ years experience, FOGSI Life Member. Book a consultation.',
  keywords: 'PCOS treatment bangalore, PCOD doctor bangalore, polycystic ovary syndrome bangalore, PCOS specialist indiranagar, PCOS fertility bangalore',
  alternates: { canonical: 'https://anjanidixit.com/pcos' },
  openGraph: {
    title: 'PCOS & PCOD Treatment in Bangalore | Dr. Anjani Dixit',
    description: 'Expert PCOS management in Bangalore — cycles, hormones, weight, fertility. Holistic, evidence-based care. 14+ years experience.',
    url: 'https://anjanidixit.com/pcos',
    images: [{ url: 'https://anjanidixit.com/IMG-20251024-WA0023.jpg', width: 1200, height: 630, alt: 'Dr. Anjani Dixit - PCOS Specialist, Bangalore' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PCOS & PCOD Treatment in Bangalore | Dr. Anjani Dixit',
    description: 'Expert PCOS management in Bangalore — cycles, hormones, weight, fertility. Holistic, evidence-based care. 14+ years experience.',
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
