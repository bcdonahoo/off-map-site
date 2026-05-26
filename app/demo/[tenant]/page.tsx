import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTenant, getOfferings } from '@/lib/trailhead/tenant'
import { DemoChat } from '@/components/demos/demo-chat'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

type Props = { params: Promise<{ tenant: string }> }

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')
}

export default async function DemoTenantPage({ params }: Props) {
  const { tenant: tenantSlug } = await params
  const tenant = await getTenant(tenantSlug)
  if (!tenant) notFound()

  const offerings = await getOfferings(tenant.id)
  const primary = offerings[0]

  return (
    <main className="min-h-screen pt-28 pb-24 px-6" style={{ background: 'var(--color-bg)' }}>
      <div className="mx-auto max-w-2xl">

        {/* Eyebrow */}
        <p
          className="mb-4 text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
        >
          {tenant.name} · {tenant.city}, {tenant.state}
        </p>

        {/* Hero */}
        <h1
          className="mb-4 text-4xl font-bold tracking-tight leading-tight"
          style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
        >
          Your family deserves a plan.
          <br />
          Let&rsquo;s get it done.
        </h1>
        <p className="mb-2 text-lg leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          {tenant.positioning} — one flat fee, no hourly billing, no surprises.
        </p>
        <p className="mb-10 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          Over 60% of Americans have no will or estate plan. If something happens without one, your family
          faces court costs, delays, and conflict that could have been avoided. We make it simple to get
          your affairs in order.
        </p>

        {/* Chat */}
        <div className="mb-12">
          <p className="mb-3 text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
            Chat with our assistant to get started
          </p>
          <p className="mb-4 text-xs" style={{ color: 'var(--color-text-muted)' }}>
            Describe your situation. Our AI assistant will help you understand which package is right for
            you — or what the right next step is.
          </p>
          <DemoChat
            tenantSlug={tenantSlug}
            tenantName={tenant.name}
            greeting={tenant.greeting}
            initials={getInitials(tenant.name)}
          />
        </div>

        {/* Offerings */}
        {offerings.length > 0 && (
          <div className="mb-10">
            <h2
              className="text-lg font-bold mb-4"
              style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
            >
              Our packages
            </h2>
            <div className={`grid gap-4 ${offerings.length > 1 ? 'sm:grid-cols-2' : ''}`}>
              {offerings.map((o, idx) => (
                <div
                  key={o.id}
                  className="rounded-2xl p-5"
                  style={{
                    background: 'var(--color-bg-surface)',
                    border: `1px solid ${idx === 0 ? 'var(--color-accent)' : 'var(--color-border)'}`,
                  }}
                >
                  {idx === 0 && (
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>
                      Most popular
                    </p>
                  )}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <p className="text-sm font-bold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>
                      {o.name}
                    </p>
                    <div className="shrink-0 text-right">
                      <div className="text-xl font-bold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>
                        ${o.price.toLocaleString()}
                      </div>
                      <div className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>flat fee</div>
                    </div>
                  </div>
                  <ul className="space-y-1.5">
                    {o.included.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
                          <path d="M2 7L5.5 10.5L12 4" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-xs" style={{ color: 'var(--color-text-primary)' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-xs" style={{ color: 'var(--color-text-muted)' }}>{o.timeline}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer note */}
        <div
          className="rounded-xl p-4 text-center"
          style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}
        >
          <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            {tenant.name} is a fictional firm created for demonstration purposes by{' '}
            <span style={{ color: 'var(--color-text-primary)' }}>Off-Map</span>. This is a working demo of
            the Trailhead GTM Engine — an AI-powered sales and intake system for productized legal services.
          </p>
        </div>

      </div>
    </main>
  )
}
