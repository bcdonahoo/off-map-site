create table leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  name text not null,
  email text not null,
  company text,
  service_interest text,
  message text,
  source text,
  cta_variant text,
  status text default 'new'
);

alter table leads enable row level security;

create policy "Service role only" on leads
  for all using (auth.role() = 'service_role');
