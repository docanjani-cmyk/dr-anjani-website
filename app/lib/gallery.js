// The patient photo library in /public/Gallery, described once and ordered per
// page. Galleries show only the first few photos until a visitor asks for the
// rest, so the order is the point: the strongest, warmest, most on-topic photo
// for that page goes first, and anything cluttered (stickers over faces, a
// crowded frame) sits behind the button.
//
// "About us 8.jpg" is a byte-for-byte duplicate of 7 and "About us 16.jpg"
// does not exist, so neither is listed. "About us 17.jpg" was published with a
// patient's name, age and UHID legible on the theatre whiteboard behind her;
// the file now ships with that background blurred out.

// One entry per photo: where the file is, what it shows, and its intrinsic
// pixel size. next/image needs the dimensions to reserve the right box before
// the image arrives — the gallery is a masonry column layout, so a wrong ratio
// would shuffle every photo below it.
//
// Numeric keys are the original "About us N.jpg" set; newer photos are keyed by
// name and carry a filename that says what they are.
const PHOTOS = {
  1: {
    src: '/Gallery/About us 1.jpg',
    alt: 'Dr. Anjani Dixit holding a newborn wrapped in a blue swaddle outside the ward',
    width: 781, height: 998,
  },
  2: {
    src: '/Gallery/About us 2.jpg',
    alt: 'Dr. Anjani Dixit in her consulting room with a newborn wrapped in a pink blanket',
    width: 327, height: 520,
  },
  3: {
    src: '/Gallery/About us 3.jpg',
    alt: 'Dr. Anjani Dixit bringing a newborn to her mother at the bedside',
    width: 390, height: 520,
  },
  4: {
    src: '/Gallery/About us 4.jpg',
    alt: 'Dr. Anjani Dixit in surgical scrubs holding a newborn moments after delivery',
    width: 315, height: 520,
  },
  5: {
    src: '/Gallery/About us 5.jpg',
    alt: 'Dr. Anjani Dixit carrying a newborn wrapped in a pink blanket at the clinic',
    width: 293, height: 520,
  },
  6: {
    src: '/Gallery/About us 6.jpg',
    alt: 'Dr. Anjani Dixit holding a newborn in a yellow blanket beside the mother’s bed',
    width: 390, height: 520,
  },
  7: {
    src: '/Gallery/About us 7.jpg',
    alt: 'Dr. Anjani Dixit with a newborn in the ward after delivery',
    width: 293, height: 520,
  },
  9: {
    src: '/Gallery/About us 9.jpg',
    alt: 'New parents with their baby beside the mother’s bed after delivery',
    width: 520, height: 390,
  },
  10: {
    src: '/Gallery/About us 10.jpg',
    alt: 'Dr. Anjani Dixit holding newborn twins, one in each arm',
    width: 390, height: 520,
  },
  11: {
    src: '/Gallery/About us 11.jpg',
    alt: 'Dr. Anjani Dixit with a family and their newborn on the day of discharge',
    width: 520, height: 476,
  },
  12: {
    src: '/Gallery/About us 12.jpg',
    alt: 'Dr. Anjani Dixit with parents and their toddler at a follow-up visit',
    width: 293, height: 520,
  },
  13: {
    src: '/Gallery/About us 13.jpg',
    alt: 'Dr. Anjani Dixit holding a newborn while the mother stands beside her',
    width: 390, height: 520,
  },
  14: {
    src: '/Gallery/About us 14.jpg',
    alt: 'Dr. Anjani Dixit carrying a newborn in a blue swaddle at the ward door',
    width: 390, height: 520,
  },
  15: {
    src: '/Gallery/About us 15.jpg',
    alt: 'Dr. Anjani Dixit laughing as she holds a newborn at the clinic',
    width: 945, height: 1600,
  },
  17: {
    src: '/Gallery/About us 17.jpg',
    alt: 'Dr. Anjani Dixit in theatre scrubs holding a newborn after a delivery',
    width: 960, height: 1280,
  },
  18: {
    src: '/Gallery/About us 18.jpg',
    alt: 'Dr. Anjani Dixit with a family and their baby outside the ward',
    width: 960, height: 1280,
  },
  19: {
    src: '/Gallery/About us 19.jpg',
    alt: 'Dr. Anjani Dixit and the theatre team during a laparoscopic procedure',
    width: 561, height: 519,
  },
  20: {
    src: '/Gallery/About us 20.jpg',
    alt: 'Laparoscopic surgery under way, the laparoscope view on the theatre monitor',
    width: 960, height: 1280,
  },
  21: {
    src: '/Gallery/About us 21.jpg',
    alt: 'Dr. Anjani Dixit operating, seen close up over the surgical drapes',
    width: 960, height: 1280,
  },
  22: {
    src: '/Gallery/About us 22.jpg',
    alt: 'Dr. Anjani Dixit with a theatre colleague after a procedure',
    width: 876, height: 1280,
  },
  23: {
    src: '/Gallery/About us 23.jpg',
    alt: 'Dr. Anjani Dixit holding a newborn in a printed blanket in her consulting room',
    width: 960, height: 1280,
  },
  24: {
    src: '/Gallery/About us 24.jpg',
    alt: 'The theatre team in full protective gear during a procedure',
    width: 900, height: 805,
  },
  25: {
    src: '/Gallery/About us 25.jpg',
    alt: 'Dr. Anjani Dixit performing laparoscopic surgery, watching the monitor',
    width: 960, height: 1280,
  },
  26: {
    src: '/Gallery/About us 26.jpg',
    alt: 'Dr. Anjani Dixit and her team operating, the laparoscope view on the monitor',
    width: 1280, height: 667,
  },
  'theatre-lap': {
    src: '/Gallery/laparoscopic-surgery-theatre-sep-2026.jpg',
    alt: 'Dr. Anjani Dixit operating laparoscopically, passing an instrument to her assistant',
    width: 960, height: 1019,
  },
  'theatre-lap-wide': {
    src: '/Gallery/laparoscopic-surgery-team-sep-2026.jpg',
    alt: 'Dr. Anjani Dixit and her theatre team mid-procedure, laparoscopic ports in place',
    width: 960, height: 1280,
  },
  'theatre-open': {
    src: '/Gallery/open-surgery-theatre-sep-2026.jpg',
    alt: 'Dr. Anjani Dixit operating with a scrub nurse assisting at the table',
    width: 960, height: 1280,
  },
}

