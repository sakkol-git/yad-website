CREATE TYPE inquiry_interest AS ENUM ('fund', 'mentor', 'partner');
CREATE TYPE inquiry_status AS ENUM ('Pending', 'Reviewed', 'Contacted', 'Closed');

CREATE TABLE public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    interest inquiry_interest NOT NULL,
    status inquiry_status NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Anonymous users can insert
CREATE POLICY "Anyone can insert inquiries" ON public.inquiries 
FOR INSERT TO anon, authenticated
WITH CHECK (true);

-- Only admins/managers can view and update
CREATE POLICY "Admins read inquiries" ON public.inquiries 
FOR SELECT TO authenticated 
USING (public.get_user_role(auth.uid()) IN ('admin', 'manager'));

CREATE POLICY "Admins update inquiries" ON public.inquiries 
FOR UPDATE TO authenticated 
USING (public.get_user_role(auth.uid()) IN ('admin', 'manager'));
