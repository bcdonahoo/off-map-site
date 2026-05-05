# Off-Map Site — Claude Code Kickoff Prompt

Paste everything below the horizontal rule as your first message to Claude Code,
run from an empty project directory (e.g. ~/projects/off-map-site).

---

Read CLAUDE.md before writing a single line of code. It contains every
architectural decision, the full project structure, environment variable list,
Supabase schema, A/B test design, Linear project details, MCP configuration,
and GitHub standards. When this prompt and CLAUDE.md conflict, CLAUDE.md wins.

Work through the phases below in strict order. Do not skip ahead to interesting
parts before foundations are verified. At the end of each phase, confirm what
was completed before starting the next.

---

## PHASE 0 — Tooling & Project Setup

Before any code is written, set up the external scaffolding.

### 0a. Verify MCPs
Confirm the following MCPs are available in this Claude Code session:
GitHub, Linear, Slack, Supabase, Vercel, Figma, Attio.
List which are available and which are missing. Do not proceed if GitHub,
Linear, or Supabase are missing — those are required for v1.

### 0b. GitHub
Using the GitHub MCP:
- Create a new public repository named `off-map-site` under the Off-Map account
- Initialize with a README placeholder and MIT LICENSE file
- Create two branches: `main` (default/production) and `dev` (integration)
- All subsequent commits in this session go to feature branches off `dev`

### 0c. Linear
Using the Linear MCP:
- In the existing Off-Map workspace, create a new project: `off-map.com`
- Add labels: `feature`, `bug`, `chore`, `design`, `content`
- Create the following issues in Backlog, each tagged `chore` unless noted:
  - "Phase 1: Project scaffold and foundation" `chore`
  - "Phase 2: Layout, nav, footer" `feature`
  - "Phase 3: Homepage — all sections" `feature`
  - "Phase 4: Supporting pages (/book, /stack, /services, /blog)" `feature`
  - "Phase 5: A/B test CTA implementation" `feature`
  - "Phase 6: Lead capture API + Resend email" `feature`
  - "Phase 7: Quality checks and Vercel deploy" `chore`
- Move "Phase 1" to In Progress

### 0d. Slack
Using the Slack MCP, post to the Off-Map #general channel (or most appropriate
channel available):
"🚀 Starting off-map.com site build. Linear project created. GitHub repo live.
Working through 7 phases — will post updates at each phase completion."

### 0e. Vercel
Using the Vercel MCP:
- Create a new Vercel project linked to the `off-map-site` GitHub repo
- Configure auto-deploy: `main` branch → production, all other branches → preview
- Note: custom domain (off-map.com) will be pointed at end of Phase 7

---

## PHASE 1 — Project Scaffold

Branch: `feat/scaffold` off `dev`

1. Initialize Next.js 15 with App Router, TypeScript strict mode, Tailwind CSS v4:
   ```
   npx create-next-app@latest . --typescript --tailwind --app \
     --src-dir=false --import-alias="@/*" --eslint
   ```

2. Install dependencies:
   ```
   npm install @supabase/supabase-js @supabase/ssr \
     posthog-js posthog-node \
     resend react-email @react-email/components \
     next-mdx-remote gray-matter
   ```

3. Initialize shadcn/ui:
   ```
   npx shadcn@latest init
   ```
   When prompted: Style → Default, Base color → Zinc, CSS variables → Yes.

   Then add components:
   ```
   npx shadcn@latest add button input textarea label card badge separator
   ```

4. Create the full directory structure exactly as specified in CLAUDE.md.
   Create all directories and placeholder files (empty or with a one-line
   comment) so the structure is visible in the repo.

5. Create `supabase/schema.sql` with the exact SQL from CLAUDE.md.

6. Create `lib/supabase.ts`:
   - Browser client using `createBrowserClient` from `@supabase/ssr`
   - Server client using `createServerClient` with service role key
   - Export both. Server client is used only in server components and API routes.

7. Create `lib/posthog.ts`:
   - PostHog browser client initialized with env vars
   - `PostHogProvider` (client component) that wraps children
   - `PostHogPageview` component that fires `$pageview` on route changes
     using `usePathname` and `useSearchParams`

