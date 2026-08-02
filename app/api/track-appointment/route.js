export async function POST(request) {
  try {
    const data = await request.json()

    // Log to console (in production, send to your backend/database)
    console.log('[APPOINTMENT_SUBMISSION]', {
      timestamp: data.timestamp,
      booked_channel: data.booked_channel,
      source: data.source,
      user_agent: request.headers.get('user-agent'),
    })

    // TODO: Send to DocPulse backend or database
    // Example:
    // await logToPulseDB({
    //   apt_booked_date: data.timestamp,
    //   booked_channel: data.booked_channel,
    //   source: 'website_form',
    //   status: 'form_submitted'
    // })

    return Response.json({
      success: true,
      message: 'Appointment submission tracked',
      timestamp: data.timestamp
    })
  } catch (error) {
    console.error('[APPOINTMENT_TRACKING_ERROR]', error)
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
