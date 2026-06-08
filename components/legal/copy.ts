export type HeroCopy = {
  eyebrow: string
  headline: string
  subhead: string
  primaryCta: string
  primaryHref: string
  primaryCtaType: 'book' | 'demo'
  secondaryCta: string
  secondaryHref: string
  secondaryCtaType: 'book' | 'demo'
  trustSignals: string[]
}

export type ProblemCopy = {
  eyebrow: string
  headline: string
  columns: { label: string; body: string }[]
}

export type ServiceCard = {
  badge: string
  title: string
  body: string
  link: string
}

export type ServicesCopy = {
  eyebrow: string
  headline: string
  cards: ServiceCard[]
}

export type ProofCopy = {
  eyebrow: string
  headline: string
  bullets: string[]
  body: string
}

export type CtaCopySimple = {
  layout: 'simple'
  eyebrow: string
  headline: string
  body: string
  primaryCta: string
  primaryHref: string
  primaryCtaType: 'book' | 'demo'
  secondaryCta: string
  secondaryHref: string
  secondaryCtaType: 'book' | 'demo'
}

export type CtaCard = {
  title: string
  body: string
  buttonText: string
  href: string
  ctaType: 'book' | 'demo'
}

export type CtaCopyCards = {
  layout: 'cards'
  eyebrow: string
  headline: string
  cards: CtaCard[]
}

export type CtaCopy = CtaCopySimple | CtaCopyCards

export type LegalCopy = {
  hero: HeroCopy
  problem: ProblemCopy
  services: ServicesCopy
  proof: ProofCopy
  cta: CtaCopy
}

const sharedServices: ServicesCopy = {
  eyebrow: 'How we work',
  headline: 'Three ways to engage.',
  cards: [
    {
      badge: 'Diagnostic',
      title: 'Practice Diagnostic',
      body: '60 minutes on the practice. Written brief in 5 business days. One follow-up call two weeks later. One thing working, one thing broken, one move to make next.',
      link: 'Talk to Brent',
    },
    {
      badge: 'Engagement',
      title: 'Practice Growth Engagement',
      body: 'A defined project that rebuilds one part of your client acquisition. AI intake, productized offer build, marketing engine, or business development process. Scoped before we start. Documented systems your firm owns at the end.',
      link: 'Talk to Brent',
    },
    {
      badge: 'Embedded',
      title: 'Fractional Practice Operator',
      body: 'Embedded alongside you on whatever is rate-limiting practice growth this month. Weekly working sessions, async access. Senior-operator leverage without adding to payroll.',
      link: 'Talk to Brent',
    },
  ],
}

export const conservativeCopy: LegalCopy = {
  hero: {
    eyebrow: 'For small law firms',
    headline: 'Modern client acquisition for law practices.',
    subhead:
      'Off-Map helps small law firms grow matter volume without adding partners. We build the intake, marketing, and business development systems that fit how your practice actually operates.',
    primaryCta: 'Book a conversation',
    primaryHref: '/book?source=legal',
    primaryCtaType: 'book',
    secondaryCta: 'Or see our demo',
    secondaryHref: '/trailhead',
    secondaryCtaType: 'demo',
    trustSignals: [
      'Focus areas: estate planning, probate & real estate',
    ],
  },
  problem: {
    eyebrow: 'What managing partners tell us',
    headline: 'Your firm grows when you work. That is the ceiling.',
    columns: [
      {
        label: 'You are the rainmaker.',
        body: 'Every new client, every renewal, every referral flows through your relationships. You cannot delegate yourself.',
      },
      {
        label: 'The marketing the industry sells does not fit.',
        body: 'Generic SEO, bar association mixers, untrained associate outreach. The motion does not match how your clients actually find you.',
      },
      {
        label: 'Hiring is not the answer alone.',
        body: 'Associates take 18 months to ramp into business development. Paralegals can free your time, not your funnel. You need a system, not another headcount.',
      },
    ],
  },
  services: sharedServices,
  proof: {
    eyebrow: 'Who is Off-Map',
    headline: 'A senior operator who builds the system, not the slide deck.',
    bullets: [
      '15+ years of operator experience across services firms and growth-stage businesses',
      'Currently building and deploying AI-powered sales and intake systems',
      'Direct work with estate planning, probate, and real estate practices',
      'One operator delivers every engagement, no agency hand-off',
    ],
    body: 'Off-Map is one operator by design. You work directly with Brent Donahoo. Every engagement is scoped, delivered, and documented by the same person you spoke with on the first call.',
  },
  cta: {
    layout: 'simple',
    eyebrow: 'Start here',
    headline: 'Start with a conversation.',
    body: '30 minutes, on Zoom. We will discuss your practice, the growth bottleneck, and whether what Off-Map does fits. You will see Trailhead, our working AI sales demo, before or during the call.',
    primaryCta: 'Book a call',
    primaryHref: '/book?source=legal',
    primaryCtaType: 'book',
    secondaryCta: 'Or see the demo first',
    secondaryHref: '/trailhead',
    secondaryCtaType: 'demo',
  },
}

