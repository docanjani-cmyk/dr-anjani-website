const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'When should I see a fertility specialist?',
      acceptedAnswer: { '@type': 'Answer', text: 'If you are under 35 and have been trying to conceive for 12 months without success, or over 35 and trying for 6 months, it is time to seek evaluation. You should see a specialist sooner if you have irregular periods, a known condition like PCOS or endometriosis, or a history of miscarriage.' },
    },
    {
      '@type': 'Question',
      name: 'What does a fertility evaluation involve?',
      acceptedAnswer: { '@type': 'Answer', text: 'A thorough evaluation includes a detailed history, hormonal blood tests (AMH, FSH, LH, thyroid), an ultrasound assessment of ovarian reserve and uterine anatomy, and a semen analysis for your partner. Dr. Anjani reviews all findings with you in plain language and recommends the most appropriate next step.' },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between IUI and IVF?',
      acceptedAnswer: { '@type': 'Answer', text: 'IUI (intrauterine insemination) is a simpler procedure where washed sperm is placed directly into the uterus around ovulation. It is less invasive and less expensive, but has lower success rates than IVF. IVF (in vitro fertilisation) involves stimulating the ovaries, retrieving eggs, fertilising them in a lab, and transferring the resulting embryo. IVF is recommended when IUI has failed, tubes are blocked, or sperm parameters are significantly reduced.' },
    },
    {
      '@type': 'Question',
      name: 'What are the success rates for IVF?',
      acceptedAnswer: { '@type': 'Answer', text: 'IVF success depends on age, ovarian reserve, cause of infertility, and embryo quality. Success rates are highest under 35 and decline with age. Dr. Anjani provides an honest, personalised assessment of your prognosis based on your specific investigations — not generic statistics.' },
    },
    {
      '@type': 'Question',
      name: 'How many IVF cycles might I need?',
      acceptedAnswer: { '@type': 'Answer', text: 'Many couples conceive within 1–3 cycles. Dr. Anjani will review your response to the first cycle before recommending a plan for subsequent attempts. The decision is always collaborative, and emotional readiness is taken into account alongside medical factors.' },
    },
    {
      '@type': 'Question',
      name: 'Can structural problems like fibroids or blocked tubes be treated before IVF?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Conditions like submucous fibroids, polyps, blocked fallopian tubes, or a uterine septum can reduce IVF success and are often best corrected surgically before proceeding. Dr. Anjani\'s expertise in both laparoscopic surgery and fertility treatment means she can manage all aspects of your care in one place.' },
    },
  ],
}

export const metadata = {
  title: 'IVF & Fertility Treatment in Bangalore | Dr. Anjani Dixit',
  description: 'Compassionate IVF, IUI and fertility treatment in Bangalore by Dr. Anjani Dixit — ICOG certified, 14+ years experience. Thorough evaluation, honest guidance, and complete emotional support. Book a consultation.',
  keywords: 'IVF specialist bangalore, fertility treatment bangalore, IUI bangalore, infertility doctor bangalore, IVF clinic indiranagar, fertility specialist bangalore',
  alternates: { canonical: 'https://www.anjanidixit.com/ivf-infertility' },
  openGraph: {
    title: 'IVF & Fertility Treatment in Bangalore | Dr. Anjani Dixit',
    description: 'Compassionate IVF, IUI and fertility treatment in Bangalore. ICOG certified. 14+ years experience. Honest guidance at every step.',
    url: 'https://www.anjanidixit.com/ivf-infertility',
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
