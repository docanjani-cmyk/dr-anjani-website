'use client'

import { useState } from 'react'

// Site configuration - Edit these to update site-wide information
const SITE_CONFIG = {
  name: "Dr. Anjani",
  tagline: "Best Gynecologist in Indira Nagar",
  email: "doc.anjani@gmail.com",
  phone: "8826734047",
  phoneDisplay: "+91 8826734047",
  // Social Media Links
  linkedin: "https://www.linkedin.com/in/dr-anjani/",
  facebook: "https://www.facebook.com/anjani.dixit.5/",
  youtube: "https://www.youtube.com/@dr.anjanidixitsengar7299",
  // Booking Links
  practo: "https://www.practo.com/Bangalore/doctor/anjani-dixit-gynecologist-obstetrician",
  zohoAppointment: "https://forms.zohopublic.in/docanjanigm1/form/AppointmentBookingForm/formperma/J5PulhIFyZu6AjvUKA70ibjuitdtxI_GOwVUeIgWXPA",
  // Maps
  googleMaps: "https://maps.google.com/maps/place//data=!4m2!3m1!1s0x3bae176f18b50aff:0xe91df7456f7f6c4b",
  // Address
  clinic: "Kasper Multi-Speciality Clinic (in front of The Filter Coffee)",
  address: "31, 80 Feet Rd, Hal, HAL 3rd Stage, Indiranagar, Bengaluru, Karnataka 560038, India",
  // License
  license: "DLH 2013 0000613KTK"
}

