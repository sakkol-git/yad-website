-- Migration: Create reports storage bucket
-- Run this in your Supabase SQL editor to create the 'reports' bucket for file uploads

INSERT INTO storage.buckets (id, name, public)
VALUES ('reports', 'reports', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to files in the reports bucket
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'reports' );

-- (Optional: if you want authenticated users to upload directly, you'd add an INSERT policy here. 
-- However, our server action uses the Admin/Service-Role key for uploads, which bypasses RLS,
-- so we only strictly need the public read policy for users to download the PDFs).
