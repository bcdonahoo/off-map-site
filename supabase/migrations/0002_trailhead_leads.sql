-- supabase/migrations/0002_trailhead_leads.sql

create table public.trailhead_leads (
  leadId uuid primary key,
  tenantId text not null default 'hill-country',
  createdAt timestamptz not null default now(),
  updatedAt timestamptz not null default now(),
  status text not null default 'in_progress',
    -- in_progress | qualified | pricing_presented | booked_consult | purchased | referred
  fitLevel text,
    -- high | medium | out_of_scope
  fitScore integer,
  client jsonb not null default '{}'::jsonb,
    -- {name, email, phone}
  qualification jsonb not null default '{}'::jsonb,
    -- {situation, urgency, familyComplexity, fitIndicators[]}
  pricingPresented boolean not null default false,
  bookingReference text,
  purchaseReference text,
  handoffReference text,
  revenueAmount numeric(10,2)
);

-- RLS
alter table public.trailhead_leads enable row level security;
create policy trailhead_leads_service_role on public.trailhead_leads
  for all using (auth.role() = 'service_role');
