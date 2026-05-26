import type { ProblemCopy } from './copy'

type Props = { copy: ProblemCopy }

export function LegalProblem({ copy }: Props) {
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
          className="mb-16 max-w-2xl text-4xl font-bold leading-tight md:text-5xl"
          style={{ color: 'var(--color-text-dark)', fontFamily: 'var(--font-display)' }}
        >
          {copy.headline}
        </h2>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {copy.columns.map(({ label, body }) => (
            <div key={label}>
              <p
                className="mb-3 font-semibold leading-snug"
                style={{ color: 'var(--color-text-dark)' }}
              >
                {label}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
