import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createServerSupabaseClient } from '@/lib/supabase'
import { randomUUID } from 'crypto'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// ── Dispute data ───────────────────────────────────────────────────────────

type DisputeType =
  | 'boundary' | 'easement' | 'adverse_possession' | 'chain_of_title'
  | 'deed_fraud' | 'hoa_covenant' | 'encroachment' | 'heirship_probate'
  | 'quiet_title' | 'wrongful_foreclosure' | 'other'

const DISPUTE_LABELS: Record<DisputeType, string> = {
  boundary: 'Boundary / Survey Conflict',
  easement: 'Easement Dispute',
  adverse_possession: 'Adverse Possession Claim',
  chain_of_title: 'Chain of Title Defect',
  deed_fraud: 'Deed Fraud / Forgery',
  hoa_covenant: 'HOA / Deed Restriction',
  encroachment: 'Encroachment',
  heirship_probate: 'Heirship / Probate Deed Issue',
  quiet_title: 'Quiet Title Action',
  wrongful_foreclosure: 'Wrongful Foreclosure',
  other: 'Other Deed Issue',
}

const DISPUTE_KEYWORDS: Record<DisputeType, string[]> = {
  boundary: ['boundary', 'fence', 'survey', 'property line', 'neighbor built', 'encroach'],
  easement: ['easement', 'access', 'right of way', 'utility', 'ingress', 'egress', 'landlocked'],
  adverse_possession: ['adverse possession', 'squatter', 'using my land', 'been there for years', 'claiming my property'],
  chain_of_title: ['title defect', 'gap in title', 'missing deed', 'chain of title', 'previous owner', 'clerical error'],
  deed_fraud: ['fraud', 'forged', 'fake deed', 'someone filed', 'identity theft', 'without my knowledge'],
  hoa_covenant: ['hoa', 'homeowners association', 'deed restriction', 'covenant', 'violation'],
  encroachment: ['encroachment', 'built on my property', 'structure crosses', 'driveway on my'],
  heirship_probate: ['inherited', 'estate', 'probate', 'heirs', 'deceased', 'passed away', 'died'],
  quiet_title: ['quiet title', 'cloud on title', 'clear title', 'title insurance refused', 'competing claim'],
  wrongful_foreclosure: ['foreclosure', 'foreclosing', 'lender', 'bank taking', 'trustee sale'],
  other: [],
}

const DISPUTE_QUESTIONS: Record<DisputeType, string[]> = {
  boundary: ['When did you first notice the boundary dispute?', 'Do you have a current survey of the property?', 'Have you and your neighbor communicated about this?', 'Is there a physical encroachment — a fence, structure, or other improvement?'],
  easement: ['What type of easement is in dispute — access, utility, drainage, or something else?', 'Is the easement recorded in your deed or in a separate document?', 'Who is claiming or blocking the easement rights?', 'Has access been blocked or threatened?'],
  adverse_possession: ['How long has the other party been occupying or using the disputed area?', 'Have you ever given them permission to use that land?', 'Is the occupation open and visible, or was it hidden from you?', 'Have you taken any steps to stop their use?'],
  chain_of_title: ['What type of defect was found — a gap in ownership, missing signature, or clerical error?', 'Was this discovered during a title search for a sale or refinance?', 'How far back in the chain does the defect appear to go?', 'Do you have a title insurance policy on the property?'],
  deed_fraud: ['How did you discover the fraudulent deed?', 'Do you know who filed it?', 'Has the property been sold or encumbered based on the fraudulent deed?', 'Have you filed a police report?'],
  hoa_covenant: ['What specific deed restriction or covenant is at issue?', 'Are you the owner accused of a violation, or are you seeking enforcement against a neighbor?', 'Has the HOA sent a formal written notice?', 'When was the deed restriction originally recorded?'],
  encroachment: ['What is encroaching — a fence, building, driveway, or something else?', "Whose property does the encroachment cross?", 'Do you have a survey confirming the encroachment?', 'How long has the encroachment existed?'],
  heirship_probate: ['Did the property owner pass away with or without a will?', 'Has probate been opened?', 'Are there multiple heirs involved?', 'Is the property currently occupied?'],
  quiet_title: ['What is the specific cloud on title you need cleared?', 'Have you identified all potential adverse claimants?', 'Is there an active sale or refinance that depends on clearing title?', 'Has a title company refused to insure the property?'],
  wrongful_foreclosure: ['At what stage is the foreclosure — notice received, sale scheduled, or already completed?', 'What is the basis for challenging the foreclosure?', 'Are you current on payments or in arrears?', 'What is the foreclosure sale date, if scheduled?'],
  other: ['Can you describe your deed issue in as much detail as possible?', 'What outcome are you hoping to achieve?', 'Is there an active deadline or legal proceeding related to this issue?'],
}

