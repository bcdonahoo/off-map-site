import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createServerSupabaseClient } from '@/lib/supabase'
import { getTenant, getOfferings } from '@/lib/trailhead/tenant'
import { randomUUID } from 'crypto'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// ── Tool labels ────────────────────────────────────────────────────────────

const TOOL_LABELS: Record<string, string> = {
  start_lead: 'Starting your session…',
  qualify_lead: 'Saving your information…',
  present_pricing: 'Pulling up package details…',
  book_consultation: 'Booking your consultation…',
  initiate_checkout: 'Setting up your checkout…',
  handoff_to_attorney: 'Connecting you with our team…',
}

// ── Tool definitions (static — inputs reference DB-sourced IDs at runtime) ─

function buildTools(offeringIds: string[]): Anthropic.Tool[] {
  return [
    {
      name: 'start_lead',
      description: "Initialize a new lead session. Call once after you understand the inquirer's basic situation (after the first 1–2 exchanges).",
      input_schema: { type: 'object' as const, properties: {}, required: [] },
    },
    {
      name: 'qualify_lead',
      description: 'Save qualification data. Call multiple times as you collect information. When you have gathered enough to assess fit, include fitLevel.',
      input_schema: {
        type: 'object' as const,
        properties: {
          leadId: { type: 'string' },
          name: { type: 'string' },
          email: { type: 'string' },
          phone: { type: 'string' },
          situationSummary: { type: 'string' },
          urgency: { type: 'string', enum: ['urgent', 'standard'] },
          familyComplexity: { type: 'string', enum: ['simple', 'moderate', 'complex'] },
          fitIndicators: { type: 'array', items: { type: 'string' } },
          fitLevel: { type: 'string', enum: ['high', 'medium', 'out_of_scope'] },
          recommendedOfferingId: {
            type: 'string',
            enum: offeringIds,
            description: 'The offering ID that best fits this lead. Required when fitLevel is high.',
          },
        },
        required: ['leadId'],
      },
    },
    {
      name: 'present_pricing',
      description: 'Return the full package details for the recommended offering. Call after qualify_lead confirms high fit.',
      input_schema: {
        type: 'object' as const,
        properties: {
          leadId: { type: 'string' },
          offeringId: { type: 'string', enum: offeringIds },
        },
        required: ['leadId', 'offeringId'],
      },
    },
    {
      name: 'book_consultation',
      description: 'Record a consultation booking for medium-fit leads or high-fit leads who want to speak first.',
      input_schema: {
        type: 'object' as const,
        properties: {
          leadId: { type: 'string' },
          preferredTimeframe: { type: 'string' },
          contactPreference: { type: 'string', enum: ['phone', 'email', 'either'] },
        },
        required: ['leadId'],
      },
    },
    {
      name: 'initiate_checkout',
      description: 'Send the inquirer to the secure payment page. Do NOT ask for card details.',
      input_schema: {
        type: 'object' as const,
        properties: {
          leadId: { type: 'string' },
          offeringId: { type: 'string', enum: offeringIds },
        },
        required: ['leadId', 'offeringId'],
      },
    },
    {
      name: 'handoff_to_attorney',
      description: 'For out-of-scope inquiries. Captures info for an attorney callback.',
      input_schema: {
        type: 'object' as const,
        properties: {
          leadId: { type: 'string' },
          situationSummary: { type: 'string' },
          urgency: { type: 'string', enum: ['urgent', 'standard'] },
        },
        required: ['leadId'],
      },
    },
  ]
}

// ── System prompt ──────────────────────────────────────────────────────────

