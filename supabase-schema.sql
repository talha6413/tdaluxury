-- TDA Luxury admin panel schema
-- Run this file once in Supabase > SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users where user_id = auth.uid()
  );
$$;

create table if not exists public.campaigns (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  eyebrow text not null default 'DÖNEMSEL AVANTAJ',
  description text not null default '',
  image_url text not null default '',
  href text not null default '/hizmetler',
  published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  category text not null default 'Güzellik',
  read_time text not null default '5 dk',
  image_url text not null default '',
  intro text not null default '',
  sections jsonb not null default '[]'::jsonb,
  keywords text[] not null default '{}',
  published boolean not null default false,
  published_at date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null default 'Salon',
  alt_text text not null default '',
  image_url text not null,
  published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
alter table public.campaigns enable row level security;
alter table public.blog_posts enable row level security;
alter table public.gallery_items enable row level security;

drop policy if exists "Admins can view admin list" on public.admin_users;
create policy "Admins can view admin list" on public.admin_users
for select using (auth.uid() = user_id);

drop policy if exists "Public can view published campaigns" on public.campaigns;
drop policy if exists "Admins can manage campaigns" on public.campaigns;
create policy "Public can view published campaigns" on public.campaigns
for select using (published or public.is_admin());
create policy "Admins can manage campaigns" on public.campaigns
for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Public can view published blog posts" on public.blog_posts;
drop policy if exists "Admins can manage blog posts" on public.blog_posts;
create policy "Public can view published blog posts" on public.blog_posts
for select using (published or public.is_admin());
create policy "Admins can manage blog posts" on public.blog_posts
for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Public can view published gallery" on public.gallery_items;
drop policy if exists "Admins can manage gallery" on public.gallery_items;
create policy "Public can view published gallery" on public.gallery_items
for select using (published or public.is_admin());
create policy "Admins can manage gallery" on public.gallery_items
for all using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (id, name, public)
values ('tda-media', 'tda-media', true)
on conflict (id) do update set public = true;

drop policy if exists "Public can view TDA media" on storage.objects;
drop policy if exists "Admins can upload TDA media" on storage.objects;
drop policy if exists "Admins can update TDA media" on storage.objects;
drop policy if exists "Admins can delete TDA media" on storage.objects;
create policy "Public can view TDA media" on storage.objects
for select using (bucket_id = 'tda-media');
create policy "Admins can upload TDA media" on storage.objects
for insert with check (bucket_id = 'tda-media' and public.is_admin());
create policy "Admins can update TDA media" on storage.objects
for update using (bucket_id = 'tda-media' and public.is_admin());
create policy "Admins can delete TDA media" on storage.objects
for delete using (bucket_id = 'tda-media' and public.is_admin());

-- Full website management modules (no customer or appointment data is stored)
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null default 'Genel',
  description text not null default '',
  short_description text not null default '',
  price_text text not null default 'Bilgi alın',
  duration text not null default 'Kişiye özel',
  image_url text not null default '',
  image_position text not null default 'center center',
  featured boolean not null default false,
  published boolean not null default false,
  sort_order integer not null default 0,
  seo_title text not null default '',
  seo_description text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.results (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null default 'Sonuç',
  description text not null default '',
  before_image_url text not null default '',
  after_image_url text not null default '',
  image_position text not null default 'center center',
  disclaimer text not null default 'Sonuçlar kişiden kişiye değişebilir.',
  published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  answer text not null default '',
  category text not null default 'Genel',
  published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.page_content (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  page_key text not null unique,
  eyebrow text not null default '',
  description text not null default '',
  button_text text not null default '',
  button_url text not null default '',
  image_url text not null default '',
  image_position text not null default 'center center',
  seo_title text not null default '',
  seo_description text not null default '',
  published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id boolean primary key default true check (id),
  business_name text not null default 'TDA Luxury',
  phone_display text not null default '0536 665 10 64',
  whatsapp_number text not null default '905366651064',
  whatsapp_message text not null default 'Merhaba, TDA Luxury hizmetleri hakkında bilgi almak ve randevu oluşturmak istiyorum.',
  instagram_url text not null default 'https://www.instagram.com/tdaluxuryusak',
  address text not null default '',
  maps_url text not null default '',
  opening_hours jsonb not null default '[]'::jsonb,
  maintenance_mode boolean not null default false,
  updated_at timestamptz not null default now()
);

insert into public.site_settings (id, address)
values (true, 'Fatih Mahallesi, Yavuz Sultan Selim Caddesi No: 10/B, 64300 Merkez/Uşak')
on conflict (id) do nothing;

alter table public.campaigns add column if not exists image_position text not null default 'center center';
alter table public.gallery_items add column if not exists image_position text not null default 'center center';

alter table public.services enable row level security;
alter table public.results enable row level security;
alter table public.faqs enable row level security;
alter table public.page_content enable row level security;
alter table public.site_settings enable row level security;

drop policy if exists "Public can view published services" on public.services;
drop policy if exists "Admins can manage services" on public.services;
drop policy if exists "Public can view published results" on public.results;
drop policy if exists "Admins can manage results" on public.results;
drop policy if exists "Public can view published faqs" on public.faqs;
drop policy if exists "Admins can manage faqs" on public.faqs;
drop policy if exists "Public can view published page content" on public.page_content;
drop policy if exists "Admins can manage page content" on public.page_content;
drop policy if exists "Public can view site settings" on public.site_settings;
drop policy if exists "Admins can update site settings" on public.site_settings;
create policy "Public can view published services" on public.services for select using (published or public.is_admin());
create policy "Admins can manage services" on public.services for all using (public.is_admin()) with check (public.is_admin());
create policy "Public can view published results" on public.results for select using (published or public.is_admin());
create policy "Admins can manage results" on public.results for all using (public.is_admin()) with check (public.is_admin());
create policy "Public can view published faqs" on public.faqs for select using (published or public.is_admin());
create policy "Admins can manage faqs" on public.faqs for all using (public.is_admin()) with check (public.is_admin());
create policy "Public can view published page content" on public.page_content for select using (published or public.is_admin());
create policy "Admins can manage page content" on public.page_content for all using (public.is_admin()) with check (public.is_admin());
create policy "Public can view site settings" on public.site_settings for select using (true);
create policy "Admins can update site settings" on public.site_settings for update using (public.is_admin()) with check (public.is_admin());

-- After creating the first Auth user, make that user an admin:
-- insert into public.admin_users (user_id)
-- select id from auth.users where email = 'YOUR_EMAIL';
