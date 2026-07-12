import Home from '../page'

export const metadata = {
  title: 'Book an Appointment | Dr. Anjani Dixit — Gynecologist, Bangalore',
  description: 'Book a consultation with Dr. Anjani Dixit — laparoscopic surgeon, IVF specialist & obstetrician in Indiranagar, Bangalore. Online booking with instant confirmation.',
  alternates: { canonical: '/' },
  robots: { index: false, follow: true },
}

export default function BookAppointmentPage() {
  return <Home initialBookingOpen />
}