function buildSystemPrompt(
  tenant: { name: string; city: string; state: string; positioning: string; outOfScope: string[] },
  offerings: { id: string; name: string; price: number; timeline: string; included: string[]; terms: string }[]
): string {
  const offeringList = offerings
    .map(
      (o) =>
        `**${o.name}** (ID: ${o.id}) — $${o.price.toLocaleString()} flat fee\n` +
        `  Timeline: ${o.timeline}\n` +
        `  Includes: ${o.included.join(', ')}`
    )
    .join('\n\n')

  return `You are an AI assistant for ${tenant.name}, an ${tenant.city}, ${tenant.state} estate planning firm. Your job is to have a warm, honest conversation with people thinking about getting their estate plan in order, help them understand which package is right for them, and guide them to the right next step.

ABOUT THE FIRM:
${tenant.name} — "${tenant.positioning}"

AVAILABLE PACKAGES:
${offeringList}

OUT OF SCOPE — be honest when a situation isn't a fit:
${tenant.outOfScope.map((s) => `- ${s}`).join('\n')}

YOUR PERSONA: Warm, plain-spoken, never pushy. Confident about what the packages include. Honest when something needs a different kind of engagement.

NEVER: claim to be an attorney, give legal advice, use legalese, pressure anyone, ask for payment details, mention refunds or money-back guarantees.

---

SALES MOTION:

STEP 1 — GREET AND UNDERSTAND:
Respond warmly. Ask ONE clarifying question. Do not call any tools yet.

STEP 2 — START SESSION:
After 1–2 exchanges, call start_lead.

STEP 3 — COLLECT AND QUALIFY:
Naturally collect name and email. Call qualify_lead to save progress. When you have enough information, include fitLevel and recommendedOfferingId in your qualify_lead call.

When assessing fit:
- HIGH: In our service area, straightforward needs that match one of our packages, no active litigation
- MEDIUM: complexity that benefits from an attorney conversation first
- OUT_OF_SCOPE: contested probate, litigation, matters outside our service area, or anything in the out-of-scope list

STEP 4 — MAKE THE OUTCOME DECISION:

If fitLevel is 'high':
  → Call present_pricing (leadId, offeringId) for the recommended offering
  → Walk through what's included. If multiple offerings could fit, explain the difference briefly and let them choose.
  → Ask: proceed to payment, or speak with an attorney first?
  → If proceeding: call initiate_checkout (leadId, offeringId)
  → If consulting first: call book_consultation (leadId, preferredTimeframe, contactPreference)

If fitLevel is 'medium':
  → Explain warmly that their situation benefits from a conversation first
  → Call book_consultation (leadId, preferredTimeframe, contactPreference)

If fitLevel is 'out_of_scope':
  → Explain honestly why this falls outside what the firm offers
  → Call handoff_to_attorney (leadId, situationSummary, urgency)

STEP 5 — CLOSE warmly:
Tell them what to expect next. Close with warmth. Attorney-client disclaimer goes here and only here.

---

RULES (non-negotiable):
- ONE tool call per response.
- After any tool call, always send a text message before making the next tool call.
- One question at a time.
- Keep responses concise — this is chat, not email.
- Never claim to be an attorney. Never give legal advice.
- Attorney-client disclaimer only in the final closing message.
- NEVER mention refunds, money-back guarantees, or cancellation policies.`
}

// ── Tool executor ──────────────────────────────────────────────────────────

