const bullets = [
  'Years of senior GTM work at companies between traction and scale',
  'Experience across services firms, B2B SaaS, and early-stage startups',
  'Hands-on with the AI tools redefining the field',
]

export function Proof() {
  return (
    <section
      className="py-24 px-6"
      style={{ background: 'var(--color-bg-light)' }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Eyebrow */}
        <p
          className="mb-4 text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
        >
          Background
        </p>

        {/* Headline */}
        <h2
          className="mb-10 max-w-2xl text-4xl font-bold md:text-5xl"
          style={{
            color: 'var(--color-text-dark)',
            fontFamily: 'var(--font-display)',
          }}
        >
          Built by someone who has actually done this.
        </h2>

        {/* Bullets */}
        <ul className="mb-10 flex flex-col gap-3">
          {bullets.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-sm leading-relaxed"
              style={{ color: 'var(--color-text-muted)' }}
            >
              <span
                className="mt-0.5 shrink-0"
                style={{ color: 'var(--color-accent)' }}
              >
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>

        {/* Body */}
        <p
          className="max-w-2xl text-sm leading-relaxed"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Off-Map is a one-person operation by design. You work directly with
          Brendon. Every engagement is delivered by the same operator you spoke
          to on the call.
        </p>
      </div>
    </section>
  )
}
