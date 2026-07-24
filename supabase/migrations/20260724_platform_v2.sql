create extension if not exists "pgcrypto";

create table if not exists public.staff_profiles(
 id uuid primary key default gen_random_uuid(),
 auth_user_id uuid unique,
 full_name text not null,
 role text not null default 'specialist',
 commission_rate numeric(5,2) default 0,
 active boolean default true,
 created_at timestamptz default now()
);

create table if not exists public.rooms(
 id uuid primary key default gen_random_uuid(),
 name text not null unique,
 active boolean default true
);

create table if not exists public.appointments_v2(
 id uuid primary key default gen_random_uuid(),
 customer_id uuid,
 staff_id uuid references public.staff_profiles(id),
 room_id uuid references public.rooms(id),
 service_name text not null,
 starts_at timestamptz not null,
 ends_at timestamptz not null,
 status text not null default 'pending',
 deposit_amount numeric(12,2) default 0,
 notes text,
 created_at timestamptz default now()
);

create table if not exists public.customer_accounts(
 id uuid primary key default gen_random_uuid(),
 full_name text not null,
 phone text unique not null,
 email text,
 birth_date date,
 loyalty_points integer default 0,
 tags text[] default '{}',
 last_visit_at timestamptz,
 created_at timestamptz default now()
);

create table if not exists public.customer_ledger(
 id uuid primary key default gen_random_uuid(),
 customer_id uuid references public.customer_accounts(id) on delete cascade,
 entry_type text not null check(entry_type in ('debit','payment','discount','refund')),
 amount numeric(12,2) not null,
 description text,
 created_at timestamptz default now()
);

create table if not exists public.inventory_items(
 id uuid primary key default gen_random_uuid(),
 barcode text unique,
 name text not null,
 quantity numeric(12,2) default 0,
 minimum_quantity numeric(12,2) default 0,
 unit text default 'adet',
 unit_cost numeric(12,2) default 0,
 active boolean default true,
 updated_at timestamptz default now()
);

create table if not exists public.consent_documents(
 id uuid primary key default gen_random_uuid(),
 customer_id uuid references public.customer_accounts(id) on delete cascade,
 appointment_id uuid references public.appointments_v2(id) on delete set null,
 document_type text not null,
 content_snapshot jsonb not null default '{}'::jsonb,
 signed_name text,
 signature_path text,
 signed_at timestamptz,
 created_at timestamptz default now()
);

create table if not exists public.customer_media(
 id uuid primary key default gen_random_uuid(),
 customer_id uuid references public.customer_accounts(id) on delete cascade,
 appointment_id uuid references public.appointments_v2(id) on delete set null,
 media_type text default 'before',
 storage_path text not null,
 consent_document_id uuid references public.consent_documents(id),
 created_at timestamptz default now()
);

create table if not exists public.loyalty_transactions(
 id uuid primary key default gen_random_uuid(),
 customer_id uuid references public.customer_accounts(id) on delete cascade,
 points integer not null,
 reason text,
 created_at timestamptz default now()
);

alter table public.staff_profiles enable row level security;
alter table public.appointments_v2 enable row level security;
alter table public.customer_accounts enable row level security;
alter table public.customer_ledger enable row level security;
alter table public.inventory_items enable row level security;
alter table public.consent_documents enable row level security;
alter table public.customer_media enable row level security;
alter table public.loyalty_transactions enable row level security;

-- Canlıya geçmeden önce rollerinize göre ayrıntılı RLS politikaları tanımlayın.
-- Service role anahtarını hiçbir zaman istemci tarafında kullanmayın.

insert into public.rooms(name) values ('Oda 1'),('Oda 2'),('Oda 3'),('Oda 4'),('Oda 5')
on conflict(name) do nothing;