async function executeTool(
  name: string,
  input: Record<string, unknown>,
  tenantId: string,
  offerings: { id: string; name: string; price: number; timeline: string; included: string[] }[]
): Promise<unknown> {
  const supabase = createServerSupabaseClient()

  switch (name) {
    case 'start_lead': {
      const leadId = randomUUID()
      const now = new Date().toISOString()
      const result = await supabase.from('trailhead_leads').insert({
        leadid: leadId,
        tenantid: tenantId,
        createdat: now,
        updatedat: now,
        status: 'in_progress',
        client: {},
        qualification: {},
        pricingpresented: false,
      })
      if (result.error) throw new Error(`[supabase] start_lead: ${result.error.message}`)
      return { leadId, status: 'active' }
    }

    case 'qualify_lead': {
      const { leadId, name, email, phone, situationSummary, urgency, familyComplexity, fitIndicators, fitLevel: agentFitLevel, recommendedOfferingId } =
        input as {
          leadId: string; name?: string; email?: string; phone?: string; situationSummary?: string
          urgency?: string; familyComplexity?: string; fitIndicators?: string[]
          fitLevel?: 'high' | 'medium' | 'out_of_scope'; recommendedOfferingId?: string
        }

      const row = await supabase.from('trailhead_leads').select('client,qualification,fitlevel,fitscore').eq('leadid', leadId).single()
      if (row.error) throw new Error(`[supabase] qualify_lead: ${row.error.message}`)

      const existing = row.data
      const client = { ...(existing?.client ?? {}), ...(name != null && { name }), ...(email != null && { email }), ...(phone != null && { phone }) }
      const qualification = {
        ...(existing?.qualification ?? {}),
        ...(situationSummary != null && { situation: situationSummary }),
        ...(urgency != null && { urgency }),
        ...(familyComplexity != null && { familyComplexity }),
        ...(fitIndicators != null && { fitIndicators }),
        ...(recommendedOfferingId != null && { recommendedOfferingId }),
      }

      const fitScoreMap: Record<string, number> = { high: 88, medium: 52, out_of_scope: 8 }
      const fitLevel = agentFitLevel ?? (existing?.fitlevel as string ?? null)
      const fitScore = agentFitLevel ? fitScoreMap[agentFitLevel] : (existing?.fitscore as number ?? null)
      if (agentFitLevel) { qualification.fitLevel = agentFitLevel; qualification.fitScore = fitScore }

      const statusMap: Record<string, string> = { high: 'qualified', medium: 'qualified', out_of_scope: 'qualified' }
      await supabase.from('trailhead_leads').update({
        client, qualification,
        ...(agentFitLevel != null && { fitlevel: fitLevel, fitscore: fitScore, status: statusMap[agentFitLevel] }),
        updatedat: new Date().toISOString(),
      }).eq('leadid', leadId)

      return { saved: true, fitScore, fitLevel }
    }

    case 'present_pricing': {
      const { leadId, offeringId } = input as { leadId: string; offeringId: string }
      const offering = offerings.find((o) => o.id === offeringId)
      if (!offering) return { error: 'Offering not found' }
      await supabase.from('trailhead_leads').update({ pricingpresented: true, status: 'pricing_presented', updatedat: new Date().toISOString() }).eq('leadid', leadId)
      return { packageName: offering.name, price: offering.price, included: offering.included }
    }

    case 'book_consultation': {
      const { leadId, preferredTimeframe, contactPreference } = input as { leadId: string; preferredTimeframe?: string; contactPreference?: string }
      const bookingReference = `CONSULT-${randomUUID().slice(0, 8).toUpperCase()}`
      await supabase.from('trailhead_leads').update({ status: 'booked_consult', bookingreference: bookingReference, updatedat: new Date().toISOString() }).eq('leadid', leadId)
      console.error(`[demo] BOOKING → ref:${bookingReference} timeframe:${preferredTimeframe ?? 'n/a'} contact:${contactPreference ?? 'n/a'}`)
      return { bookingReference, message: "We've placed a hold. You'll receive a calendar invite within 1 business day." }
    }

    case 'initiate_checkout': {
      const { leadId, offeringId } = input as { leadId: string; offeringId: string }
      await supabase.from('trailhead_leads').update({ status: 'checkout_initiated', updatedat: new Date().toISOString() }).eq('leadid', leadId)
      console.error(`[demo] CHECKOUT INITIATED → leadId:${leadId} offeringId:${offeringId}`)
      return { checkoutUrl: `/trailhead/checkout?lead=${leadId}`, message: 'Redirecting to secure payment page.' }
    }

    case 'handoff_to_attorney': {
      const { leadId, situationSummary, urgency } = input as { leadId: string; situationSummary?: string; urgency?: string }
      const handoffReference = `REFERRAL-${randomUUID().slice(0, 8).toUpperCase()}`
      await supabase.from('trailhead_leads').update({ status: 'referred', handoffreference: handoffReference, updatedat: new Date().toISOString() }).eq('leadid', leadId)
      console.error(`[demo] HANDOFF → ref:${handoffReference} urgency:${urgency ?? 'standard'}`)
      return { handoffReference, message: 'An attorney will reach out within 1 business day.' }
    }

    default:
      return { error: `Unknown tool: ${name}` }
  }
}

