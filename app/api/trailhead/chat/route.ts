import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createServerSupabaseClient } from '@/lib/supabase'
import { CHECKLIST_CONFIG } from '@/lib/trailhead/checklist'
import { randomUUID } from 'crypto'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// ── Firm config (swap this block to re-skin for a different firm) ───────────

const FIRM_CONFIG = {
  name: 'Hill Country Estate Law',
  city: 'Austin, Texas',
  positioning: 'Plain-English estate planning for Texas families',
  product: {
    name: 'Texas Estate Plan Package',
    price: 1495,
    timeline: 'Documents ready within 10 business days',
    included: [
      'Last Will and Testament',
      'Durable Power of Attorney',
      'Medical Power of Attorney and HIPAA release',
      'Directive to Physicians (living will)',
      'Transfer-on-Death Deed for primary residence',
      '60-minute attorney consultation',
      'Two rounds of revisions within 90 days',
    ],
    terms: 'Flat fee. No hourly billing.',
  },
  outOfScope: [
    'Contested probate or litigation',
    'Complex business succession planning',
    'Multi-state estate planning beyond Texas',
    'Family law, criminal, immigration matters',
  ],
  greeting:
    "Hi! I'm here to help you think through estate planning for your family. What brings you here today?",
}

// ── Tool definitions ───────────────────────────────────────────────────────

const TOOL_LABELS: Record<string, string> = {
  start_lead: 'Starting your session…',
  qualify_lead: 'Saving your information…',
  present_pricing: 'Pulling up package details…',
  book_consultation: 'Booking your consultation…',
  complete_purchase: 'Processing your order…',
  handoff_to_attorney: 'Connecting you with our team…',
}

