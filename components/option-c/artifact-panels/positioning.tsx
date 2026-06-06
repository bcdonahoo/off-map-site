export function PositioningPanel() {
  return (
    <div className="flex flex-col justify-center h-full p-8 md:p-12">
      <p
        className="mb-4 text-xs font-semibold uppercase tracking-widest"
        style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
      >
        GTM Consulting
      </p>
      <h2
        className="mb-6 text-3xl font-extrabold leading-tight tracking-tight md:text-5xl"
        style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
      >
        AI redrew GTM.
        <br />
        We help you build
        <br />
        for what&apos;s next.
      </h2>
      <p
        className="max-w-sm text-sm leading-relaxed"
        style={{ color: 'var(--color-text-muted)' }}
      >
        The old playbooks were written for a world that&apos;s gone. Off-Map
        builds the motions that fit the business you actually run.
      </p>
    </div>
  )
}
