export default function sitemap() {
  const base = 'https://anjanidixit.com'
  const lastModified = new Date()
  return [
    { url: base, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/about-us`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/laparoscopic-surgery`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/ivf-infertility`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/laparoscopic-surgery/second-opinion`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/ivf-infertility/second-opinion`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/pcos`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/pregnancy`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/cosmetic-gynecology`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
  ]
}
