// Single source of truth for chat content, artifact panel mapping, FAQ, and JSON-LD.
// Chat, below-the-fold FAQ, and FAQPage schema all derive from this file.

export type PanelId = 0 | 1 | 2 | 3

export interface Message {
  id: string
  role: 'visitor' | 'advisor'
  text: string
}

export interface SuggestedPrompt {
  text: string
  panelId: PanelId
}

export const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  role: 'advisor',
  text: "Hi. I'm the Off-Map advisor. Ask me anything about GTM, or pick a prompt below to get started.",
}

// Panel mapping: 0=positioning, 1=offers, 2=who-we-work-with, 3=audit-deliverable
export const SUGGESTED_PROMPTS: SuggestedPrompt[] = [
  { text: 'What does Off-Map do?', panelId: 0 },
  { text: 'Who do you work with?', panelId: 2 },
  { text: "What's the Audit?", panelId: 3 },
  { text: 'How is this different from a fractional CRO?', panelId: 1 },
]

export const MOCK_RESPONSES: Record<string, string> = {
  'What does Off-Map do?':
    'Off-Map is a GTM consulting practice for services firms and early-stage founders. AI rewrote the rules on how companies build pipeline, develop offers, and run their sales motion. Most available advice is borrowed from a world that no longer exists. We start from the business in front of us and build the motion that actually fits. Three ways to work together: a $350 Audit, a $7,500 Pipeline Sprint, and a Fractional GTM retainer from $4,500 per month.',
  'Who do you work with?':
    'Services firms and Seed to Series A founders, typically between $250k and $5M in revenue. The common thread is founder-led selling that has hit a ceiling. Every closed deal runs through you, and the playbooks everyone recommends do not fit where you actually are. That is exactly the stage where Off-Map does its best work.',
  "What's the Audit?":
    'The Audit is a $350 engagement: a 60-minute working session, a 1 to 2 page written brief delivered in 72 hours, and a 15-minute follow-up two weeks later. The brief names one thing working, one thing broken, and one move to make next. Most clients use it as a standalone engagement. If you want to go further after, that conversation happens in the follow-up.',
  'How is this different from a fractional CRO?':
    'A fractional CRO or VP Sales is a full-time-equivalent operator on a part-time schedule, typically managing a team and owning a number. Fractional GTM is different. We work alongside you on the highest-leverage GTM move each week, without managing headcount or owning quota. The goal is to help you build a motion that runs without us. Most engagements run 6 to 12 months.',
}

export const FALLBACK_RESPONSE =
  "That's a good question for a deeper conversation. The best starting point is usually a $350 Audit. Sixty minutes, a one-page brief in 72 hours, and one clear move to make next. Would you like to know more about how it works?"

// Derived FAQ items — used by BelowTheFold, FAQPage JSON-LD, and llms.txt
export const FAQ_ITEMS = SUGGESTED_PROMPTS.map((p) => ({
  question: p.text,
  answer: MOCK_RESPONSES[p.text] ?? '',
  panelId: p.panelId,
}))
