'use client'

import { useEffect } from 'react'

/**
 * Adds `revealed` to every `.reveal` element as it scrolls into view. Rendering
 * nothing, it lets the sections it animates stay server components.
 *
 * Without JavaScript the elements would never be revealed, so the CSS keeps
 * them visible until this mounts and marks the document as animating.
 */
export default function ScrollReveal() {
  useEffect(() => {
    document.documentElement.classList.add('reveal-ready')

    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}
