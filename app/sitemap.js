export default function sitemap() {
  const base = 'https://www.anjanidixit.com'
  const lastModified = new Date()
  return [
    { url: base, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/laparoscopic-surgery`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/ivf-infertility`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/pcos`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/pregnancy`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/cosmetic-gynecology`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
  ]
}
