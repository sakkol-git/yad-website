ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'actioned'));