// ── Route handler ──────────────────────────────────────────────────────────

export const maxDuration = 60

type SSEEvent =
  | { type: 'tool_start'; label: string }
  | { type: 'tool_done'; label: string }
  | { type: 'checkout_redirect'; url: string }
  | { type: 'booking_data'; reference: string }
  | { type: 'done'; text: string; toolCalls: { name: string; label: string }[]; messages: Anthropic.MessageParam[] }
  | { type: 'error'; error: string }

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) return NextResponse.json({ error: 'ANTHROPIC_API_KEY not set' }, { status: 500 })
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return NextResponse.json({ error: 'Supabase env vars not set' }, { status: 500 })

  let body: { tenantSlug?: string; messages?: Anthropic.MessageParam[] }
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }

  const { tenantSlug, messages = [] } = body
  if (!tenantSlug) return NextResponse.json({ error: 'tenantSlug is required' }, { status: 400 })

  const tenant = await getTenant(tenantSlug)
  if (!tenant) return NextResponse.json({ error: `Tenant not found: ${tenantSlug}` }, { status: 404 })

  const offerings = await getOfferings(tenant.id)
  if (offerings.length === 0) return NextResponse.json({ error: 'No active offerings for this tenant' }, { status: 404 })

  const tools = buildTools(offerings.map((o) => o.id))
  const systemPrompt = buildSystemPrompt(tenant, offerings)
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: SSEEvent) => controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`))

      try {
        const toolCallsMade: { name: string; label: string }[] = []
        let current: Anthropic.MessageParam[] = messages

        for (let i = 0; i < 12; i++) {
          const response = await anthropic.messages.create({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 1024,
            system: systemPrompt,
            tools,
            messages: current,
          })

          if (response.stop_reason === 'end_turn') {
            const text = response.content.filter((b): b is Anthropic.TextBlock => b.type === 'text').map((b) => b.text).join('')
            send({ type: 'done', text, toolCalls: toolCallsMade, messages: [...current, { role: 'assistant', content: text }] })
            break
          }

          if (response.stop_reason === 'tool_use') {
            const toolUseBlocks = response.content.filter((b): b is Anthropic.ToolUseBlock => b.type === 'tool_use')
            const toolResults: Anthropic.ToolResultBlockParam[] = []

            for (const block of toolUseBlocks) {
              const label = TOOL_LABELS[block.name] ?? block.name
              send({ type: 'tool_start', label })
              const result = await executeTool(block.name, block.input as Record<string, unknown>, tenant.id, offerings)
              toolCallsMade.push({ name: block.name, label })
              send({ type: 'tool_done', label })

              if (block.name === 'initiate_checkout') {
                const r = result as { checkoutUrl: string }
                send({ type: 'checkout_redirect', url: r.checkoutUrl })
              }
              if (block.name === 'book_consultation') {
                const r = result as { bookingReference: string }
                send({ type: 'booking_data', reference: r.bookingReference })
              }

              toolResults.push({ type: 'tool_result', tool_use_id: block.id, content: JSON.stringify(result) })
            }

            current = [...current, { role: 'assistant', content: response.content }, { role: 'user', content: toolResults }]
          } else {
            send({ type: 'error', error: `Unexpected stop reason: ${response.stop_reason}` })
            break
          }
        }
      } catch (err) {
        send({ type: 'error', error: err instanceof Error ? err.message : 'Unknown error' })
      } finally {
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' },
  })
}