const photos = ids => ids.map(id => {
  const photo = PHOTOS[id]
  if (!photo) throw new Error(`gallery.js: no photo "${id}"`)
  return photo
})

/** Newborns and families first — the homepage gallery is "Moments of Joy". */
export const HOME_GALLERY = photos([
  10, 2, 6, 4, 1, 11, 12, 23,
  17, 5, 14, 13, 22, 15, 19, 'theatre-lap', 25, 21, 26, 20, 24, 9, 3, 7,
])

export const ABOUT_GALLERY = photos([
  10, 2, 6, 4, 1, 11, 12, 14,
  5, 13, 15, 3, 7,
])

/** Delivery-room photos lead on the pregnancy page. */
export const PREGNANCY_GALLERY = photos([
  4, 17, 2, 6, 10, 1, 23, 11,
  13, 5, 14, 15, 12, 3, 7, 18,
])

/** Twins and growing families lead on the IVF page. */
export const IVF_GALLERY = photos([
  10, 2, 6, 12, 11, 1, 4, 23,
  5, 13, 14, 15, 17, 3, 7, 18,
])

/** Theatre photos only — the clearest views of her operating come first. */
export const SURGERY_GALLERY = photos([
  'theatre-lap', 19, 25, 'theatre-open',
  21, 'theatre-lap-wide', 26, 20, 22, 24,
])
