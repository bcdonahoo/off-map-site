import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'
import { sendLeadConfirmation } from '@/lib/resend'
import type { Lead } from '@/types'

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const {
    name,
    email,
    company,
    service_interest,
    message,
    source,
    cta_variant,
  } = body as Partial<Lead>

  if (!name || typeof name !== 'string' || !name.trim()) {
    return NextResponse.json({ error: 'name is required' }, { status: 400 })
  }
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.json({ error: 'valid email is required' }, { status: 400 })
  }

  const lead: Omit<Lead, 'id' | 'created_at' | 'status'> = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    ...(company && { company: company.trim() }),
    ...(service_interest && { service_interest }),
    ...(message && { message: message.trim() }),
    ...(source && { source }),
    ...(cta_variant && { cta_variant }),
  }

  const supabase = createServerSupabaseClient()
  const { error: dbError } = await supabase.from('leads').insert(lead)

  if (dbError) {
    console.error('[leads] supabase insert error:', dbError.message)
    return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 })
  }

  try {
    await sendLeadConfirmation(lead.email, lead.name, lead.service_interest)
  } catch (err) {
    // Email failure is non-fatal — lead is already saved
    console.error('[leads] resend error:', err)
  }

  return NextResponse.json({ success: true }, { status: 201 })
}
