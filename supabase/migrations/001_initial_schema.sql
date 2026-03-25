-- ============================================================================
-- ResumeForge: Initial Schema Migration
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ============================================================================

-- ============================================================================
-- 1. PROFILES TABLE
-- Extends auth.users with seller/buyer profile info
-- ============================================================================

create table public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text,
  display_name text,
  bio         text check (char_length(bio) <= 500),
  specialty   text,
  avatar_url  text,
  portfolio_url text,
  website_url text,
  linkedin_url text,
  dribbble_url text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table public.profiles is 'User profiles — auto-created on signup via trigger';

-- ============================================================================
-- 2. TEMPLATES TABLE
-- Stores template metadata; files live in the template-files storage bucket
-- ============================================================================

create table public.templates (
  id            uuid primary key default gen_random_uuid(),
  seller_id     uuid not null references public.profiles (id) on delete cascade,
  title         text not null,
  description   text check (char_length(description) <= 1000),
  price         integer not null default 0 check (price >= 0),
  category      text,
  file_url      text,
  rating        numeric(2,1) not null default 0,
  review_count  integer not null default 0,
  status        text not null default 'draft' check (status in ('draft', 'published', 'rejected')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

comment on table public.templates is 'Resume templates listed by sellers. Price is in cents (0 = free).';
comment on column public.templates.status is 'draft = not yet visible, published = live on marketplace, rejected = moderation removed';

-- ============================================================================
-- 3. ORDERS TABLE
-- Stores completed purchases; written by the Stripe webhook
-- ============================================================================

create table public.orders (
  id                        uuid primary key default gen_random_uuid(),
  buyer_id                  uuid references public.profiles (id) on delete set null,
  template_id               uuid references public.templates (id) on delete set null,
  stripe_session_id         text unique,
  stripe_payment_intent_id  text,
  amount                    integer not null,
  currency                  text not null default 'usd',
  customer_email            text,
  status                    text not null default 'completed' check (status in ('completed', 'refunded')),
  created_at                timestamptz not null default now()
);

comment on table public.orders is 'Purchase records created by Stripe webhook. buyer_id is null for guest checkout.';

-- ============================================================================
-- 4. INDEXES
-- ============================================================================

create index idx_templates_seller    on public.templates (seller_id);
create index idx_templates_status    on public.templates (status);
create index idx_templates_category  on public.templates (category);
create index idx_orders_buyer        on public.orders (buyer_id);
create index idx_orders_template     on public.orders (template_id);

-- ============================================================================
-- 5. UPDATED_AT TRIGGER FUNCTION
-- Shared function for auto-updating updated_at columns
-- ============================================================================

create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

create trigger set_templates_updated_at
  before update on public.templates
  for each row execute function public.handle_updated_at();

-- ============================================================================
-- 6. AUTO-CREATE PROFILE ON SIGNUP
-- Fires after a new row is inserted into auth.users
-- ============================================================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================================
-- 7. ROW LEVEL SECURITY
-- ============================================================================

-- Enable RLS on all tables
alter table public.profiles  enable row level security;
alter table public.templates enable row level security;
alter table public.orders    enable row level security;

-- ---- PROFILES ----

-- Anyone can read profiles (public marketplace)
create policy "Profiles are publicly readable"
  on public.profiles for select
  using (true);

-- Users can update their own profile
create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Users can insert their own profile (backup for trigger edge cases)
create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- ---- TEMPLATES ----

-- Anyone can read published templates
create policy "Published templates are publicly readable"
  on public.templates for select
  using (status = 'published');

-- Sellers can read all their own templates (any status)
create policy "Sellers can read their own templates"
  on public.templates for select
  using (auth.uid() = seller_id);

-- Sellers can insert templates
create policy "Sellers can create templates"
  on public.templates for insert
  with check (auth.uid() = seller_id);

-- Sellers can update their own templates
create policy "Sellers can update their own templates"
  on public.templates for update
  using (auth.uid() = seller_id)
  with check (auth.uid() = seller_id);

-- Sellers can delete their own templates
create policy "Sellers can delete their own templates"
  on public.templates for delete
  using (auth.uid() = seller_id);

-- ---- ORDERS ----

-- Users can read their own orders (as buyer)
create policy "Buyers can read their own orders"
  on public.orders for select
  using (auth.uid() = buyer_id);

-- Sellers can read orders for their templates
create policy "Sellers can read orders for their templates"
  on public.orders for select
  using (
    auth.uid() in (
      select seller_id from public.templates where id = template_id
    )
  );

-- Service role inserts orders via webhook (no user-facing insert policy needed)
-- The webhook uses SUPABASE_SERVICE_KEY which bypasses RLS

-- ============================================================================
-- 8. STORAGE BUCKETS
-- ============================================================================

-- Avatars bucket — public read so profile images load without auth
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true);

-- Template files bucket — private, accessed via signed URLs after purchase
insert into storage.buckets (id, name, public)
values ('template-files', 'template-files', false);

-- ---- STORAGE POLICIES ----

-- Avatars: anyone can view
create policy "Avatar images are publicly readable"
  on storage.objects for select
  using (bucket_id = 'avatars');

-- Avatars: authenticated users can upload their own (path: {user_id}/*)
create policy "Users can upload their own avatar"
  on storage.objects for insert
  with check (
    bucket_id = 'avatars'
    and auth.role() = 'authenticated'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Avatars: users can update/delete their own
create policy "Users can update their own avatar"
  on storage.objects for update
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users can delete their own avatar"
  on storage.objects for delete
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Template files: sellers can upload to their own folder
create policy "Sellers can upload template files"
  on storage.objects for insert
  with check (
    bucket_id = 'template-files'
    and auth.role() = 'authenticated'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Template files: sellers can update/delete their own
create policy "Sellers can update their own template files"
  on storage.objects for update
  using (
    bucket_id = 'template-files'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Sellers can delete their own template files"
  on storage.objects for delete
  using (
    bucket_id = 'template-files'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Template files: no public read — use signed URLs from the server after purchase verification
