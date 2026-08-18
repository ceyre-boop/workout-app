-- Train with Alissa — initial schema (brief §4, refined per ISA THINK-phase
-- SystemsThinking finding: set_logs and body_stats carry a client-generated
-- uuid as their true primary key so offline-first sync is an idempotent
-- upsert later, never a migration).
--
-- NOT applied to a live project this session (no Supabase credentials
-- available) — this file is ready to run via `supabase db push` or the SQL
-- editor once a real project exists.

create extension if not exists "pgcrypto";

create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default '',
  avatar_url text,
  units text not null default 'imperial' check (units in ('metric', 'imperial')),
  theme_pref text not null default 'system' check (theme_pref in ('light', 'dark', 'system')),
  tz text not null default 'UTC',
  created_at timestamptz not null default now()
);

create table programs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null check (category in ('strength', 'running', 'hybrid', 'race-prep')),
  duration_weeks int not null check (duration_weeks > 0),
  cover_asset_id text,
  description text not null default '',
  is_published boolean not null default false,
  sort_order int not null default 0
);

create table program_weeks (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references programs (id) on delete cascade,
  week_number int not null,
  title text not null,
  notes text,
  unique (program_id, week_number)
);

create table workouts (
  id uuid primary key default gen_random_uuid(),
  program_week_id uuid not null references program_weeks (id) on delete cascade,
  day_number int not null,
  title text not null,
  est_minutes int not null default 30,
  cover_asset_id text,
  description text not null default ''
);

create table exercises (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  primary_muscle text,
  equipment text,
  video_asset_id text,
  cues text[] not null default '{}',
  common_mistakes text[] not null default '{}'
);

create table workout_exercises (
  id uuid primary key default gen_random_uuid(),
  workout_id uuid not null references workouts (id) on delete cascade,
  exercise_id uuid not null references exercises (id),
  order_index int not null,
  sets int not null,
  reps_prescribed text not null,
  rest_seconds int not null default 60,
  tempo text,
  notes text,
  superset_group text
);

create table enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles (id) on delete cascade,
  program_id uuid not null references programs (id),
  started_at timestamptz not null default now(),
  current_week int not null default 1,
  status text not null default 'active' check (status in ('active', 'completed', 'paused')),
  unique (user_id, program_id)
);

create table sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles (id) on delete cascade,
  workout_id uuid not null references workouts (id),
  client_session_uuid uuid not null unique,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  duration_seconds int,
  status text not null default 'in_progress' check (status in ('in_progress', 'completed', 'abandoned'))
);

-- Primary key IS the client-generated uuid (crypto.randomUUID() at write
-- time on-device). Sync is `insert ... on conflict (id) do update`, which
-- makes retried/duplicate offline syncs idempotent by construction.
create table set_logs (
  id uuid primary key,
  session_id uuid not null references sessions (id) on delete cascade,
  workout_exercise_id uuid not null references workout_exercises (id),
  set_index int not null,
  weight numeric,
  reps int,
  rpe numeric,
  completed_at timestamptz not null default now(),
  skipped boolean not null default false
);

create table body_stats (
  id uuid primary key, -- client-generated, same idempotent-upsert rationale as set_logs
  user_id uuid not null references profiles (id) on delete cascade,
  recorded_at timestamptz not null default now(),
  weight numeric,
  bodyfat_pct numeric,
  measurements jsonb
);

create table subscriptions (
  user_id uuid primary key references profiles (id) on delete cascade,
  stripe_customer_id text,
  status text not null default 'none' check (status in ('active', 'trialing', 'canceled', 'none')),
  current_period_end timestamptz
);

-- === Row Level Security ===================================================

alter table profiles enable row level security;
alter table enrollments enable row level security;
alter table sessions enable row level security;
alter table set_logs enable row level security;
alter table body_stats enable row level security;
alter table subscriptions enable row level security;
alter table programs enable row level security;
alter table program_weeks enable row level security;
alter table workouts enable row level security;
alter table exercises enable row level security;
alter table workout_exercises enable row level security;

-- User-owned tables: a user reads/writes only their own rows.
create policy "profiles_self" on profiles for all
  using (auth.uid() = id) with check (auth.uid() = id);

create policy "enrollments_self" on enrollments for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "sessions_self" on sessions for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "set_logs_self" on set_logs for all
  using (
    auth.uid() = (select user_id from sessions where sessions.id = set_logs.session_id)
  )
  with check (
    auth.uid() = (select user_id from sessions where sessions.id = set_logs.session_id)
  );

create policy "body_stats_self" on body_stats for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "subscriptions_self" on subscriptions for select
  using (auth.uid() = user_id);

-- Content tables: read-only to authenticated users, writable only by admins.
-- (Admin role/claim wiring is part of the deferred Admin CMS phase — see
-- ISA Decisions — these policies are the read half, ready today.)
create policy "programs_read" on programs for select using (is_published = true or auth.role() = 'service_role');
create policy "program_weeks_read" on program_weeks for select using (auth.role() in ('authenticated', 'service_role'));
create policy "workouts_read" on workouts for select using (auth.role() in ('authenticated', 'service_role'));
create policy "exercises_read" on exercises for select using (auth.role() in ('authenticated', 'service_role'));
create policy "workout_exercises_read" on workout_exercises for select using (auth.role() in ('authenticated', 'service_role'));