const TOOLS: Anthropic.Tool[] = [
  {
    name: 'start_lead',
    description:
      "Initialize a new lead session. Call once after you understand the inquirer's basic situation (after the first 1–2 exchanges).",
    input_schema: {
      type: 'object' as const,
      properties: {},
      required: [],
    },
  },
  {
    name: 'qualify_lead',
    description:
      'Save qualification data. Call multiple times as you collect information. When you have gathered enough to assess fit, include fitLevel in your call. Only make the outcome decision after qualify_lead returns a fitLevel.',
    input_schema: {
      type: 'object' as const,
      properties: {
        leadId: { type: 'string', description: 'The leadId returned by start_lead' },
        name: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
        situationSummary: {
          type: 'string',
          description: "Brief description of the inquirer's situation",
        },
        urgency: { type: 'string', enum: ['urgent', 'standard'] },
        familyComplexity: {
          type: 'string',
          enum: ['simple', 'moderate', 'complex'],
          description:
            'simple = married couple, adult kids, no business; moderate = some complexity; complex = business, blended family, litigation',
        },
        fitIndicators: {
          type: 'array',
          items: { type: 'string' },
          description: 'Specific signals observed, e.g. "Texas resident", "paid-off home", "contested probate"',
        },
        fitLevel: {
          type: 'string',
          enum: ['high', 'medium', 'out_of_scope'],
          description:
            'Your assessment. high = clear fit for flat-fee package; medium = needs attorney consultation first; out_of_scope = wrong type of matter for this firm',
        },
      },
      required: ['leadId'],
    },
  },
  {
    name: 'present_pricing',
    description:
      'Return the full package details. Call after qualify_lead confirms high fit, before discussing price.',
    input_schema: {
      type: 'object' as const,
      properties: {
        leadId: { type: 'string' },
      },
      required: ['leadId'],
    },
  },
  {
    name: 'book_consultation',
    description:
      'Record a consultation booking. Call for medium-fit leads or when a high-fit lead wants to speak with an attorney before purchasing.',
    input_schema: {
      type: 'object' as const,
      properties: {
        leadId: { type: 'string' },
        preferredTimeframe: {
          type: 'string',
          description: 'e.g. "this week", "next week", "mornings"',
        },
        contactPreference: {
          type: 'string',
          enum: ['phone', 'email', 'either'],
        },
      },
      required: ['leadId'],
    },
  },
  {
    name: 'complete_purchase',
    description:
      'Record a mock purchase when the inquirer confirms they want to proceed with the flat-fee package.',
    input_schema: {
      type: 'object' as const,
      properties: {
        leadId: { type: 'string' },
        paymentMethodPreference: {
          type: 'string',
          description: 'e.g. "credit card", "check", "ACH"',
        },
      },
      required: ['leadId'],
    },
  },
  {
    name: 'handoff_to_attorney',
    description:
      'For out-of-scope inquiries. Captures info for an attorney callback. Call after explaining that this matter is outside the flat-fee package.',
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

// ── Tool executor ──────────────────────────────────────────────────────────

async function executeTool(name: string, input: Record<string, unknown>): Promise<unknown> {
  const supabase = createServerSupabaseClient()

  switch (name) {
    case 'start_lead': {
      const leadId = randomUUID()
      const now = new Date().toISOString()
      const result = await supabase.from('trailhead_leads').insert({
        leadid: leadId,
        tenantid: 'hill-country',
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
      const {
        leadId,
        name,
        email,
        phone,
        situationSummary,
        urgency,
        familyComplexity,
        fitIndicators,
        fitLevel: agentFitLevel,
      } = input as {
        leadId: string
        name?: string
        email?: string
        phone?: string
        situationSummary?: string
        urgency?: string
        familyComplexity?: string
        fitIndicators?: string[]
        fitLevel?: 'high' | 'medium' | 'out_of_scope'
      }

      const row = await supabase
        .from('trailhead_leads')
        .select('client,qualification,fitlevel,fitscore')
        .eq('leadid', leadId)
        .single()
      if (row.error) throw new Error(`[supabase] qualify_lead select: ${row.error.message}`)

      const existing = row.data
      const client = {
        ...(existing?.client ?? {}),
        ...(name != null && { name }),
        ...(email != null && { email }),
        ...(phone != null && { phone }),
      }
      const qualification = {
        ...(existing?.qualification ?? {}),
        ...(situationSummary != null && { situation: situationSummary }),
        ...(urgency != null && { urgency }),
        ...(familyComplexity != null && { familyComplexity }),
        ...(fitIndicators != null && { fitIndicators }),
      }

      // Only commit a fitLevel if the agent explicitly assessed one
      const fitLevel = agentFitLevel ?? (existing?.fitlevel as 'high' | 'medium' | 'out_of_scope' | null ?? null)
      const fitScoreMap: Record<string, number> = { high: 88, medium: 52, out_of_scope: 8 }
      const fitScore = agentFitLevel
        ? fitScoreMap[agentFitLevel]
        : (existing?.fitscore as number | null ?? null)

      if (agentFitLevel) {
        qualification.fitLevel = agentFitLevel
        qualification.fitScore = fitScore
      }

      const statusMap: Record<string, string> = {
        high: 'qualified',
        medium: 'qualified',
        out_of_scope: 'qualified',
      }

      await supabase
        .from('trailhead_leads')
        .update({
          client,
          qualification,
          ...(agentFitLevel != null && { fitlevel: fitLevel, fitscore: fitScore, status: statusMap[agentFitLevel] }),
          updatedat: new Date().toISOString(),
        })
        .eq('leadid', leadId)

      return { saved: true, fitScore, fitLevel }
    }

    case 'present_pricing': {
      const { leadId } = input as { leadId: string }
      await supabase
        .from('trailhead_leads')
        .update({
          pricingpresented: true,
          status: 'pricing_presented',
          updatedat: new Date().toISOString(),
        })
        .eq('leadid', leadId)
      return {
        packageName: FIRM_CONFIG.product.name,
        price: FIRM_CONFIG.product.price,
        included: FIRM_CONFIG.product.included,
        timeline: FIRM_CONFIG.product.timeline,
        terms: FIRM_CONFIG.product.terms,
      }
    }

    case 'book_consultation': {
      const { leadId, preferredTimeframe, contactPreference } = input as {
        leadId: string
        preferredTimeframe?: string
        contactPreference?: string
      }
      const bookingReference = `HCEL-CONSULT-${randomUUID().slice(0, 8).toUpperCase()}`
      await supabase
        .from('trailhead_leads')
        .update({
          status: 'booked_consult',
          bookingreference: bookingReference,
          updatedat: new Date().toISOString(),
        })
        .eq('leadid', leadId)

      const checklist = CHECKLIST_CONFIG['texas-estate-plan-package']
      console.error(
        `[trailhead] BOOKING → ref:${bookingReference} timeframe:${preferredTimeframe ?? 'not specified'} contact:${contactPreference ?? 'not specified'}`
      )
      console.error(
        `[trailhead] ATTORNEY CHECKLIST → ${checklist.attorney.map((i) => `[${i.category}] ${i.key}`).join(', ')}`
      )
      return {
        bookingReference,
        message:
          "We've placed a hold on your requested time. You'll receive a calendar invite within 1 business day.",
        clientChecklist: checklist.client,
      }
    }

    case 'complete_purchase': {
      const { leadId, paymentMethodPreference } = input as {
        leadId: string
        paymentMethodPreference?: string
      }
      const purchaseReference = `HCEL-${randomUUID().slice(0, 8).toUpperCase()}`
      await supabase
        .from('trailhead_leads')
        .update({
          status: 'purchased',
          purchasereference: purchaseReference,
          revenueamount: FIRM_CONFIG.product.price,
          updatedat: new Date().toISOString(),
        })
        .eq('leadid', leadId)

      const checklist = CHECKLIST_CONFIG['texas-estate-plan-package']
      console.error(
        `[trailhead] PURCHASE → ref:${purchaseReference} amount:${FIRM_CONFIG.product.price} payment:${paymentMethodPreference ?? 'not specified'}`
      )
      console.error(
        `[trailhead] ATTORNEY CHECKLIST → ${checklist.attorney.map((i) => `[${i.category}] ${i.key}`).join(', ')}`
      )
      return {
        purchaseReference,
        message: `Purchase confirmed. Your confirmation number is ${purchaseReference}.`,
        packageDetails: {
          name: FIRM_CONFIG.product.name,
          price: FIRM_CONFIG.product.price,
          timeline: FIRM_CONFIG.product.timeline,
        },
        clientChecklist: checklist.client,
      }
    }

    case 'handoff_to_attorney': {
      const { leadId, situationSummary, urgency } = input as {
        leadId: string
        situationSummary?: string
        urgency?: string
      }
      const handoffReference = `HCEL-REFERRAL-${randomUUID().slice(0, 8).toUpperCase()}`
      await supabase
        .from('trailhead_leads')
        .update({
          status: 'referred',
          handoffreference: handoffReference,
          updatedat: new Date().toISOString(),
        })
        .eq('leadid', leadId)

      console.error(
        `[trailhead] HANDOFF → ref:${handoffReference} urgency:${urgency ?? 'standard'} situation:${situationSummary ?? 'not provided'}`
      )
      return {
        handoffReference,
        message: 'An attorney will reach out within 1 business day to discuss your situation.',
      }
    }

    default:
      return { error: `Unknown tool: ${name}` }
  }
}

// ── System prompt ──────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are an AI assistant for Hill Country Estate Law, an Austin, Texas estate planning firm. Your job is to have a warm, honest conversation with people thinking about getting their estate plan in order, help them understand whether the Texas Estate Plan Package is right for them, and guide them to the right next step.

ABOUT THE FIRM:
Hill Country Estate Law — "Plain-English estate planning for Texas families"
We believe estate planning shouldn't be expensive or scary.

THE PACKAGE — $1,495 flat fee, everything included:
- Last Will and Testament
- Durable Power of Attorney
- Medical Power of Attorney and HIPAA release
- Directive to Physicians (living will)
- Transfer-on-Death Deed for primary residence
- 60-minute attorney consultation
- Two rounds of revisions within 90 days
Timeline: Documents ready within 10 business days
Terms: Flat fee. No hourly billing.

OUT OF SCOPE — be honest when a situation isn't a fit:
- Contested probate or litigation between family members
- Complex business succession planning (ownership transfers, buy-sell agreements)
- Multi-state estate planning beyond Texas
- Family law, criminal, or immigration matters

YOUR PERSONA: Warm, plain-spoken, never pushy. Confident about what the package includes. Honest when something needs a different kind of engagement. Never scary or legalistic.

NEVER: claim to be an attorney, give legal advice, use legalese, pressure anyone.

---

SALES MOTION — follow this sequence:

STEP 1 — GREET AND UNDERSTAND:
Respond warmly to the opening message. Ask ONE clarifying question to understand their situation better. Do not call any tools yet.

STEP 2 — START SESSION:
After 1–2 exchanges once you understand the basic situation, call start_lead. This returns a leadId — store it mentally and use it for all subsequent tool calls.

STEP 3 — COLLECT AND QUALIFY:
Naturally weave in questions about name and email as the conversation flows. Don't ask for both at once. As you gather information, call qualify_lead to save it:
- First call: save name and/or email as you collect them (no fitLevel yet)
- Final assessment call: include your fitLevel judgment along with situationSummary, familyComplexity, and fitIndicators

When assessing fitLevel:
- HIGH: Texas resident, straightforward family (married couple, adult kids, no active litigation), wants a will / powers of attorney / healthcare directive, no complex business interests
- MEDIUM: small business owner with succession questions, blended family with complex inheritance needs, significant complexity that benefits from an attorney first
- OUT_OF_SCOPE: contested probate or litigation already in progress, criminal / immigration / family law, non-Texas matters

STEP 4 — MAKE THE OUTCOME DECISION based on the fitLevel returned by qualify_lead:

If fitLevel is 'high':
  → Call present_pricing (leadId)
  → Walk through what's included in plain language — make it feel like a good value
  → Ask: would they like to complete the purchase today, or would they prefer to speak with an attorney first?
  → If they want to proceed: call complete_purchase (leadId, paymentMethodPreference)
  → If they want a consultation first: call book_consultation (leadId, preferredTimeframe, contactPreference)

If fitLevel is 'medium':
  → Explain warmly that their situation has some complexity that benefits from an attorney conversation first
  → Offer a free 30-minute consultation as the right next step
  → Call book_consultation (leadId, preferredTimeframe, contactPreference)

If fitLevel is 'out_of_scope':
  → Explain honestly and without judgment that this sounds like it needs a different kind of attorney — not what we do
  → Be specific about why (active litigation, criminal matter, etc.)
  → Offer to have someone reach out who can point them in the right direction
  → Call handoff_to_attorney (leadId, situationSummary, urgency)

STEP 5 — CLOSE warmly:
Tell them exactly what to expect next. Then present the client checklist from the tool response naturally — introduce it with one brief sentence like "Here's what to have ready:" and list each item on its own line. Close with warmth, not a sales pitch. Attorney-client disclaimer goes here and only here.

---

RULES (non-negotiable):
- ONE tool call per response. Never chain multiple tool calls in a single turn.
- After any tool call, always send a text message to the user before making the next tool call.
- One question at a time. Conversational, not a form.
- Keep responses concise — this is a chat interface, not email.
- Never claim to be an attorney. Never give legal advice.
- Attorney-client disclaimer only in the final closing message.
- NEVER mention refunds, money-back guarantees, or cancellation policies. Do not offer, imply, or reference any refund under any circumstances — that decision belongs solely to the attorney.`

// ── Route handler ──────────────────────────────────────────────────────────

export const maxDuration = 60

type SSEEvent =
  | { type: 'tool_start'; label: string }
  | { type: 'tool_done'; label: string }
  | { type: 'purchase_data'; reference: string; amount: number }
  | { type: 'booking_data'; reference: string }
  | { type: 'done'; text: string; toolCalls: { name: string; label: string }[]; messages: Anthropic.MessageParam[] }
  | { type: 'error'; error: string }

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY is not set' }, { status: 500 })
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: 'Supabase env vars are not set (NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)' },
      { status: 500 }
    )
  }

  let body: { messages?: Anthropic.MessageParam[] }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const messages = body.messages ?? []
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: SSEEvent) =>
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`))

      try {
        const toolCallsMade: { name: string; label: string }[] = []
        let current: Anthropic.MessageParam[] = messages

        for (let i = 0; i < 12; i++) {
          const response = await anthropic.messages.create({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 1024,
            system: SYSTEM_PROMPT,
            tools: TOOLS,
            messages: current,
          })

          if (response.stop_reason === 'end_turn') {
            const text = response.content
              .filter((b): b is Anthropic.TextBlock => b.type === 'text')
              .map((b) => b.text)
              .join('')
            send({
              type: 'done',
              text,
              toolCalls: toolCallsMade,
              messages: [...current, { role: 'assistant', content: text }],
            })
            break
          }

          if (response.stop_reason === 'tool_use') {
            const toolUseBlocks = response.content.filter(
              (b): b is Anthropic.ToolUseBlock => b.type === 'tool_use'
            )
            const toolResults: Anthropic.ToolResultBlockParam[] = []

            for (const block of toolUseBlocks) {
              const label = TOOL_LABELS[block.name] ?? block.name
              send({ type: 'tool_start', label })
              const result = await executeTool(block.name, block.input as Record<string, unknown>)
              toolCallsMade.push({ name: block.name, label })
              send({ type: 'tool_done', label })

              // Emit checkout-specific events so the client can render confirmation UI
              if (block.name === 'complete_purchase') {
                const r = result as { purchaseReference: string }
                send({ type: 'purchase_data', reference: r.purchaseReference, amount: FIRM_CONFIG.product.price })
              }
              if (block.name === 'book_consultation') {
                const r = result as { bookingReference: string }
                send({ type: 'booking_data', reference: r.bookingReference })
              }

              toolResults.push({
                type: 'tool_result',
                tool_use_id: block.id,
                content: JSON.stringify(result),
              })
            }

            current = [
              ...current,
              { role: 'assistant', content: response.content },
              { role: 'user', content: toolResults },
            ]
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
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
