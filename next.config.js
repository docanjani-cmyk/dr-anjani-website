/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Vercel resizes and re-encodes on the fly. The heroes were 139KB JPEGs
    // painted into a ~380px box on a phone; AVIF/WebP at the right width is a
    // fraction of that, and the hero is the LCP element on every page.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [390, 640, 828, 1080, 1200, 1920],
  },
}

module.exports = nextConfig
