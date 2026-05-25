import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'
import { randomUUID } from 'crypto'

const PRICE = 2000

function qualify(
  texasResident: string,
  familySituation: string,
  activeDispute: string
): { fitLevel: 'high' | 'medium' | 'out_of_scope'; outOfScopeReason?: string } {
  if (texasResident === 'no') {
    return { fitLevel: 'out_of_scope', outOfScopeReason: 'We focus exclusively on Texas estate planning' }
  }
  if (activeDispute === 'yes') {
    return { fitLevel: 'out_of_scope', outOfScopeReason: 'Active estate disputes require a litigation attorney' }
  }
  if (familySituation === 'other') {
    return { fitLevel: 'medium' }
  }
  return { fitLevel: 'high' }
}

const COMPLEXITY_MAP: Record<string, string> = {
  married_adult: 'simple',
  married_minor: 'moderate',
  single: 'simple',
  widowed: 'simple',
  other: 'complex',
}

const FIT_SCORE: Record<string, number> = { high: 88, medium: 52, out_of_scope: 8 }

export async function POST(req: NextRequest) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Supabase env vars are not set' }, { status: 500 })
  }

  let body: Record<string, string>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { action } = body
  const supabase = createServerSupabaseClient()

  // ── Qualify: create lead from form submission ─────────────────────────────
  if (action === 'qualify') {
    const { name, email, phone, texasResident, familySituation, activeDispute, urgency } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    const { fitLevel, outOfScopeReason } = qualify(texasResident, familySituation, activeDispute)
    const leadId = randomUUID()
    const now = new Date().toISOString()

    const fitIndicators = [
      texasResident === 'yes' ? 'Texas resident' : 'Non-Texas resident',
      ...(activeDispute === 'yes' ? ['active estate dispute'] : []),
      ...(familySituation ? [`family: ${familySituation}`] : []),
    ]

    const insertResult = await supabase.from('trailhead_leads').insert({
      leadid: leadId,
      tenantid: 'hill-country',
      createdat: now,
      updatedat: now,
      status: 'qualified',
      client: { name, email, ...(phone && { phone }) },
      qualification: {
        urgency: urgency || 'standard',
        familyComplexity: COMPLEXITY_MAP[familySituation] ?? 'simple',
        fitLevel,
        fitIndicators,
        ...(outOfScopeReason && { outOfScopeReason }),
        source: 'form',
      },
      pricingpresented: false,
      fitlevel: fitLevel,
      fitscore: FIT_SCORE[fitLevel],
    })

    if (insertResult.error) {
      return NextResponse.json({ error: insertResult.error.message }, { status: 500 })
    }

    return NextResponse.json({ leadId, fitLevel, ...(outOfScopeReason && { outOfScopeReason }) })
  }

  // ── Purchase ──────────────────────────────────────────────────────────────
  if (action === 'purchase') {
    const { leadId } = body
    if (!leadId) return NextResponse.json({ error: 'leadId required' }, { status: 400 })

    const purchaseReference = `HCEL-${randomUUID().slice(0, 8).toUpperCase()}`
    await supabase
      .from('trailhead_leads')
      .update({
        status: 'purchased',
        purchasereference: purchaseReference,
        revenueamount: PRICE,
        pricingpresented: true,
        updatedat: new Date().toISOString(),
      })
      .eq('leadid', leadId)

    return NextResponse.json({ action: 'purchased', reference: purchaseReference, amount: PRICE })
  }

  // ── Book consultation ─────────────────────────────────────────────────────
  if (action === 'book') {
    const { leadId } = body
    if (!leadId) return NextResponse.json({ error: 'leadId required' }, { status: 400 })

    const bookingReference = `HCEL-CONSULT-${randomUUID().slice(0, 8).toUpperCase()}`
    await supabase
      .from('trailhead_leads')
      .update({
        status: 'booked_consult',
        bookingreference: bookingReference,
        updatedat: new Date().toISOString(),
      })
      .eq('leadid', leadId)

    return NextResponse.json({ action: 'booked', reference: bookingReference })
  }

  // ── Handoff ───────────────────────────────────────────────────────────────
  if (action === 'handoff') {
    const { leadId } = body
    if (!leadId) return NextResponse.json({ error: 'leadId required' }, { status: 400 })

    const handoffReference = `HCEL-REFERRAL-${randomUUID().slice(0, 8).toUpperCase()}`
    await supabase
      .from('trailhead_leads')
      .update({
        status: 'referred',
        handoffreference: handoffReference,
        updatedat: new Date().toISOString(),
      })
      .eq('leadid', leadId)

    return NextResponse.json({ action: 'referred', reference: handoffReference })
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}
