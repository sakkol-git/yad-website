CREATE TABLE public.newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT newsletter_subscribers_email_key UNIQUE (email)
);

-- RLS
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
-- Service role only
CREATE POLICY "Service role full access on newsletter_subscribers" ON public.newsletter_subscribers FOR ALL TO service_role USING (true);
