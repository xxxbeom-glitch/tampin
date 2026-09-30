-- Tampin cloud baseline. The mobile app creates IDs locally and synchronizes later.
-- Keep this schema migration-owned; do not add application tables from the dashboard.

create type public.workout_session_status as enum ('active', 'completed', 'discarded');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  gender text check (gender in ('male', 'female', 'other', 'prefer_not_to_say')),
  birth_date date,
  terms_version text,
  terms_accepted_at timestamptz,
  onboarding_completed_at timestamptz,
  avatar_object_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  version integer not null default 0 check (version >= 0)
);

create table public.user_settings (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  locale text not null default 'ko-KR',
  weight_unit text not null default 'kg' check (weight_unit in ('kg', 'lb')),
  rest_timer_notifications_enabled boolean not null default true,
  rest_timer_sound text not null default 'default' check (rest_timer_sound in ('default', 'chime', 'bell')),
  updated_at timestamptz not null default now(),
  version integer not null default 0 check (version >= 0)
);

create table public.exercises (
  id uuid primary key,
  name text not null,
  recording_type text not null default 'weight_reps',
  equipment text,
  primary_muscles text[] not null default '{}',
  secondary_muscles text[] not null default '{}',
  thumbnail_path text,
  animation_path text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index exercises_name_recording_type_key on public.exercises (name, recording_type);

create table public.custom_exercises (
  id uuid primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  name text not null,
  recording_type text not null default 'weight_reps',
  equipment text,
  primary_muscles text[] not null default '{}',
  secondary_muscles text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  version integer not null default 0 check (version >= 0),
  unique (user_id, name)
);

create table public.routine_folders (
  id uuid primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  name text not null check (char_length(trim(name)) between 1 and 80),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  version integer not null default 0 check (version >= 0),
  unique (user_id, name)
);

create table public.routines (
  id uuid primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  folder_id uuid not null references public.routine_folders (id) on delete cascade,
  name text not null check (char_length(trim(name)) between 1 and 100),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  version integer not null default 0 check (version >= 0),
  unique (folder_id, name)
);

create table public.routine_exercises (
  id uuid primary key,
  routine_id uuid not null references public.routines (id) on delete cascade,
  exercise_id uuid references public.exercises (id),
  custom_exercise_id uuid references public.custom_exercises (id),
  sort_order integer not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  version integer not null default 0 check (version >= 0),
  check (num_nonnulls(exercise_id, custom_exercise_id) = 1),
  unique (routine_id, sort_order)
);

create table public.routine_sets (
  id uuid primary key,
  routine_exercise_id uuid not null references public.routine_exercises (id) on delete cascade,
  set_order integer not null,
  target_weight_value numeric(8, 2),
  target_weight_unit text check (target_weight_unit in ('kg', 'lb')),
  target_weight_kg numeric(8, 3),
  target_reps integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  version integer not null default 0 check (version >= 0),
  unique (routine_exercise_id, set_order)
);

create table public.workout_sessions (
  id uuid primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  routine_id uuid references public.routines (id) on delete set null,
  status public.workout_session_status not null default 'active',
  started_at timestamptz not null,
  ended_at timestamptz,
  timezone text not null,
  total_volume_kg numeric(12, 3),
  completed_set_count integer not null default 0 check (completed_set_count >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  version integer not null default 0 check (version >= 0),
  check ((status = 'active' and ended_at is null) or (status in ('completed', 'discarded')))
);

create unique index one_active_workout_session_per_user
  on public.workout_sessions (user_id)
  where status = 'active';

create index workout_sessions_user_completed_at_idx
  on public.workout_sessions (user_id, ended_at desc)
  where status = 'completed';

create table public.workout_session_exercises (
  id uuid primary key,
  workout_session_id uuid not null references public.workout_sessions (id) on delete cascade,
  exercise_id uuid references public.exercises (id),
  custom_exercise_id uuid references public.custom_exercises (id),
  exercise_name_snapshot text not null,
  thumbnail_path_snapshot text,
  recording_type_snapshot text not null,
  sort_order integer not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  version integer not null default 0 check (version >= 0),
  check (num_nonnulls(exercise_id, custom_exercise_id) = 1),
  unique (workout_session_id, sort_order)
);

create table public.workout_sets (
  id uuid primary key,
  workout_session_exercise_id uuid not null references public.workout_session_exercises (id) on delete cascade,
  set_order integer not null,
  weight_value numeric(8, 2),
  weight_unit text check (weight_unit in ('kg', 'lb')),
  weight_kg numeric(8, 3),
  reps integer,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  version integer not null default 0 check (version >= 0),
  unique (workout_session_exercise_id, set_order)
);

create table public.media_assets (
  id uuid primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  bucket_id text not null check (bucket_id in ('profile-images', 'support-attachments')),
  object_path text not null,
  mime_type text,
  byte_size bigint check (byte_size >= 0),
  created_at timestamptz not null default now(),
  unique (bucket_id, object_path)
);

create table public.support_inquiries (
  id uuid primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  category text not null,
  body text not null check (char_length(trim(body)) between 1 and 5000),
  status text not null default 'submitted' check (status in ('submitted', 'received', 'resolved')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  version integer not null default 0 check (version >= 0)
);

create table public.support_inquiry_attachments (
  support_inquiry_id uuid not null references public.support_inquiries (id) on delete cascade,
  media_asset_id uuid not null references public.media_assets (id) on delete cascade,
  primary key (support_inquiry_id, media_asset_id)
);

create function public.touch_updated_at_and_increment_version()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  new.version = old.version + 1;
  return new;
end;
$$;

create trigger profiles_touch_updated_at before update on public.profiles
for each row execute function public.touch_updated_at_and_increment_version();
create trigger user_settings_touch_updated_at before update on public.user_settings
for each row execute function public.touch_updated_at_and_increment_version();
create trigger custom_exercises_touch_updated_at before update on public.custom_exercises
for each row execute function public.touch_updated_at_and_increment_version();
create trigger routine_folders_touch_updated_at before update on public.routine_folders
for each row execute function public.touch_updated_at_and_increment_version();
create trigger routines_touch_updated_at before update on public.routines
for each row execute function public.touch_updated_at_and_increment_version();
create trigger routine_exercises_touch_updated_at before update on public.routine_exercises
for each row execute function public.touch_updated_at_and_increment_version();
create trigger routine_sets_touch_updated_at before update on public.routine_sets
for each row execute function public.touch_updated_at_and_increment_version();
create trigger workout_sessions_touch_updated_at before update on public.workout_sessions
for each row execute function public.touch_updated_at_and_increment_version();
create trigger workout_session_exercises_touch_updated_at before update on public.workout_session_exercises
for each row execute function public.touch_updated_at_and_increment_version();
create trigger workout_sets_touch_updated_at before update on public.workout_sets
for each row execute function public.touch_updated_at_and_increment_version();
create trigger support_inquiries_touch_updated_at before update on public.support_inquiries
for each row execute function public.touch_updated_at_and_increment_version();

alter table public.profiles enable row level security;
alter table public.user_settings enable row level security;
alter table public.exercises enable row level security;
alter table public.custom_exercises enable row level security;
alter table public.routine_folders enable row level security;
alter table public.routines enable row level security;
alter table public.routine_exercises enable row level security;
alter table public.routine_sets enable row level security;
alter table public.workout_sessions enable row level security;
alter table public.workout_session_exercises enable row level security;
alter table public.workout_sets enable row level security;
alter table public.media_assets enable row level security;
alter table public.support_inquiries enable row level security;
alter table public.support_inquiry_attachments enable row level security;

grant usage on schema public to authenticated;
grant select, insert, update, delete on all tables in schema public to authenticated;

create policy "read own profile" on public.profiles for select to authenticated using ((select auth.uid()) = id);
create policy "create own profile" on public.profiles for insert to authenticated with check ((select auth.uid()) = id);
create policy "update own profile" on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

create policy "read own settings" on public.user_settings for select to authenticated using ((select auth.uid()) = user_id);
create policy "create own settings" on public.user_settings for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "update own settings" on public.user_settings for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create policy "read active exercises" on public.exercises for select to authenticated using (is_active);

create policy "manage own custom exercises" on public.custom_exercises for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "manage own routine folders" on public.routine_folders for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "manage own routines" on public.routines for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "manage own routine exercises" on public.routine_exercises for all to authenticated
  using (exists (select 1 from public.routines r where r.id = routine_id and r.user_id = (select auth.uid())))
  with check (exists (select 1 from public.routines r where r.id = routine_id and r.user_id = (select auth.uid())));
create policy "manage own routine sets" on public.routine_sets for all to authenticated
  using (exists (select 1 from public.routine_exercises re join public.routines r on r.id = re.routine_id where re.id = routine_exercise_id and r.user_id = (select auth.uid())))
  with check (exists (select 1 from public.routine_exercises re join public.routines r on r.id = re.routine_id where re.id = routine_exercise_id and r.user_id = (select auth.uid())));
create policy "manage own workout sessions" on public.workout_sessions for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "manage own session exercises" on public.workout_session_exercises for all to authenticated
  using (exists (select 1 from public.workout_sessions ws where ws.id = workout_session_id and ws.user_id = (select auth.uid())))
  with check (exists (select 1 from public.workout_sessions ws where ws.id = workout_session_id and ws.user_id = (select auth.uid())));
create policy "manage own workout sets" on public.workout_sets for all to authenticated
  using (exists (select 1 from public.workout_session_exercises wse join public.workout_sessions ws on ws.id = wse.workout_session_id where wse.id = workout_session_exercise_id and ws.user_id = (select auth.uid())))
  with check (exists (select 1 from public.workout_session_exercises wse join public.workout_sessions ws on ws.id = wse.workout_session_id where wse.id = workout_session_exercise_id and ws.user_id = (select auth.uid())));
create policy "manage own media metadata" on public.media_assets for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "manage own support inquiries" on public.support_inquiries for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "manage own support attachments" on public.support_inquiry_attachments for all to authenticated
  using (exists (select 1 from public.support_inquiries si where si.id = support_inquiry_id and si.user_id = (select auth.uid())))
  with check (exists (select 1 from public.support_inquiries si where si.id = support_inquiry_id and si.user_id = (select auth.uid())));

create policy "profile owners manage own objects" on storage.objects for all to authenticated
  using (bucket_id = 'profile-images' and (storage.foldername(name))[1] = (select auth.uid()::text))
  with check (bucket_id = 'profile-images' and (storage.foldername(name))[1] = (select auth.uid()::text));
create policy "support owners manage own objects" on storage.objects for all to authenticated
  using (bucket_id = 'support-attachments' and (storage.foldername(name))[1] = (select auth.uid()::text))
  with check (bucket_id = 'support-attachments' and (storage.foldername(name))[1] = (select auth.uid()::text));
