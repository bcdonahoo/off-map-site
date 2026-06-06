import Link from 'next/link'

export function Footer() {
  return (
    <footer
      className="border-t"
      style={{
        background: 'var(--color-bg)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Left: wordmark + description */}
          <div>
            <p
              className="text-xl font-bold text-[var(--color-text-primary)] mb-3"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Off-Map
            </p>
            <p className="text-sm text-[var(--color-text-muted)] max-w-xs leading-relaxed">
              Client acquisition consulting for law firms. Built for
              managing partners.
            </p>
          </div>

          {/* Right: nav links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
                Services
              </p>
              <ul className="flex flex-col gap-3">
                <li>
                  <Link
                    href="/services/ai-training"
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    AI Training for Your Firm
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/fixed-fee"
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    Fixed-Fee Service Lines
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/fractional"
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    Fractional Practice Operations
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
                Company
              </p>
              <ul className="flex flex-col gap-3">
                <li>
                  <Link
                    href="/approach"
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    Approach
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    Writing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/book"
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    Book a Call
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <p className="text-xs text-[var(--color-text-muted)]">
            © 2026 Off-Map Consulting
          </p>
          <a
            href="mailto:hello@off-map.com"
            className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            hello@off-map.com
          </a>
        </div>
      </div>
    </footer>
  )
}
