import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Stack | Off-Map',
  description:
    'Every tool in the Off-Map GTM engineering stack, with rationale for why it was chosen.',
}

const stackLayers = [
  {
    layer: 'Signal & Intent',
    tools: [
      {
        name: 'Clay',
        role: 'Signal aggregation, ICP filtering, waterfall enrichment across 75+ data sources.',
        why: 'Best-in-class API composability. Nothing else comes close for building dynamic prospect tables.',
      },
      {
        name: 'Apify',
        role: 'Web scraping for custom signals — job posts, LinkedIn activity, tech stack detection.',
        why: 'Managed scraping infrastructure so we are not maintaining headless browsers.',
      },
    ],
  },
  {
    layer: 'AI Research & Personalization',
    tools: [
      {
        name: 'Claude API (Anthropic)',
        role: 'Account-specific research context: pain point hypothesis, recent news, tech stack framing.',
        why: 'Best instruction-following and long-context reasoning for structured GTM outputs.',
      },
      {
        name: 'n8n',
        role: 'Orchestration layer connecting Clay webhooks → Claude → review workflow → Instantly.',
        why: 'Self-hostable, visual, no per-task pricing. Better than Zapier for complex branching logic.',
      },
    ],
  },
  {
    layer: 'Review & Approval',
    tools: [
      {
        name: 'Slack',
        role: 'Human-in-the-loop review gate. Every sequence goes through approval before it sends.',
        why: 'Where operators already live. Beats custom review UIs for speed of adoption.',
      },
    ],
  },
  {
    layer: 'Sequencing & Deliverability',
    tools: [
      {
        name: 'Instantly',
        role: 'Multi-step email sequencing with dedicated sending infrastructure and inbox rotation.',
        why: 'Deliverability-first architecture. Built for cold outbound at scale.',
      },
    ],
  },
  {
    layer: 'CRM & Attribution',
    tools: [
      {
        name: 'Attio',
        role: 'CRM for tracking accounts from signal through to closed deal.',
        why: 'API-first, no per-seat pricing at early stage, flexible data model.',
      },
      {
        name: 'PostHog',
        role: 'Product analytics and A/B testing for the GTM site and attribution reporting.',
        why: 'Open source, self-hostable, feature flags included — no separate tool needed.',
      },
    ],
  },
  {
    layer: 'Infrastructure',
    tools: [
      {
        name: 'Vercel',
        role: 'Hosting for all client-facing sites and edge API routes.',
        why: 'Zero-config Next.js deploys. Edge runtime for low-latency lead capture.',
      },
      {
        name: 'Supabase',
        role: 'Postgres database for leads, attribution events, and sequence logs.',
        why: 'Postgres with a REST API, RLS, and a generous free tier. No ORM needed.',
      },
    ],
  },
]

export default function StackPage() {
  return (
    <main
      className="min-h-screen pt-32 pb-24 px-6"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="mx-auto max-w-4xl">
        {/* Eyebrow */}
        <p
          className="mb-4 text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
        >
          The Stack
        </p>

        {/* Headline */}
        <h1
          className="mb-6 text-4xl font-bold md:text-5xl"
          style={{
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-display)',
          }}
        >
          Every tool. Every reason.
        </h1>

        <p
          className="mb-16 max-w-xl text-sm leading-relaxed"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Opacity is a red flag in GTM Engineering. Here is exactly what we use
          and why — including the tradeoffs we accepted.
        </p>

        {/* Stack layers */}
        <div className="flex flex-col gap-16">
          {stackLayers.map(({ layer, tools }) => (
            <div key={layer}>
              <p
                className="mb-6 text-xs font-semibold uppercase tracking-widest"
                style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
              >
                {layer}
              </p>
              <div className="flex flex-col gap-4">
                {tools.map(({ name, role, why }) => (
                  <div
                    key={name}
                    className="rounded-2xl p-6"
                    style={{
                      background: 'var(--color-bg-surface)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <p
                      className="mb-2 font-semibold"
                      style={{
                        color: 'var(--color-text-primary)',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {name}
                    </p>
                    <p
                      className="mb-3 text-sm leading-relaxed"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {role}
                    </p>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: 'var(--color-accent)', opacity: 0.8 }}
                    >
                      Why: {why}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