// Image URLs from the original website
const IMAGES = {
  logo: "https://www.anjanidixit.com/image.webp",
  hero: "https://www.anjanidixit.com/IMG-20251024-WA0023.jpg",
  about: "https://www.anjanidixit.com/WhatsApp%20Image%202025-10-24%20at%2009.22.25_52f468ef.jpg",
  feature1: "https://www.anjanidixit.com/4307108.jpg",
  feature2: "https://www.anjanidixit.com/4357744.jpg",
  feature3: "https://www.anjanidixit.com/4365525.jpg",
  testimonials: {
    shashi: "https://www.anjanidixit.com/Shashi%20Mehta.png",
    akanksha: "https://www.anjanidixit.com/Akanksha%20Agrawal.png",
    larisa: "https://www.anjanidixit.com/Larisa%20Lingdoh.png",
    sneha: "https://www.anjanidixit.com/Sneha%20Paithankar.png",
  }
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar with Contact Info */}
      <div className="bg-gray-900 text-white text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-teal-300 transition flex items-center gap-1">
              <span>✉️</span> {SITE_CONFIG.email}
            </a>
            <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-teal-300 transition flex items-center gap-1">
              <span>📞</span> {SITE_CONFIG.phoneDisplay}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a href={SITE_CONFIG.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-teal-300 transition" aria-label="LinkedIn">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href={SITE_CONFIG.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-teal-300 transition" aria-label="Facebook">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
            </a>
            <a href={SITE_CONFIG.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-teal-300 transition" aria-label="YouTube">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Header / Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3">
            <img src={IMAGES.logo} alt="Dr. Anjani Logo" className="w-12 h-12 rounded-full object-cover" />
            <div>
              <div className="text-lg font-bold text-teal-700">{SITE_CONFIG.name}</div>
              <div className="text-xs text-gray-500">{SITE_CONFIG.tagline}</div>
            </div>
          </a>
          
          <div className="hidden lg:flex gap-6 text-sm font-medium">
            <a href="#home" className="text-gray-700 hover:text-teal-700 transition">Home</a>
            <a href="#about" className="text-gray-700 hover:text-teal-700 transition">About</a>
            <a href="#services" className="text-gray-700 hover:text-teal-700 transition">Services</a>
            <a href="#conditions" className="text-gray-700 hover:text-teal-700 transition">Conditions</a>
            <a href="#testimonials" className="text-gray-700 hover:text-teal-700 transition">Testimonials</a>
            <a href="#contact" className="text-gray-700 hover:text-teal-700 transition">Contact</a>
          </div>

          <a href={SITE_CONFIG.zohoAppointment} target="_blank" rel="noopener noreferrer" className="hidden lg:block bg-teal-700 text-white px-6 py-2 rounded-lg hover:bg-teal-800 transition text-sm font-medium">
            Book Appointment
          </a>

          <button 
            className="lg:hidden text-2xl text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </nav>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 p-4 space-y-3 text-sm">
            <a href="#home" onClick={() => setMobileMenuOpen(false)} className="block text-gray-700 hover:text-teal-700">Home</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block text-gray-700 hover:text-teal-700">About</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block text-gray-700 hover:text-teal-700">Services</a>
            <a href="#conditions" onClick={() => setMobileMenuOpen(false)} className="block text-gray-700 hover:text-teal-700">Conditions</a>
            <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="block text-gray-700 hover:text-teal-700">Testimonials</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block text-gray-700 hover:text-teal-700">Contact</a>
            <a href={SITE_CONFIG.zohoAppointment} target="_blank" rel="noopener noreferrer" className="block w-full bg-teal-700 text-white py-2 rounded-lg font-medium text-center">
              Book Appointment
            </a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="py-12 md:py-20 px-4 bg-gradient-to-b from-teal-50 to-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-teal-700 font-semibold mb-3 text-sm uppercase tracking-wider">12+ Years Experience</p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight" style={{fontFamily: 'Playfair Display'}}>
              Best Gynecologist in Indira Nagar, Bengaluru
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              With 12+ years of experience, Dr. Anjani combines advanced laparoscopic surgical skills with a compassionate, personalised approach to infertility treatment.
            </p>
            <div className="flex gap-3 flex-col sm:flex-row">
              <a href={SITE_CONFIG.zohoAppointment} target="_blank" rel="noopener noreferrer" className="bg-teal-700 text-white px-8 py-3 rounded-lg hover:bg-teal-800 transition font-medium text-center">
                Book Appointment
              </a>
              <a href={SITE_CONFIG.practo} target="_blank" rel="noopener noreferrer" className="border-2 border-teal-700 text-teal-700 px-8 py-3 rounded-lg hover:bg-teal-50 transition font-medium text-center">
                Book on Practo
              </a>
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm text-gray-600">
              <span className="flex">{'★'.repeat(5)}</span>
              <span>5.0 on Google · 347 reviews</span>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img src={IMAGES.hero} alt="Dr. Anjani Dixit" className="w-full h-auto object-cover" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center" style={{fontFamily: 'Playfair Display'}}>
            About Dr. Anjani
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img src={IMAGES.about} alt="Dr. Anjani in clinic" className="w-full h-auto object-cover" />
            </div>
            <div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Dr. Anjani is an experienced advanced laparoscopic surgeon and fertility expert with 12+ years of experience.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Graduating from <strong>IPGME&R and SSKM Hospital, Kolkata</strong>, completing residency at <strong>Holy Family Hospital, New Delhi</strong>, and Fellowship in Minimal Access Surgery from Association Surgeons of India and Reproductive Medicine course from Indian College of Obstetrics and Gynaecology — Dr. Dixit has dedicated her career to providing exceptional care.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Dr. Dixit is a life member of <strong>AMASI, FOGSI, AOGD, ASI</strong>, and regularly contributes to academic journals and conferences.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex gap-3">
                  <span className="text-xl">🎓</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Qualifications</p>
                    <p className="text-gray-600 text-sm">MBBS, DNB - Obstetrics & Gynecology, FMAS</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-xl">🌍</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Languages</p>
                    <p className="text-gray-600 text-sm">English, Hindi, Kannada, Bengali</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-xl">📋</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">License</p>
                    <p className="text-gray-600 text-sm">{SITE_CONFIG.license}</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-500 italic border-l-4 border-teal-700 pl-4">
                Outside the hospital, Dr. Anjani is a mother of two daughters. She enjoys swimming, reading, and storytelling to children.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center" style={{fontFamily: 'Playfair Display'}}>
            Why Choose Dr. Anjani?
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Excellent surgical and infertility services</p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
              <img src={IMAGES.feature1} alt="Balanced treatment" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Balanced Treatment</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Dr. Anjani delivers balanced care, avoiding unnecessary treatments while ensuring timely and appropriate intervention.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
              <img src={IMAGES.feature2} alt="Doctor friendliness" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Doctor Friendliness</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  She considers the whole person — mental, emotional, and social circumstances — not just the physical condition.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
              <img src={IMAGES.feature3} alt="Affordable care" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Affordable Care</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Quality gynaecological care without financial strain, with multiple treatment options explained clearly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center" style={{fontFamily: 'Playfair Display'}}>
            Our Services
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Comprehensive Gynaecology and Infertility treatment with personalised care
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-teal-50 p-8 rounded-2xl border-l-4 border-teal-700">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Infertility Treatment</h3>
              <p className="text-gray-700 leading-relaxed">
                Dr. Anjani and the fertility team provide compassionate support throughout the infertility treatment journey, guiding patients toward parenthood.
              </p>
            </div>
            <div className="bg-teal-50 p-8 rounded-2xl border-l-4 border-teal-700">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Gynaecological Surgery</h3>
              <p className="text-gray-700 leading-relaxed">
                With expertise in minimally invasive surgeries, Dr. Anjani offers specialised care for women's health issues like fibroids and endometriosis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Conditions We Treat Section */}
      <section id="conditions" className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center" style={{fontFamily: 'Playfair Display'}}>
            Conditions We Treat
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Dr. Anjani treats a range of medical issues related to women's health
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Menstrual Disorders', description: 'Irregular, painful, or heavy periods stemming from hormonal imbalances or uterine abnormalities.' },
              { title: 'Fibroids', description: 'Benign tumors in the uterus causing pain, heavy bleeding, and fertility complications.' },
              { title: 'Endometriosis', description: 'Uterine-like tissue growing outside the uterus, causing severe pain and infertility.' },
              { title: 'Pelvic Inflammatory Disease', description: 'Infection of reproductive organs that can cause chronic pelvic pain.' },
              { title: 'Ovarian Cysts', description: 'Fluid-filled sacs in the ovaries that may cause pain and hormonal issues.' },
              { title: 'PCOS', description: 'Hormonal disorder leading to irregular periods, weight gain, and infertility.' },
              { title: 'Cervical & Uterine Conditions', description: 'Cervical polyps, abnormal Pap smears, or structural issues in the uterus.' },
              { title: 'Infertility', description: 'Comprehensive evaluation and treatment including IVF and IUI procedures.' }
            ].map((condition, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-teal-700 hover:shadow-lg transition">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mb-3">
                  <span className="text-teal-700 font-bold">{idx + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{condition.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{condition.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 px-4 bg-teal-700 text-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl md:text-5xl font-bold mb-2">12+</p>
            <p className="text-teal-100">Years of Experience</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-bold mb-2">5.0 ★</p>
            <p className="text-teal-100">Google Rating · 347 Reviews</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-bold mb-2">1000+</p>
            <p className="text-teal-100">Successful Treatments</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center" style={{fontFamily: 'Playfair Display'}}>
            Patient Testimonials
          </h2>
          <p className="text-center text-gray-600 mb-12">What our patients say about us</p>

          {/* Real Google Reviews - Last updated: May 7, 2026 */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {[
              { name: 'Harshit Kakkar', condition: 'Laparoscopic Hysterectomy', image: 'https://lh3.googleusercontent.com/a-/ALV-UjWHJT3GaSyNppdmpJmT2z1LbKqTJmFxXAORjJ13RhR1bbo5-fAL=s120-c-rp-mo-br100', date: 'May 2026', review: 'We consulted Dr. Anjani for my mother\'s laparoscopic hysterectomy and had a great experience. She is very knowledgeable, explains everything clearly, and makes you feel comfortable and confident throughout. The surgery and recovery both went smoothly. What stands out is her calm, reassuring approach and genuine care.' },
              { name: 'Baidyanath Sinha', condition: 'Pregnancy Care', image: 'https://lh3.googleusercontent.com/a-/ALV-UjUUdzLFKPeVX2_bJ2jHhewapprBgjvVebSSDec=s120-c-rp-mo-br100', date: 'April 2026', review: 'Dr. Anjani Dixit Mam is truly exceptional! Her expertise, warmth, and genuine care made my wife\'s pregnancy journey smooth, safe, and beautiful. She listens patiently, explains everything clearly. What sets her apart is how she treats you as a person, not just a patient.' },
              { name: 'Sneha John', condition: 'Consultation', image: 'https://lh3.googleusercontent.com/a/ACg8ocKeei3HsSNWqUGdj9xG3vjotrzVJgqfPeRUF0Hl=s120-c-rp-mo-br100', date: 'April 2026', review: 'I had a really good experience with Dr. Anjani. She was very patient, listened to all my concerns, and explained everything clearly without rushing. She made me feel comfortable and reassured throughout the consultation. I felt I was in safe and capable hands.' },
              { name: 'Rupa Ganamaneni', condition: 'Laparoscopic Surgery', image: 'https://lh3.googleusercontent.com/a/ACg8ocJ_p7iQhbSEjIwoDfSOYf7LDU4N2DDn_A4Y_LUl=s120-c-rp-mo-br100', date: 'April 2026', review: 'One of the best gyno surgeons I met so far. She will address all your concerns and doubts. She did laparoscopy surgery for my mom, all went fine without any issues. She has given all the tips, diet plan and suggestions for post-surgery care.' },
              { name: 'Sai Tharun', condition: 'Laparoscopic Surgery', image: 'https://lh3.googleusercontent.com/a/ACg8ocJQn1TlJrxRNDiHJGeklIeY6SODpfd0bNVvApAl=s120-c-rp-mo-br100', date: 'April 2026', review: 'I had a laparoscopic surgery recently, and I am extremely grateful for the care and expertise provided by the doctor. From the very first consultation, the doctor explained everything clearly, addressed all my concerns, and made me feel comfortable and confident.' },
              { name: 'Riya Jati', condition: 'Endometriosis & Fibroids', image: 'https://lh3.googleusercontent.com/a/ACg8ocLTyhWPsfGLFr5GFNcONZ4lkvTb5AC5H-0aeV4z=s120-c-rp-mo-br100', date: 'February 2026', review: 'Suffering from lower back pain and abdominal pain due to endometriosis cyst and multiple fibroids in uterus. I\'m extremely thankful as madam demonstrated everything very politely. She has very polished surgical hands and exceptional expertise.' },
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-2xl">
                <div className="flex gap-4 items-start mb-4">
                  <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-xs text-teal-700 font-medium">{testimonial.condition}</p>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-sm">★</span>)}
                      <span className="text-xs text-gray-500 ml-2">{testimonial.date}</span>
                    </div>
                  </div>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-5 h-5" />
                </div>
                <p className="text-gray-700 text-sm leading-relaxed italic">"{testimonial.review}"</p>
              </div>
            ))}
          </div>

          <div className="text-center bg-teal-50 rounded-xl p-6">
            <p className="text-gray-700 mb-3">Read more reviews on Google</p>
            <a href={SITE_CONFIG.googleMaps} target="_blank" rel="noopener noreferrer" className="inline-block bg-teal-700 text-white px-6 py-2 rounded-lg hover:bg-teal-800 transition font-medium">
              View All Google Reviews
            </a>
          </div>

          {/* PLACEHOLDER: Live Google Reviews Widget can be embedded here */}
          {/* Recommended: Elfsight Google Reviews Widget - https://elfsight.com/google-reviews-widget/ */}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-teal-700 to-teal-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{fontFamily: 'Playfair Display'}}>
            Your Health Comes First
          </h2>
          <p className="text-teal-100 mb-8 text-lg">
            Dr. Anjani combines advanced surgical skills with a compassionate, personalised approach to care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={SITE_CONFIG.zohoAppointment} target="_blank" rel="noopener noreferrer" className="bg-white text-teal-700 px-8 py-3 rounded-lg hover:bg-gray-100 transition font-medium">
              Book Appointment
            </a>
            <a href={`tel:${SITE_CONFIG.phone}`} className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-teal-700 transition font-medium">
              Call: {SITE_CONFIG.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center" style={{fontFamily: 'Playfair Display'}}>
            Get in Touch
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>
              
              <div className="space-y-6 mb-8">
                <div className="flex gap-4">
                  <div className="text-2xl">📍</div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Clinic Location</p>
                    <a href={SITE_CONFIG.googleMaps} target="_blank" rel="noopener noreferrer" className="text-gray-900 font-medium hover:text-teal-700 transition">
                      {SITE_CONFIG.clinic}<br />
                      {SITE_CONFIG.address}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="text-2xl">📞</div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Phone</p>
                    <a href={`tel:${SITE_CONFIG.phone}`} className="text-teal-700 font-medium hover:underline">{SITE_CONFIG.phoneDisplay}</a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="text-2xl">✉️</div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Email</p>
                    <a href={`mailto:${SITE_CONFIG.email}`} className="text-teal-700 font-medium hover:underline">{SITE_CONFIG.email}</a>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold text-gray-900 mb-3">Connect with Dr. Anjani</h4>
              <div className="flex gap-3">
                <a href={SITE_CONFIG.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-teal-700 text-white rounded-full flex items-center justify-center hover:bg-teal-800 transition" aria-label="LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href={SITE_CONFIG.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-teal-700 text-white rounded-full flex items-center justify-center hover:bg-teal-800 transition" aria-label="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                </a>
                <a href={SITE_CONFIG.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-teal-700 text-white rounded-full flex items-center justify-center hover:bg-teal-800 transition" aria-label="YouTube">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                </a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Book an Appointment</h3>
              <p className="text-sm text-gray-600 mb-6">Click below to fill our official appointment form</p>
              
              <a href={SITE_CONFIG.zohoAppointment} target="_blank" rel="noopener noreferrer" className="block w-full bg-teal-700 text-white text-center py-4 rounded-lg hover:bg-teal-800 transition font-medium mb-4">
                📋 Open Appointment Form
              </a>
              
              <p className="text-center text-sm text-gray-500 mb-4">or</p>
              
              <a href={SITE_CONFIG.practo} target="_blank" rel="noopener noreferrer" className="block w-full border-2 border-teal-700 text-teal-700 text-center py-4 rounded-lg hover:bg-teal-50 transition font-medium mb-4">
                Book on Practo
              </a>
              
              <a href={`tel:${SITE_CONFIG.phone}`} className="block w-full text-center text-gray-700 text-sm mt-4">
                Or call directly: <span className="font-semibold text-teal-700">{SITE_CONFIG.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={IMAGES.logo} alt="Dr. Anjani" className="w-12 h-12 rounded-full" />
                <div>
                  <p className="text-white font-bold">{SITE_CONFIG.name}</p>
                  <p className="text-xs text-gray-400">{SITE_CONFIG.tagline}</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 italic">
                "Your health comes first"
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li>Infertility Treatment</li>
                <li>Laparoscopic Surgery</li>
                <li>Hysterectomy</li>
                <li>Fibroid Treatment</li>
                <li>Ovarian Cysts</li>
                <li>Obstetric Care</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <p className="text-sm mb-2">{SITE_CONFIG.clinic}</p>
              <p className="text-sm mb-2">{SITE_CONFIG.address}</p>
              <p className="text-sm mb-2">📞 {SITE_CONFIG.phoneDisplay}</p>
              <p className="text-sm">✉️ {SITE_CONFIG.email}</p>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 text-center text-sm">
            <p className="mb-2">All Rights Reserved Dr. Anjani</p>
            <div className="flex justify-center gap-3 mt-4">
              <a href={SITE_CONFIG.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition">LinkedIn</a>
              <span>·</span>
              <a href={SITE_CONFIG.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition">Facebook</a>
              <span>·</span>
              <a href={SITE_CONFIG.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition">YouTube</a>
              <span>·</span>
              <a href={SITE_CONFIG.practo} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition">Practo</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
