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

alter table public.customer_photos
  add column if not exists album_id uuid references public.customer_photo_albums(id) on delete cascade,
  add column if not exists photo_type text,
  add column if not exists caption text,
  add column if not exists created_by uuid references auth.users(id) on delete set null;

update public.customer_photos
set photo_type = case when category in ('before','after','progress','other') then category else 'progress' end
where photo_type is null;

alter table public.customer_photo_albums enable row level security;
alter table public.customer_photos enable row level security;

create index if not exists customer_photo_albums_customer_idx on public.customer_photo_albums(customer_id,treatment_date desc);
create index if not exists customer_photos_album_idx on public.customer_photos(album_id,taken_at asc);
create unique index if not exists customer_photos_storage_path_uidx on public.customer_photos(storage_path);

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('customer-photos','customer-photos',false,15728640,array['image/jpeg','image/png','image/webp','image/heic','image/heif'])
on conflict(id) do update set public=excluded.public,file_size_limit=excluded.file_size_limit,allowed_mime_types=excluded.allowed_mime_types;
