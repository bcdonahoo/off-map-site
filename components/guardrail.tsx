export function Guardrail() {
  return (
    <div
      style={{
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        background: 'var(--color-bg-surface)',
      }}
    >
      <div className="mx-auto max-w-4xl px-6 py-8 text-center">
        <p
          className="text-xl font-semibold leading-relaxed md:text-2xl"
          style={{
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-display)',
          }}
        >
          Off-Map helps law firms run their practice. Not how they practice law.
        </p>
      </div>
    </div>
  )
}
