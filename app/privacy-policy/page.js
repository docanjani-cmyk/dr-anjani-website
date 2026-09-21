const CFG = {
  clinic: 'Kasper Multi-Speciality Clinic',
  address: '31, 80 Feet Rd, Indiranagar, Bengaluru 560038',
  email: 'doc.anjani@gmail.com',
  phoneDisplay: '+91 74117 22580',
  bookingProvider: 'meet-my-doctor.firebaseapp.com',
}

export const metadata = {
  title: 'Privacy Policy | Dr. Anjani Dixit',
  description: 'How Dr. Anjani Dixit\'s clinic collects, uses, and protects the personal and health information you share when you book an appointment or contact the practice.',
  alternates: { canonical: 'https://anjanidixit.com/privacy-policy' },
  robots: { index: true, follow: true },
}

const Section = ({ title, children }) => (
  <section className="mb-10">
    <h2 className="text-xl font-semibold mb-3" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>{title}</h2>
    <div className="space-y-3 text-sm leading-relaxed" style={{ color: '#4A6860' }}>{children}</div>
  </section>
)

export default function PrivacyPolicyPage() {
  return (
    <div style={{ backgroundColor: '#FAFAF8', color: '#1A2E28', minHeight: '100vh' }}>
      <header className="sticky top-0 z-40" style={{ backgroundColor: 'rgba(250,250,248,0.96)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E3EDE9' }}>
        <nav className="max-w-3xl mx-auto px-5 py-4 flex items-center justify-between">
          <a href="/" className="text-sm font-semibold" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>Dr. Anjani Dixit</a>
          <a href="/" className="text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: '#2C5249' }}>← Back to Home</a>
        </nav>
      </header>

      <main className="max-w-3xl mx-auto px-5 py-12 lg:py-16">
        <h1 className="text-3xl lg:text-4xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28' }}>
          Privacy Policy
        </h1>
        <p className="text-sm mb-10" style={{ color: '#7A9C90' }}>Effective 21 September 2026</p>

        <Section title="Who this policy covers">
          <p>
            This policy explains how Dr. Anjani Dixit and {CFG.clinic} ({CFG.address}) handle the
            personal and health information you share through this website — including when you request
            an appointment, message us on WhatsApp, call the clinic, or simply browse the site.
          </p>
        </Section>

        <Section title="What we collect">
          <p><strong>When you book an appointment:</strong> your name, phone number, email address, and
            any reason for visit or medical notes you choose to enter into the booking form.</p>
          <p><strong>When you message or call us:</strong> your phone number and the content of your
            message, through WhatsApp or your phone carrier.</p>
          <p><strong>When you browse the site:</strong> standard analytics data (pages viewed, device
            type, approximate location) via Google Analytics, and — if you arrived from an ad — the ad
            click identifier and campaign parameters (e.g. gclid, utm_source), kept in a first-party
            cookie for up to 90 days so we can tell which ad led to a booking.</p>
        </Section>

        <Section title="How your booking is handled">
          <p>
            Appointments are scheduled through a third-party booking system hosted at{' '}
            <strong>{CFG.bookingProvider}</strong>, embedded on this site. When you submit that form, the
            details you enter go directly to that provider so the clinic can see and manage your booking —
            they are not stored on this website's own servers. That provider's own privacy and security
            practices apply to the data it holds; we choose to use it because it lets the clinic confirm
            appointments quickly, and we review what it collects to keep it limited to what booking
            requires.
          </p>
          <p>
            If you would rather not use the online form, you can always book by phone or WhatsApp instead —
            every page on this site has both as an alternative.
          </p>
        </Section>

        <Section title="Health information">
          <p>
            Anything you tell us about your medical history, symptoms, or reason for visit — whether in
            the booking form, on a call, or in person — is treated as confidential medical information. It
            is used only to prepare for and provide your care, and is not used for marketing or shared with
            any third party except where needed for your treatment (for example, a partner hospital where
            your procedure takes place) or where the law requires it.
          </p>
        </Section>

        <Section title="Why we use this information">
          <ul className="list-disc pl-5 space-y-2">
            <li>To schedule, confirm, and manage your appointment</li>
            <li>To contact you about your visit or follow-up care</li>
            <li>To understand which pages and ads bring genuine patient enquiries, so we can stop spending
              on what doesn't work</li>
            <li>To keep the practice's records, as required for medical record-keeping</li>
          </ul>
          <p>We do not sell your information, and we do not use your health details for advertising.</p>
        </Section>

        <Section title="Your choices">
          <ul className="list-disc pl-5 space-y-2">
            <li>You can ask what information we hold about you, or ask us to correct or delete an
              enquiry that hasn't yet become a medical record, by emailing{' '}
              <a href={`mailto:${CFG.email}`} className="underline" style={{ color: '#2C5249' }}>{CFG.email}</a>.</li>
            <li>You can decline analytics cookies through your browser's privacy settings — the site
              works fine without them, only our ability to measure ad performance is affected.</li>
            <li>You can choose to book by phone ({CFG.phoneDisplay}) or WhatsApp instead of the online
              form at any time.</li>
          </ul>
        </Section>

        <Section title="Security">
          <p>
            We take reasonable precautions to protect the information you share with us, but no method of
            transmission or storage is completely secure, and we cannot guarantee absolute security.
          </p>
        </Section>

        <Section title="Changes to this policy">
          <p>
            If how we handle your information changes meaningfully, we'll update this page and change the
            effective date above.
          </p>
        </Section>

        <Section title="Questions">
          <p>
            For any question about this policy or your information, contact Dr. Anjani Dixit's clinic at{' '}
            <a href={`mailto:${CFG.email}`} className="underline" style={{ color: '#2C5249' }}>{CFG.email}</a>{' '}
            or <a href="tel:7411722580" className="underline" style={{ color: '#2C5249' }}>{CFG.phoneDisplay}</a>.
          </p>
        </Section>
      </main>

      <footer className="py-8 px-5 text-center text-xs" style={{ backgroundColor: '#1A2E28', color: '#3D6A5C' }}>
        <p>© 2026 Dr. Anjani Dixit · {CFG.clinic} · {CFG.address}</p>
        <a href="/" className="mt-2 inline-block hover:text-white transition-colors">← Back to main site</a>
      </footer>
    </div>
  )
}
