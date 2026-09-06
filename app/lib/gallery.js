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

const CAPTIONS = {
  1: 'Dr. Anjani Dixit holding a newborn wrapped in a blue swaddle outside the ward',
  2: 'Dr. Anjani Dixit in her consulting room with a newborn wrapped in a pink blanket',
  3: 'Dr. Anjani Dixit bringing a newborn to her mother at the bedside',
  4: 'Dr. Anjani Dixit in surgical scrubs holding a newborn moments after delivery',
  5: 'Dr. Anjani Dixit carrying a newborn wrapped in a pink blanket at the clinic',
  6: 'Dr. Anjani Dixit holding a newborn in a yellow blanket beside the mother’s bed',
  7: 'Dr. Anjani Dixit with a newborn in the ward after delivery',
  9: 'New parents with their baby beside the mother’s bed after delivery',
  10: 'Dr. Anjani Dixit holding newborn twins, one in each arm',
  11: 'Dr. Anjani Dixit with a family and their newborn on the day of discharge',
  12: 'Dr. Anjani Dixit with parents and their toddler at a follow-up visit',
  13: 'Dr. Anjani Dixit holding a newborn while the mother stands beside her',
  14: 'Dr. Anjani Dixit carrying a newborn in a blue swaddle at the ward door',
  15: 'Dr. Anjani Dixit laughing as she holds a newborn at the clinic',
  17: 'Dr. Anjani Dixit in theatre scrubs holding a newborn after a delivery',
  18: 'Dr. Anjani Dixit with a family and their baby outside the ward',
  19: 'Dr. Anjani Dixit and the theatre team during a laparoscopic procedure',
  20: 'Laparoscopic surgery under way, the laparoscope view on the theatre monitor',
  21: 'Dr. Anjani Dixit operating, seen close up over the surgical drapes',
  22: 'Dr. Anjani Dixit with a theatre colleague after a procedure',
  23: 'Dr. Anjani Dixit holding a newborn in a printed blanket in her consulting room',
  24: 'The theatre team in full protective gear during a procedure',
  25: 'Dr. Anjani Dixit performing laparoscopic surgery, watching the monitor',
  26: 'Dr. Anjani Dixit and her team operating, the laparoscope view on the monitor',
}

// Intrinsic pixel sizes, measured from the files. next/image needs them to
// reserve the right box before the image arrives — the gallery is a masonry
// column layout, so a wrong ratio would shuffle every photo below it.
const SIZES = {
  1: [781, 998],
  2: [327, 520],
  3: [390, 520],
  4: [315, 520],
  5: [293, 520],
  6: [390, 520],
  7: [293, 520],
  9: [520, 390],
  10: [390, 520],
  11: [520, 476],
  12: [293, 520],
  13: [390, 520],
  14: [390, 520],
  15: [945, 1600],
  17: [960, 1280],
  18: [960, 1280],
  19: [561, 519],
  20: [960, 1280],
  21: [960, 1280],
  22: [876, 1280],
  23: [960, 1280],
  24: [900, 805],
  25: [960, 1280],
  26: [1280, 667],
}

const photos = ids => ids.map(i => ({
  src: `/Gallery/About us ${i}.jpg`,
  alt: CAPTIONS[i],
  width: SIZES[i][0],
  height: SIZES[i][1],
}))

/** Newborns and families first — the homepage gallery is "Moments of Joy". */
export const HOME_GALLERY = photos([
  10, 2, 6, 4, 1, 11, 12, 23,
  17, 5, 14, 13, 22, 15, 19, 25, 21, 26, 20, 24, 9, 3, 7,
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
export const SURGERY_GALLERY = photos([19, 25, 21, 26, 20, 22, 24])