8. Create `lib/resend.ts`:
   - Resend client instance
   - `sendLeadConfirmation(to: string, name: string, serviceInterest: string)`
     async function — implementation stubbed, wired in Phase 6

9. Create `types/index.ts`:
   ```typescript
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
   ```

10. Create `.env.example` with every variable from CLAUDE.md as empty strings.
    Create `.env.local` as a copy. Add `.env.local` to `.gitignore`.

11. Add `LICENSE` (MIT), finalize `.gitignore`.

12. Run `npm run build` — must pass with zero TypeScript errors before proceeding.

13. Commit: `chore(scaffold): initialize Next.js 15, install deps, create project structure`
    PR feat/scaffold → dev. Merge.

14. Using Linear MCP: move "Phase 1" to Done, move "Phase 2" to In Progress.
    Using Slack MCP: post "✅ Phase 1 complete: scaffold, deps, types, Supabase + PostHog + Resend clients."

---

## PHASE 2 — Core Layout, Nav, Footer

Branch: `feat/layout` off `dev`

### app/layout.tsx
- Import two Google Fonts via `next/font/google`:
  - `Syne` (weights: 700, 800) as the display font → CSS var `--font-display`
  - `DM_Sans` (weights: 400, 500, 600) as the body font → CSS var `--font-body`
- Apply fonts to `<html>` via className
- Wrap `{children}` in `PostHogProvider`
- Root metadata: title `"Off-Map | GTM Engineering"`,
  description `"Off-Map builds and operates AI-powered outbound systems that generate qualified pipeline for B2B companies."`
- Background `#0A0A0A` via globals.css on `body`

### app/globals.css
- CSS variables for the full design token set:
  ```css
  :root {
    --font-display: /* set by next/font */;
    --font-body: /* set by next/font */;
    --color-bg: #0A0A0A;
    --color-bg-surface: #141414;
    --color-bg-light: #F9F9F7;
    --color-text-primary: #F5F5F3;
    --color-text-muted: #6B7280;
    --color-text-dark: #111111;
    --color-accent: #00C2A8;      /* teal accent — GTM/data feel */
    --color-accent-dim: #00C2A820;
    --color-border: #1F1F1F;
    --color-border-light: #E5E5E3;
  }
  ```

### components/nav.tsx
- Fixed top, full width, `z-50`
- Subtle `border-b border-[var(--color-border)]` that appears on scroll
  (use `useState` + scroll listener — this is the only JS justified here)
- `backdrop-blur-sm bg-[var(--color-bg)]/90`
- Left: "Off-Map" in display font, links to `/`
- Right: "Services" dropdown (links to `/services/gtm-stack` and
  `/services/managed-retainer`), then "Book a Call" Button (shadcn, accent color)
  that links to `/book`
- Mobile (< 768px): hide nav links, show hamburger that reveals a slide-down menu.
  Keep it simple — no animation library, CSS transition only.

### components/footer.tsx
- Dark background, `border-t border-[var(--color-border)]`
- Two-column layout: left has "Off-Map" wordmark + one-line description,
  right has nav links grouped under "Services" and "Company"
- Bottom row: `© 2026 Off-Map Consulting` and `hello@off-map.com`
- Monospace font for the email address (signals technical sensibility)

Commit: `feat(layout): root layout with fonts, PostHog provider, nav, footer`
PR → dev. Merge.

Linear: Phase 2 → Done. Phase 3 → In Progress.
Slack: post phase 2 completion.

---

## PHASE 3 — Homepage

Branch: `feat/homepage` off `dev`

Build `app/page.tsx` by composing components. No logic in the page file —
imports and JSX only. Build each component as a separate file.

### components/hero.tsx
- Full viewport height, dark background
- Subtle CSS-only dot grid background: radial-gradient dots at ~4% opacity.
  Use `background-image: radial-gradient(...)` in a pseudo-element. No JS.
