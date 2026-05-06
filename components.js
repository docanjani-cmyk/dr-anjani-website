// Shared navigation and footer components

const navHTML = `
<div class="topbar">
  <div class="container">
    <div class="topbar-links">
      <a href="tel:+918826734047">📞 +91 8826734047</a>
      <a href="mailto:doc.anjani@gmail.com">✉️ doc.anjani@gmail.com</a>
    </div>
    <div class="topbar-right">
      <a href="https://www.facebook.com" target="_blank" aria-label="Facebook">&#xFB;</a>
      <a href="https://www.linkedin.com" target="_blank" aria-label="LinkedIn">in</a>
      <a href="https://www.youtube.com" target="_blank" aria-label="YouTube">▶</a>
    </div>
  </div>
</div>
<nav class="navbar">
  <div class="container">
    <a href="index.html" class="logo">
      <span class="logo-name">Dr. Anjani Dixit</span>
      <span class="logo-tagline">Best Gynecologist in Indira Nagar, Bengaluru</span>
    </a>
    <div class="nav-links" id="navLinks">
      <a href="index.html">Home</a>
      <a href="about-us.html">About Us</a>
      <a href="services.html">Services</a>
      <a href="cosmetic-gynecology.html">Cosmetic Gynecology</a>
      <a href="contact.html">Contact</a>
      <a href="contact.html" class="btn btn-primary nav-cta">Book Appointment</a>
    </div>
    <button class="hamburger" id="hamburger" aria-label="Toggle menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>`;

const footerHTML = `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="logo">
          <span class="logo-name">Dr. Anjani Dixit</span>
          <span class="logo-tagline" style="color:rgba(255,255,255,0.5)">Best Gynecologist in Indira Nagar</span>
        </div>
        <p>An experienced advanced laparoscopic surgeon and fertility expert combining advanced surgical skills with compassionate, personalised patient care.</p>
        <div class="social-links">
          <a href="https://www.facebook.com" class="social-link" target="_blank" aria-label="Facebook">f</a>
          <a href="https://www.linkedin.com" class="social-link" target="_blank" aria-label="LinkedIn">in</a>
          <a href="https://www.youtube.com" class="social-link" target="_blank" aria-label="YouTube">▶</a>
          <a href="https://www.twitter.com" class="social-link" target="_blank" aria-label="Twitter">𝕏</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Services</h4>
        <ul>
          <li><a href="services.html">Infertility Treatment</a></li>
          <li><a href="services.html">Laparoscopic Surgery</a></li>
          <li><a href="services.html">Hysterectomy</a></li>
          <li><a href="services.html">Fibroids</a></li>
          <li><a href="services.html">Ovarian Cysts</a></li>
          <li><a href="services.html">Obstetric Care</a></li>
          <li><a href="cosmetic-gynecology.html">Cosmetic Gynecology</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="about-us.html">About Dr. Anjani</a></li>
          <li><a href="services.html">Services</a></li>
          <li><a href="cosmetic-gynecology.html">Cosmetic Gynecology</a></li>
          <li><a href="contact.html">Contact Us</a></li>
          <li><a href="contact.html">Book Appointment</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact Info</h4>
        <div class="footer-contact-item">
          <span class="footer-contact-icon">📍</span>
          <span>Kasper Multi-Speciality Clinic, 31, 80 Feet Rd, HAL 3rd Stage, Indiranagar, Bengaluru, Karnataka 560038</span>
        </div>
        <div class="footer-contact-item">
          <span class="footer-contact-icon">📞</span>
          <a href="tel:+918826734047" style="color:rgba(255,255,255,0.75)">+91 8826734047</a>
        </div>
        <div class="footer-contact-item">
          <span class="footer-contact-icon">✉️</span>
          <a href="mailto:doc.anjani@gmail.com" style="color:rgba(255,255,255,0.75)">doc.anjani@gmail.com</a>
        </div>
        <div class="footer-contact-item">
          <span class="footer-contact-icon">🕐</span>
          <span>Mon–Sat: 9am to 6pm</span>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="footer-bottom">
      <span>© 2025 Dr. Anjani Dixit. All rights reserved.</span>
      <span>License: DLH 2013 0000613KTK</span>
    </div>
  </div>
</footer>`;

// Inject on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Nav
  const navEl = document.getElementById('site-nav');
  if (navEl) navEl.innerHTML = navHTML;

  // Footer
  const footerEl = document.getElementById('site-footer');
  if (footerEl) footerEl.innerHTML = footerHTML;

  // Active nav link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path) a.classList.add('active');
  });

  // Mobile menu toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }
});
