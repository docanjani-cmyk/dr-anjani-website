# Appointment Form Submission Tracking

This document explains how form submissions are tracked and integrated with DocPulse and Google Ads.

## Architecture

### 1. Frontend Tracking (`app/page.js`)
- **Function**: `trackFormSubmission(data)`
- **Tracks**: 
  - Google Analytics events: `appointment_form_submitted`
  - Timestamp of submission
  - Source: `website_form`

### 2. Backend Logging (`app/api/track-appointment/route.js`)
- **Endpoint**: `POST /api/track-appointment`
- **Accepts**: JSON with appointment submission data
- **Logs**: Console output and can be extended to store in database
- **Integration**: Ready to connect to DocPulse data pipeline

## Usage

### In React Components
```javascript
const handleBookingSubmit = async (formData) => {
  // Your form submission logic
  await trackFormSubmission({
    appointment_time: formData.time,
    patient_type: formData.patient_type,
    service_type: formData.service,
    // ... other fields
  })
}
```

### Data Flow
```
Website Form 
  ↓
trackFormSubmission()
  ├→ Google Analytics Event
  └→ POST /api/track-appointment
      ├→ Console Log
      └→ (Future) DocPulse Database
```

## DocPulse Integration

To fully integrate with DocPulse appointment records:

1. **Field Mapping**: Map form submission fields to CSV columns:
   - `timestamp` → `Apt Booked Date` + `Apt Booked Time`
   - `patient_type` → `Old/New Patient`
   - `service_type` → `Apt Type`
   - `source: 'website_form'` → `Booked Channel`

2. **Data Storage**: Extend `/api/track-appointment` to store in:
   - Database (PostgreSQL, MongoDB, etc.)
   - Cloud Storage (Firebase, S3)
   - Google Sheets (for CSV sync with DocPulse)

3. **Sync Strategy**:
   - Real-time: Log directly to database
   - Batch: Collect and sync nightly to DocPulse
   - Manual: Export from tracking DB to CSV format

## Metrics to Track

- ✅ Form submission count
- ✅ Submission source (website vs. clinic reception)
- ✅ Submission timestamp
- ✅ Appointment type
- ✅ Patient type (new vs. repeat)
- ✅ Booking completion rate (submitted → appointment completed)

## Google Ads Integration (🔴 ACTION REQUIRED)

### Current Setup
- **Google Ads Account ID**: `AW-1796712782`
- **Tracking Method**: Direct conversion tracking via `gtag`
- **Conversion Value**: ₹1000 (default consultation fee)
- **Currency**: INR

### ⚠️ Required Configuration

**Step 1**: Get your Conversion ID from Google Ads
1. Go to Google Ads → Tools → Conversions
2. Find "Website - Appointment Form Submission" or create new conversion
3. Copy the **Conversion ID** (looks like: `1234567890`)

**Step 2**: Update the code in `app/page.js`
```javascript
// Replace this:
send_to: 'AW-1796712782/YOUR_CONVERSION_ID'

// With your actual ID:
send_to: 'AW-1796712782/1234567890'  // ← Your ID here
```

**Step 3**: Verify in Google Ads
- Go to Tools → Tag Assistant
- Navigate to your website
- Should see "Conversion tracking is working"

### Events Being Tracked

| Event | Platform | Data Sent |
|-------|----------|-----------|
| `appointment_form_submitted` | Google Analytics 4 | timestamp, source, service type |
| `conversion` | Google Ads | conversion value (₹1000), currency, transaction ID |
| Form submission log | Backend API | All form data + timestamp |

## Next Steps

1. **✅ Google Ads Setup** - Update conversion ID (see above)
2. **DocPulse Database** - Choose storage backend & sync strategy
3. **Extend API** - Store data instead of just logging
4. **Add daily sync** - Merge website submissions into DocPulse CSVs
5. **Monitoring dashboard** - Track conversion rates
