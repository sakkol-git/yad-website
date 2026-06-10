-- Phase 8 Performance Audit: Adding Indexes

-- Members Table Indexes
CREATE INDEX idx_members_slug ON public.members(slug);
CREATE INDEX idx_members_status ON public.members(status);
CREATE INDEX idx_members_type ON public.members(type);

-- Events Table Indexes
CREATE INDEX idx_events_slug ON public.events(slug);
CREATE INDEX idx_events_status ON public.events(status);
CREATE INDEX idx_events_date ON public.events(date);

-- Partners Table Indexes
CREATE INDEX idx_partners_featured ON public.partners(featured);
CREATE INDEX idx_partners_category ON public.partners(category);

-- Programs Table Indexes
CREATE INDEX idx_programs_status ON public.programs(status);

-- User Roles Table Indexes
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
