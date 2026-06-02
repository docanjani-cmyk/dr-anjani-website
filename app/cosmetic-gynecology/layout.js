const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Are cosmetic gynaecology procedures safe?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. All gynecosmetic procedures performed by Dr. Anjani meet the highest standards of surgical safety. As a fellowship-trained gynaecological surgeon with 14+ years of experience, she brings the same precision and care to cosmetic procedures as she does to complex laparoscopic surgery.' },
    },
    {
      '@type': 'Question',
      name: 'Is my privacy completely protected?',
      acceptedAnswer: { '@type': 'Answer', text: 'Absolutely. All consultations and procedures are completely confidential. Dr. Anjani creates a safe, non-judgmental space where you can speak openly. Your records are never shared without your explicit consent.' },
    },
    {
      '@type': 'Question',
      name: 'What is the recovery like after cosmetic gynaecological procedures?',
      acceptedAnswer: { '@type': 'Answer', text: 'Recovery varies by procedure. Most patients resume normal activities within a few days to two weeks. Dr. Anjani provides detailed post-procedure care instructions and remains available for follow-up questions throughout your recovery.' },
    },
    {
      '@type': 'Question',
      name: 'Will I be judged for seeking these procedures?',
      acceptedAnswer: { '@type': 'Answer', text: 'Never. Dr. Anjani believes strongly in every woman\'s right to feel comfortable and confident in her body. These consultations are free of judgement — your reasons are your own, and they are always respected.' },
    },
    {
      '@type': 'Question',
      name: 'How do I know which cosmetic gynaecology procedure is right for me?',
      acceptedAnswer: { '@type': 'Answer', text: 'An initial consultation is the best first step. Dr. Anjani listens carefully to your concerns, explains all relevant options with their expected outcomes, and recommends only what she genuinely believes will benefit you. There is never any pressure.' },
    },
    {
      '@type': 'Question',
      name: 'Can cosmetic gynaecology procedures be combined with other treatments?',
      acceptedAnswer: { '@type': 'Answer', text: 'In many cases, yes. Perineal repair can be combined with prolapse correction. PRP therapy can be paired with hormonal management. Dr. Anjani discusses the full picture of your gynaecological health and identifies whether a combined approach is appropriate and beneficial.' },
    },
  ],
}

export const metadata = {
  title: 'Cosmetic Gynaecology in Bangalore | Dr. Anjani Dixit – Private & Confidential',
  description: 'Private, compassionate cosmetic gynaecology in Bangalore — labiaplasty, vaginal rejuvenation, hymenoplasty, perineal repair, PRP therapy. Dr. Anjani Dixit, fellowship-trained surgeon. Complete confidentiality.',
  keywords: 'cosmetic gynaecology bangalore, labiaplasty bangalore, vaginal rejuvenation bangalore, hymenoplasty bangalore, gynecosmetic bangalore, vaginoplasty bangalore',
  alternates: { canonical: 'https://www.anjanidixit.com/cosmetic-gynecology' },
  openGraph: {
    title: 'Cosmetic Gynaecology in Bangalore | Dr. Anjani Dixit',
    description: 'Private cosmetic gynaecology procedures in Bangalore. Fellowship-trained surgeon. Complete confidentiality and no judgement.',
    url: 'https://www.anjanidixit.com/cosmetic-gynecology',
  },
}

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  )
}
