'use client'

import { useEffect } from 'react'
import { captureAttribution } from './attribution'

// Mounted once in the root layout so every entry point to the site records the
// ad parameters it was reached with, before the visitor gets anywhere near the
// Book Appointment button.
export default function AttributionTracker() {
  useEffect(() => {
    captureAttribution()
  }, [])

  return null
}
