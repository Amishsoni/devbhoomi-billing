-- Run in Supabase SQL Editor (order matters)

-- 1. Branches (register needs valid branch_id)
create table if not exists public.branches (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz default now()
);

-- 2. Profiles (extends auth.users — email/password live in Auth only)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  mobile text not null,
  branch_id uuid not null references public.branches (id),
  image_url text,
  created_at timestamptz default now()
);

-- 3. RLS
alter table public.branches enable row level security;
alter table public.profiles enable row level security;

create policy "Authenticated users can read branches"
  on public.branches for select
  to authenticated
  using (true);

create policy "Users can read own profile"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id);

-- Inserts from API use service role; optional policy if you insert from client after login:
create policy "Users can insert own profile"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);

-- Seed example branches (run after creating table):
-- insert into public.branches (name) values ('Main Store'), ('Warehouse');

-- 4. Storage bucket "avatars" — create in Dashboard, then:
-- Storage policies: authenticated users upload to own folder, or use service role from API only.