const DOCUMENT_LISTS: Record<DisputeType, { name: string; priority: 'required' | 'helpful'; description: string }[]> = {
  boundary: [
    { name: 'Current deed', priority: 'required', description: 'The most recent recorded deed to your property' },
    { name: 'Survey', priority: 'required', description: "A licensed surveyor's plat of your property" },
    { name: 'Neighbor correspondence', priority: 'helpful', description: 'Any written communications with the other party' },
  ],
  easement: [
    { name: 'Current deed', priority: 'required', description: 'Your deed — easements are often recorded within it' },
    { name: 'Easement agreement', priority: 'required', description: 'Any separate easement document, if one exists' },
    { name: 'Survey', priority: 'helpful', description: 'Survey showing the easement location' },
  ],
  adverse_possession: [
    { name: 'Current deed', priority: 'required', description: 'Your recorded deed' },
    { name: 'Survey', priority: 'required', description: 'Survey showing the disputed area' },
    { name: 'Photos', priority: 'helpful', description: 'Photos of the occupied area and any structures' },
    { name: 'Tax records', priority: 'helpful', description: 'Property tax payment history' },
  ],
  chain_of_title: [
    { name: 'Title search or commitment', priority: 'required', description: 'The title report showing the defect' },
    { name: 'Current deed', priority: 'required', description: 'Your recorded deed' },
    { name: 'Title insurance policy', priority: 'helpful', description: 'If you have one — it may cover the defect' },
  ],
  deed_fraud: [
    { name: 'Fraudulent deed', priority: 'required', description: 'A copy of the deed you believe is fraudulent' },
    { name: 'Your legitimate deed', priority: 'required', description: 'Your actual recorded deed' },
    { name: 'Police report', priority: 'helpful', description: 'If already filed' },
  ],
  hoa_covenant: [
    { name: 'HOA notice', priority: 'required', description: 'Any written notice from the HOA' },
    { name: 'Deed restrictions', priority: 'required', description: 'The recorded deed restrictions for your subdivision' },
    { name: 'Current deed', priority: 'helpful', description: 'Your deed' },
  ],
  encroachment: [
    { name: 'Survey', priority: 'required', description: 'Showing the encroachment location' },
    { name: 'Current deed', priority: 'required', description: 'Your deed' },
    { name: 'Photos', priority: 'helpful', description: 'Photos of the encroaching structure' },
  ],
  heirship_probate: [
    { name: 'Death certificate', priority: 'required', description: 'Of the deceased property owner' },
    { name: 'Will (if any)', priority: 'required', description: 'The original will, if one exists' },
    { name: 'Current deed', priority: 'required', description: 'Deed showing the deceased as owner' },
    { name: 'List of heirs', priority: 'helpful', description: 'Names and contact info for all potential heirs' },
  ],
  quiet_title: [
    { name: 'Title search or commitment', priority: 'required', description: 'Showing the cloud on title' },
    { name: 'Current deed', priority: 'required', description: 'Your deed' },
    { name: 'All related documents', priority: 'helpful', description: 'Any documents related to adverse claims' },
  ],
  wrongful_foreclosure: [
    { name: 'Foreclosure notice', priority: 'required', description: "Notice of sale or trustee's deed" },
    { name: 'Loan documents', priority: 'required', description: 'Original note and deed of trust' },
    { name: 'Payment history', priority: 'helpful', description: 'Your payment records' },
    { name: 'Correspondence with lender', priority: 'helpful', description: 'Written communications' },
  ],
  other: [
    { name: 'Current deed', priority: 'required', description: 'Your most recent recorded deed' },
    { name: 'Any related documents', priority: 'helpful', description: 'Any documents related to your dispute' },
  ],
}

// ── Helpers ────────────────────────────────────────────────────────────────