- Eyebrow (monospace, small caps, accent color): "GTM ENGINEERING"
- Headline (display font, 64–80px on desktop, 40px mobile, white):
  "Pipeline built by machines. Closed by you."
- Subhead (body font, muted, max-width 560px, centered):
  "Off-Map designs and operates AI-powered outbound systems — Clay, n8n,
  Instantly, and the Anthropic API — that generate qualified meetings without
  your team doing manual research or outreach."
- CTA placeholder: `<CTASection inline />` (we wire this in Phase 5;
  for now render a placeholder Button that links to /book)
- Three trust signals below the CTA (small, muted, with a checkmark icon):
  "No paid ads" · "No manual research" · "Results in 30 days"
- Text and CTA centered on desktop, left-aligned on mobile

### components/problem.tsx
- Background: `var(--color-bg-light)`, generous vertical padding
- Section eyebrow (monospace): "THE PROBLEM"
- Headline (display font, dark): "Traditional outbound is broken. Yours is
  probably no different."
- Three-column grid (single column on mobile). Each item:
  - Bold label
  - Two sentences of explanation
  1. "Your reps are researchers, not sellers." — Most outbound teams spend
     60–70% of their time on list building and email writing. That is not what
     you hired salespeople to do.
  2. "Personalization at scale does not exist yet. For you." — Generic sequences
     get ignored. Real personalization takes time no one has — unless the
     infrastructure is built correctly.
  3. "You are flying blind on what works." — Without proper attribution from
     signal to sequence to meeting to close, you are optimizing on gut feel.
     That is a slow way to iterate.

### components/services.tsx
- Dark background
- Eyebrow (monospace, accent): "SERVICES"
- Headline: "Two ways to work with Off-Map."
- Two cards side by side (stack on mobile). Each card:
  `bg-[var(--color-bg-surface)] border border-[var(--color-border)]`
  with accent-color top border on hover (CSS transition)

  Card 1 — GTM Stack Build:
  - Badge: "ONE-TIME" (accent color)
  - Name (display font): "GTM Stack Build"
  - Description: "We design, build, and validate your entire outbound
    infrastructure in 30 days. You own it, your team runs it."
  - Includes list (6 items — see CLAUDE.md services section for exact copy)
  - Price: "Starting at $3,500"
  - CTA: "Learn More →" → `/services/gtm-stack`

  Card 2 — Managed GTM Retainer:
  - Badge: "ONGOING" (muted)
  - Name: "Managed GTM Retainer"
  - Description: "Off-Map runs your outbound pipeline end-to-end. Enriched
    lists, personalized sequences, agentic research, weekly reporting.
    You show up for the calls."
  - Includes list (5 items — see CLAUDE.md)
  - Price: "From $2,500/mo"
  - CTA: "Learn More →" → `/services/managed-retainer`

### components/how-it-works.tsx
- Light background
- Eyebrow: "HOW IT WORKS"
- Headline: "The GTM Engineering loop."
- Six steps in a horizontal scroll container on mobile, wrapping grid on desktop.
  Each step: monospace step number (01–06), bold label, one-sentence description.
  Thin connector line between steps (CSS border or pseudo-element).
  Steps:
  01 Signal — Identify in-market accounts using intent data, job changes,
     and trigger events
  02 Enrich — Build complete contact records via Clay waterfall enrichment
     across 75+ data sources
  03 Research — AI agent generates account-specific context: tech stack,
     recent news, pain point hypothesis
  04 Review — Human approves or edits before anything sends. Nothing
     automated goes out blindly.
  05 Sequence — Personalized multi-step campaign launches via dedicated
     sending infrastructure
  06 Measure — Attribution from signal to reply to meeting. Optimize weekly.

### components/stack-preview.tsx
- Dark background, minimal
- Eyebrow: "THE STACK"
- Short paragraph: "We publish the exact tools we use, why we chose them,
  and what they cost. No black boxes."
- List of tool names as styled chips/badges (accent-outlined):
  Clay · n8n · Instantly · Claude API · Apify · PostHog · Attio · Vercel
- CTA link: "See the full stack →" → `/stack`
  (This section signals transparency and links to the portfolio-facing /stack page)

