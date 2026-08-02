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
  const [scrolled, setScrolled] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [availableSlots, setAvailableSlots] = useState([
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'
  ])
  const [slotsLoading, setSlotsLoading] = useState(true)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    service: 'consultation',
    preferredDate: '',
    preferredTime: '',
    notes: '',
    consent: false,
  })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    track('page_view', {
      page_title: 'Book Appointment',
      page_path: '/book-appointment'
    })

    // Fetch available time slots from Firebase
    fetchAvailableSlots()
  }, [])

  const fetchAvailableSlots = async () => {
    try {
      setSlotsLoading(true)
      const response = await fetch('/api/availability')
      const data = await response.json()

      if (data.success && data.availableSlots) {
        setAvailableSlots(data.availableSlots)
        console.log('[AVAILABILITY] Loaded from', data.source)
      }
    } catch (error) {
      console.error('[AVAILABILITY_ERROR]', error)
      // Keep default slots on error
    } finally {
      setSlotsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleDateChange = (e) => {
    const date = new Date(e.target.value)
    const formatted = date.toISOString().split('T')[0]
    setFormData(prev => ({
      ...prev,
      preferredDate: formatted
    }))
  }

  const getMinDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  const getMaxDate = () => {
    const maxDate = new Date()
    maxDate.setDate(maxDate.getDate() + 90)
    return maxDate.toISOString().split('T')[0]
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.fullName || !formData.email || !formData.phone || !formData.preferredDate || !formData.preferredTime || !formData.consent) {
      alert('Please fill in all required fields')
      return
    }

    setLoading(true)

    try {
      // Fire Google Analytics event
      track('appointment_form_submitted', {
        source: 'custom_form',
        service: formData.service,
        event_category: 'appointment'
      })

      // Fire Google Ads conversion
      window.gtag?.('event', 'conversion', {
        send_to: 'AW-1796712782/6962668268',
        value: 1000,
        currency: 'INR',
        transaction_id: `apt_${Date.now()}`,
      })

      // Log submission to our backend
      await fetch('/api/track-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          booked_channel: 'Website Form (Redirecting to Firebase)',
          source: 'website_form_hybrid',
          patient_name: formData.fullName,
          patient_email: formData.email,
          patient_phone: formData.phone,
          service: formData.service,
          preferred_date: formData.preferredDate,
        })
      }).catch(err => console.log('Tracking logged'))

      // Redirect to Firebase booking with patient info
      // Firebase will show real available slots
      const firebaseUrl = `https://meet-my-doctor.firebaseapp.com/#/?uid=47150&eid=38605&name=${encodeURIComponent(formData.fullName)}&email=${encodeURIComponent(formData.email)}&phone=${encodeURIComponent(formData.phone)}`

      console.log('[REDIRECT] Sending to Firebase:', firebaseUrl)
      window.location.href = firebaseUrl
    } catch (error) {
      console.error('Submission error:', error)
      alert('Error proceeding to booking. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div style={{ backgroundColor: '#FAFAF8', color: '#1A2E28', minHeight: '100vh' }}>
        <header
          className="sticky top-0 z-40 transition-all duration-300"
          style={{
            backgroundColor: 'rgba(250,250,248,0.96)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid #E3EDE9',
            boxShadow: '0 1px 20px rgba(44,82,73,0.06)',
          }}
        >
          <nav className="max-w-6xl mx-auto px-5 lg:px-8 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center gap-3">
              <div style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28', fontWeight: 600 }}>
                Dr. Anjani Dixit
              </div>
            </a>
            <a href="/" className="text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: '#2C5249' }}>
              ← Back to Home
            </a>
          </nav>
        </header>

        <section style={{ background: 'linear-gradient(135deg, #f5f0e8 0%, #fafaf8 55%, #eef4f1 100%)' }} className="py-20 lg:py-32">
          <div className="max-w-4xl mx-auto px-5 lg:px-8 text-center">
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
            <h1 style={{
              fontFamily: 'Playfair Display, serif',
              color: '#1A2E28',
              fontSize: '2.5rem',
              fontWeight: 700,
              marginBottom: '1rem',
            }}>
              Appointment Request Submitted!
            </h1>
            <p style={{ color: '#5A7870', fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
              Thank you, {formData.fullName}! We've received your appointment request.
            </p>
            <p style={{ color: '#7A9C90', marginBottom: '2rem' }}>
              Our clinic will confirm your appointment within 24 hours via email or phone.
            </p>

            <div style={{
              backgroundColor: 'white',
              borderRadius: '1.5rem',
              padding: '2rem',
              marginBottom: '2rem',
              border: '1px solid #E3EDE9',
              textAlign: 'left',
              maxWidth: '500px',
              margin: '0 auto 2rem'
            }}>
              <h3 style={{ color: '#1A2E28', fontWeight: 600, marginBottom: '1rem' }}>Booking Details</h3>
              <div style={{ color: '#5A7870', fontSize: '0.95rem', lineHeight: 1.8 }}>
                <p><strong>Service:</strong> {SERVICES.find(s => s.id === formData.service)?.name}</p>
                <p><strong>Preferred Date:</strong> {new Date(formData.preferredDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p><strong>Preferred Time:</strong> {formData.preferredTime}</p>
                <p><strong>Contact:</strong> {formData.phone}</p>
              </div>
            </div>

            <div style={{
              backgroundColor: '#F5F0E8',
              borderRadius: '1.5rem',
              padding: '1.5rem',
              marginBottom: '2rem',
              borderLeft: '4px solid #2C5249'
            }}>
              <p style={{ color: '#5A7870', marginBottom: '0.5rem' }}>
                📞 Call us if you need to reach us directly:
              </p>
              <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1A2E28' }}>
                <a href="tel:7411722580" style={{ color: '#2C5249', textDecoration: 'none' }}>
                  +91 74117 22580
                </a>
              </p>
            </div>

            <a
              href="/"
              className="inline-block px-8 py-3 rounded-full text-white font-semibold hover:shadow-lg transition-all"
              style={{ backgroundColor: '#2C5249' }}
            >
              Back to Home
            </a>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#FAFAF8', color: '#1A2E28', minHeight: '100vh' }}>
      {/* NAV */}
      <header
        className="sticky top-0 z-40 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(250,250,248,0.96)' : 'rgba(250,250,248,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: scrolled ? '1px solid #E3EDE9' : '1px solid transparent',
          boxShadow: scrolled ? '0 1px 20px rgba(44,82,73,0.06)' : 'none',
        }}
      >
        <nav className="max-w-6xl mx-auto px-5 lg:px-8 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div style={{ fontFamily: 'Playfair Display, serif', color: '#1A2E28', fontWeight: 600 }}>
              Dr. Anjani Dixit
            </div>
          </a>
          <a href="/" className="text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: '#2C5249' }}>
            ← Back to Home
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #f5f0e8 0%, #fafaf8 55%, #eef4f1 100%)' }} className="py-12 lg:py-20">
        <div className="max-w-6xl mx-auto px-5 lg:px-8 text-center">
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            color: '#1A2E28',
            fontSize: '2.5rem',
            lineHeight: 1.2,
            marginBottom: '1rem',
            fontWeight: 700,
          }}>
            Book Your Consultation
          </h1>
          <p style={{ color: '#5A7870', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Schedule an appointment with Dr. Anjani Dixit. Fill out the form below and we'll confirm your booking within 24 hours.
          </p>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="py-12 lg:py-20 px-5 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-8 flex justify-between items-center">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all"
                  style={{
                    backgroundColor: currentStep >= step ? '#2C5249' : '#E3EDE9',
                    color: currentStep >= step ? 'white' : '#7A9C90',
                  }}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className="flex-1 h-1 mx-2 transition-all"
                    style={{
                      backgroundColor: currentStep > step ? '#2C5249' : '#E3EDE9',
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step Labels */}
          <div className="mb-12 flex justify-between text-sm">
            <span style={{ color: currentStep >= 1 ? '#2C5249' : '#7A9C90', fontWeight: currentStep >= 1 ? 600 : 400 }}>Your Info</span>
            <span style={{ color: currentStep >= 2 ? '#2C5249' : '#7A9C90', fontWeight: currentStep >= 2 ? 600 : 400 }}>Service & Date</span>
            <span style={{ color: currentStep >= 3 ? '#2C5249' : '#7A9C90', fontWeight: currentStep >= 3 ? 600 : 400 }}>Review & Submit</span>
          </div>

          {/* Info Box */}
          <div
            className="mb-8 p-6 rounded-2xl text-center"
            style={{ backgroundColor: '#F5F0E8', borderLeft: '4px solid #2C5249' }}
          >
            <p style={{ color: '#1A2E28', fontWeight: 500, marginBottom: '0.5rem' }}>
              ✓ Quick booking • ✓ Professional care • ✓ Video consultations available
            </p>
            <p style={{ color: '#7A9C90', fontSize: '0.9rem' }}>
              Consultation fee: ₹1,000 (payable at clinic or online)
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{
            backgroundColor: 'white',
            borderRadius: '2rem',
            padding: '2rem',
            border: '1px solid #E3EDE9',
            boxShadow: '0 10px 40px rgba(44,82,73,0.08)',
          }}>
            {/* Step 1: Personal Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#1A2E28' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.75rem',
                      border: '1px solid #E3EDE9',
                      fontSize: '1rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#1A2E28' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.75rem',
                      border: '1px solid #E3EDE9',
                      fontSize: '1rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#1A2E28' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit number"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.75rem',
                      border: '1px solid #E3EDE9',
                      fontSize: '1rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#1A2E28' }}>
                    Age (optional)
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Your age"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.75rem',
                      border: '1px solid #E3EDE9',
                      fontSize: '1rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Service & Date */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#1A2E28' }}>
                    Select Service *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.75rem',
                      border: '1px solid #E3EDE9',
                      fontSize: '1rem',
                      boxSizing: 'border-box',
                    }}
                  >
                    {SERVICES.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#1A2E28' }}>
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleDateChange}
                    min={getMinDate()}
                    max={getMaxDate()}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.75rem',
                      border: '1px solid #E3EDE9',
                      fontSize: '1rem',
                      boxSizing: 'border-box',
                    }}
                  />
                  <p style={{ fontSize: '0.85rem', color: '#7A9C90', marginTop: '0.5rem' }}>
                    Available for appointments up to 90 days from today
                  </p>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.75rem', color: '#1A2E28' }}>
                    Preferred Time *
                  </label>
                  {slotsLoading && (
                    <p style={{ fontSize: '0.85rem', color: '#7A9C90', marginBottom: '0.5rem' }}>
                      Loading available times...
                    </p>
                  )}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                    gap: '0.5rem',
                  }}>
                    {availableSlots.map(time => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, preferredTime: time }))}
                        style={{
                          padding: '0.75rem',
                          borderRadius: '0.75rem',
                          border: formData.preferredTime === time ? 'none' : '1px solid #E3EDE9',
                          backgroundColor: formData.preferredTime === time ? '#2C5249' : 'white',
                          color: formData.preferredTime === time ? 'white' : '#1A2E28',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#1A2E28' }}>
                    Additional Notes (optional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Any specific concerns or requirements?"
                    rows="3"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.75rem',
                      border: '1px solid #E3EDE9',
                      fontSize: '1rem',
                      boxSizing: 'border-box',
                      fontFamily: 'inherit',
                    }}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Review & Consent */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div style={{
                  backgroundColor: '#E8F5F0',
                  borderRadius: '1.5rem',
                  padding: '1rem',
                  border: '1px solid #2C5249',
                  marginBottom: '1rem'
                }}>
                  <p style={{ color: '#1A2E28', fontSize: '0.9rem', margin: 0 }}>
                    ℹ️ Next, you'll be taken to our appointment system to view <strong>real-time available slots</strong> and complete your booking.
                  </p>
                </div>

                <div style={{
                  backgroundColor: '#F5F0E8',
                  borderRadius: '1.5rem',
                  padding: '1.5rem',
                  borderLeft: '4px solid #2C5249'
                }}>
                  <h3 style={{ color: '#1A2E28', fontWeight: 600, marginBottom: '1rem' }}>Review Your Information</h3>
                  <div style={{ color: '#5A7870', lineHeight: 1.8 }}>
                    <p><strong>Name:</strong> {formData.fullName}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Phone:</strong> {formData.phone}</p>
                    {formData.age && <p><strong>Age:</strong> {formData.age}</p>}
                    <p><strong>Service:</strong> {SERVICES.find(s => s.id === formData.service)?.name}</p>
                    <p><strong>Date:</strong> {new Date(formData.preferredDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p><strong>Time:</strong> {formData.preferredTime}</p>
                    {formData.notes && <p><strong>Notes:</strong> {formData.notes}</p>}
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  padding: '1rem',
                  backgroundColor: '#F5F0E8',
                  borderRadius: '1rem',
                }}>
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    id="consent"
                    style={{ marginTop: '0.25rem', cursor: 'pointer' }}
                  />
                  <label htmlFor="consent" style={{ fontSize: '0.95rem', color: '#5A7870', cursor: 'pointer' }}>
                    I confirm that the information provided is accurate and I wish to book this appointment. I agree to the clinic's terms and conditions.
                  </label>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  style={{
                    flex: 1,
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.75rem',
                    border: '1px solid #E3EDE9',
                    backgroundColor: 'white',
                    color: '#2C5249',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  ← Previous
                </button>
              )}
              {currentStep < 3 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  style={{
                    flex: 1,
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.75rem',
                    backgroundColor: '#2C5249',
                    color: 'white',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    border: 'none',
                  }}
                >
                  Next →
                </button>
              )}
              {currentStep === 3 && (
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.75rem',
                    backgroundColor: formData.consent && !loading ? '#2C5249' : '#A8B8B3',
                    color: 'white',
                    fontWeight: 600,
                    cursor: formData.consent && !loading ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s',
                    border: 'none',
                  }}
                >
                  {loading ? 'Redirecting...' : 'Proceed to Booking'}
                </button>
              )}
            </div>
          </form>

          {/* Contact Info */}
          <div
            className="mt-8 p-6 rounded-2xl text-center"
            style={{ backgroundColor: '#F5F0E8', borderLeft: '4px solid #2C5249' }}
          >
            <p style={{ color: '#1A2E28', fontWeight: 500, marginBottom: '1rem' }}>
              Need help? Contact us directly
            </p>
            <div className="space-y-2" style={{ color: '#5A7870' }}>
              <p>
                📞 <a href="tel:7411722580" style={{ color: '#2C5249', textDecoration: 'none', fontWeight: 500 }}>
                  +91 74117 22580
                </a>
              </p>
              <p>
                📧 <a href="mailto:doc.anjani@gmail.com" style={{ color: '#2C5249', textDecoration: 'none', fontWeight: 500 }}>
                  doc.anjani@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
