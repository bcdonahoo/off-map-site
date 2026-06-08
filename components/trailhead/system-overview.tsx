'use client'

import { useEffect, useState } from 'react'
import { posthog } from '@/lib/posthog'

const ATTORNEY_ITEMS = [
  {
    label: 'Package and Pricing',
    desc: 'Define the service name, flat fee, what is included, and the timeline.',
  },
  {
    label: 'Eligibility Rules',
    desc: 'Set the criteria that qualify a prospect or trigger a complexity flag.',
  },
  {
    label: 'Approved Language',
    desc: 'Firm-approved disclaimers, disclosures, and intake copy.',
  },
  {
    label: 'Handoff Format',
    desc: 'Configure what fields appear in the attorney summary.',
  },
  {
    label: 'Follow-up Sequences',
    desc: 'Automated next steps, emails, and calendar routing after intake.',
  },
]

const AUTOMATED_ITEMS = [
  {
    label: 'Offer Landing Page',
    desc: 'Firm-branded page that presents the service to prospects in plain English.',
  },
  {
    label: 'Guided Intake',
    desc: 'Structured conversation that collects and qualifies the prospect.',
  },
  {
    label: 'Complexity Flagging',
    desc: 'Automatic detection of factors that affect flat-fee eligibility.',
  },
  {
    label: 'Attorney Handoff',
    desc: 'Clean qualification summary delivered to the attorney for review.',
  },
  {
    label: 'Lead Capture',
    desc: 'Every prospect logged with full qualification data and intake answers.',
  },
]

const FLOW_ITEMS = [
  {
    n: '01',
    label: 'Package the Offer',
    desc: 'Attorney defines the service, scope, price, and eligibility rules.',
  },
  {
    n: '02',
    label: 'Prospect Lands',
    desc: 'Firm-branded page presents the offer in plain English.',
  },
  {
    n: '03',
    label: 'Guided Intake',
    desc: 'Structured conversation qualifies the prospect.',
  },
  {
    n: '04',
    label: 'Complexity Flags',
    desc: 'System detects factors affecting flat-fee eligibility.',
  },
  {
    n: '05',
    label: 'Attorney Handoff',
    desc: 'Clean summary delivered for attorney review.',
  },
  {
    n: '06',
    label: 'Lead Captured',
    desc: 'Full record saved with qualification data for follow-up.',
  },
]

function SplitLayout() {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: '1px solid var(--color-border)' }}
    >
      {/* Row 1: attorney configures */}
      <div
        className="px-6 pt-6 pb-5"
        style={{ background: 'var(--color-bg-light)' }}
      >
        <p
          className="mb-4 text-[10px] font-bold uppercase tracking-widest"
          style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
        >
          Set by your firm, built and run by Off-Map
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {ATTORNEY_ITEMS.map((item) => (
            <div
              key={item.label}
              className="rounded-xl p-4"
              style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}
            >
              <p className="text-xs font-semibold mb-1.5" style={{ color: 'var(--color-text-primary)' }}>
                {item.label}
              </p>
              <p className="text-[11px] leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div
        className="flex items-center gap-3 px-6 py-3"
        style={{ background: 'var(--color-bg-surface)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}
      >
        <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
        <p
          className="text-[10px] font-semibold uppercase tracking-widest whitespace-nowrap"
          style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
        >
          runs automatically for every prospect
        </p>
        <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
      </div>

      {/* Row 2: automated */}
      <div
        className="px-6 pt-5 pb-6"
        style={{ background: 'var(--color-bg-surface)' }}
      >
        <p
          className="mb-4 text-[10px] font-bold uppercase tracking-widest"
          style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
        >
          Runs on every intake
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {AUTOMATED_ITEMS.map((item) => (
            <div
              key={item.label}
              className="rounded-xl p-4"
              style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}
            >
              <p className="text-xs font-semibold mb-1.5" style={{ color: 'var(--color-text-primary)' }}>
                {item.label}
              </p>
              <p className="text-[11px] leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FlowLayout() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {FLOW_ITEMS.map((item, i) => (
        <div key={item.n} className="relative">
          {/* Connecting arrow on lg (between items, not after last) */}
          {i < FLOW_ITEMS.length - 1 && (
            <div
              className="hidden lg:block absolute top-6 -right-1.5 z-10"
              style={{ color: 'var(--color-border)' }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
          <div
            className="rounded-xl p-4 h-full"
            style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}
          >
            <p
              className="text-[10px] font-bold mb-2"
              style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
            >
              {item.n}
            </p>
            <p className="text-xs font-semibold mb-1.5" style={{ color: 'var(--color-text-primary)' }}>
              {item.label}
            </p>
            <p className="text-[11px] leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export function TrailheadSystemOverview() {
  const [useFlow, setUseFlow] = useState(false)

  useEffect(() => {
    const check = () => {
      if (posthog.isFeatureEnabled('trailhead_system_layout_flow')) setUseFlow(true)
    }
    posthog.onFeatureFlags(check)
    check()
  }, [])

  return useFlow ? <FlowLayout /> : <SplitLayout />
}