function classifyDispute(description: string): DisputeType {
  const lower = description.toLowerCase()
  let best: DisputeType = 'other'
  let bestScore = 0
  for (const [type, keywords] of Object.entries(DISPUTE_KEYWORDS) as [DisputeType, string[]][]) {
    const score = keywords.filter((k) => lower.includes(k)).length
    if (score > bestScore) { bestScore = score; best = type }
  }
  return best
}

function scoreComplexity(session: Record<string, unknown>) {
  let score = 0
  const factors: string[] = []
  const dispute = (session.dispute ?? {}) as Record<string, unknown>
  const documents = (session.documents ?? {}) as Record<string, unknown>

  if (dispute.type === 'deed_fraud') { score += 60; factors.push('Deed fraud requires immediate legal action') }
  if (dispute.type === 'wrongful_foreclosure') { score += 55; factors.push('Foreclosure disputes are time-sensitive') }
  if (dispute.type === 'adverse_possession' || dispute.type === 'quiet_title') { score += 40; factors.push('Action likely requires litigation') }
  if (dispute.urgency === 'urgent') { score += 25; factors.push('Client flagged as urgent') }
  if (dispute.activeLitigation) { score += 35; factors.push('Active litigation in progress') }
  if (dispute.activeDeadline) { score += 30; factors.push('Active court deadline or sale date') }
  if (Array.isArray(dispute.adverseParties) && dispute.adverseParties.length > 1) { score += 15; factors.push('Multiple adverse parties') }
  if (documents.hasCurrentDeed === false) { score += 10; factors.push('No current deed on hand') }
  if (documents.hasSurvey === false && ['boundary', 'encroachment', 'adverse_possession'].includes(String(dispute.type ?? ''))) {
    score += 15; factors.push('No survey for boundary-related dispute')
  }
  if (dispute.priorAttempts) { score += 10; factors.push('Prior resolution attempts unsuccessful') }

  score = Math.min(score, 100)
  const level = score < 30 ? 'simple' : score < 60 ? 'medium' : 'complex'
  const recommendation = score >= 60 ? 'urgent_consultation' : score >= 30 ? 'schedule_call' : 'async_review'
  return { score, level, recommendation, factors }
}

function fmtBool(val: unknown): string {
  return val === undefined || val === null ? 'Unknown' : val ? 'Yes' : 'No'
}

// ── Tool definitions ───────────────────────────────────────────────────────

const TOOL_LABELS: Record<string, string> = {
  start_intake: 'Starting intake session…',
  record_dispute_info: 'Saving your information…',
  classify_dispute: 'Classifying dispute type…',
  assess_complexity: 'Assessing case complexity…',
  request_documents: 'Generating document checklist…',
  generate_case_summary: 'Preparing attorney brief…',
  submit_case: 'Submitting case to KLG…',
}

const TOOLS: Anthropic.Tool[] = [
  {
    name: 'start_intake',
    description: 'Initialize a new intake session. Call once after you understand the client\'s basic situation.',
    input_schema: {
      type: 'object' as const,
      properties: { tenantId: { type: 'string', description: 'Always "klg"' } },
      required: ['tenantId'],
    },
  },
  {
    name: 'record_dispute_info',
    description: 'Save or update client information. Call incrementally as details are collected.',
    input_schema: {
      type: 'object' as const,
      properties: {
        sessionId: { type: 'string' },
        clientName: { type: 'string' },
        clientEmail: { type: 'string' },
        clientPhone: { type: 'string' },
        propertyAddress: { type: 'string' },
        propertyCounty: { type: 'string' },
        disputeDescription: { type: 'string' },
        urgency: { type: 'string', enum: ['urgent', 'standard'] },
        timeline: { type: 'string' },
        activeLitigation: { type: 'boolean' },
        activeDeadline: { type: 'string' },
        adverseParties: { type: 'array', items: { type: 'string' } },
        priorAttempts: { type: 'string' },
        hasCurrentDeed: { type: 'boolean' },
        hasSurvey: { type: 'boolean' },
        hasTitleInsurance: { type: 'boolean' },
        hasCorrespondence: { type: 'boolean' },
        hasCourtDocs: { type: 'boolean' },
      },
      required: ['sessionId'],
    },
  },
  {
    name: 'classify_dispute',
    description: 'Classify the dispute type and get suggested follow-up questions.',
    input_schema: {
      type: 'object' as const,
      properties: {
        sessionId: { type: 'string' },
        description: { type: 'string', description: "The client's description of their dispute" },
      },
      required: ['sessionId', 'description'],
    },
  },
  {
    name: 'assess_complexity',
    description: 'Score case complexity and determine routing — async review vs. consultation.',
    input_schema: {
      type: 'object' as const,
      properties: { sessionId: { type: 'string' } },
      required: ['sessionId'],
    },
  },
  {
    name: 'request_documents',
    description: 'Get the prioritized document checklist based on the dispute type.',
    input_schema: {
      type: 'object' as const,
      properties: { sessionId: { type: 'string' } },
      required: ['sessionId'],
    },
  },
  {
    name: 'generate_case_summary',
    description: 'Generate a structured attorney brief. Call for simple/medium cases before submit_case.',
    input_schema: {
      type: 'object' as const,
      properties: { sessionId: { type: 'string' } },
      required: ['sessionId'],
    },
  },
  {
    name: 'submit_case',
    description: 'Finalize and submit the intake. Call after generate_case_summary for async cases.',
    input_schema: {
      type: 'object' as const,
      properties: { sessionId: { type: 'string' } },
      required: ['sessionId'],
    },
  },
]