### components/proof.tsx
- Dark background
- Eyebrow: "BY THE NUMBERS"
- Three large metric callouts centered:
  - "< 30 days" — From kickoff to first sequence live
  - "5–8 hrs/week" — Human time to run a fully managed pipeline
  - "Clay + n8n + Claude" — The core stack. No black boxes.
- Below metrics, single body paragraph:
  "We built and operate these systems for our own businesses before offering
  them to clients. The methodology is proven on our own pipeline before it
  touches yours."

### components/cta-section.tsx (placeholder)
- For now: a full-width dark section with headline
  "Ready to build your GTM system?" and a Button linking to `/book`.
  We replace the Button in Phase 5 with the A/B tested version.

Assemble `app/page.tsx` using all components in this order:
Nav → Hero → Problem → Services → How It Works → Stack Preview → Proof →
CTA Section → Footer

Commit: `feat(homepage): all sections — hero, problem, services, how-it-works,
stack-preview, proof, cta-placeholder`
PR → dev. Merge.

Linear: Phase 3 → Done. Phase 4 → In Progress.
Slack: post phase 3 completion + Vercel preview URL.

---

## PHASE 4 — Supporting Pages

Branch: `feat/pages` off `dev`

### app/book/page.tsx
- Minimal layout (nav + footer)
- Headline: "Book a discovery call."
- Subhead: "30 minutes. No pitch deck. We'll talk about your current outbound
  motion and whether GTM Engineering is the right fit."
- Cal.com inline embed below. Use `NEXT_PUBLIC_CALCOM_USERNAME` and
  `NEXT_PUBLIC_CALCOM_EVENT` env vars. Prefer `@calcom/atoms` if the package
  is available; otherwise use the standard Cal.com embed script in a
  `useEffect` inside a client component.
- PostHog event on mount: `posthog.capture('booking_page_viewed')`

### app/stack/page.tsx
This is a key portfolio page. Write it as genuine technical documentation,
not marketing copy. See CLAUDE.md `/stack page content` section for what
to cover. For each tool include: what it does, why it was chosen over
alternatives, and approximate monthly cost.

Structure:
- Page headline: "The Stack"
- Subhead: "Every tool we use, why we chose it, and what it costs.
  Updated as the stack evolves."
- Organized by layer (Signal, Outreach, Automation, Review Gate,
  Analytics, CRM, Infrastructure)
- Each layer: layer name as a section heading, then a list of tools
  with name, role, why-not-X alternative note, and cost
- Bottom note: "This site is built on this stack. View the source on GitHub."
  with a link to the public repo.

### app/services/gtm-stack/page.tsx
Expand on the services card. Sections:
- What it is (2–3 sentences)
- What happens each week (4-week breakdown)
- What Off-Map is responsible for vs. what the client provides
- What the client receives at the end (documented architecture, trained
  sequences, 60-day support window, handoff call)
