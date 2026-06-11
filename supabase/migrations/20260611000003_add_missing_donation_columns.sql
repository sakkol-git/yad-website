-- Add missing columns to donations table
ALTER TABLE public.donations
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS is_anonymous BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS message TEXT,
ADD COLUMN IF NOT EXISTS reference_id TEXT,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Add lowercase/new values to donation_method ENUM to match TypeScript types
ALTER TYPE donation_method ADD VALUE IF NOT EXISTS 'card';
ALTER TYPE donation_method ADD VALUE IF NOT EXISTS 'khqr';
ALTER TYPE donation_method ADD VALUE IF NOT EXISTS 'cash';
ALTER TYPE donation_method ADD VALUE IF NOT EXISTS 'bank_transfer';