// ── Tool executor ──────────────────────────────────────────────────────────

function sbCheck<T>(result: { data: T; error: { message: string } | null }, context: string): NonNullable<T> {
  if (result.error) throw new Error(`[supabase] ${context}: ${result.error.message}`)
  if (result.data === null || result.data === undefined) throw new Error(`[supabase] ${context}: no data returned`)
  return result.data as NonNullable<T>
}

async function executeTool(name: string, input: Record<string, unknown>): Promise<unknown> {
  const supabase = createServerSupabaseClient()

  switch (name) {
    case 'start_intake': {
      const sessionId = randomUUID()
      const now = new Date().toISOString()
      const result = await supabase.from('intake_sessions').insert({
        sessionId,
        tenantId: 'klg',
        createdAt: now,
        updatedAt: now,
        status: 'in_progress',
        client: {},
        property: {},
        dispute: {},
        documents: {},
        assessment: {},
      })
      if (result.error) throw new Error(`[supabase] start_intake insert: ${result.error.message}`)
      return { sessionId, status: 'active' }
    }

    case 'record_dispute_info': {
      const {
        sessionId, clientName, clientEmail, clientPhone,
        propertyAddress, propertyCounty, disputeDescription, urgency,
        timeline, activeLitigation, activeDeadline, adverseParties, priorAttempts,
        hasCurrentDeed, hasSurvey, hasTitleInsurance, hasCorrespondence, hasCourtDocs,
      } = input

      const row = sbCheck(
        await supabase.from('intake_sessions').select('client,property,dispute,documents').eq('sessionId', sessionId).single(),
        `record_dispute_info select ${sessionId}`
      )

      const client = {
        ...(row.client ?? {}),
        ...(clientName != null && { name: clientName }),
        ...(clientEmail != null && { email: clientEmail }),
        ...(clientPhone != null && { phone: clientPhone }),
      }
      const property = {
        ...(row.property ?? {}),
        ...(propertyAddress != null && { address: propertyAddress }),
        ...(propertyCounty != null && { county: propertyCounty }),
      }
      const dispute = {
        ...(row.dispute ?? {}),
        ...(disputeDescription != null && { description: disputeDescription }),
        ...(urgency != null && { urgency }),
        ...(timeline != null && { timeline }),
        ...(activeLitigation != null && { activeLitigation }),
        ...(activeDeadline != null && { activeDeadline }),
        ...(adverseParties != null && { adverseParties }),
        ...(priorAttempts != null && { priorAttempts }),
      }
      const documents = {
        ...(row.documents ?? {}),
        ...(hasCurrentDeed != null && { hasCurrentDeed }),
        ...(hasSurvey != null && { hasSurvey }),
        ...(hasTitleInsurance != null && { hasTitleInsurance }),
        ...(hasCorrespondence != null && { hasCorrespondence }),
        ...(hasCourtDocs != null && { hasCourtDocs }),
      }

      const updateResult = await supabase.from('intake_sessions').update({ client, property, dispute, documents, updatedAt: new Date().toISOString() }).eq('sessionId', sessionId)
      if (updateResult.error) throw new Error(`[supabase] record_dispute_info update: ${updateResult.error.message}`)
      return { saved: true }
    }

    case 'classify_dispute': {
      const { sessionId, description } = input as { sessionId: string; description: string }
      const row = sbCheck(
        await supabase.from('intake_sessions').select('dispute').eq('sessionId', sessionId).single(),
        `classify_dispute select ${sessionId}`
      )
      const type = classifyDispute(description)
      const updateResult = await supabase.from('intake_sessions').update({
        dispute: { ...(row?.dispute ?? {}), type, description: (row?.dispute as Record<string, unknown>)?.description ?? description },
        updatedAt: new Date().toISOString(),
      }).eq('sessionId', sessionId)
      if (updateResult.error) throw new Error(`[supabase] classify_dispute update: ${updateResult.error.message}`)
      return { disputeType: type, label: DISPUTE_LABELS[type], suggestedQuestions: DISPUTE_QUESTIONS[type] }
    }

    case 'assess_complexity': {
      const { sessionId } = input as { sessionId: string }
      const row = sbCheck(
        await supabase.from('intake_sessions').select('*').eq('sessionId', sessionId).single(),
        `assess_complexity select ${sessionId}`
      )
      const result = scoreComplexity(row as Record<string, unknown>)
      const updateResult = await supabase.from('intake_sessions').update({
        assessment: {
          complexityScore: result.score,
          complexityLevel: result.level,
          recommendation: result.recommendation,
          reasoning: result.factors.join('; '),
        },
        updatedAt: new Date().toISOString(),
      }).eq('sessionId', sessionId)
      if (updateResult.error) throw new Error(`[supabase] assess_complexity update: ${updateResult.error.message}`)
      return result
    }

    case 'request_documents': {
      const { sessionId } = input as { sessionId: string }
      const row = sbCheck(
        await supabase.from('intake_sessions').select('dispute').eq('sessionId', sessionId).single(),
        `request_documents select ${sessionId}`
      )
      const type = ((row?.dispute as Record<string, unknown>)?.type as DisputeType) ?? 'other'
      const docs = DOCUMENT_LISTS[type] ?? DOCUMENT_LISTS.other
      return {
        required: docs.filter((d) => d.priority === 'required'),
        helpful: docs.filter((d) => d.priority === 'helpful'),
        note: "You don't need all of these to proceed — share what you have and the attorney will advise.",
      }
    }

    case 'generate_case_summary': {
      const { sessionId } = input as { sessionId: string }
      const row = sbCheck(
        await supabase.from('intake_sessions').select('*').eq('sessionId', sessionId).single(),
        `generate_case_summary select ${sessionId}`
      )

      const client = (row.client ?? {}) as Record<string, string>
      const property = (row.property ?? {}) as Record<string, string>
      const dispute = (row.dispute ?? {}) as Record<string, unknown>
      const documents = (row.documents ?? {}) as Record<string, unknown>
      const assessment = (row.assessment ?? {}) as Record<string, unknown>
      const type = (dispute.type as DisputeType) ?? 'other'
      const summaryId = randomUUID()
      const ref = summaryId.slice(0, 8).toUpperCase()
      const dateStr = new Date().toLocaleDateString('en-US', { timeZone: 'America/Chicago' })

      const brief = [
        'DEED DISPUTE INTAKE BRIEF',
        `Generated: ${dateStr}`,
        `Case Reference: ${ref}`,
        'Firm: Kelly Legal Group',
        '',
        '── CLIENT ──────────────────────────────────────',
        `Name:  ${client?.name ?? 'Not provided'}`,
        `Email: ${client?.email ?? 'Not provided'}`,
        `Phone: ${client?.phone ?? 'Not provided'}`,
        '',
        '── PROPERTY ────────────────────────────────────',
        `Address: ${property?.address ?? 'Not provided'}`,
        `County:  ${property?.county ?? 'Not provided'}`,
        '',
        '── DISPUTE ─────────────────────────────────────',
        `Type:              ${DISPUTE_LABELS[type]}`,
        `Description:       ${dispute?.description ?? 'Not provided'}`,
        `Urgency:           ${dispute?.urgency ?? 'Standard'}`,
        `Adverse Parties:   ${Array.isArray(dispute?.adverseParties) ? (dispute.adverseParties as string[]).join(', ') : 'Not identified'}`,
        `Prior Attempts:    ${dispute?.priorAttempts ?? 'None noted'}`,
        `Active Litigation: ${dispute?.activeLitigation ? 'YES' : 'No'}`,
        `Active Deadline:   ${dispute?.activeDeadline ?? 'None noted'}`,
        '',
        '── DOCUMENTS ON HAND ───────────────────────────',
        `Current Deed:    ${fmtBool(documents?.hasCurrentDeed)}`,
        `Survey:          ${fmtBool(documents?.hasSurvey)}`,
        `Title Insurance: ${fmtBool(documents?.hasTitleInsurance)}`,
        `Correspondence:  ${fmtBool(documents?.hasCorrespondence)}`,
        '',
        '── ASSESSMENT ──────────────────────────────────',
        `Complexity:     ${assessment?.complexityLevel ?? 'Not assessed'} (${assessment?.complexityScore ?? 'N/A'}/100)`,
        `Recommendation: ${assessment?.recommendation ?? 'Not assessed'}`,
        `Factors:        ${assessment?.reasoning ?? 'None'}`,
      ].join('\n')

      const summaryResult = await supabase.from('intake_sessions').update({
        summaryId, outcomeType: 'async_review', updatedAt: new Date().toISOString(),
      }).eq('sessionId', sessionId)
      if (summaryResult.error) throw new Error(`[supabase] generate_case_summary update: ${summaryResult.error.message}`)

      const intakeEmail = process.env.KLG_INTAKE_EMAIL ?? 'intake@kellylegalgroup.com'
      console.error(`[klg-intake] BRIEF → ${intakeEmail}\n${brief}`)

      return { summaryId, caseReference: ref, brief }
    }

    case 'submit_case': {
      const { sessionId } = input as { sessionId: string }
      const caseReference = `KLG-${randomUUID().slice(0, 8).toUpperCase()}`
      const submitResult = await supabase.from('intake_sessions').update({
        status: 'submitted', caseReference, updatedAt: new Date().toISOString(),
      }).eq('sessionId', sessionId)
      if (submitResult.error) throw new Error(`[supabase] submit_case update: ${submitResult.error.message}`)
      return { caseReference, message: `Case ${caseReference} submitted successfully.` }
    }

    default:
      return { error: `Unknown tool: ${name}` }
  }
}

