const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is laparoscopic surgery and how is it different from open surgery?',
      acceptedAnswer: { '@type': 'Answer', text: 'Laparoscopic (keyhole) surgery uses small incisions of 5–10 mm through which a camera and instruments are inserted. Unlike open surgery, there is no large abdominal cut — meaning less pain, significantly faster recovery, minimal scarring, and lower risk of infection. Most patients go home within 24 hours.' },
    },
    {
      '@type': 'Question',
      name: 'What conditions can be treated laparoscopically?',
      acceptedAnswer: { '@type': 'Answer', text: 'Dr. Anjani performs laparoscopic treatment for uterine fibroids (myomectomy), endometriosis (including deeply infiltrating disease), ovarian cysts, hysterectomy (uterus removal), diagnostic laparoscopy, and adhesiolysis. Most gynaecological conditions that previously required open surgery can now be done laparoscopically.' },
    },
    {
      '@type': 'Question',
      name: 'How long is recovery after laparoscopic surgery?',
      acceptedAnswer: { '@type': 'Answer', text: 'Most patients resume light activity within 3–5 days and return to normal work within 1–2 weeks. This compares to 4–6 weeks for open surgery. Dr. Anjani provides detailed post-operative instructions and remains available for follow-up throughout your recovery.' },
    },
    {
      '@type': 'Question',
      name: 'Is laparoscopic surgery safe? What are the risks?',
      acceptedAnswer: { '@type': 'Answer', text: 'Laparoscopic surgery is well-established and safe. With over 300 laparoscopic procedures performed, Dr. Anjani has extensive experience managing all stages of complexity. As with any surgery, minor risks exist (anaesthetic reactions, minor bleeding) but serious complications are rare and significantly lower than with open procedures.' },
    },
    {
      '@type': 'Question',
      name: 'Will laparoscopic surgery affect my fertility?',
      acceptedAnswer: { '@type': 'Answer', text: 'For most conditions — including fibroid removal and endometriosis excision — laparoscopic surgery is performed with fertility preservation as a key goal. Dr. Anjani discusses your fertility plans in detail before recommending any procedure and tailors the surgical approach accordingly.' },
    },
    {
      '@type': 'Question',
      name: 'How do I know if I need laparoscopic surgery vs. medication?',
      acceptedAnswer: { '@type': 'Answer', text: 'Not all conditions require surgery. During your consultation, Dr. Anjani will review your symptoms, imaging, and history to recommend the most appropriate treatment — which may be medical management, surgery, or a combination. Surgery is only recommended when it offers a clear benefit over non-surgical options.' },
    },
  ],
}

export const metadata = {
  title: 'Laparoscopic Surgery in Bangalore | Dr. Anjani Dixit – FMAS Surgeon',
  description: 'Expert laparoscopic (keyhole) surgery for fibroids, endometriosis, ovarian cysts & hysterectomy in Bangalore. Dr. Anjani Dixit, Fellowship in Minimal Access Surgery, 300+ laparoscopic procedures, 5.0 Google rating. Book today.',
  keywords: 'laparoscopic surgery bangalore, laparoscopic hysterectomy bangalore, fibroid surgery bangalore, endometriosis surgery bangalore, ovarian cyst surgery bangalore, keyhole surgery gynecologist bangalore',
  alternates: { canonical: 'https://www.anjanidixit.com/laparoscopic-surgery' },
  openGraph: {
    title: 'Laparoscopic Surgery in Bangalore | Dr. Anjani Dixit',
    description: 'Minimally invasive gynaecological surgery — fibroids, endometriosis, hysterectomy. 300+ laparoscopic procedures. Fellowship in Minimal Access Surgery.',
    url: 'https://www.anjanidixit.com/laparoscopic-surgery',
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
