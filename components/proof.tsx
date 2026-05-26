const bullets = [
  '15+ years of operator experience across services firms and growth-stage businesses',
  'Currently building and deploying AI-powered sales and intake systems',
  'Direct work with Texas estate, probate, and real estate practices',
  'One operator delivers every engagement, no agency hand-off',
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
          Who is Off-Map
        </p>

        {/* Headline */}
        <h2
          className="mb-10 max-w-2xl text-4xl font-bold md:text-5xl"
          style={{
            color: 'var(--color-text-dark)',
            fontFamily: 'var(--font-display)',
          }}
        >
          A senior operator who builds the system, not the slide deck.
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
          Off-Map is one operator by design. You work directly with Brent
          Donahoo. Every engagement is scoped, delivered, and documented by the
          same person you spoke with on the first call.
        </p>
      </div>
    </section>
  )
}
