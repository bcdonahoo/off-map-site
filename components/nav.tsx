'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm transition-colors duration-200 ${
        scrolled
          ? 'border-b bg-[var(--color-bg)]/90'
          : 'bg-[var(--color-bg)]/90'
      }`}
      style={{ borderColor: 'var(--color-border)' }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <Link
          href="/"
          className="text-xl font-bold text-[var(--color-text-primary)]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Off-Map
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <div className="relative group">
            <button className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
              Services
            </button>
            <div className="absolute top-full left-0 pt-2 hidden group-hover:block">
              <div
                className="rounded-lg p-2 min-w-[200px]"
                style={{
                  background: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <Link
                  href="/services/audit"
                  className="block px-3 py-2 text-sm rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-black/5 transition-colors"
                >
                  The Audit
                </Link>
                <Link
                  href="/services/sprint"
                  className="block px-3 py-2 text-sm rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-black/5 transition-colors"
                >
                  Pipeline Sprint
                </Link>
                <Link
                  href="/services/fractional"
                  className="block px-3 py-2 text-sm rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-black/5 transition-colors"
                >
                  Fractional GTM
                </Link>
              </div>
            </div>
          </div>

          <Link
            href="/approach"
            className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            Approach
          </Link>

          <Link
            href="/book"
            className={buttonVariants({ size: 'sm' }) + ' !text-[var(--color-bg)] font-semibold'}
            style={{ background: 'var(--color-accent)' }}
          >
            Book a Call
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-5 h-0.5 bg-[var(--color-text-primary)] transition-transform duration-200"
            style={{ transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none' }}
          />
          <span
            className="block w-5 h-0.5 bg-[var(--color-text-primary)] transition-opacity duration-200"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-5 h-0.5 bg-[var(--color-text-primary)] transition-transform duration-200"
            style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none' }}
          />
        </button>
      </div>

      {/* Mobile slide-down menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-200"
        style={{
          maxHeight: menuOpen ? '400px' : '0',
          borderTop: menuOpen ? '1px solid var(--color-border)' : 'none',
        }}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          <Link
            href="/services/audit"
            className="text-sm text-[var(--color-text-muted)]"
            onClick={() => setMenuOpen(false)}
          >
            The Audit
          </Link>
          <Link
            href="/services/sprint"
            className="text-sm text-[var(--color-text-muted)]"
            onClick={() => setMenuOpen(false)}
          >
            Pipeline Sprint
          </Link>
          <Link
            href="/services/fractional"
            className="text-sm text-[var(--color-text-muted)]"
            onClick={() => setMenuOpen(false)}
          >
            Fractional GTM
          </Link>
          <Link
            href="/approach"
            className="text-sm text-[var(--color-text-muted)]"
            onClick={() => setMenuOpen(false)}
          >
            Approach
          </Link>
          <Link
            href="/book"
            onClick={() => setMenuOpen(false)}
            className={buttonVariants({ size: 'sm' }) + ' self-start !text-[var(--color-bg)] font-semibold'}
            style={{ background: 'var(--color-accent)' }}
          >
            Book a Call
          </Link>
        </div>
      </div>
    </header>
  )
}