export const boldCopy: LegalCopy = {
  hero: {
    eyebrow: 'For small law firms',
    headline:
      'We built an AI sales agent for a fictional estate planning firm.\nWatch what it does for yours.',
    subhead:
      'Off-Map helps small law firms in the 3 to 15 attorney range grow client acquisition without hiring more partners. AI-powered intake, productized offers, and a business development process designed for how lawyers actually work.',
    primaryCta: 'See the demo',
    primaryHref: '/trailhead',
    primaryCtaType: 'demo',
    secondaryCta: 'Book a 30-minute conversation',
    secondaryHref: '/book?source=legal',
    secondaryCtaType: 'book',
    trustSignals: [
      'Built for managing partners',
      'Senior operator, hands-on',
      'Estate planning, probate, real estate, small business',
    ],
  },
  problem: {
    eyebrow: 'What we hear',
    headline: 'The rainmaker has a ceiling. Yours is your calendar.',
    columns: [
      {
        label: 'Every new matter runs through you.',
        body: 'You are the rainmaker, the closer, and the referral source. The practice cannot grow past your time.',
      },
      {
        label: 'The marketing advice you get does not fit.',
        body: 'Bar association mixers, generic Google ads, an associate who is not trained to close. None of it actually moves matter volume.',
      },
      {
        label: 'You cannot hire your way out.',
        body: 'Associates take 18 months to ramp. Paralegals cannot do business development. The arithmetic does not work.',
      },
    ],
  },
  services: sharedServices,
  proof: {
    eyebrow: 'Background',
    headline: 'Built by someone who has actually run modern client acquisition.',
    bullets: [
      'Senior operator experience in B2B services and growth-stage firms',
      'Built AI-powered intake and sales systems currently running in production',
      'Live demo at off-map.com/trailhead shows the work, not the pitch',
      'Direct experience with estate planning, probate, and real estate practices',
    ],
    body: 'Off-Map is a one-person operation by design. You work directly with Brent Donahoo on every engagement. No junior hand-off. No agency model. If you want a senior operator inside your practice for a defined time, that is what this is.',
  },
  cta: {
    layout: 'cards',
    eyebrow: 'Two ways to start',
    headline: 'Two ways to start.',
    cards: [
      {
        title: 'Run the demo',
        body: 'Watch Trailhead for 5 minutes. It is a working AI sales agent for a fictional estate planning firm. You will see what is possible.',
        buttonText: 'See the demo',
        href: '/trailhead',
        ctaType: 'demo',
      },
      {
        title: 'Book a conversation',
        body: '30 minutes, on Zoom. We will talk about your practice, where the bottleneck is, and whether anything Off-Map does is worth a follow-up.',
        buttonText: 'Book a call',
        href: '/book?source=legal',
        ctaType: 'book',
      },
    ],
  },
}
