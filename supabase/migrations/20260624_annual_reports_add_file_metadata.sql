-- Migration: Create annual_reports table
-- Run this in your Supabase SQL editor or via the Supabase CLI.

CREATE TABLE IF NOT EXISTS public.annual_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  year INTEGER NOT NULL,
  file_url TEXT NOT NULL,
  file_path TEXT,
  file_size_bytes BIGINT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON COLUMN public.annual_reports.file_path IS 'Supabase Storage key relative to the "reports" bucket, e.g. "reports/annual-report-2025-xyz.pdf"';
COMMENT ON COLUMN public.annual_reports.file_size_bytes IS 'File size in bytes at time of upload, used for display in the UI';

-- Enable Row Level Security
ALTER TABLE public.annual_reports ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public read annual_reports" 
  ON public.annual_reports 
  FOR SELECT 
  USING (true);

-- Allow admins to manage (insert, update, delete)
CREATE POLICY "Admins can manage annual_reports" 
  ON public.annual_reports 
  FOR ALL 
  TO authenticated 
  USING (public.get_user_role(auth.uid()) = 'admin');
