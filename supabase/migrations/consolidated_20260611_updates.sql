-- ==========================================
-- CONSOLIDATED MIGRATION FIXES (2026-06-11)
-- ==========================================

-- 1. Update donation_status ENUM
ALTER TYPE donation_status ADD VALUE IF NOT EXISTS 'Draft';
ALTER TYPE donation_status ADD VALUE IF NOT EXISTS 'Pending Payment';
ALTER TYPE donation_status ADD VALUE IF NOT EXISTS 'Processing';

-- 2. Add donation_type ENUM and column
CREATE TYPE donation_type_enum AS ENUM ('One-Time', 'Monthly');
ALTER TABLE public.donations ADD COLUMN IF NOT EXISTS donation_type donation_type_enum NOT NULL DEFAULT 'One-Time';

-- 3. Add missing columns to donations table
ALTER TABLE public.donations ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.donations ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.donations ADD COLUMN IF NOT EXISTS is_anonymous BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE public.donations ADD COLUMN IF NOT EXISTS message TEXT;
ALTER TABLE public.donations ADD COLUMN IF NOT EXISTS reference_id TEXT;
ALTER TABLE public.donations ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- 4. Update donation_method ENUM to match TypeScript lowercase
ALTER TYPE donation_method ADD VALUE IF NOT EXISTS 'card';
ALTER TYPE donation_method ADD VALUE IF NOT EXISTS 'khqr';
ALTER TYPE donation_method ADD VALUE IF NOT EXISTS 'cash';
ALTER TYPE donation_method ADD VALUE IF NOT EXISTS 'bank_transfer';

-- 5. Update booking_status ENUM
ALTER TYPE booking_status ADD VALUE IF NOT EXISTS 'Inquiry' BEFORE 'Reserved';
ALTER TYPE booking_status ADD VALUE IF NOT EXISTS 'Availability Review' BEFORE 'Reserved';
ALTER TYPE booking_status ADD VALUE IF NOT EXISTS 'Pending Confirmation' BEFORE 'Reserved';
ALTER TYPE booking_status ADD VALUE IF NOT EXISTS 'Payment Pending' BEFORE 'Reserved';
ALTER TYPE booking_status ADD VALUE IF NOT EXISTS 'Confirmed' AFTER 'Reserved';
ALTER TYPE booking_status ADD VALUE IF NOT EXISTS 'No Show' AFTER 'Cancelled';
