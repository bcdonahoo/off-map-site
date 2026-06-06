import { FAQ_ITEMS } from './mock-responses'

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Off-Map',
  url: 'https://www.off-map.com',
  founder: {
    '@type': 'Person',
    name: 'Brendon Donahoo',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@off-map.com',
    contactType: 'customer service',
  },
}

const services = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'The Off-Map Audit',
    description:
      'A 60-minute working session, a 1 to 2 page written brief in 72 hours, and a 15-minute follow-up two weeks later.',
    provider: { '@type': 'Organization', name: 'Off-Map' },
    offers: {
      '@type': 'Offer',
      price: '350',
      priceCurrency: 'USD',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'The Pipeline Sprint',
    description:
      'A 6-week GTM rebuild covering ICP, messaging, channel strategy, and sales process, delivered as a documented playbook.',
    provider: { '@type': 'Organization', name: 'Off-Map' },
    offers: {
      '@type': 'Offer',
      price: '7500',
      priceCurrency: 'USD',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Fractional GTM',
    description:
      'An embedded GTM operator on retainer, working on the highest-leverage GTM move each month with weekly sessions and async access.',
    provider: { '@type': 'Organization', name: 'Off-Map' },
    offers: {
      '@type': 'Offer',
      price: '4500',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '4500',
        priceCurrency: 'USD',
        unitText: 'month',
      },
    },
  },
]

const faqPage = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: answer,
    },
  })),
}

export function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      {services.map((s) => (
        <script
          key={s.name}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  )
}
