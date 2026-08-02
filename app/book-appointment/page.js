'use client'

import { useState, useEffect } from 'react'

const track = (e, data = {}) => {
  window.gtag?.('event', e, data)
}

export default function BookAppointmentPage() {
  const [scrolled, setScrolled] = useState(false)
  const [formInteracted, setFormInteracted] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    // Track page view
    track('page_view', {
      page_title: 'Book Appointment',
      page_path: '/book-appointment'
    })

    // Set up mutation observer to detect form submissions
    const setupFormTracking = () => {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          // Look for success messages or form completion indicators
          const successElements = document.querySelectorAll('[class*="success"], [class*="confirm"], [class*="thank"]')
          if (successElements.length > 0) {
            track('appointment_form_submitted', {
              source: 'firebase_form',
              event_category: 'appointment',
            })

            // Fire Google Ads conversion
            window.gtag?.('event', 'conversion', {
              send_to: 'AW-1796712782/6962668268',
              value: 1000,
              currency: 'INR',
              transaction_id: `apt_${Date.now()}`,
            })

            // Log to backend
            fetch('/api/track-appointment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                timestamp: new Date().toISOString(),
                booked_channel: 'Firebase Form (Website)',
                source: 'firebase_form_website',
              })
            }).catch(err => console.log('Form submission logged'))
          }
        })
      })

      // Start observing the iframe content
      const iframes = document.querySelectorAll('iframe')
      iframes.forEach(iframe => {
        try {
          observer.observe(iframe.contentDocument.body, {
            childList: true,
            subtree: true,
            attributes: true,
          })
        } catch (e) {
          // Cross-origin iframe - can't observe, will use alternative method
          console.log('Cross-origin iframe detected')
        }
      })

      return observer
    }

    // Wait for iframe to load, then set up tracking
    const timer = setTimeout(() => {
      setupFormTracking()
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Track when user interacts with the form
  const handleIframeInteraction = () => {
    if (!formInteracted) {
      setFormInteracted(true)
      track('appointment_form_engaged', {
        source: 'firebase_form',
      })
    }
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
          <a
            href="/"
            className="text-sm font-medium hover:opacity-70 transition-opacity"
            style={{ color: '#2C5249' }}
          >
            ← Back to Home
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #f5f0e8 0%, #fafaf8 55%, #eef4f1 100%)' }} className="py-12 lg:py-20">
        <div className="max-w-6xl mx-auto px-5 lg:px-8 text-center">
          <h1
            style={{
              fontFamily: 'Playfair Display, serif',
              color: '#1A2E28',
              fontSize: '2.5rem',
              lineHeight: 1.2,
              marginBottom: '1rem',
              fontWeight: 700,
            }}
          >
            Book Your Consultation
          </h1>
          <p style={{ color: '#5A7870', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Schedule an appointment with Dr. Anjani Dixit. See real-time availability and book instantly.
          </p>
        </div>
      </section>

      {/* BOOKING FORM SECTION */}
      <section className="py-12 lg:py-20 px-5 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Info Box */}
          <div
            className="mb-8 p-6 rounded-2xl text-center"
            style={{ backgroundColor: '#F5F0E8', borderLeft: '4px solid #2C5249' }}
          >
            <p style={{ color: '#1A2E28', fontWeight: 500, marginBottom: '0.5rem' }}>
              ✓ Real-time availability • ✓ Instant confirmation • ✓ Video consultations available
            </p>
            <p style={{ color: '#7A9C90', fontSize: '0.9rem' }}>
              Consultation fee: ₹1,000 (payable at clinic or online)
            </p>
          </div>

          {/* Firebase Form Iframe */}
          <div
            className="bg-white rounded-3xl overflow-hidden"
            style={{
              border: '1px solid #E3EDE9',
              boxShadow: '0 10px 40px rgba(44,82,73,0.08)',
              minHeight: '600px',
            }}
            onClick={handleIframeInteraction}
            onFocus={handleIframeInteraction}
          >
            <iframe
              src="https://meet-my-doctor.firebaseapp.com/#/?uid=47150&eid=38605"
              style={{
                width: '100%',
                height: '700px',
                border: 'none',
                borderRadius: '1.5rem',
              }}
              title="Book Appointment with Dr. Anjani Dixit"
              allow="camera; microphone; payment"
            />
          </div>

          {/* Fallback Info */}
          <div
            className="mt-12 p-8 rounded-2xl text-center"
            style={{ backgroundColor: '#F5F0E8' }}
          >
            <p style={{ color: '#1A2E28', fontWeight: 500, marginBottom: '1rem' }}>
              Having trouble with the booking form?
            </p>
            <div className="space-y-2 text-sm" style={{ color: '#5A7870' }}>
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
              <p>📍 Kasper Multi-Speciality Clinic, Indiranagar, Bangalore</p>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              { icon: '⏱️', title: 'Easy Booking', desc: 'Real-time availability and instant confirmation' },
              { icon: '🎥', title: 'Video Available', desc: 'Video consultations for initial evaluations' },
              { icon: '✨', title: '14+ Years Experience', desc: '1500+ successful procedures performed' },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl text-center"
                style={{ backgroundColor: '#FAFAF8', border: '1px solid #E3EDE9' }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                <h3 style={{ color: '#1A2E28', fontWeight: 600, marginBottom: '0.5rem' }}>
                  {item.title}
                </h3>
                <p style={{ color: '#7A9C90', fontSize: '0.9rem' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Tracking Script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          // Monitor for form submission success
          window.addEventListener('message', function(event) {
            if (event.origin !== 'https://meet-my-doctor.firebaseapp.com') return;

            // Listen for Firebase success messages
            if (event.data && event.data.type === 'booking_success') {
              // Track in Google Analytics
              if (window.gtag) {
                gtag('event', 'appointment_form_submitted', {
                  source: 'firebase_form',
                  event_category: 'appointment'
                });

                // Track in Google Ads
                gtag('event', 'conversion', {
                  send_to: 'AW-1796712782/6962668268',
                  value: 1000,
                  currency: 'INR',
                  transaction_id: 'apt_' + Date.now()
                });
              }

              // Log to backend
              fetch('/api/track-appointment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  timestamp: new Date().toISOString(),
                  booked_channel: 'Firebase Form (Website)',
                  source: 'firebase_form_website'
                })
              }).catch(err => console.log('Form logged'));
            }
          });
        `
      }} />
    </div>
  )
}
