const bullets = [
  '15+ years of operator experience across services firms and growth-stage businesses',
  'Currently building and deploying AI-powered intake and client acquisition systems',
  'Work across estate planning, probate, real estate, and small business practices',
  'Senior-level output with AI leverage built into the delivery',
]

export function Proof() {
  return (
    <section
      className="py-24 px-6"
      style={{ background: 'var(--color-bg-light)' }}
    >
      <div className="mx-auto max-w-6xl">
        <p
          className="mb-4 text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
        >
          Who is Off-Map
        </p>

        <h2
          className="mb-10 max-w-2xl text-4xl font-bold md:text-5xl"
          style={{
            color: 'var(--color-text-dark)',
            fontFamily: 'var(--font-display)',
          }}
        >
          A senior operator who builds the system, not the slide deck.
        </h2>

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

        <p
          className="max-w-2xl text-sm leading-relaxed"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Off-Map delivers senior-level engagement, directly. Every project is
          scoped before it begins, built in working sessions, and documented so
          your firm can operate it after the engagement ends.
        </p>
      </div>
    </section>
  )
}
