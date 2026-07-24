create extension if not exists pgcrypto;

create table if not exists public.suppliers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact_name text,
  phone text,
  email text,
  tax_number text,
  address text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.inventory_products (
  id uuid primary key default gen_random_uuid(),
  supplier_id uuid references public.suppliers(id) on delete set null,
  name text not null,
  sku text unique,
  barcode text unique,
  brand text,
  category text,
  unit text not null default 'adet',
  purchase_price numeric(12,2) not null default 0,
  sale_price numeric(12,2) not null default 0,
  stock_quantity numeric(12,2) not null default 0,
  critical_level numeric(12,2) not null default 0,
  shelf_location text,
  expiry_date date,
  image_url text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.stock_movements (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.inventory_products(id) on delete cascade,
  movement_type text not null check (movement_type in ('in','out','waste','return','adjustment')),
  quantity numeric(12,2) not null check (quantity > 0),
  unit_cost numeric(12,2) not null default 0,
  reference text,
  notes text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists inventory_products_name_idx on public.inventory_products(name);
create index if not exists inventory_products_barcode_idx on public.inventory_products(barcode);
create index if not exists stock_movements_product_idx on public.stock_movements(product_id);
create index if not exists stock_movements_created_idx on public.stock_movements(created_at desc);

create or replace function public.apply_stock_movement()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  delta numeric(12,2);
begin
  delta := case
    when new.movement_type in ('in','return') then new.quantity
    when new.movement_type in ('out','waste') then -new.quantity
    else new.quantity
  end;

  update public.inventory_products
  set stock_quantity = stock_quantity + delta,
      updated_at = now()
  where id = new.product_id;

  return new;
end;
$$;

drop trigger if exists trg_apply_stock_movement on public.stock_movements;
create trigger trg_apply_stock_movement
after insert on public.stock_movements
for each row execute function public.apply_stock_movement();

alter table public.suppliers enable row level security;
alter table public.inventory_products enable row level security;
alter table public.stock_movements enable row level security;

drop policy if exists "authenticated suppliers" on public.suppliers;
create policy "authenticated suppliers" on public.suppliers for all to authenticated using (true) with check (true);
drop policy if exists "authenticated inventory products" on public.inventory_products;
create policy "authenticated inventory products" on public.inventory_products for all to authenticated using (true) with check (true);
drop policy if exists "authenticated stock movements" on public.stock_movements;
create policy "authenticated stock movements" on public.stock_movements for all to authenticated using (true) with check (true);
