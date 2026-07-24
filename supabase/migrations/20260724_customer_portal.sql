-- TDA Luxury müşteri paneli temel veri modeli
create extension if not exists pgcrypto;

create table if not exists public.customer_profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique,
  full_name text,
  phone text unique not null,
  email text,
  birth_date date,
  loyalty_points integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.customer_packages (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customer_profiles(id) on delete cascade,
  service_name text not null,
  total_sessions integer not null default 1 check (total_sessions > 0),
  used_sessions integer not null default 0 check (used_sessions >= 0),
  status text not null default 'active' check (status in ('active','completed','cancelled','paused')),
  created_at timestamptz not null default now()
);

create table if not exists public.customer_payments (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customer_profiles(id) on delete cascade,
  amount numeric(12,2) not null,
  payment_type text not null default 'payment' check (payment_type in ('payment','deposit','refund','debt')),
  status text not null default 'completed' check (status in ('pending','completed','cancelled')),
  description text,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.customer_documents (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customer_profiles(id) on delete cascade,
  document_type text not null,
  title text not null,
  storage_path text,
  accepted_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.customer_photos (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customer_profiles(id) on delete cascade,
  service_name text,
  storage_path text not null,
  photo_stage text check (photo_stage in ('before','during','after')),
  consent_granted boolean not null default false,
  taken_at timestamptz not null default now()
);

create table if not exists public.customer_notifications (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customer_profiles(id) on delete cascade,
  title text not null,
  body text not null,
  channel text not null default 'in_app' check (channel in ('in_app','sms','whatsapp','email','push')),
  read_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.customer_profiles enable row level security;
alter table public.customer_packages enable row level security;
alter table public.customer_payments enable row level security;
alter table public.customer_documents enable row level security;
alter table public.customer_photos enable row level security;
alter table public.customer_notifications enable row level security;

-- Auth bağlandıktan sonra kullanıcı yalnızca kendi profilini ve ilişkili kayıtlarını görür.
create policy "customer reads own profile" on public.customer_profiles for select
using (auth.uid() = auth_user_id);
create policy "customer reads own packages" on public.customer_packages for select
using (exists (select 1 from public.customer_profiles p where p.id = customer_id and p.auth_user_id = auth.uid()));
create policy "customer reads own payments" on public.customer_payments for select
using (exists (select 1 from public.customer_profiles p where p.id = customer_id and p.auth_user_id = auth.uid()));
create policy "customer reads own documents" on public.customer_documents for select
using (exists (select 1 from public.customer_profiles p where p.id = customer_id and p.auth_user_id = auth.uid()));
create policy "customer reads own photos" on public.customer_photos for select
using (exists (select 1 from public.customer_profiles p where p.id = customer_id and p.auth_user_id = auth.uid()));
create policy "customer reads own notifications" on public.customer_notifications for select
using (exists (select 1 from public.customer_profiles p where p.id = customer_id and p.auth_user_id = auth.uid()));
