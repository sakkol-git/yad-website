-- Create donors table
CREATE TABLE IF NOT EXISTS public.donors (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    amount NUMERIC,
    donation_date DATE,
    message TEXT,
    is_public BOOLEAN DEFAULT true,
    status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.donors ENABLE ROW LEVEL SECURITY;

-- Policies
-- Admins and managers can do everything (handled by service role key usually, but good practice to add if users query directly)
CREATE POLICY "Allow public read access to public donors" ON public.donors
    FOR SELECT
    USING (is_public = true AND status = 'Active');