// ── System prompt ──────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are an intake assistant for Kelly Legal Group (KLG), an Austin-based property and real estate law firm specializing in deed disputes.

Your job is to conduct a warm, professional intake conversation with potential clients.

Follow this sequence:
1. Respond warmly to the client's opening message and ask a clarifying question if needed
2. Once you understand their basic situation, call start_intake (tenantId: "klg")
3. Collect the client's name, email address, and property address — ask naturally, not all at once
4. Call record_dispute_info with what you've gathered so far
5. Call classify_dispute with a description of the issue
6. Ask 2–3 of the most relevant follow-up questions naturally (do not list them all at once)
7. Call record_dispute_info again with updated dispute details as you learn them
8. Ask which documents they have (deed, survey, title insurance, correspondence, court docs)
9. Call record_dispute_info with document availability
10. Call assess_complexity
11. Call request_documents — you can mention the checklist to the client
12. Based on the complexity result:
    - recommendation is "async_review" → call generate_case_summary then submit_case; tell the client an attorney will review and respond within 1 business day
    - recommendation is "schedule_call" or "urgent_consultation" → explain why they need a consultation and that a KLG attorney will reach out to schedule one; do NOT call submit_case
13. Close warmly

Rules:
- IMPORTANT: Make only ONE tool call per response. After a tool call completes, always send a text message to the user before making the next tool call. Never chain multiple tool calls in a single turn.
- Be conversational and empathetic — one question at a time
- Never give legal advice or interpret Texas law for the client
- The attorney-client disclaimer belongs only in the final confirmation message, not throughout the conversation
- Keep responses concise — this is a chat interface, not email`

// ── Route handler ──────────────────────────────────────────────────────────

export const maxDuration = 60

type SSEEvent =
  | { type: 'tool_start'; label: string }
  | { type: 'tool_done'; label: string }
  | { type: 'done'; text: string; toolCalls: { name: string; label: string }[]; messages: Anthropic.MessageParam[] }
  | { type: 'error'; error: string }

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY is not set' }, { status: 500 })
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Supabase env vars are not set (NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)' }, { status: 500 })
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
            model: 'claude-sonnet-4-6',
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
              toolResults.push({ type: 'tool_result', tool_use_id: block.id, content: JSON.stringify(result) })
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
      'Connection': 'keep-alive',
    },
  })
}
