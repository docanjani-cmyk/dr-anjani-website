// Copy for this landing page. Kept out of page.js so layout.js can build the
// FAQ schema from the same source the page renders — the two cannot drift.
import { SECOND_OPINION_LAP_REVIEWS, REVIEW_STATS } from '../../lib/reviews'

export const CONTENT = {
  eyebrow: 'Second Opinion · Gynaecological Surgery · Bangalore',
  h1: { lead: 'Told you need surgery?', em: 'Get a second opinion first.' },
  sub: [
    'If you have been advised a hysterectomy, an open operation, or any gynaecological surgery you are not sure about, it is entirely reasonable to have someone else look at your reports before you agree.',
    'Dr. Anjani Dixit reviews your scans and your history, tells you plainly whether the surgery is needed, and whether there is a less invasive way to do it.',
  ],
  credLine: 'Fellowship in Minimal Access Surgery · 300+ laparoscopic procedures · 14+ years',
  waCta: 'Send Your Reports',
  whatsappText: 'Hi Dr. Anjani, I have been advised surgery by another doctor and would like a second opinion. I am sending my reports.',
  heroImg: '/IMG-20251024-WA0023.jpg',
  heroAlt: 'Dr. Anjani Dixit, laparoscopic gynaecological surgeon, Indiranagar, Bangalore',
  heroPos: 'center 78%',   // mobile crop focus

  stats: [
    { value: '300+', label: 'Laparoscopic procedures' },
    { value: '14+', label: 'Years in practice' },
    { value: '5.0 ★', label: 'Google rating', href: 'https://maps.app.goo.gl/8MKPqCCGujp34cXe7' },
    { value: String(REVIEW_STATS.total), label: 'Verified reviews' },
    { value: '₹1000', label: 'Consultation, valid 7 days' },
  ],

  reassure: {
    title: 'Wanting to be sure is not being difficult',
    body: [
      'Most women who come for a second opinion apologise for it. They worry they are being distrustful, or wasting a doctor\'s time, or that their current doctor will find out and be offended.',
      'None of that is a problem. Surgery is permanent, and a hysterectomy especially so. Taking a week to be certain costs you very little. Agreeing to an operation you did not fully understand can cost you a great deal.',
    ],
  },

  reasons: {
    title: 'What usually brings someone here',
    intro: 'These are the things patients tell Dr. Anjani in the first few minutes. If one of them sounds like your situation, a review is worth your time.',
    items: [
      { said: 'They said the only option is to remove the uterus.', desc: 'For many fibroids, a myomectomy removes the fibroids and leaves the uterus in place. Whether that applies to you depends on the size, number, and position of the fibroids — which is exactly what the scan shows.' },
      { said: 'I have been told it has to be an open surgery.', desc: 'A great deal of what once needed an open cut can now be done through keyhole incisions. Sometimes open really is the right call. It is worth knowing which situation you are in.' },
      { said: 'Nobody explained why I need this operation.', desc: 'If you cannot repeat back the reason for your surgery in your own words, you have not been properly consented. You are entitled to understand it.' },
      { said: 'I am worried this will end my chances of a baby.', desc: 'For most conditions, surgery can be planned around your fertility rather than at its expense — but only if someone asks you about it first.' },
    ],
  },

  process: {
    title: 'What a second opinion actually involves',
    steps: [
      { title: 'A proper look at the imaging', desc: 'Dr. Anjani reads the ultrasound or MRI herself rather than relying only on the report summary, and examines you where it is needed.' },
      { title: 'A straight answer', desc: 'Whether the operation is necessary, whether it can be done laparoscopically, what the alternatives are, and what happens if you wait.' },
      { title: 'The plan in writing', desc: 'You leave with the reasoning written down, so you can think it over at home or discuss it with your family without relying on memory.' },
      { title: 'No obligation to switch', desc: 'You are free to take the opinion back to your original doctor and continue there. Many patients do exactly that.' },
      { title: 'Seven days to come back', desc: 'The ₹1000 consultation stays valid for a week, so a follow-up question or a new report does not cost you a second fee.' },
    ],
  },

  honesty: {
    title: 'Sometimes the first doctor is right',
    body: [
      'A second opinion is not a promise that you will be told something different. Often the original advice is sound, and Dr. Anjani will say so — that surgery is genuinely needed, and that you should go ahead with it.',
      'What you will not get is an operation recommended for its own sake. Where medication, watchful waiting, or simply doing nothing is the better course, that is what will be advised.',
    ],
  },

  considered: {
    eyebrow: 'The alternatives',
    title: 'Questions worth asking before any gynaecological surgery',
    intro: 'These are the points a second opinion is there to settle. None of them have a single right answer — they depend on your scan, your symptoms, and what you want from the years ahead.',
    items: [
      { tag: 'Uterus', title: 'Removal, or removal of the fibroids?', desc: 'A myomectomy takes out fibroids and leaves the uterus. A hysterectomy takes the uterus itself. The right choice depends on your fibroids and on whether you may want a pregnancy.' },
      { tag: 'Approach', title: 'Keyhole, or open?', desc: 'Laparoscopic surgery generally means 1–2 weeks of recovery rather than 4–6, less pain, and minimal scarring. Not every case suits it — but many more do than are offered it.' },
      { tag: 'Timing', title: 'Now, or can it wait?', desc: 'Some findings need prompt treatment. Others can be watched safely with periodic scans, particularly if symptoms are mild or you are near menopause.' },
      { tag: 'Cost', title: 'What are you actually being charged for?', desc: 'An itemised estimate, and a clear answer on what your insurance covers, should be available before you consent to anything.' },
    ],
  },

  whyHer: {
    title: 'A surgeon who is not tied to one hospital',
    paras: [
      'Dr. Anjani Dixit holds a Fellowship in Minimal Access Surgery and has performed over 300 laparoscopic gynaecological procedures across 14+ years, covering fibroids, endometriosis including deeply infiltrating disease, ovarian cysts, and hysterectomy.',
      'She operates as a visiting consultant at six hospitals across Bangalore — Manipal, Cloudnine, Motherhood, Milann, Revive, and Ayaansh. The hospital is chosen with you, based on your location, your insurance, and your budget.',
    ],
    points: [
      { title: 'No bed to fill', desc: 'She is not employed by a single hospital, so there is no institutional pressure behind the recommendation you receive.' },
      { title: 'Unhurried consultations', desc: 'Consistently the thing patients mention most in the reviews below — that she does not rush, and answers until the question is finished.' },
      { title: 'Fee valid for seven days', desc: 'Come back within the week with a new report or a fresh set of questions at no extra charge.' },
    ],
  },

  bring: {
    title: 'What to send before your appointment',
    intro: 'The more of this she has in advance, the more of the consultation is spent on your questions rather than on paperwork. Send what you have — an incomplete set is fine.',
    items: [
      'Ultrasound, MRI, or CT reports — the images too, if you have the CD or films',
      'The written surgical advice or admission note from your current doctor',
      'Previous prescriptions and any medication you are currently taking',
      'A short list of what you actually want to ask',
    ],
    note: 'Reports sent on WhatsApp go to the clinic\'s consulting number and are used only to prepare for your appointment.',
  },

  reviews: SECOND_OPINION_LAP_REVIEWS,
  reviewsTitle: 'People who came for a second opinion',

  faqs: [
    { q: 'Do I have to tell my current doctor I am getting a second opinion?', a: 'No. You are under no obligation to tell anyone. Nothing is shared with your current doctor unless you ask for it to be. That said, most doctors take a second opinion as routine rather than as an insult, and many patients find the conversation easier than they expected.' },
    { q: 'What does the consultation cost?', a: 'The consultation fee is ₹1000 and it stays valid for seven days. If you come back within that week — with a new scan, or with questions that occurred to you afterwards — there is no additional charge.' },
    { q: 'What if Dr. Anjani agrees with my current doctor?', a: 'She will tell you so directly, and explain the reasoning so you understand why the operation is needed. You are then free to go ahead with your original surgeon. A second opinion that confirms the first is a good outcome, not a wasted appointment.' },
    { q: 'Do I have to switch my treatment to Dr. Anjani?', a: 'Not at all. Many people come for the opinion, take it back to the doctor they were already seeing, and continue their treatment there. If you do want her to take over your care, that can be arranged — but it is your decision and there is no pressure either way.' },
    { q: 'Can I do this online if I am not in Bangalore?', a: 'Yes. Video consultations are available and are commonly used by patients elsewhere in India and abroad. Send your reports beforehand and the review can be done remotely, before you decide whether to travel.' },
    { q: 'Is it too late if my surgery is already scheduled?', a: 'No. As long as the operation has not happened, a review is still worthwhile. If the date is close, mention it when you get in touch so the appointment can be brought forward.' },
  ],

  finalCta: {
    title: 'Have your reports looked at before you decide',
    sub: 'Send your scans on WhatsApp, or book a consultation at Kasper Multi-Speciality Clinic, Indiranagar. In-person and video consultations available.',
  },

  footerLinks: [
    ['Laparoscopic Surgery', '/laparoscopic-surgery'],
    ['IVF & Fertility', '/ivf-infertility'],
    ['About Dr. Anjani', '/about-us'],
    ['← Back to main site', '/'],
  ],
}
