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

create policy "Admins can view admin list" on public.admin_users
for select using (auth.uid() = user_id);

create policy "Public can view published campaigns" on public.campaigns
for select using (published or public.is_admin());
create policy "Admins can manage campaigns" on public.campaigns
for all using (public.is_admin()) with check (public.is_admin());

create policy "Public can view published blog posts" on public.blog_posts
for select using (published or public.is_admin());
create policy "Admins can manage blog posts" on public.blog_posts
for all using (public.is_admin()) with check (public.is_admin());

create policy "Public can view published gallery" on public.gallery_items
for select using (published or public.is_admin());
create policy "Admins can manage gallery" on public.gallery_items
for all using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (id, name, public)
values ('tda-media', 'tda-media', true)
on conflict (id) do update set public = true;

create policy "Public can view TDA media" on storage.objects
for select using (bucket_id = 'tda-media');
create policy "Admins can upload TDA media" on storage.objects
for insert with check (bucket_id = 'tda-media' and public.is_admin());
create policy "Admins can update TDA media" on storage.objects
for update using (bucket_id = 'tda-media' and public.is_admin());
create policy "Admins can delete TDA media" on storage.objects
for delete using (bucket_id = 'tda-media' and public.is_admin());

-- After creating the first Auth user, make that user an admin:
-- insert into public.admin_users (user_id)
-- select id from auth.users where email = 'YOUR_EMAIL';
