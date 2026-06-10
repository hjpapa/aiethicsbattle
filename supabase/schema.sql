create extension if not exists pgcrypto;

create table if not exists public.debate_sessions (
  id uuid primary key default gen_random_uuid(),
  user_type text not null check (user_type in ('HSH', 'HTH', 'SSH', 'SST', 'STT', 'HTT', 'HST', 'STH')),
  bot_type text not null check (bot_type in ('HSH', 'HTH', 'SSH', 'SST', 'STT', 'HTT', 'HST', 'STH')),
  student_level text not null check (student_level in ('elementary', 'middle', 'high')),
  topic_id text not null,
  created_at timestamp with time zone not null default now()
);

create table if not exists public.debate_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.debate_sessions(id) on delete cascade,
  role text not null check (role in ('black', 'white', 'system')),
  content text not null,
  stage text not null check (stage in ('opening', 'black_first_move', 'white_response', 'black_counter', 'white_counter', 'judgement', 'review')),
  created_at timestamp with time zone not null default now()
);

create table if not exists public.debate_reviews (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.debate_sessions(id) on delete cascade,
  review jsonb not null,
  created_at timestamp with time zone not null default now()
);

create index if not exists debate_messages_session_created_idx
  on public.debate_messages (session_id, created_at);

create index if not exists debate_reviews_session_created_idx
  on public.debate_reviews (session_id, created_at desc);

alter table public.debate_sessions enable row level security;
alter table public.debate_messages enable row level security;
alter table public.debate_reviews enable row level security;

grant usage on schema public to anon, authenticated;
grant insert on table public.debate_sessions to anon, authenticated;
grant insert on table public.debate_messages to anon, authenticated;
grant insert on table public.debate_reviews to anon, authenticated;

drop policy if exists "allow anonymous debate session inserts"
  on public.debate_sessions;
create policy "allow anonymous debate session inserts"
  on public.debate_sessions
  for insert
  to anon, authenticated
  with check (
    user_type in ('HSH', 'HTH', 'SSH', 'SST', 'STT', 'HTT', 'HST', 'STH')
    and bot_type in ('HSH', 'HTH', 'SSH', 'SST', 'STT', 'HTT', 'HST', 'STH')
    and student_level in ('elementary', 'middle', 'high')
    and char_length(topic_id) between 1 and 100
  );

drop policy if exists "allow anonymous debate message inserts"
  on public.debate_messages;
create policy "allow anonymous debate message inserts"
  on public.debate_messages
  for insert
  to anon, authenticated
  with check (
    session_id is not null
    and role in ('black', 'white', 'system')
    and stage in (
      'opening',
      'black_first_move',
      'white_response',
      'black_counter',
      'white_counter',
      'judgement',
      'review'
    )
    and char_length(content) between 1 and 10000
    and created_at <= now() + interval '5 minutes'
  );

drop policy if exists "allow anonymous debate review inserts"
  on public.debate_reviews;
create policy "allow anonymous debate review inserts"
  on public.debate_reviews
  for insert
  to anon, authenticated
  with check (
    session_id is not null
    and jsonb_typeof(review) = 'object'
    and pg_column_size(review) <= 65536
  );

comment on table public.debate_sessions is
  'Anonymous AI ethics debate sessions. Do not store student names, school names, addresses, or contact details.';
comment on table public.debate_messages is
  'Black/white/system debate moves for an anonymous session.';
comment on table public.debate_reviews is
  'JSON review summaries generated after a debate session.';
