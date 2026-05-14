-- ─────────────────────────────────────────────
-- MEMOAMOR — Schema do banco de dados (Supabase)
-- Execute no SQL Editor do Supabase
-- ─────────────────────────────────────────────

-- Extensão para UUID
create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────
-- Tabela principal de páginas de memórias
-- ─────────────────────────────────────────────
create table if not exists memory_pages (
  id                  uuid primary key default gen_random_uuid(),
  slug                text not null unique,
  status              text not null default 'pending_payment'
                        check (status in ('pending_payment', 'active', 'expired', 'cancelled')),
  plan                text not null default 'essential'
                        check (plan in ('essential', 'premium')),
  template            text not null default 'petals'
                        check (template in ('petals', 'hearts', 'constellations')),

  -- Casal
  name_a              text not null,
  name_b              text not null,
  start_date          date not null,
  page_title          text,

  -- Conteúdo
  closing_quote       text,
  youtube_url         text,
  memories            jsonb not null default '[]',
  gallery             jsonb not null default '[]',

  -- Pagamento
  customer_email      text not null,
  paid_at             timestamptz,
  abacate_session_id  text,

  -- Controle de slug e expiração
  reserved_until      timestamptz,
  expires_at          timestamptz,

  -- Timestamps
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- ─────────────────────────────────────────────
-- Índices para queries frequentes
-- ─────────────────────────────────────────────
create index if not exists idx_memory_pages_slug   on memory_pages (slug);
create index if not exists idx_memory_pages_status on memory_pages (status);
create index if not exists idx_memory_pages_email  on memory_pages (customer_email);

-- ─────────────────────────────────────────────
-- updated_at automático via trigger
-- ─────────────────────────────────────────────
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_memory_pages_updated_at
  before update on memory_pages
  for each row execute function set_updated_at();

-- ─────────────────────────────────────────────
-- RLS (Row Level Security)
-- Leitura pública apenas de páginas ativas
-- Escrita apenas via service role (API server-side)
-- ─────────────────────────────────────────────
alter table memory_pages enable row level security;

-- Qualquer pessoa pode LER páginas ativas (destinatário abrindo o link)
create policy "Leitura pública de páginas ativas"
  on memory_pages for select
  using (status = 'active');

-- Apenas o service role pode inserir/atualizar/deletar
-- (as API routes usam o admin client com service role key)
-- Nenhuma policy de write para anon/authenticated → bloqueado por padrão

-- ─────────────────────────────────────────────
-- Storage bucket para fotos
-- Configure no dashboard do Supabase:
-- Storage → New Bucket → "pages" → Public: false
-- ─────────────────────────────────────────────

-- Policy de storage: leitura pública das fotos
-- (execute no dashboard: Storage → Policies)
--
-- Bucket: pages
-- Policy name: "Leitura pública das fotos"
-- Allowed operation: SELECT
-- Target roles: anon, authenticated
-- USING: true
--
-- Policy name: "Upload via service role apenas"
-- Allowed operation: INSERT
-- Target roles: service_role
-- USING: true

-- ─────────────────────────────────────────────
-- Limpeza automática de slugs não pagos (opcional)
-- Pode ser executado como cron job no Supabase
-- ─────────────────────────────────────────────
-- delete from memory_pages
-- where status = 'pending_payment'
--   and reserved_until < now() - interval '1 hour';
