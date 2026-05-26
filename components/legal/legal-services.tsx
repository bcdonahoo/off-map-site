import type { ServicesCopy } from './copy'

type Props = { copy: ServicesCopy }

export function LegalServices({ copy }: Props) {
  return (
    <section className="py-24 px-6" style={{ background: 'var(--color-bg)' }}>
      <div className="mx-auto max-w-6xl">
        <p
          className="mb-4 text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
        >
          {copy.eyebrow}
        </p>

        <h2
          className="mb-16 text-4xl font-bold md:text-5xl"
          style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
        >
          {copy.headline}
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {copy.cards.map(({ badge, title, body, link }) => (
            <div
              key={title}
              className="group relative rounded-2xl p-8 transition-all duration-200"
              style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}
            >
              <div
                className="absolute inset-x-0 top-0 h-px rounded-t-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                style={{ background: 'var(--color-accent)' }}
              />
              <span
                className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
                style={{ background: 'var(--color-accent-dim)', color: 'var(--color-accent)' }}
              >
                {badge}
              </span>
              <h3
                className="mb-3 text-xl font-bold"
                style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
              >
                {title}
              </h3>
              <p className="mb-8 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {body}
              </p>
              <a
                href="#cta"
                className="text-sm font-medium transition-opacity hover:opacity-80"
                style={{ color: 'var(--color-accent)' }}
              >
                {link} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
