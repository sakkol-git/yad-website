-- Event Volunteers Mapping
CREATE TYPE volunteer_status AS ENUM ('Pending', 'Approved', 'Rejected', 'Completed');

CREATE TABLE public.event_volunteers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
    status volunteer_status NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, event_id)
);

ALTER TABLE public.event_volunteers ENABLE ROW LEVEL SECURITY;

-- Users can read their own volunteer records
CREATE POLICY "Users read own volunteer records" ON public.event_volunteers 
FOR SELECT TO authenticated 
USING (auth.uid() = user_id OR public.get_user_role(auth.uid()) IN ('admin', 'manager'));

-- Users can insert their own volunteer records (sign up)
CREATE POLICY "Users insert own volunteer records" ON public.event_volunteers 
FOR INSERT TO authenticated 
WITH CHECK (auth.uid() = user_id);

-- Admins can update/manage volunteer records
CREATE POLICY "Admins manage volunteer records" ON public.event_volunteers 
FOR UPDATE TO authenticated 
USING (public.get_user_role(auth.uid()) IN ('admin', 'manager'));

-- Trigger to automatically assign 'user' role on sign up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
