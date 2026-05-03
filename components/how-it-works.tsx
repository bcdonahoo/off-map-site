const steps = [
  {
    num: '01',
    label: 'Signal',
    description:
      'Identify in-market accounts using intent data, job changes, and trigger events.',
  },
  {
    num: '02',
    label: 'Enrich',
    description:
      'Build complete contact records via Clay waterfall enrichment across 75+ data sources.',
  },
  {
    num: '03',
    label: 'Research',
    description:
      'AI agent generates account-specific context: tech stack, recent news, pain point hypothesis.',
  },
  {
    num: '04',
    label: 'Review',
    description:
      'Human approves or edits before anything sends. Nothing automated goes out blindly.',
  },
  {
    num: '05',
    label: 'Sequence',
    description:
      'Personalized multi-step campaign launches via dedicated sending infrastructure.',
  },
  {
    num: '06',
    label: 'Measure',
    description:
      'Attribution from signal to reply to meeting. Optimize weekly.',
  },
]

export function HowItWorks() {
  return (
    <section
      className="py-24 px-6"
      style={{ background: 'var(--color-bg-light)' }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Eyebrow */}
        <p
          className="mb-4 text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--color-text-muted)', fontFamily: 'monospace' }}
        >
          How It Works
        </p>

        {/* Headline */}
        <h2
          className="mb-16 text-4xl font-bold md:text-5xl"
          style={{
            color: 'var(--color-text-dark)',
            fontFamily: 'var(--font-display)',
          }}
        >
          The GTM Engineering loop.
        </h2>

        {/* Steps — horizontal scroll on mobile, grid on desktop */}
        <div className="flex gap-0 overflow-x-auto pb-4 md:grid md:grid-cols-6 md:overflow-visible md:pb-0">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="relative flex min-w-[200px] flex-col pr-6 md:min-w-0 md:pr-0"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div
                  className="absolute top-4 right-0 hidden h-px w-full translate-x-1/2 md:block"
                  style={{
                    background: 'var(--color-border-light)',
                    width: 'calc(100% - 32px)',
                    left: '32px',
                  }}
                />
              )}

              <span
                className="mb-3 text-2xl font-bold"
                style={{
                  color: 'var(--color-text-dark)',
                  fontFamily: 'monospace',
                  opacity: 0.25,
                }}
              >
                {step.num}
              </span>
              <p
                className="mb-2 font-semibold"
                style={{ color: 'var(--color-text-dark)' }}
              >
                {step.label}
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
