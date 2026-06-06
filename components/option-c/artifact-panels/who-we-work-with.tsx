const traits = [
  'Services firms building repeatable revenue',
  'Seed to Series A founders ($250k to $5M ARR)',
  'Founder-led selling that has hit a ceiling',
  'Teams where every deal runs through the founder',
  'Companies tired of playbooks built for someone else',
]

export function WhoWeWorkWithPanel() {
  return (
    <div className="flex flex-col justify-center h-full p-8 md:p-12">
      <p
        className="mb-4 text-xs font-semibold uppercase tracking-widest"
        style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
      >
        Who We Work With
      </p>
      <h2
        className="mb-6 text-2xl font-bold"
        style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
      >
        Built for the business in front of us.
      </h2>
      <ul className="flex flex-col gap-3">
        {traits.map((trait) => (
          <li
            key={trait}
            className="flex items-start gap-3 text-sm leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <span
              className="mt-0.5 shrink-0"
              style={{ color: 'var(--color-accent)' }}
            >
              ✓
            </span>
            {trait}
          </li>
        ))}
      </ul>
    </div>
  )
}
