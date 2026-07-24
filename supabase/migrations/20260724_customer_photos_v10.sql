create extension if not exists pgcrypto;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'customer-photos',
  'customer-photos',
  false,
  15728640,
  array['image/jpeg','image/png','image/webp','image/heic','image/heif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create table if not exists public.customer_photo_albums (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  title text not null,
  service_type text not null,
  treatment_date date not null default current_date,
  notes text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.customer_photos (
  id uuid primary key default gen_random_uuid(),
  album_id uuid not null references public.customer_photo_albums(id) on delete cascade,
  customer_id uuid not null references public.customers(id) on delete cascade,
  photo_type text not null check (photo_type in ('before','after','progress','other')),
  storage_path text not null unique,
  caption text,
  taken_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists customer_photo_albums_customer_idx
  on public.customer_photo_albums(customer_id, treatment_date desc);
create index if not exists customer_photos_album_idx
  on public.customer_photos(album_id, taken_at asc);
create index if not exists customer_photos_customer_idx
  on public.customer_photos(customer_id, created_at desc);

alter table public.customer_photo_albums enable row level security;
alter table public.customer_photos enable row level security;

drop policy if exists "authenticated customer photo albums" on public.customer_photo_albums;
create policy "authenticated customer photo albums"
on public.customer_photo_albums for all to authenticated
using (true) with check (true);

drop policy if exists "authenticated customer photos" on public.customer_photos;
create policy "authenticated customer photos"
on public.customer_photos for all to authenticated
using (true) with check (true);

drop policy if exists "authenticated customer photo storage read" on storage.objects;
create policy "authenticated customer photo storage read"
on storage.objects for select to authenticated
using (bucket_id = 'customer-photos');

drop policy if exists "authenticated customer photo storage insert" on storage.objects;
create policy "authenticated customer photo storage insert"
on storage.objects for insert to authenticated
with check (bucket_id = 'customer-photos');

drop policy if exists "authenticated customer photo storage update" on storage.objects;
create policy "authenticated customer photo storage update"
on storage.objects for update to authenticated
using (bucket_id = 'customer-photos')
with check (bucket_id = 'customer-photos');

drop policy if exists "authenticated customer photo storage delete" on storage.objects;
create policy "authenticated customer photo storage delete"
on storage.objects for delete to authenticated
using (bucket_id = 'customer-photos');
