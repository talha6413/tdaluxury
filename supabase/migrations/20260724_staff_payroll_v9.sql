create extension if not exists pgcrypto;

create table if not exists public.staff_members (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text,
  email text,
  role text not null default 'Güzellik Uzmanı',
  monthly_salary numeric(12,2) not null default 0,
  commission_rate numeric(6,2) not null default 0 check (commission_rate >= 0),
  monthly_target numeric(12,2) not null default 0,
  hire_date date,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.staff_performance (
  id uuid primary key default gen_random_uuid(),
  staff_id uuid not null references public.staff_members(id) on delete cascade,
  period text not null check (period ~ '^\\d{4}-\\d{2}$'),
  service_revenue numeric(12,2) not null default 0,
  product_revenue numeric(12,2) not null default 0,
  completed_services integer not null default 0,
  bonus_amount numeric(12,2) not null default 0,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(staff_id, period)
);

create table if not exists public.staff_payrolls (
  id uuid primary key default gen_random_uuid(),
  staff_id uuid not null references public.staff_members(id) on delete cascade,
  period text not null check (period ~ '^\\d{4}-\\d{2}$'),
  base_salary numeric(12,2) not null default 0,
  commission_amount numeric(12,2) not null default 0,
  bonus_amount numeric(12,2) not null default 0,
  deduction_amount numeric(12,2) not null default 0,
  net_amount numeric(12,2) not null default 0,
  status text not null default 'draft' check (status in ('draft','approved','paid')),
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(staff_id, period)
);

create index if not exists staff_performance_staff_period_idx on public.staff_performance(staff_id, period desc);
create index if not exists staff_payrolls_staff_period_idx on public.staff_payrolls(staff_id, period desc);

alter table public.staff_members enable row level security;
alter table public.staff_performance enable row level security;
alter table public.staff_payrolls enable row level security;

drop policy if exists "authenticated staff members" on public.staff_members;
create policy "authenticated staff members" on public.staff_members for all to authenticated using (true) with check (true);
drop policy if exists "authenticated staff performance" on public.staff_performance;
create policy "authenticated staff performance" on public.staff_performance for all to authenticated using (true) with check (true);
drop policy if exists "authenticated staff payrolls" on public.staff_payrolls;
create policy "authenticated staff payrolls" on public.staff_payrolls for all to authenticated using (true) with check (true);
