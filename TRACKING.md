# Appointment Form Submission Tracking

This document explains how form submissions are tracked and integrated with DocPulse.

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

## Next Steps

1. Connect to actual database/storage backend
2. Implement CSV export for DocPulse
3. Set up monitoring dashboard
4. Configure automated daily/weekly syncs
