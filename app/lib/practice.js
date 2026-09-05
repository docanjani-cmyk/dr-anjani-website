// Where Dr. Anjani actually sees patients and operates. One source of truth:
// the homepage locations section, the service pages, and the FAQ answers all
// read from here.

export const CLINIC = {
  name: 'Kasper Multi-Speciality Clinic',
  address: '31, 80 Feet Rd, Indiranagar, Bengaluru 560038',
  hours: 'Mon–Sat · 9 AM – 7 PM',
  maps: 'https://maps.app.goo.gl/8MKPqCCGujp34cXe7',
}

// `for` lists the kinds of care admitted at each hospital, so a service page
// can show the ones its readers would actually be admitted to.
export const HOSPITALS = [
  { name: 'Motherhood Hospital', area: 'Indiranagar', for: ['delivery', 'surgery', 'fertility'] },
  { name: 'Cloudnine Hospital', area: 'Old Airport Road', for: ['delivery', 'surgery', 'fertility'] },
  { name: 'Manipal Hospital', area: 'Old Airport Road', for: ['delivery', 'surgery'] },
  { name: 'Milann Fertility Center', area: 'Indiranagar', for: ['fertility'] },
  { name: 'Revive Hospital', area: 'Indiranagar', for: ['delivery', 'surgery'] },
  { name: 'Ayaansh Hospital', area: 'Indiranagar', for: ['delivery', 'surgery'] },
].map(h => ({
  ...h,
  maps: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${h.name}, ${h.area}, Bengaluru`)}`,
}))

/** The hospitals that admit a given kind of care, in the order listed above. */
export const hospitalsFor = kind => (kind ? HOSPITALS.filter(h => h.for.includes(kind)) : HOSPITALS)
