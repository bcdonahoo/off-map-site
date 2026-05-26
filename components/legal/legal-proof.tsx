import type { ProofCopy } from './copy'

type Props = { copy: ProofCopy }

export function LegalProof({ copy }: Props) {
  return (
    <section className="py-24 px-6" style={{ background: 'var(--color-bg-light)' }}>
      <div className="mx-auto max-w-6xl">
        <p
          className="mb-4 text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
        >
          {copy.eyebrow}
        </p>

        <h2
          className="mb-10 max-w-2xl text-4xl font-bold md:text-5xl"
          style={{ color: 'var(--color-text-dark)', fontFamily: 'var(--font-display)' }}
        >
          {copy.headline}
        </h2>

        <ul className="mb-10 flex flex-col gap-3">
          {copy.bullets.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-sm leading-relaxed"
              style={{ color: 'var(--color-text-muted)' }}
            >
              <span className="mt-0.5 shrink-0" style={{ color: 'var(--color-accent)' }}>
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>

        <p className="max-w-2xl text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          {copy.body}
        </p>
      </div>
    </section>
  )
}
