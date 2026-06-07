-- ================================================
-- VILSAN — Supabase Schema
-- Run this in the Supabase SQL Editor
-- ================================================

-- Contacts / Leads table
CREATE TABLE IF NOT EXISTS contacts (
  id          BIGSERIAL PRIMARY KEY,
  nome        TEXT NOT NULL,
  telefone    TEXT NOT NULL,
  email       TEXT,
  servico     TEXT NOT NULL,
  mensagem    TEXT,
  estado      TEXT NOT NULL DEFAULT 'novo'
                CHECK (estado IN ('novo', 'lido', 'respondido', 'fechado')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for filtering by estado
CREATE INDEX IF NOT EXISTS idx_contacts_estado ON contacts(estado);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);

-- Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Only service role can read/write (admin dashboard uses service role)
CREATE POLICY "Service role full access" ON contacts
  USING (auth.role() = 'service_role');

-- Allow anonymous inserts (form submissions)
CREATE POLICY "Allow anon insert" ON contacts
  FOR INSERT
  TO anon
  WITH CHECK (true);
