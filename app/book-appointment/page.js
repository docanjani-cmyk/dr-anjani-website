'use client'

import { useState, useEffect } from 'react'

const track = (e, data = {}) => {
  window.gtag?.('event', e, data)
}

const SERVICES = [
  { id: 'laparoscopic', name: 'Laparoscopic Surgery' },
  { id: 'ivf', name: 'IVF & Fertility Treatment' },
  { id: 'pregnancy', name: 'Pregnancy Care' },
  { id: 'pcos', name: 'PCOS Management' },
  { id: 'cosmetic', name: 'Cosmetic Gynecology' },
  { id: 'consultation', name: 'General Consultation' },
]

export default function BookAppointmentPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    service: '',
    preferredDate: '',
    preferredTime: '',
    notes: '',
    consent: false,
  })

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const validateForm = () => {
    if (!formData.fullName.trim()) return 'Please enter your name'
    if (!formData.email.trim()) return 'Please enter your email'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Please enter a valid email'
    if (!formData.phone.trim()) return 'Please enter your phone number'
    if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) return 'Please enter a valid 10-digit phone number'
    if (!formData.service) return 'Please select a service'
    if (!formData.preferredDate) return 'Please select a preferred date'
    if (!formData.preferredTime) return 'Please select a preferred time'
    if (!formData.consent) return 'Please accept the terms and conditions'
    return ''
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      track('appointment_form_error', { error: validationError })
      return
    }

    setLoading(true)
    setError('')

    try {
      // Track form submission in Google Analytics
      track('appointment_form_submitted', {
        service: formData.service,
        source: 'website_form',
        event_category: 'appointment',
      })

      // Track conversion in Google Ads
      window.gtag?.('event', 'conversion', {
        send_to: 'AW-1796712782/6962668268',
        value: 1000,
        currency: 'INR',
        transaction_id: `apt_${Date.now()}`,
      })

      // Submit to backend
      const response = await fetch('/api/book-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          submitted_at: new Date().toISOString(),
          source: 'website_form',
        }),
      })

      if (!response.ok) throw new Error('Failed to submit form')

      setSubmitted(true)
      setFormData({
        fullName: '', email: '', phone: '', age: '', service: '',
        preferredDate: '', preferredTime: '', notes: '', consent: false,
      })

      track('appointment_form_success', { service: formData.service })

      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      setError('Failed to submit form. Please try again or call us.')
      track('appointment_form_submit_error', { error: err.message })
    } finally {
      setLoading(false)
    }
  }

  const today = new Date().toISOString().split('T')[0]
  const maxDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

  return (
    <div style={{ backgroundColor: '#FAFAF8', color: '#1A2E28', minHeight: '100vh' }}>
      {/* NAV */}
      <header
        className="sticky top-0 z-40 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(250,250,248,0.96)' : 'rgba(250,250,248,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: scrolled ? '1px solid #E3EDE9' : '1px solid transparent',
        }}
      >
        <nav className="max-w-6xl mx-auto px-5 lg:px-8 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28', fontWeight: 600 }}>
              Dr. Anjani Dixit
            </div>
          </a>
          <a
            href="/"
            className="text-sm font-medium"
            style={{ color: '#2C5249' }}
          >
            ← Back to Home
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #f5f0e8 0%, #fafaf8 55%, #eef4f1 100%)' }} className="py-12 lg:py-20">
        <div className="max-w-2xl mx-auto px-5 lg:px-8 text-center">
          <h1
            style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28', fontSize: '2.5rem', lineHeight: 1.2, marginBottom: '1rem' }}
            className="font-bold"
          >
            Book Your Consultation
          </h1>
          <p style={{ color: '#5A7870', fontSize: '1.1rem' }}>
            Schedule an appointment with Dr. Anjani Dixit. We'll confirm your booking within 24 hours.
          </p>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="py-12 lg:py-20 px-5 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 lg:p-12" style={{ border: '1px solid #E3EDE9' }}>
          {submitted && (
            <div className="mb-6 p-4 rounded-2xl text-center" style={{ backgroundColor: '#D1FAE5', color: '#065F46' }}>
              ✓ Thank you! We'll contact you within 24 hours to confirm your appointment.
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 rounded-2xl text-center" style={{ backgroundColor: '#FEE2E2', color: '#991B1B' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#1A2E28' }}>
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full px-4 py-3 rounded-xl border"
                style={{ borderColor: '#E3EDE9', backgroundColor: '#FAFAF8' }}
              />
            </div>

            {/* Email & Phone */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1A2E28' }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl border"
                  style={{ borderColor: '#E3EDE9', backgroundColor: '#FAFAF8' }}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1A2E28' }}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  className="w-full px-4 py-3 rounded-xl border"
                  style={{ borderColor: '#E3EDE9', backgroundColor: '#FAFAF8' }}
                />
              </div>
            </div>

            {/* Age & Service */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1A2E28' }}>
                  Age (Optional)
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Your age"
                  className="w-full px-4 py-3 rounded-xl border"
                  style={{ borderColor: '#E3EDE9', backgroundColor: '#FAFAF8' }}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1A2E28' }}>
                  Service Required *
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border"
                  style={{ borderColor: '#E3EDE9', backgroundColor: '#FAFAF8' }}
                >
                  <option value="">Select a service</option>
                  {SERVICES.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1A2E28' }}>
                  Preferred Date *
                </label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  min={today}
                  max={maxDate}
                  className="w-full px-4 py-3 rounded-xl border"
                  style={{ borderColor: '#E3EDE9', backgroundColor: '#FAFAF8' }}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1A2E28' }}>
                  Preferred Time *
                </label>
                <select
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border"
                  style={{ borderColor: '#E3EDE9', backgroundColor: '#FAFAF8' }}
                >
                  <option value="">Select a time slot</option>
                  <option value="09:00-10:00">9:00 AM - 10:00 AM</option>
                  <option value="10:00-11:00">10:00 AM - 11:00 AM</option>
                  <option value="11:00-12:00">11:00 AM - 12:00 PM</option>
                  <option value="12:00-13:00">12:00 PM - 1:00 PM</option>
                  <option value="14:00-15:00">2:00 PM - 3:00 PM</option>
                  <option value="15:00-16:00">3:00 PM - 4:00 PM</option>
                  <option value="16:00-17:00">4:00 PM - 5:00 PM</option>
                  <option value="17:00-18:00">5:00 PM - 6:00 PM</option>
                  <option value="18:00-19:00">6:00 PM - 7:00 PM</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#1A2E28' }}>
                Additional Notes (Optional)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Tell us about your concerns or medical history..."
                rows="4"
                className="w-full px-4 py-3 rounded-xl border"
                style={{ borderColor: '#E3EDE9', backgroundColor: '#FAFAF8', resize: 'none' }}
              />
            </div>

            {/* Consent */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                className="mt-1"
                style={{ accentColor: '#2C5249' }}
              />
              <label className="text-sm" style={{ color: '#5A7870' }}>
                I agree to be contacted via email or phone regarding my appointment. By submitting this form, you consent to Dr. Anjani Dixit contacting you.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl font-semibold text-white text-center transition-all duration-200"
              style={{
                backgroundColor: loading ? '#9ECEC0' : '#2C5249',
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Submitting...' : 'Book Appointment'}
            </button>

            <p className="text-xs text-center" style={{ color: '#7A9C90' }}>
              ₹1,000 consultation fee. Payment can be made at the clinic.
            </p>
          </form>

          {/* Contact Info */}
          <div className="mt-12 pt-8" style={{ borderTop: '1px solid #E3EDE9' }}>
            <p className="text-sm font-semibold mb-4" style={{ color: '#1A2E28' }}>
              Or reach out directly:
            </p>
            <div className="space-y-2 text-sm" style={{ color: '#5A7870' }}>
              <p>📞 <a href="tel:7411722580" style={{ color: '#2C5249', textDecoration: 'none' }}>+91 74117 22580</a></p>
              <p>📧 <a href="mailto:doc.anjani@gmail.com" style={{ color: '#2C5249', textDecoration: 'none' }}>doc.anjani@gmail.com</a></p>
              <p>📍 Kasper Multi-Speciality Clinic, Indiranagar, Bangalore</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
