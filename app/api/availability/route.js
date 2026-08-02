// Firebase booking app configuration
const FIREBASE_CONFIG = {
  appUrl: 'https://meet-my-doctor.firebaseapp.com',
  doctorId: '47150',  // uid parameter
  eventId: '38605',   // eid parameter
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const selectedDate = searchParams.get('date')

    console.log('[AVAILABILITY] Fetching available slots from Firebase booking app...')

    // Method 1: Try to fetch from Firebase Realtime Database REST API
    const slots = await fetchFromFirebaseRest(selectedDate)
    if (slots && slots.length > 0) {
      console.log('[FIREBASE_REST] Successfully fetched', slots.length, 'slots')
      return Response.json({
        success: true,
        availableSlots: slots,
        source: 'firebase_rest',
        date: selectedDate || 'all',
      })
    }

    // Method 2: Try to fetch and parse from the Firebase booking app
    const parsedSlots = await fetchFromFirebaseApp(selectedDate)
    if (parsedSlots && parsedSlots.length > 0) {
      console.log('[FIREBASE_APP] Successfully parsed', parsedSlots.length, 'slots from app')
      return Response.json({
        success: true,
        availableSlots: parsedSlots,
        source: 'firebase_app',
        date: selectedDate || 'all',
      })
    }

    // Method 3: Fallback to checking if Firebase app is accessible
    const isAccessible = await checkFirebaseAccessibility()
    console.log('[FIREBASE_CHECK] Firebase app accessible:', isAccessible)

    // Return default slots with fallback source
    return Response.json({
      success: true,
      availableSlots: getDefaultSlots(),
      source: isAccessible ? 'firebase_default' : 'default',
      message: 'Using default time slots. Firebase availability will be integrated soon.',
    })
  } catch (error) {
    console.error('[AVAILABILITY_ERROR]', error.message)

    // Graceful degradation: always return default slots
    return Response.json({
      success: true,
      availableSlots: getDefaultSlots(),
      source: 'default',
      error: error.message,
    })
  }
}

// Fetch availability from Firebase Realtime Database REST API
async function fetchFromFirebaseRest(date) {
  try {
    console.log('[FIREBASE_REST] Attempting to fetch from Firebase Realtime Database...')

    // This requires Firebase database URL and rules that allow public read access
    // Will be implemented once Firebase config is available
    const dbUrl = process.env.FIREBASE_DATABASE_URL

    if (!dbUrl) {
      console.log('[FIREBASE_REST] No database URL configured')
      return null
    }

    // Fetch appointment slots from Firebase
    const response = await fetch(`${dbUrl}/availability.json`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      timeout: 5000,
    })

    if (!response.ok) {
      console.log('[FIREBASE_REST] Response not OK:', response.status)
      return null
    }

    const data = await response.json()
    return transformFirebaseSlots(data)
  } catch (error) {
    console.log('[FIREBASE_REST] Error:', error.message)
    return null
  }
}

// Fetch and parse availability from the Firebase booking app directly
async function fetchFromFirebaseApp(date) {
  try {
    console.log('[FIREBASE_APP] Fetching from booking app...')

    const url = `${FIREBASE_CONFIG.appUrl}/#/?uid=${FIREBASE_CONFIG.doctorId}&eid=${FIREBASE_CONFIG.eventId}${
      date ? `&date=${date}` : ''
    }`

    console.log('[FIREBASE_APP] URL:', url)

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      timeout: 8000,
    })

    if (!response.ok) {
      console.log('[FIREBASE_APP] Response not OK:', response.status)
      return null
    }

    const html = await response.text()
    console.log('[FIREBASE_APP] HTML length:', html.length, 'bytes')

    // Try to parse available slots from the HTML response
    const slots = parseAvailableSlotsFromHtml(html)
    console.log('[FIREBASE_APP] Parsed slots:', slots.length > 0 ? slots : 'none found')

    return slots.length > 0 ? slots : null
  } catch (error) {
    console.log('[FIREBASE_APP] Error:', error.message)
    return null
  }
}

// Check if Firebase app is accessible
async function checkFirebaseAccessibility() {
  try {
    const response = await fetch(FIREBASE_CONFIG.appUrl, {
      method: 'HEAD',
      timeout: 5000,
    })
    return response.ok || response.status === 200
  } catch (error) {
    console.log('[FIREBASE_CHECK] Error:', error.message)
    return false
  }
}

// Parse available time slots from Firebase app HTML/JSON response
function parseAvailableSlotsFromHtml(html) {
  if (!html) return []

  try {
    // Try to find JSON data in HTML (Firebase apps often embed data in script tags)
    const jsonMatch = html.match(/"availableSlots":\s*(\[[^\]]+\])/i) ||
                      html.match(/"slots":\s*(\[[^\]]+\])/i) ||
                      html.match(/"times":\s*(\[[^\]]+\])/i)

    if (jsonMatch && jsonMatch[1]) {
      const slots = JSON.parse(jsonMatch[1])
      if (Array.isArray(slots)) {
        return slots.map(s => (typeof s === 'string' ? s : s.time || s))
      }
    }

    // Try to find time patterns in HTML (HH:MM format)
    const timePattern = /\b(0?[0-9]|1[0-9]|2[0-3]):(00|15|30|45)\s*(AM|PM|am|pm)\b/g
    const matches = html.match(timePattern)

    if (matches && matches.length > 0) {
      // Remove duplicates and sort
      return [...new Set(matches)].sort()
    }
  } catch (parseError) {
    console.log('[PARSE_ERROR]', parseError.message)
  }

  return []
}

// Default available time slots (fallback)
function getDefaultSlots() {
  return [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'
  ]
}

// Transform Firebase database response to array of time slots
function transformFirebaseSlots(firebaseData) {
  if (!firebaseData) return []

  // Handle different Firebase response formats
  if (Array.isArray(firebaseData)) {
    return firebaseData.map(slot => {
      if (typeof slot === 'string') return slot
      if (slot.time) return slot.time
      if (slot.displayTime) return slot.displayTime
      return JSON.stringify(slot)
    })
  }

  if (typeof firebaseData === 'object') {
    // Check for common Firebase data structures
    const slots = firebaseData.slots ||
                  firebaseData.availableSlots ||
                  firebaseData.times ||
                  firebaseData.availability

    if (Array.isArray(slots)) {
      return transformFirebaseSlots(slots)
    }

    // If it's an object with numeric keys, convert to array
    const entries = Object.values(firebaseData).filter(v => typeof v === 'string')
    if (entries.length > 0) {
      return entries
    }
  }

  return []
}
