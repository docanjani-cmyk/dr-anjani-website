// Copy for this landing page. Kept out of page.js so layout.js can build the
// FAQ schema from the same source the page renders — the two cannot drift.
import { SECOND_OPINION_IVF_REVIEWS, REVIEW_STATS } from '../../lib/reviews'

export const CONTENT = {
  eyebrow: 'Second Opinion · Fertility & IVF · Bangalore',
  h1: { lead: 'Before you start', em: 'another cycle.' },
  sub: [
    'If a cycle has failed and nobody has explained why, if you were moved to IVF quickly, or if you are being quoted a package you do not fully understand — it is worth having someone review the whole file before you commit again.',
    'Dr. Anjani Dixit goes through your cycle records, your reports, and your husband\'s tests, and tells you what she thinks is actually standing in the way.',
  ],
  credLine: 'Laparoscopic surgeon & fertility specialist · 14+ years · Independent consultant',
  waCta: 'Send Your Reports',
  whatsappText: 'Hi Dr. Anjani, we are undergoing fertility treatment and would like a second opinion. I am sending our reports.',
  heroImg: '/Gallery/About%20us%2010.jpg',
  heroAlt: 'Dr. Anjani Dixit, fertility specialist and laparoscopic surgeon, Indiranagar, Bangalore',
  heroPos: 'center 25%',   // mobile crop focus

  stats: [
    { value: '14+', label: 'Years in practice' },
    { value: '300+', label: 'Laparoscopic procedures' },
    { value: '5.0 ★', label: 'Google rating', href: 'https://maps.app.goo.gl/8MKPqCCGujp34cXe7' },
    { value: String(REVIEW_STATS.total), label: 'Verified reviews' },
    { value: '₹1000', label: 'Consultation, valid 7 days' },
  ],

  reassure: {
    title: 'Asking questions does not mean you are giving up',
    body: [
      'Fertility treatment has a way of building its own momentum. One cycle leads to the next, the protocol is adjusted slightly, and somewhere along the way it stops feeling like there is a moment to stop and ask what the plan actually is.',
      'You are allowed that moment. Each cycle costs money, time, and a great deal of emotional energy, and you are entitled to understand why this one is expected to go differently from the last.',
    ],
  },

  reasons: {
    title: 'What usually brings a couple here',
    intro: 'These come up again and again in first consultations. If any of them describe where you are, a review of your records is likely to be worth it.',
    items: [
      { said: 'Two cycles have failed and nobody can tell us why.', desc: 'A failed cycle should produce information — about egg quality, embryo development, or the lining. If no explanation has been offered, the records are worth reading properly.' },
      { said: 'We were moved to IVF almost immediately.', desc: 'IVF is the right answer for many couples and the wrong first answer for some. A basic workup should come first, and should include your husband.' },
      { said: 'My endometriosis or fibroid was never dealt with.', desc: 'Conditions that can affect implantation are sometimes noted in a scan and then left untreated while cycles continue.' },
      { said: 'They said donor eggs are the only option now.', desc: 'Sometimes that is genuinely the honest advice. It is a large enough decision to be worth a second look at the numbers behind it.' },
    ],
  },

  process: {
    title: 'What the review covers',
    steps: [
      { title: 'The whole file, not just the last cycle', desc: 'Protocols used, doses, how you responded, how many eggs were retrieved and fertilised, and what happened to the embryos.' },
      { title: 'Both partners', desc: 'A semen analysis is part of a fertility workup, not an afterthought. Where it has not been done recently, that gets addressed.' },
      { title: 'The uterus itself', desc: 'Fibroids distorting the cavity, polyps, adhesions, hydrosalpinx, or a lining that has never built properly — the structural questions that cycles alone will not solve.' },
      { title: 'A view on what comes next', desc: 'Whether to repeat with a changed protocol, treat something surgically first, investigate further, or — sometimes — that you may not need IVF at all.' },
      { title: 'Seven days to come back', desc: 'The ₹1000 consultation stays valid for a week, so a follow-up question or a newly found report costs nothing extra.' },
    ],
  },

  honesty: {
    title: 'What this review will and will not do',
    body: [
      'Nobody can promise you a pregnancy, and you should be wary of anyone who does. What a second opinion can do is make sure the next decision is based on everything in your file rather than on part of it.',
      'Sometimes it is that something treatable has been overlooked, and that dealing with it first gives the next cycle a better footing. And occasionally it is that IVF is not what you need at all.',
    ],
  },

  considered: {
    eyebrow: 'Commonly overlooked',
    title: 'Things worth ruling out before the next cycle',
    intro: 'None of these are exotic. They are ordinary findings that can get recorded in a scan and then left alone while treatment carries on around them.',
    items: [
      { tag: 'Endometriosis', title: 'Pain that was never investigated', desc: 'Endometriosis is frequently missed for years. It can affect both egg quality and implantation, and treating it can change what a cycle is working with.' },
      { tag: 'Tubes', title: 'A fluid-filled tube', desc: 'A hydrosalpinx — a blocked, fluid-filled tube — is well recognised as reducing the chance of an embryo implanting, and is usually addressed before transfer.' },
      { tag: 'Uterus', title: 'Fibroids and polyps in the cavity', desc: 'A fibroid pressing into the uterine cavity, or a polyp, can interfere with implantation. Both are usually correctable.' },
      { tag: 'Male factor', title: 'A partner never properly tested', desc: 'Male factor contributes to a substantial share of infertility. A current semen analysis is basic, and it is skipped more often than it should be.' },
    ],
  },

  whyHer: {
    title: 'A surgeon and a fertility specialist, in one opinion',
    paras: [
      'A good deal of infertility has a structural cause — endometriosis, fibroids, cysts, blocked tubes, adhesions. Dr. Anjani Dixit holds a Fellowship in Minimal Access Surgery alongside her fertility practice, with 300+ laparoscopic procedures behind her.',
      'That means the surgical question and the fertility question are answered by the same person, in the same consultation, rather than being referred between two departments who each see half of it.',
      'She is an independent consultant rather than an employee of a fertility chain, and consults at Kasper Multi-Speciality Clinic in Indiranagar, with treatment at partner hospitals including Milann, Motherhood, Cloudnine, and Manipal.',
    ],
    points: [
      { title: 'No cycle to sell', desc: 'She is not working to a clinic\'s treatment targets, and will say when a cycle is not the right next step.' },
      { title: 'Treats the cause where there is one', desc: 'If a fibroid or endometriosis is in the way, she can operate — several of the reviews below are exactly that story.' },
      { title: 'Fee valid for seven days', desc: 'Return within the week with new reports or new questions at no extra charge.' },
    ],
  },

  bring: {
    title: 'What to send before your appointment',
    intro: 'Fertility files get large and scattered. Send whatever you can find — a partial set is still far better than starting from memory.',
    items: [
      'Summaries of any IVF or IUI cycles: protocol, doses, and outcome',
      'Embryology reports — eggs retrieved, fertilised, and embryo grades',
      'AMH, antral follicle count, and recent hormone panels',
      'Your husband\'s semen analysis, however old',
      'Recent pelvic ultrasound scans',
    ],
    note: 'Reports sent on WhatsApp go to the clinic\'s consulting number and are used only to prepare for your appointment.',
  },

  reviews: SECOND_OPINION_IVF_REVIEWS,
  reviewsTitle: 'Couples who came after treatment elsewhere',

  faqs: [
    { q: 'We are mid-treatment at another clinic. Is it too late for a second opinion?', a: 'No. As long as the next step has not happened, a review is still useful. If a transfer or retrieval is close, mention it when you message so the appointment can be brought forward.' },
    { q: 'Do we have to leave our current clinic?', a: 'No. Many couples come for the opinion, take it back to the clinic they are already with, and continue there. If you would prefer Dr. Anjani to take over, that can be arranged — but it is entirely your call.' },
    { q: 'What does the consultation cost?', a: 'The consultation fee is ₹1000, and it remains valid for seven days. Coming back within that week with a report you had to hunt for, or with questions that surfaced later, costs nothing extra.' },
    { q: 'Should my husband come too?', a: 'If he can, yes. Male factor accounts for a significant share of infertility, and decisions are easier when both of you have heard the same explanation. If he cannot attend, bring his semen analysis and he can join the video call.' },
    { q: 'Will she tell us to do IVF?', a: 'Only if that is what your reports support. Some couples are advised to treat something surgically first; some to investigate further; some that a simpler approach is reasonable to try. And where IVF genuinely is the right next step, she will say that too.' },
    { q: 'Can this be done over video?', a: 'Yes. Video consultations are available and are regularly used by couples outside Bangalore and by NRI patients. Send the reports in advance and the review can happen before you make any travel plans.' },
  ],

  finalCta: {
    title: 'Have the whole file reviewed before the next cycle',
    sub: 'Send your reports on WhatsApp, or book a consultation at Kasper Multi-Speciality Clinic, Indiranagar. In-person and video consultations available.',
  },

  footerLinks: [
    ['IVF & Fertility', '/ivf-infertility'],
    ['Laparoscopic Surgery', '/laparoscopic-surgery'],
    ['About Dr. Anjani', '/about-us'],
    ['← Back to main site', '/'],
  ],
}
