import { createServerSupabaseClient } from '@/lib/supabase'

export type Tenant = {
  id: string
  slug: string
  name: string
  city: string
  state: string
  positioning: string
  greeting: string
  outOfScope: string[]
}

export type Offering = {
  id: string
  tenantId: string
  slug: string
  name: string
  price: number
  timeline: string
  included: string[]
  terms: string
}

export type OfferingChecklistItem = {
  id: string
  offeringId: string
  label: string
  visibility: 'client' | 'attorney'
  category: 'document' | 'verify' | 'draft' | 'review' | 'execution' | 'close'
  sortOrder: number
}

export async function getTenant(slug: string): Promise<Tenant | null> {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from('tenants')
    .select('*')
    .eq('slug', slug)
    .eq('active', true)
    .single()
  if (error || !data) return null
  return {
    id: data.id,
    slug: data.slug,
    name: data.name,
    city: data.city,
    state: data.state,
    positioning: data.positioning,
    greeting: data.greeting,
    outOfScope: data.out_of_scope ?? [],
  }
}

export async function getOfferings(tenantId: string): Promise<Offering[]> {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from('offerings')
    .select('*')
    .eq('tenantid', tenantId)
    .eq('active', true)
    .order('sortorder')
  if (error || !data) return []
  return data.map((d) => ({
    id: d.id,
    tenantId: d.tenantid,
    slug: d.slug,
    name: d.name,
    price: d.price,
    timeline: d.timeline,
    included: d.included ?? [],
    terms: d.terms,
  }))
}

export async function getChecklistItems(offeringId: string): Promise<OfferingChecklistItem[]> {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from('offering_checklist_items')
    .select('*')
    .eq('offeringid', offeringId)
    .order('sortorder')
  if (error || !data) return []
  return data.map((d) => ({
    id: d.id,
    offeringId: d.offeringid,
    label: d.label,
    visibility: d.visibility as 'client' | 'attorney',
    category: d.category as OfferingChecklistItem['category'],
    sortOrder: d.sortorder,
  }))
}
