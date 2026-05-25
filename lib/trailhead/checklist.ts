export type ChecklistItem = {
  key: string
  label: string
  category: 'document' | 'verify' | 'draft' | 'review' | 'execution' | 'close'
  visibility: 'client' | 'attorney'
}

export type ChecklistConfig = {
  client: string[]
  attorney: ChecklistItem[]
}

export const CHECKLIST_CONFIG: Record<string, ChecklistConfig> = {
  'texas-estate-plan-package': {
    client: [
      'Your full legal name and current Texas address',
      "Your spouse or partner's name and contact info (if applicable)",
      'Names, ages, and addresses of your children or other dependents',
      'Who you want as executor of your will — name, relationship, contact info',
      "Who you want as your healthcare proxy — the person who makes medical decisions if you can't",
      'Who you want to hold your power of attorney — someone you trust with financial decisions',
      'Address and approximate value of your primary Texas home',
      'Any existing will, trust, or estate planning documents you already have',
      "Government-issued photo ID (driver's license or passport)",
    ],
    attorney: [
      { key: 'verify_domicile', label: 'Confirm client is Texas domiciliary (not just property owner)', category: 'verify', visibility: 'attorney' },
      { key: 'verify_appraisal', label: 'Run county appraisal records — confirm ownership, no unknown liens', category: 'verify', visibility: 'attorney' },
      { key: 'verify_probate', label: 'Check county clerk records for open probate or guardianship proceedings', category: 'verify', visibility: 'attorney' },
      { key: 'verify_existing_docs', label: 'Review any existing estate documents for conflicts or required revocations', category: 'verify', visibility: 'attorney' },
      { key: 'draft_will', label: 'Prepare Last Will and Testament — send draft for client review', category: 'draft', visibility: 'attorney' },
      { key: 'draft_dpoa', label: 'Prepare Durable Power of Attorney — send draft for client review', category: 'draft', visibility: 'attorney' },
      { key: 'draft_mpoa', label: 'Prepare Medical Power of Attorney and HIPAA Release — send draft', category: 'draft', visibility: 'attorney' },
      { key: 'draft_directive', label: 'Prepare Directive to Physicians (living will) — send draft', category: 'draft', visibility: 'attorney' },
      { key: 'draft_tod_deed', label: 'Prepare Transfer-on-Death Deed for primary residence — send draft', category: 'draft', visibility: 'attorney' },
      { key: 'review_approval', label: 'Client approval received on all drafted documents', category: 'review', visibility: 'attorney' },
      { key: 'review_revisions', label: 'Two rounds of revisions window open (90-day clock starts at first delivery)', category: 'review', visibility: 'attorney' },
      { key: 'exec_notarization', label: 'Notarization appointment scheduled and confirmed', category: 'execution', visibility: 'attorney' },
      { key: 'exec_signed', label: 'All documents signed, witnessed, and notarized', category: 'execution', visibility: 'attorney' },
      { key: 'close_deed_filed', label: 'Transfer-on-Death Deed filed with appropriate county recorder', category: 'close', visibility: 'attorney' },
      { key: 'close_delivered', label: 'Final document package delivered to client; status updated to matter_complete', category: 'close', visibility: 'attorney' },
    ],
  },
}

export const ATTORNEY_CATEGORY_LABELS: Record<ChecklistItem['category'], string> = {
  document: 'Documents',
  verify: 'Verify',
  draft: 'Draft',
  review: 'Review',
  execution: 'Execution',
  close: 'Filing & Close',
}
