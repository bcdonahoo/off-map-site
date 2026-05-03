export type CTAVariant = 'direct' | 'form-first'

export interface Lead {
  id?: string
  created_at?: string
  name: string
  email: string
  company?: string
  service_interest?: 'gtm-stack' | 'managed-retainer' | 'not-sure'
  message?: string
  source?: string
  cta_variant?: CTAVariant
  status?: 'new' | 'contacted' | 'booked' | 'closed'
}
