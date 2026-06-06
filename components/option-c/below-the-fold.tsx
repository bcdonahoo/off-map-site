import { FAQ_ITEMS } from './mock-responses'

export function BelowTheFold() {
  return (
    <div
      style={{
        background: 'var(--color-bg)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      {/* Positioning */}
      <section
        className="mx-auto max-w-3xl px-6 py-16"
        aria-labelledby="btf-positioning-heading"
      >
        <p
          className="mb-2 text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
        >
          GTM Consulting
        </p>
        <h2
          id="btf-positioning-heading"
          className="mb-4 text-3xl font-extrabold leading-tight"
          style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
        >
          AI redrew GTM. We help you build for what&apos;s next.
        </h2>
        <p
          className="text-base leading-relaxed"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Off-Map is a GTM consulting practice for services firms and early-stage founders. The
          available advice is borrowed from a world that no longer exists. We start from the
          business in front of us and build the motion that actually fits.
        </p>
      </section>

      <hr style={{ borderColor: 'var(--color-border)' }} />

      {/* Three offers */}
      <section
        className="mx-auto max-w-3xl px-6 py-16"
        aria-labelledby="btf-offers-heading"
      >
        <h2
          id="btf-offers-heading"
          className="mb-8 text-2xl font-bold"
          style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
        >
          Three ways to work together
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              badge: '5 Days',
              title: 'The Off-Map Audit',
              price: '$350',
              body: 'A 60-minute working session, a written brief in 72 hours, and a 15-minute follow-up two weeks later.',
              href: '/services/audit',
            },
            {
              badge: '6 Weeks',
              title: 'Pipeline Sprint',
              price: '$7,500',
              body: 'A full GTM rebuild: ICP, messaging, channel strategy, and sales process. Delivered as a documented playbook.',
              href: '/services/sprint',
            },
            {
              badge: 'Ongoing',
              title: 'Fractional GTM',
              price: 'From $4,500/mo',
              body: 'An embedded operator on retainer, working on the highest-leverage GTM move each month.',
              href: '/services/fractional',
            },
          ].map(({ badge, title, price, body, href }) => (
            <article
              key={title}
              className="rounded-2xl p-5"
              style={{
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              <p
                className="mb-2 text-xs font-semibold uppercase tracking-widest"
                style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
              >
                {badge}
              </p>
              <h3
                className="mb-1 text-base font-bold"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {title}
              </h3>
              <p
                className="mb-3 text-sm font-semibold"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {price}
              </p>
              <p
                className="mb-4 text-sm leading-relaxed"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {body}
              </p>
              <a
                href={href}
                className="text-xs font-semibold"
                style={{ color: 'var(--color-accent)' }}
              >
                Learn more &rarr;
              </a>
            </article>
          ))}
        </div>
      </section>

      <hr style={{ borderColor: 'var(--color-border)' }} />

      {/* Who we work with */}
      <section
        className="mx-auto max-w-3xl px-6 py-16"
        aria-labelledby="btf-icp-heading"
      >
        <h2
          id="btf-icp-heading"
          className="mb-6 text-2xl font-bold"
          style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
        >
          Built for the business in front of us.
        </h2>
        <ul className="flex flex-col gap-3">
          {[
            'Services firms building repeatable revenue',
            'Seed to Series A founders ($250k to $5M ARR)',
            'Founder-led selling that has hit a ceiling',
            'Teams where every deal runs through the founder',
            'Companies tired of playbooks built for someone else',
          ].map((trait) => (
            <li
              key={trait}
              className="flex items-start gap-3 text-sm leading-relaxed"
              style={{ color: 'var(--color-text-muted)' }}
            >
              <span style={{ color: 'var(--color-accent)' }}>&#10003;</span>
              {trait}
            </li>
          ))}
        </ul>
      </section>

      <hr style={{ borderColor: 'var(--color-border)' }} />

      {/* FAQ */}
      <section
        className="mx-auto max-w-3xl px-6 py-16"
        aria-labelledby="btf-faq-heading"
      >
        <h2
          id="btf-faq-heading"
          className="mb-8 text-2xl font-bold"
          style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
        >
          Common questions
        </h2>
        <dl className="flex flex-col gap-8">
          {FAQ_ITEMS.map(({ question, answer }) => (
            <div key={question}>
              <dt
                className="mb-2 text-base font-semibold"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {question}
              </dt>
              <dd
                className="text-sm leading-relaxed"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <hr style={{ borderColor: 'var(--color-border)' }} />

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h2
          className="mb-4 text-2xl font-bold"
          style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
        >
          Find out what is actually broken.
        </h2>
        <p
          className="mb-8 text-base leading-relaxed"
          style={{ color: 'var(--color-text-muted)' }}
        >
          The Audit is $350, takes 5 days, and gives you one clear move to make next.
        </p>
        <a
          href="/services/audit"
          className="inline-block rounded-xl px-6 py-3 text-sm font-semibold"
          style={{ background: 'var(--color-accent)', color: '#ffffff' }}
        >
          Get an Audit &rarr;
        </a>
      </section>
    </div>
  )
}
