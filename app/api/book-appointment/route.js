import nodemailer from 'nodemailer'

// Initialize email transporter (using environment variables)
const transporter = process.env.EMAIL_HOST ? nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT || 587,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
}) : null

const SERVICE_NAMES = {
  laparoscopic: 'Laparoscopic Surgery',
  ivf: 'IVF & Fertility Treatment',
  pregnancy: 'Pregnancy Care',
  pcos: 'PCOS Management',
  cosmetic: 'Cosmetic Gynecology',
  consultation: 'General Consultation',
}

async function sendEmails(booking) {
  if (!transporter) {
    console.log('[EMAIL_DISABLED] Email transporter not configured')
    return
  }

  try {
    // Email to patient
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@anjanidixit.com',
      to: booking.email,
      subject: 'Appointment Booking Confirmation - Dr. Anjani Dixit',
      html: `
        <h2>Appointment Booking Received</h2>
        <p>Dear ${booking.fullName},</p>
        <p>Thank you for booking an appointment with Dr. Anjani Dixit.</p>

        <h3>Your Booking Details:</h3>
        <ul>
          <li><strong>Service:</strong> ${SERVICE_NAMES[booking.service]}</li>
          <li><strong>Preferred Date:</strong> ${new Date(booking.preferredDate).toLocaleDateString()}</li>
          <li><strong>Preferred Time:</strong> ${booking.preferredTime}</li>
          <li><strong>Phone:</strong> ${booking.phone}</li>
        </ul>

        <p>We will confirm your appointment within 24 hours. If you have any questions, please call us at +91 74117 22580.</p>

        <p>Best regards,<br>Dr. Anjani Dixit & Team<br>Kasper Multi-Speciality Clinic, Indiranagar</p>
      `,
    })

    // Email to clinic admin
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@anjanidixit.com',
      to: process.env.CLINIC_EMAIL || 'doc.anjani@gmail.com',
      subject: `New Appointment Booking - ${booking.fullName}`,
      html: `
        <h2>New Appointment Booking</h2>
        <p><strong>Patient Name:</strong> ${booking.fullName}</p>
        <p><strong>Email:</strong> ${booking.email}</p>
        <p><strong>Phone:</strong> ${booking.phone}</p>
        <p><strong>Age:</strong> ${booking.age || 'Not provided'}</p>
        <p><strong>Service:</strong> ${SERVICE_NAMES[booking.service]}</p>
        <p><strong>Preferred Date:</strong> ${new Date(booking.preferredDate).toLocaleDateString()}</p>
        <p><strong>Preferred Time:</strong> ${booking.preferredTime}</p>
        <p><strong>Notes:</strong> ${booking.notes || 'None'}</p>
        <p><strong>Source:</strong> Website Form</p>
        <p><strong>Submitted:</strong> ${new Date(booking.submitted_at).toLocaleString()}</p>
      `,
    })

    console.log('[EMAIL_SENT] Confirmation emails sent for:', booking.fullName)
  } catch (error) {
    console.error('[EMAIL_ERROR]', error)
  }
}

async function logToDatabase(booking) {
  try {
    // Store appointment submission in DocPulse tracking
    const response = await fetch(new URL('/api/track-appointment', process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        timestamp: booking.submitted_at,
        booked_channel: 'Website Form',
        source: 'appointment_website',
        patient_name: booking.fullName,
        patient_email: booking.email,
        patient_phone: booking.phone,
        patient_age: booking.age,
        service_type: SERVICE_NAMES[booking.service],
        preferred_date: booking.preferredDate,
        preferred_time: booking.preferredTime,
        notes: booking.notes,
      }),
    })

    if (response.ok) {
      console.log('[DATABASE] Booking logged to DocPulse tracking')
    }
  } catch (error) {
    console.error('[DATABASE_ERROR]', error)
  }
}

export async function POST(request) {
  try {
    const booking = await request.json()

    // Validate required fields
    const required = ['fullName', 'email', 'phone', 'service', 'preferredDate', 'preferredTime']
    for (const field of required) {
      if (!booking[field]) {
        return Response.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Basic validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.email)) {
      return Response.json({ error: 'Invalid email' }, { status: 400 })
    }

    if (!/^[0-9]{10}$/.test(booking.phone.replace(/\D/g, ''))) {
      return Response.json({ error: 'Invalid phone number' }, { status: 400 })
    }

    console.log('[APPOINTMENT_SUBMISSION]', {
      timestamp: booking.submitted_at,
      patient: booking.fullName,
      service: booking.service,
      date: booking.preferredDate,
      source: 'website_form',
    })

    // Send emails and log to database (fire and forget)
    Promise.all([
      sendEmails(booking),
      logToDatabase(booking),
    ]).catch(err => console.error('[ASYNC_ERROR]', err))

    return Response.json({
      success: true,
      message: 'Appointment booking submitted successfully',
      timestamp: booking.submitted_at,
    })
  } catch (error) {
    console.error('[API_ERROR]', error)
    return Response.json(
      { error: 'Failed to process booking' },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
