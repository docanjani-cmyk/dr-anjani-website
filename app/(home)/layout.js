// The homepage FAQ markup lives here rather than in the root layout: Google
// requires FAQ schema to match the questions visible on that page, so it must
// not be emitted on every route.
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
      acceptedAnswer: { '@type': 'Answer', text: 'You can book through our online appointment form, by calling directly, or by messaging on WhatsApp. Dr. Anjani consults at Kasper Multi-Speciality Clinic, Indiranagar, Bangalore. Video consultations are available for initial evaluations and international patients.' },
    },
    {
      '@type': 'Question',
      name: 'Where are surgeries and deliveries performed?',
      acceptedAnswer: { '@type': 'Answer', text: 'OPD consultations happen at Kasper Multi-Speciality Clinic, Indiranagar. Surgeries, deliveries, and hospital admissions (IPD) are performed at partner hospitals where Dr. Anjani is a visiting consultant: Motherhood Hospital (Indiranagar), Cloudnine Hospital (Old Airport Road), Manipal Hospital (Old Airport Road), Milann Fertility Center (Indiranagar), Revive Hospital (Indiranagar), and Ayaansh Hospital (Indiranagar). The hospital is chosen together with you based on your location, insurance coverage, budget, and the facilities your procedure needs.' },
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

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }}
      />
      {children}
    </>
  )
}
