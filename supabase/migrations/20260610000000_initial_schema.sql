-- Ultimate Admin Portal Schema & RLS Policies

-- 1. Custom Types
CREATE TYPE user_role AS ENUM ('admin', 'manager', 'user');
CREATE TYPE member_type AS ENUM ('Founder', 'Resident', 'Alumni');
CREATE TYPE general_status AS ENUM ('Active', 'Inactive', 'Pending', 'Archived');
CREATE TYPE program_status AS ENUM ('Active', 'Upcoming', 'Completed', 'Archived');
CREATE TYPE event_status AS ENUM ('Upcoming', 'Ongoing', 'Completed', 'Cancelled');
CREATE TYPE donation_method AS ENUM ('Stripe', 'KHQR', 'Cash', 'Other');
CREATE TYPE donation_status AS ENUM ('Pending', 'Completed', 'Failed', 'Refunded');
CREATE TYPE room_status AS ENUM ('Available', 'Occupied', 'Maintenance');
CREATE TYPE booking_status AS ENUM ('Reserved', 'Checked In', 'Checked Out', 'Cancelled');
CREATE TYPE payment_status AS ENUM ('Pending', 'Partial', 'Paid', 'Refunded');

-- 2. Tables

-- USER ROLES (Maps Supabase Auth user to role)
CREATE TABLE public.user_roles (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    role user_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- MEMBERS
CREATE TABLE public.members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    type member_type NOT NULL DEFAULT 'Resident',
    status general_status NOT NULL DEFAULT 'Pending',
    bio TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PROGRAMS
CREATE TABLE public.programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,
    start_date DATE,
    end_date DATE,
    capacity INTEGER,
    status program_status NOT NULL DEFAULT 'Upcoming',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- EVENTS
CREATE TABLE public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    venue TEXT,
    capacity INTEGER,
    status event_status NOT NULL DEFAULT 'Upcoming',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- DONATIONS
CREATE TABLE public.donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    donor_name TEXT,
    amount DECIMAL(12,2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'USD',
    method donation_method NOT NULL DEFAULT 'Other',
    status donation_status NOT NULL DEFAULT 'Pending',
    receipt_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ROOMS (Homestay)
CREATE TABLE public.rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    capacity INTEGER NOT NULL DEFAULT 1,
    status room_status NOT NULL DEFAULT 'Available',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- BOOKINGS
CREATE TABLE public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guest_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    guest_name TEXT,
    room_id UUID REFERENCES public.rooms(id) ON DELETE CASCADE,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    amount DECIMAL(12,2) NOT NULL DEFAULT 0.0,
    payment_status payment_status NOT NULL DEFAULT 'Pending',
    status booking_status NOT NULL DEFAULT 'Reserved',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PARTNERS
CREATE TABLE public.partners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    contact_person TEXT,
    email TEXT,
    phone TEXT,
    partnership_type TEXT,
    notes TEXT,
    logo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- AUDIT LOGS
CREATE TABLE public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    entity TEXT NOT NULL,
    action TEXT NOT NULL,
    changes JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Row Level Security (RLS)
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper Function for Roles
CREATE OR REPLACE FUNCTION public.get_user_role(u_id UUID)
RETURNS user_role AS $$
  SELECT role FROM public.user_roles WHERE user_id = u_id;
$$ LANGUAGE sql SECURITY DEFINER;

-- RLS: user_roles
CREATE POLICY "Users can read own role" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins have full access to user_roles" ON public.user_roles TO authenticated USING (public.get_user_role(auth.uid()) = 'admin');

-- RLS: members
CREATE POLICY "Public read members" ON public.members FOR SELECT USING (true);
CREATE POLICY "Admins and Managers can insert members" ON public.members FOR INSERT TO authenticated WITH CHECK (public.get_user_role(auth.uid()) IN ('admin', 'manager'));
CREATE POLICY "Admins and Managers can update members" ON public.members FOR UPDATE TO authenticated USING (public.get_user_role(auth.uid()) IN ('admin', 'manager'));
CREATE POLICY "Admins and Managers can delete members" ON public.members FOR DELETE TO authenticated USING (public.get_user_role(auth.uid()) IN ('admin', 'manager'));

-- RLS: programs
CREATE POLICY "Public read programs" ON public.programs FOR SELECT USING (true);
CREATE POLICY "Admins and Managers can manage programs" ON public.programs FOR ALL TO authenticated USING (public.get_user_role(auth.uid()) IN ('admin', 'manager'));

-- RLS: events
CREATE POLICY "Public read events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Admins and Managers can manage events" ON public.events FOR ALL TO authenticated USING (public.get_user_role(auth.uid()) IN ('admin', 'manager'));

-- RLS: donations
CREATE POLICY "Users can read own donations" ON public.donations FOR SELECT TO authenticated USING (auth.uid() = donor_id OR public.get_user_role(auth.uid()) IN ('admin', 'manager'));
CREATE POLICY "Admins can manage donations" ON public.donations FOR ALL TO authenticated USING (public.get_user_role(auth.uid()) = 'admin');
CREATE POLICY "Managers can read donations" ON public.donations FOR SELECT TO authenticated USING (public.get_user_role(auth.uid()) = 'manager');

-- RLS: rooms
CREATE POLICY "Authenticated read rooms" ON public.rooms FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage rooms" ON public.rooms FOR ALL TO authenticated USING (public.get_user_role(auth.uid()) = 'admin');

-- RLS: bookings
CREATE POLICY "Users can read own bookings" ON public.bookings FOR SELECT TO authenticated USING (auth.uid() = guest_id OR public.get_user_role(auth.uid()) IN ('admin', 'manager'));
CREATE POLICY "Admins can manage bookings" ON public.bookings FOR ALL TO authenticated USING (public.get_user_role(auth.uid()) = 'admin');

-- RLS: partners
CREATE POLICY "Authenticated read partners" ON public.partners FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins and Managers can manage partners" ON public.partners FOR ALL TO authenticated USING (public.get_user_role(auth.uid()) IN ('admin', 'manager'));

-- RLS: audit_logs
CREATE POLICY "Admins can read audit logs" ON public.audit_logs FOR SELECT TO authenticated USING (public.get_user_role(auth.uid()) = 'admin');
-- Note: Inserts to audit logs handled by triggers/backend, no direct UI insert allowed
