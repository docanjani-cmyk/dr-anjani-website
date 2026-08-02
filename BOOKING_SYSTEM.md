# Premium Appointment Booking System

Complete appointment booking solution with form submissions, email notifications, Google Analytics/Ads tracking, and DocPulse integration.

## Features

### Frontend (User Experience)
- ✅ Professional, responsive appointment booking form
- ✅ Real-time form validation with helpful error messages
- ✅ Service selection (6 services)
- ✅ Date picker (next 90 days)
- ✅ Time slot selection (9 AM - 7 PM)
- ✅ Additional notes field
- ✅ Consent checkbox
- ✅ Success/error notifications
- ✅ Accessibility features (semantic HTML, ARIA labels)

### Backend (Form Processing)
- ✅ `POST /api/book-appointment` - Handles form submissions
- ✅ Email validation
- ✅ Phone number validation
- ✅ Data logging to console (for debugging)
- ✅ Error handling and reporting

### Email Notifications
- ✅ Confirmation email sent to patient
- ✅ Clinic notification email to admin
- ✅ Requires email configuration (see below)

### Analytics & Tracking
- ✅ Google Analytics event: `appointment_form_submitted`
- ✅ Google Ads conversion: `6962668268` (Business profile - Form submit)
- ✅ Conversion value: ₹1000 (consultation fee)
- ✅ DocPulse integration: Logs to `/api/track-appointment`
- ✅ Transaction ID generation for unique tracking

## Configuration

### Environment Variables (Vercel)

Add these to your Vercel project settings or `.env.local`:

```bash
# Email Configuration (Optional - for email notifications)
EMAIL_HOST=smtp.gmail.com          # Your email provider's SMTP host
EMAIL_PORT=587                     # SMTP port (usually 587 or 465)
EMAIL_SECURE=false                 # Use TLS (true for 465, false for 587)
EMAIL_USER=your-email@gmail.com    # Email address to send from
EMAIL_PASS=your-app-password       # App-specific password (not your Gmail password)
EMAIL_FROM=noreply@anjanidixit.com # From address for emails
CLINIC_EMAIL=doc.anjani@gmail.com  # Clinic admin email (receives notifications)
```

### Email Setup (Gmail Example)

1. Enable 2-Factor Authentication in Google Account
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Copy the 16-character password to `EMAIL_PASS`
4. Set other variables accordingly

## Form Data Structure

```javascript
{
  fullName: string,           // Patient's full name
  email: string,              // Email address (validated)
  phone: string,              // 10-digit phone number (validated)
  age: string,                // Age (optional)
  service: string,            // Service ID (laparoscopic, ivf, pregnancy, pcos, cosmetic, consultation)
  preferredDate: string,      // ISO date format (YYYY-MM-DD)
  preferredTime: string,      // Time slot (e.g., "09:00-10:00")
  notes: string,              // Additional notes (optional)
  consent: boolean,           // Must be true to submit
  submitted_at: string,       // ISO timestamp
  source: string,             // "website_form"
}
```

## Tracking Flow

```
User Submits Form
    ↓
[Frontend Validation]
    ↓
[Google Analytics Event] ← appointment_form_submitted
    ↓
[Google Ads Conversion] ← 6962668268 (₹1000)
    ↓
[POST /api/book-appointment]
    ├─→ [Send Patient Email] (confirmation)
    ├─→ [Send Clinic Email] (notification)
    └─→ [Log to DocPulse] (/api/track-appointment)
    ↓
[Success Response to User]
```

## Services Offered

| ID | Service Name |
|----|--------------|
| `laparoscopic` | Laparoscopic Surgery |
| `ivf` | IVF & Fertility Treatment |
| `pregnancy` | Pregnancy Care |
| `pcos` | PCOS Management |
| `cosmetic` | Cosmetic Gynecology |
| `consultation` | General Consultation |

## Time Slots Available

- 9:00 AM - 10:00 AM
- 10:00 AM - 11:00 AM
- 11:00 AM - 12:00 PM
- 12:00 PM - 1:00 PM
- 2:00 PM - 3:00 PM
- 3:00 PM - 4:00 PM
- 4:00 PM - 5:00 PM
- 5:00 PM - 6:00 PM
- 6:00 PM - 7:00 PM

## API Endpoints

### POST /api/book-appointment

**Request:**
```json
{
  "fullName": "Jane Doe",
  "email": "jane@example.com",
  "phone": "9876543210",
  "age": "35",
  "service": "ivf",
  "preferredDate": "2026-08-15",
  "preferredTime": "10:00-11:00",
  "notes": "First time consultation",
  "consent": true,
  "submitted_at": "2026-08-02T14:30:00Z",
  "source": "website_form"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Appointment booking submitted successfully",
  "timestamp": "2026-08-02T14:30:00Z"
}
```

**Response (Error):**
```json
{
  "error": "Invalid email"
}
```

## Validation Rules

| Field | Rules |
|-------|-------|
| `fullName` | Required, min 2 characters |
| `email` | Required, valid email format |
| `phone` | Required, exactly 10 digits |
| `age` | Optional, numeric only |
| `service` | Required, must be valid service ID |
| `preferredDate` | Required, between today and 90 days ahead |
| `preferredTime` | Required, from available slots |
| `consent` | Required, must be true |

## Debugging

### Check Form Submissions

Server logs will show:
```
[APPOINTMENT_SUBMISSION] { timestamp, patient, service, date, source }
[EMAIL_SENT] Confirmation emails sent for: Jane Doe
[DATABASE] Booking logged to DocPulse tracking
```

### If Emails Don't Send

1. Check environment variables are set correctly
2. Verify SMTP credentials
3. Check Gmail account has App Passwords enabled (if using Gmail)
4. Look for `[EMAIL_DISABLED]` or `[EMAIL_ERROR]` in logs

### If Booking Doesn't Track

1. Check Google Analytics is loading (`G-TKCQJPPP68`)
2. Verify Google Ads account ID (`AW-1796712782`)
3. Check conversion ID is correct (`6962668268`)
4. Monitor network tab for successful `gtag` events

## Future Enhancements

- [ ] Availability calendar integration
- [ ] Automated SMS confirmations
- [ ] Payment collection pre-booking
- [ ] Appointment rescheduling/cancellation
- [ ] Video consultation booking option
- [ ] Insurance verification
- [ ] Appointment reminders (24h before)
- [ ] CRM integration (Salesforce, HubSpot)

## Support

For issues:
1. Check browser console for JavaScript errors
2. Check server logs for backend errors
3. Verify environment variables in Vercel dashboard
4. Test email configuration separately
