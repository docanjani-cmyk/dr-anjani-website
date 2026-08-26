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

## GCLID Capture on Book Appointment Clicks

Every click on a Book Appointment control is recorded to a Postgres database
(Neon, via the Vercel Marketplace) together with the Google Ads click ID that
brought the visitor to the site.

### How it works

```
Ad click → /pcos?gclid=Cj0KCQ...
    ↓
AttributionTracker (mounted in app/layout.js)
    └→ captureAttribution() stores gclid / gbraid / wbraid / utm_* in sessionStorage
    ↓
Visitor browses (attribution survives navigation within the tab session)
    ↓
Click "Book a Consultation"  →  trackBooking()
    ├→ gtag event (unchanged — existing GA/Ads behaviour is preserved)
    └→ POST /api/track-booking-click
         └→ INSERT INTO booking_clicks
```

### Files

| File | Role |
|------|------|
| `app/lib/attribution.js` | Captures ad params; `trackBooking()` fires gtag **and** logs the click |
| `app/lib/AttributionTracker.js` | Mounted once in the root layout so every entry point is captured |
| `app/lib/db.js` | Lazily created Neon client (safe at build time) |
| `app/api/track-booking-click/route.js` | Validates and inserts the click |
| `scripts/schema.sql` | `booking_clicks` table definition |
| `scripts/init-db.mjs` | One-time table creation |

### Setup

```bash
vercel integration add neon --name gclid-tracking   # accept marketplace terms in browser first
vercel env pull .env.local --yes
node --env-file=.env.local scripts/init-db.mjs
```

### Attribution window

Attribution is **session-scoped** (`sessionStorage`): it survives navigation
between pages in the same tab, but not a closed tab or a return visit the next
day. Google Ads itself attributes on a 90-day click window, so a visitor who
clicks an ad today and books next week will be recorded here with no gclid.
Switching to a 90-day first-party cookie in `app/lib/attribution.js` is the
change to make if that gap matters.

### What is deliberately not stored

The booking form is a cross-origin Firebase iframe, so nothing a patient types
into it is visible to this site and none of it is recorded. The table holds
campaign attribution only — no name, contact details, or clinical information.
Location is stored as country/region from Vercel's edge headers rather than the
raw IP address.

### Querying

```sql
-- Booking clicks per campaign, last 30 days
SELECT utm_campaign, COUNT(*) AS clicks, COUNT(gclid) AS from_ads
FROM booking_clicks
WHERE clicked_at > now() - interval '30 days'
GROUP BY utm_campaign
ORDER BY clicks DESC;

-- GCLIDs to reconcile against confirmed appointments for offline conversion import
SELECT gclid, clicked_at, page_path
FROM booking_clicks
WHERE gclid IS NOT NULL
ORDER BY clicked_at DESC;
```
