-- 20260610000002_public_schema_alignment.sql

-- 1. Align `members` table with public `TeamMember` interface
ALTER TABLE public.members
ADD COLUMN slug TEXT UNIQUE,
ADD COLUMN role TEXT,
ADD COLUMN profile JSONB;

-- Update RLS for members so public can read
-- Wait, 'Public read members' already exists in initial_schema:
-- CREATE POLICY "Public read members" ON public.members FOR SELECT USING (true);

-- 2. Align `events` table with public `EventItem` interface
ALTER TABLE public.events
ADD COLUMN slug TEXT UNIQUE,
ADD COLUMN date DATE,
ADD COLUMN image_url TEXT,
ADD COLUMN image_alt TEXT,
ADD COLUMN action_label TEXT,
ADD COLUMN action_icon TEXT,
ADD COLUMN join_url TEXT,
ADD COLUMN donation_url TEXT;

-- 3. Align `partners` table with public `PartnerItem` interface
ALTER TABLE public.partners
ADD COLUMN icon TEXT,
ADD COLUMN category TEXT,
ADD COLUMN website_url TEXT,
ADD COLUMN featured BOOLEAN DEFAULT false;

-- RLS Update: The initial schema had "Authenticated read partners". 
-- We must make partners readable to anon users for the public website.
DROP POLICY IF EXISTS "Authenticated read partners" ON public.partners;
CREATE POLICY "Public read partners" ON public.partners FOR SELECT USING (true);