- Who this is for (ICP: 20–200 person B2B company with a sales team,
  no current outbound infrastructure or one that isn't working)
- FAQ (4 questions): What tools do I need already? / Do I need a CRM first? /
  How long until I see results? / What happens after 30 days?
- CTA section at the bottom (placeholder Button for now — Phase 5 wires it)

### app/services/managed-retainer/page.tsx
Expand on the retainer card. Sections:
- What it is
- What a typical week looks like (Monday list review, Wednesday sequence
  approval in Slack, Friday performance report)
- What is in the weekly report (contacts added, emails sent, open rate,
  reply rate, positive reply rate, meetings booked)
- Who this is for (companies that want pipeline but don't want to build
  and manage the infrastructure)
- FAQ (4 questions): Do I buy Clay/Instantly myself? / Which CRMs do you
  support? / What is the minimum commitment? / How do you measure success?
- CTA section (placeholder)

### app/blog/page.tsx
- Section heading: "Writing."
- Subhead: "Thoughts on GTM Engineering, outbound infrastructure, and
  building revenue systems."
- State: "First posts coming soon." with a subtle styled empty state.
- No posts rendered. Shell only.

### app/blog/[slug]/page.tsx
- Read `.mdx` files from `/content/blog/` using `next-mdx-remote`
- Frontmatter schema: `title` (string), `date` (string), `description`
  (string), `published` (boolean)
- If `published: false` or file not found: `notFound()`
- Render MDX with basic prose styling (Tailwind typography prose classes
  or equivalent manual styles)
- Since there are no posts in v1 this page is never hit, but it must
  compile and render correctly when a post is added

Commit: `feat(pages): /book, /stack, /services/gtm-stack,
/services/managed-retainer, /blog scaffolding`
PR → dev. Merge.

Linear: Phase 4 → Done. Phase 5 → In Progress.
Slack: post phase 4 completion.

---

## PHASE 5 — A/B Test CTA Implementation

Branch: `feat/ab-test-cta` off `dev`

Wire the real A/B test logic into `components/cta-section.tsx` and
build its two variants.

### components/cta-section.tsx
```tsx
"use client"
import { useFeatureFlagVariantKey } from 'posthog-js/react'
import { CTADirect } from './cta-direct'
import { CTAForm } from './cta-form'

interface CTASectionProps {
  inline?: boolean
}

export function CTASection({ inline = false }: CTASectionProps) {
  const variant = useFeatureFlagVariantKey('cta-variant')
  const showForm = variant === 'form-first'

  const content = showForm
    ? <CTAForm inline={inline} />
    : <CTADirect inline={inline} />

  if (inline) return content

  return (
    <section className="...full-width dark section...">
      <h2>Ready to build your GTM system?</h2>
      <p>Let's talk about your current outbound motion and whether GTM
         Engineering is the right fit — 30 minutes, no pitch deck.</p>
      {content}
    </section>
  )
}
```

### components/cta-direct.tsx
- Renders a single Button: "Book a Discovery Call →"
- Links to `/book`
- On click: `posthog.capture('cta_clicked', { variant: 'direct' })`
- `inline` prop: when true, render just the button; when false, center it
  with some vertical padding

### components/cta-form.tsx
- Short form: Name (required), Email (required), Company (optional),
  Service Interest (radio: "GTM Stack Build" | "Managed Retainer" |
  "Not sure yet"), Message (optional, textarea)
- Submit handler: POST to `/api/leads`
- On submit: disable form + show loading state
- On success: replace form with confirmation message:
  "We'll be in touch within one business day. Or book directly if you
  prefer: [Book a call →]" (links to `/book`)
- On error: show error message, re-enable form
- PostHog: `posthog.capture('cta_clicked', { variant: 'form-first' })`
  on button click, `posthog.capture('lead_form_submitted',
  { variant: 'form-first', service_interest: value })` on success

Now replace the placeholder CTAs in all pages (homepage, /services/gtm-stack,
/services/managed-retainer) with `<CTASection />` and `<CTASection inline />`.

Commit: `feat(ab-test): wire PostHog feature flag to CTA variants, replace
all placeholder CTAs`
PR → dev. Merge.

Linear: Phase 5 → Done. Phase 6 → In Progress.
Slack: post phase 5 completion.

---

## PHASE 6 — Lead Capture API & Email

Branch: `feat/lead-capture` off `dev`

### app/api/leads/route.ts
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'
import { sendLeadConfirmation } from '@/lib/resend'
import type { Lead } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    const lead: Lead = {
      name: body.name,
      email: body.email,
      company: body.company || null,
      service_interest: body.service_interest || null,
      message: body.message || null,
      source: body.source || null,
      cta_variant: body.cta_variant || 'direct',
    }

    const supabase = createServerSupabaseClient()
    const { error: dbError } = await supabase
      .from('leads')
      .insert(lead)

    if (dbError) throw dbError

    // Send confirmation email (Variant B only — but send for both, it's good UX)
    await sendLeadConfirmation(lead.email, lead.name, lead.service_interest ?? 'not-sure')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Lead capture error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
```

### emails/lead-confirmation.tsx
React Email template. Clean, minimal, matches the site aesthetic.
- Subject: "We got your message — here's what happens next"
- Body:
  - "Hi [name],"
  - "Thanks for reaching out to Off-Map. We've received your message and
    will review it within one business day."
  - One sentence about the service they selected
    (GTM Stack Build / Managed Retainer / generic if not-sure)
  - "If you'd like to skip the wait and book a time directly:"
    [Book a 30-minute call →] (links to Cal.com URL from env var)
  - "— Off-Map  |  hello@off-map.com"
- No images. Text-only email with minimal HTML styling.
- From: `RESEND_FROM_EMAIL` env var

Complete the `sendLeadConfirmation` implementation in `lib/resend.ts`.

### End-to-end test
Test the full Variant B flow:
1. Trigger the form CTA (set PostHog flag to `form-first` in local dev)
2. Fill in and submit the form
3. Verify Supabase `leads` table has the new row via Supabase MCP
4. Verify confirmation email is received

Commit: `feat(lead-capture): /api/leads route, Supabase insert, Resend
confirmation email, end-to-end verified`
PR → dev. Merge.

Linear: Phase 6 → Done. Phase 7 → In Progress.
Slack: post phase 6 completion.

---

## PHASE 7 — Quality, README, Deploy

Branch: `feat/ship` off `dev`

### Quality checks
1. `npm run build` — zero TypeScript errors, zero ESLint warnings
2. `npm run lint` — clean
3. Mobile layout check: all pages render correctly at 375px viewport width.
   Nothing overflows. Forms are usable. Nav mobile menu works.
4. Verify PostHog pageview fires on: homepage, /book, /stack, /services/*,
   /blog
5. Verify A/B test defaults to `direct` variant when the PostHog flag has
   not yet resolved (renders immediately, no layout shift, no blank CTA)
6. Verify Supabase `leads` table is accessible via Supabase MCP and the
   schema matches `supabase/schema.sql` exactly

### README.md (final version)
Write a complete README following CLAUDE.md README requirements:
1. What Off-Map is + what this repo is (2–3 sentences) + live URL
2. Stack overview table with brief rationale for key choices
3. A/B test description: how the PostHog feature flag controls the CTA,
   what each variant does, what is being measured
4. Local setup:
   ```bash
   git clone https://github.com/[org]/off-map-site
   cd off-map-site
   npm install
   cp .env.example .env.local
   # Fill in .env.local with your Supabase, Resend, PostHog, Cal.com keys
   npm run dev
   ```
5. Environment variable table (name, purpose, where to get it)
6. Deploy: "Auto-deploys to Vercel on push to main. Preview deployments
   on all other branches."
7. License: MIT

### Deploy to production
Using the Vercel MCP:
- Trigger a production deployment from the `main` branch
- Verify the deployment succeeds
- Add the custom domain `off-map.com` to the Vercel project
- Confirm SSL certificate is provisioned

### Final commits
- `docs(readme): complete README with stack rationale, A/B test docs,
  setup instructions`
- `chore(ship): production deploy, custom domain configured`

### Final Linear + Slack updates
- Move all remaining In Progress issues to Done
- Using Slack MCP, post:
  "🎉 off-map.com v1 is live. All 7 phases complete.
  [live URL] | GitHub: [repo URL]
  A/B test: active (PostHog cta-variant flag, 50/50)
  Linear: all V1 issues closed."

---

## WHEN YOU ARE DONE

Tell me:
1. Everything that was built and any spec deviations (with reasons)
2. Any V1 scope items that were deferred and why
3. Environment variables that still need real values before the app
   works end-to-end (list each one)
4. The exact commands to run locally
5. Any issues opened in Linear during the build (bugs, design debt, etc.)
6. The live Vercel preview URL

---

## DO NOT

- Use `pages/` directory — App Router only
- Add dependencies not listed in this prompt or CLAUDE.md without noting why
- Leave `TODO` comments in committed code — open a Linear issue instead
- Use `any` in TypeScript
- Commit `.env.local`
- Hardcode copy inside component files
- Add JavaScript animation libraries (CSS transitions only in v1)
- Proceed to the next phase without confirming the current phase is complete
